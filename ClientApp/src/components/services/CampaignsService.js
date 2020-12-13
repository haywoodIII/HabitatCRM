import * as auth from './AuthService';

const baseUrl = "/api/campaigns"

export async function postCampaign(campaign = {}) {
    const jwt = await auth.getJwtSilent();

    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(campaign) 
    });
}

export async function getCampaigns() {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          },    
    });
    const campaigns = await response.json();
    return campaigns;
}

