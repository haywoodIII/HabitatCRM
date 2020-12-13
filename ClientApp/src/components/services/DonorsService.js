
import * as helpers from './HelpersService';
import * as auth from './AuthService';

const baseUrl = "/api/donors"

export async function getDonors() {
    const jwt = await auth.getJwtSilent();

    const organizationId = jwt?.idTokenClaims["extn.Organization"]?.[0] ?? helpers.emptyGuid();
    const response = await fetch(`${baseUrl}?Organization=${organizationId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const donor = await response.json();
    return donor;
}

export async function postDonor(donor = {}) {
    const jwt = await auth.getJwtSilent();
    
    donor.userId = jwt.uniqueId; 
    // check for missing claims
    donor.organizationId = jwt.idTokenClaims["extn.Organization"][0];
    donor.donorId = helpers.uuidv4();

    console.log(donor);
    
    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });
}

export async function updateDonor(donor = {}){
    const jwt = await auth.getJwtSilent();

    await fetch(baseUrl + "/" + donor.donorId, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });
}

export async function deleteDonor(donorId) {
    const jwt = await auth.getJwtSilent();

    await fetch(baseUrl + "/" + donorId, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
}

