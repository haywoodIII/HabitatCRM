import * as helpers from './HelpersService';
import * as auth from './AuthService';

const baseUrl = "/api/donorcontacts"


export async function getContacts(donorId) {
    const jwt = await auth.getJwtSilent();
    
    const response = await fetch(`${baseUrl}?$filter=donorId eq ${donorId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const odataResponse = await response.json();
    return odataResponse.value;
}

export async function addContact(contact = {}) {
    const jwt = await auth.getJwtSilent();
    contact.donorContactId = helpers.uuidv4();

    const response =  await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(contact) 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 
    return contact;
}

export async function updateContact(contact = {}) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(`${baseUrl}(${contact.contactId})`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
    });

    if (!response.ok) {
        throw new Error('Something went wrong.');
    } 

    return response.value;
}

export async function deleteContact(contactId) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(baseUrl + "/" + contactId, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 

}