import * as auth from './AuthService';
import * as helpers from './HelpersService';

const baseUrl = "/api/donations"


export async function getDonation(donorId) {
    const jwt = await auth.getJwtSilentAndPopupIfAuthError();

    const response = await fetch(`${baseUrl}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const donor = await response.json();
    return donor;
}

export async function postDonation(donorId, donation = {}) {
    const jwt = await auth.getJwtSilentAndPopupIfAuthError();
    
    donation.userId = jwt.uniqueId;  
    donation.donorId = donorId;   
    donation.donationId = helpers.uuidv4();

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
