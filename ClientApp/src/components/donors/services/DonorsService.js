const baseUrl = "/api/donors"

export async function getDonors() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
}