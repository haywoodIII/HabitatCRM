import React,  { useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { DonorsPage } from './components/donors/DonorsPage';
import { Profile } from './components/donors/Profile';
import {scopes} from "./AuthConfig";

import { useMsalAuthentication } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import './custom.css'

export default function App() {

  const request = {
    scopes: scopes
}

  const { login, result, error } = useMsalAuthentication(InteractionType.Silent, request);

  useEffect(() => {
    if (error) {
        login(InteractionType.Popup, request);
    }
}, [error]);

    return (
      <Layout>
        <AuthenticatedTemplate>
        <Route exact path='/' component={Home} />
        <Route path='/donors' component={DonorsPage} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/profile/:id' component={Profile} />
        </AuthenticatedTemplate>
      </Layout>
    );
}
