import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import {msalConfiguration} from "./AuthConfig"
import App from './App';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

function isDev()
{
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

const pca = new PublicClientApplication(msalConfiguration);


  ReactDOM.render(
    <MsalProvider instance={pca}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </MsalProvider>,
    rootElement);

  registerServiceWorker();

