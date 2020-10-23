import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { Link } from "react-router-dom"; 

const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      street: '10 Downing Street',
      city: 'Newark',
      state: 'NY', 
      zip: '14424',
      phone: '585-396-3584',
      email: 'mike@test.com',
      type: 'business',
      gender: 'Male'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      street: '10 Downing Street',
      city: 'Newark',
      state: 'NY', 
      zip: '14424',
      phone: '585-396-3584',
      email: 'john@test.com',
      type: 'individual',
      gender: 'Male'
    },
  ];

function updateRow(id, e) {
    e.preventDefault();
    console.log(id);
    }

function deleteRow(id, e) {
    e.preventDefault();
    console.log(id);
    }

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: 'Zip',
        dataIndex: 'zip',
        key: 'zip',
    },
    {
      title: 'Donor Type',
      key: 'type',
      dataIndex: 'type',
      render: (type, color) => <Tag color={color = type === "business" ? "blue": "green"} key={type}>{type.toUpperCase()}</Tag>
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a href="#">
                <Link to="/donors-form">Donations</Link>
            </a>
            <a href="#" onClick={(e) => updateRow(record.key, e)}>Update</a>
            <a href="#" onClick={(e) => deleteRow(record.key, e)}>Delete</a>
          </Space>
        ),
      },
    ];

export function DonorsPage() {
    return (
        <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" >
            <Link to="/donors-form">Add Donors</Link>
          </Button>
        </div>
            <Table columns={columns} dataSource={dataSource}/>
        </div>
    );
}