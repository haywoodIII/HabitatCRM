import * as auth from './AuthService';

const baseUrl = "/api/campaigns"

export async function postCampaign(campaign = {}, authProvider) {
    const jwt = await auth.getJwtSilentAndPopupIfAuthError(authProvider);

    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(campaign) 
    });
}

export async function getCampaigns(authProvider) {
    const jwt = await auth.getJwtSilent(authProvider);

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          },    
    });
    const campaigns = await response.json();
    return campaigns;
}

