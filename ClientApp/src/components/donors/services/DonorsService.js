import * as msal from "@azure/msal-browser";
import {msalConfiguration, scopes} from "../../../AuthConfig";

const baseUrl = "/api/donors"

export async function getToken() {
    const msalInstance = new msal.PublicClientApplication(msalConfiguration);
    const accounts = msalInstance.getAllAccounts();
    let jwt = null;
    try {
       jwt = await msalInstance.acquireTokenSilent({scopes: scopes, account: accounts[0]});
    } catch(err) {
        if(err.name === "ClientAuthError") {
            const msalInstance = new msal.PublicClientApplication(msalConfiguration);
            jwt = await msalInstance.acquireTokenPopup({scopes: scopes, account: accounts[0]});
        }
    }
    return jwt.accessToken;
}

export async function getDonors(msal, accounts) {
    const token = await getToken(msal, accounts);
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