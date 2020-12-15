
import * as helpers from './HelpersService';
import * as auth from './AuthService';

const baseUrl = "/api/donors"

export async function getDonors() {
    const jwt = await auth.getJwtSilent();
    const organizationId = jwt?.idTokenClaims["extn.Organization"]?.[0] ?? helpers.emptyGuid();
    const response = await fetch(`${baseUrl}?$filter=organizationId eq ${organizationId}&$expand=address`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const odataResponse = await response.json();
    return odataResponse.value;
}

export async function postDonor(donor = {}) {
    const jwt = await auth.getJwtSilent();
    
    donor.userId = jwt.uniqueId; 
    donor.organizationId = jwt.idTokenClaims["extn.Organization"][0];
    donor.donorId = helpers.uuidv4();
    
    const response =  await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 
}

export async function updateDonor(donor = {}){
    const jwt = await auth.getJwtSilent();

    const response = await fetch(baseUrl + "/" + donor.donorId, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donor) 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 
}

export async function deleteDonor(donorId) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(baseUrl + "/" + donorId, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 

}

