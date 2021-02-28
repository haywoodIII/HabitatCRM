import * as auth from './AuthService';
import * as helpers from './HelpersService';

const baseUrl = "/api/donations"


export async function getDonation() {
    const jwt = await auth.getJwtSilent();
    const organizationId = auth.getOrganizationId(jwt);

    const response = await fetch(`${baseUrl}?$filter=organizationId eq ${organizationId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const donor = await response.json();
    return donor;
}

export async function getDonations(donorId) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(`${baseUrl}/${donorId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          },    
    });
    const donations = await response.json();
    return donations;
}

export async function postDonation(donorId, donation = {}) {
    const jwt = await auth.getJwtSilent();
    const organizationId = auth.getOrganizationId(jwt);
    donation.donorId = donorId;   
    donation.donationId = helpers.uuidv4();
    donation.organizationId = organizationId;

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(donation) 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 
}

export async function updateDonation(donation = {}) {

    const jwt = await auth.getJwtSilent();
    delete donation.isUpdated;
    delete donation.campaign;

    let response = await fetch(`${baseUrl}(${donation.donationId})`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation)
    });


    if (!response.ok) {
        throw new Error('Something went wrong.');
    } 

    return donation;
}
