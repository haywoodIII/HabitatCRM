import React, { Component } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <DatePicker />
    );
  }
}
