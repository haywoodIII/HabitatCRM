import * as auth from './AuthService';

const baseUrl = "/api/DonorProfile"

export async function getDonorProfile(donorId) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(`${baseUrl}/${donorId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          },    
    });
    const profile = await response.json();

    return profile;
}

