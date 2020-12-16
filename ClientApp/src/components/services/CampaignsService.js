import * as auth from './AuthService';
import * as helpers from './HelpersService';

const baseUrl = "/api/campaigns"

export async function postCampaign(campaign = {}) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(baseUrl, {
        method: 'POST',
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

export async function getCampaigns() {
    const jwt = await auth.getJwtSilent();
    const organizationId = jwt?.idTokenClaims["extn.Organization"]?.[0] ?? helpers.emptyGuid();

    const response = await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          },    
    });
    const campaigns = await response.json();
    return campaigns.value;
}

