import * as auth from './AuthService';
import * as helpers from './HelpersService';

const baseUrl = "/api/donations"


export async function getDonation() {
    const jwt = await auth.getJwtSilent();
    const organizationId = jwt?.idTokenClaims["extn.Organization"]?.[0] ?? helpers.emptyGuid();

    const response = await fetch(`${baseUrl}/organizationId`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const donor = await response.json();
    return donor;
}

export async function postDonation(donorId, donation = {}) {
    const jwt = await auth.getJwtSilent();
    
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
