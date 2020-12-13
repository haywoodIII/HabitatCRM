import React,  { useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/shared/Layout';
import { Home } from './components/pages/Home';
import { DonorsPage } from './components/pages/DonorsPage';
import { Profile } from './components/pages/Profile';
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
        <Route path='/profile/:id' component={Profile} />
        </AuthenticatedTemplate>
      </Layout>
    );
}
