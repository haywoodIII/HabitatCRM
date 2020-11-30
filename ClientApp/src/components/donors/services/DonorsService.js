import * as msal from "@azure/msal-browser";
import {msalConfiguration, scopes} from "../../../AuthConfig";
import * as helpers from './HelpersService';

const baseUrl = "/api/donors"

export async function getJwtSilentAndPopupIfAuthError(authProvider) {
    const accounts = authProvider.getAllAccounts();
    let jwt = null;
    try {
       jwt = await authProvider.acquireTokenSilent({scopes: scopes, account: accounts[0]});
    } catch(err) {
        if (err.name === "ClientAuthError") {
            jwt = await authProvider.acquireTokenPopup({scopes: scopes, account: accounts[0]});
        }
    }
    return jwt;
}

export async function getDonors(authProvider) {
    const jwt = await getJwtSilentAndPopupIfAuthError(authProvider);
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const donor = await response.json();
    return donor;
}

export async function postDonor(donor = {}, authProvider) {
    const jwt = await getJwtSilentAndPopupIfAuthError(authProvider);
    donor.userId = jwt.uniqueId; 
    donor.donorId = helpers.uuidv4()

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });
      return response.json(); 
}