
import {scopes, pca} from "../../AuthConfig";

export async function getJwtSilentAndPopupIfAuthError() {
    const accounts = pca.getAllAccounts();
    let jwt = null;

    try {
       jwt = await pca.acquireTokenSilent({scopes: scopes, account: accounts[0]});
    } catch(err) {
        if (err.name === "ClientAuthError") {
            jwt = await pca.acquireTokenPopup({scopes: scopes, account: accounts[0]});
        }
    }
    return jwt;
}

export async function getJwtSilent() {
    const accounts = pca.getAllAccounts();
    let jwt = null;
    jwt = await pca.acquireTokenSilent({scopes: scopes, account: accounts[0]});

    return jwt;
}