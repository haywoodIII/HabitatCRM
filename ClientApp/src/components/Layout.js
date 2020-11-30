import React, { Component } from 'react';
import { SideNav } from './SideNav';
import { useMsal } from "@azure/msal-react";

export function Layout(props) {
  const { instance, accounts, inProgress } = useMsal();

    return (
        <div>
        <SideNav accounts={accounts} inProgress={inProgress} instance={instance}>
            {props.children}
        </SideNav>
      </div>
    );
}
