
import {scopes} from "../../../AuthConfig";

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

export async function getJwtSilent(authProvider) {
    const accounts = authProvider.getAllAccounts();
    let jwt = null;
    jwt = await authProvider.acquireTokenSilent({scopes: scopes, account: accounts[0]});

    return jwt;
}