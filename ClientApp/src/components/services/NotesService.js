import * as helpers from './HelpersService';
import * as auth from './AuthService';

const baseUrl = "/api/notes"


export async function getNote(donorId) {
    const jwt = await auth.getJwtSilent();
    
    const response = await fetch(`${baseUrl}?$filter=donorId eq ${donorId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
          }, 
    });
    const odataResponse = await response.json();
    return odataResponse.value[0];
}

export async function addNote(note = {}) {
    const jwt = await auth.getJwtSilent();
    note.noteId = helpers.uuidv4();

    const response =  await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(note) 
    });

    if(!response.ok) {
        throw new Error('Something went wrong.');
    } 
    return note;
}

export async function updateNote(note = {}) {
    const jwt = await auth.getJwtSilent();

    const response = await fetch(`${baseUrl}(${note.noteId})`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwt.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    });

    if (!response.ok) {
        throw new Error('Something went wrong.');
    } 

    return response.value;
}