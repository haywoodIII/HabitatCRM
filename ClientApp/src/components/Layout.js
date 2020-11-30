import React, { Component } from 'react';
import { SideNav } from './SideNav';

export function Layout(props) {
    return (
        <div>
        <SideNav>
            {props.children}
        </SideNav>
      </div>
    );
}
