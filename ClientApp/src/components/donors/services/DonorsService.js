import * as msal from "@azure/msal-browser";
import {msalConfiguration, scopes} from "../../../AuthConfig";

const baseUrl = "/api/donors"

export async function getTokenSilentAndPopupIfAuthError(msal) {
    const accounts = msal.getAllAccounts();
    let jwt = null;
    try {
       jwt = await msal.acquireTokenSilent({scopes: scopes, account: accounts[0]});
    } catch(err) {
        if (err.name === "ClientAuthError") {
            jwt = await msal.acquireTokenPopup({scopes: scopes, account: accounts[0]});
        }
    }
    return jwt.accessToken;
}

export async function getDonors(msal) {
    const token = await getTokenSilentAndPopupIfAuthError(msal);
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
          }, 
    });
    const data = await response.json();
    return data;
}

export async function postDonor(data = {}) {

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(data) 
    });
      return response.json(); 
}