
import * as helpers from './HelpersService';
import * as auth from './AuthService';

const baseUrl = "/api/donors"

export async function getDonors(donorType) {
    const jwt = await auth.getJwtSilent();
    const organizationId = jwt?.idTokenClaims["extn.Organization"];
    const response = await fetch(`${baseUrl}?$filter=OrganizationId eq ${organizationId} and Type eq '${donorType}'&$expand=Address,DonorContacts($select=DonorContactId)`, {
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
    donor.address.addressId = helpers.uuidv4();
    
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

export async function updateDonor(donor = {}) {

    const jwt = await auth.getJwtSilent();

    const addressDto = donor.address;
    const donorDto = donor; 
    delete donorDto.address;

    let response = await fetch(`${baseUrl}(${donor.donorId})`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorDto)
    });

    donor.address = addressDto;

    if (!response.ok) {
        throw new Error('Something went wrong.');
    } 

    response = await fetch(`/api/addresses(${addressDto.addressId})`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressDto)
    });

    if (!response.ok) {
        throw new Error('Something went wrong.');
    } 

    return donor;
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

