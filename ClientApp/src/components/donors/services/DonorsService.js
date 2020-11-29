import authentication from 'react-azure-b2c'

const baseUrl = "/api/donors"

export async function getDonors() {
    const token = authentication.getAccessToken();
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.accessToken}`,
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
      return response.json(); // parses JSON response into native JavaScript objects
}