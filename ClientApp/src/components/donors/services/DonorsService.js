const baseUrl = "/api/donors"

export async function getToken(msal, accounts) {
    const jwt = await msal.acquireTokenSilent({
        scopes: ["https://haywoodco.onmicrosoft.com/20f42935-d191-4b89-88c1-75e43f612db7/ApiAccess"],
        account: accounts[0]});
    
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