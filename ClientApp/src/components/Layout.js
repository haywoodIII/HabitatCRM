import React, { Component } from 'react';
import { SideNav } from './SideNav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>
        <SideNav>
            {this.props.children}
        </SideNav>
      </div>
    );
  }
}
