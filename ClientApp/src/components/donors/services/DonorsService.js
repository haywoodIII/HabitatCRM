const baseUrl = "/api/donors"

export async function getDonors() {
    const response = await fetch(baseUrl);
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
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    });
      return response.json(); // parses JSON response into native JavaScript objects
}