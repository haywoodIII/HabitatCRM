import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { DonorsPage } from './components/donors/DonorsPage';
import { Profile } from './components/donors/Profile';

import { useMsalAuthentication } from "@azure/msal-react";
import './custom.css'

export default function App() {

    const {login, result, error} = useMsalAuthentication("popup");
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/donors' component={DonorsPage} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/profile/:id' component={Profile} />
      </Layout>
    );
}
