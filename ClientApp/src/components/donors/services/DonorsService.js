
import {scopes} from "../../../AuthConfig";
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
    console.log(jwt);
    const organizationId = jwt.idTokenClaims["extn.Organization"][0];
    const response = await fetch(`${baseUrl}?Organization=${organizationId}`, {
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
    donor.organizationId = jwt.idTokenClaims["extn.Organization"][0];
    donor.donorId = helpers.uuidv4();
    
    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });
}

export async function updateDonor(donor = {}, authProvider){
    const jwt = await getJwtSilentAndPopupIfAuthError(authProvider);

    await fetch(baseUrl + "/" + donor.donorId, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });
}

export async function deleteDonor(donorId, authProvider) {
    const jwt = await getJwtSilentAndPopupIfAuthError(authProvider);

    await fetch(baseUrl + "/" + donorId, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
}

