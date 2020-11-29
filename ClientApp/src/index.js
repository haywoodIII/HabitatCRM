import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authentication from 'react-azure-b2c';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

function isDev()
{
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

authentication.initialize({
  // optional, will default to this
  instance: 'https://haywoodco.b2clogin.com', 
  // your B2C tenant
  tenant: 'haywoodco.onmicrosoft.com',
  // the policy to use to sign in, can also be a sign up or sign in policy
  signInPolicy: 'B2C_1_SignIn',
  // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
  clientId: 'fcccc121-5a08-4c09-badd-fcb248327c9a',
  // where MSAL will store state - localStorage or sessionStorage
  cacheLocation: 'sessionStorage',
  // the scopes you want included in the access token
  scopes: ['https://haywoodco.onmicrosoft.com/api/API.Access'],
  // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
  redirectUri: isDev ? 'https://localhost:5001/authentication/login-callback': 'updateMe'
 
});

authentication.run(() => {
  ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>,
    rootElement);

  registerServiceWorker();
});
