import * as auth from './AuthService';

const baseUrl = "/api/campaigns"

export async function updateCampaign(campaign = {}) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(baseUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(campaign) 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 
}


