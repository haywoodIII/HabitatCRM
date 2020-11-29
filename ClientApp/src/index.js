import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from './App';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

function isDev()
{
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

// MSAL configuration
const configuration = {
  auth: {
      clientId: "3626b35e-0129-407a-ade4-5e8c2d1287a8",
      authority: "https://login.microsoftonline.com/206923d2-477a-413e-b4e9-5fcdca2271ba/", 
      redirectUri: 'https://localhost:5001/authentication/login-callback'
  }
};

const pca = new PublicClientApplication(configuration);


  ReactDOM.render(
    <MsalProvider instance={pca}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </MsalProvider>,
    rootElement);

  registerServiceWorker();

