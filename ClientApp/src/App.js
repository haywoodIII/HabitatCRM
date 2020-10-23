import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import {DonorsForm} from './components/donors/DonorsForm';
import {DonorsPage} from './components/donors/DonorsPage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/donors-form' component={DonorsForm} />
        <Route path='/donors' component={DonorsPage} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
