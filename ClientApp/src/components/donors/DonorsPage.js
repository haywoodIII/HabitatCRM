import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { Link } from "react-router-dom"; 
import {useParams} from "react-router-dom";
import {DonationsForm} from './DonationsPage'

const { Column, ColumnGroup } = Table;

const dataSource = [
    {
      id: '1',
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
      id: '2',
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


export function DonarsModal(props) {

  let [donationsVisible, setDonationsVisible] = useState(false);


  const handleOk = e => {
    console.log(e);
    setDonationsVisible(true);
  };

    
  const handleCancel = e => {
      console.log(e);
      setDonationsVisible(false);
  };


  return (
      <>
        <Button type="primary" onClick={() => setDonationsVisible(props.visible)}>
          Open Modal
        </Button>
        <Modal
          title="Add Donations"
          visible={donationsVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
}


function DonorsTable(){

  let [donationsVisible, setDonationsVisible] = useState(false);

  const handleDonationsCancel = e => {
      console.log(e);
      setDonationsVisible(false);
  };

  return (
    <Table dataSource={dataSource}>
      <Column title='Name' dataIndex='name' key='name' render={text => <a>{text}</a>}></Column>
      <Column title='Email' dataIndex='email' key='email'></Column>
      <Column title='Street' dataIndex='street' key='street'></Column>
      <Column title='City' dataIndex='city' key='city'></Column>
      <Column title='State' dataIndex='state' key='state'></Column>
      <Column title='Zip' dataIndex='zip' key='zip'></Column>
      <Column 
      title='Donor Type' 
      dataIndex='type' 
      key='type' 
      render = {(type, color) => <Tag color={color = type === "business" ? "blue": "green"} key={type}>{type.toUpperCase()}</Tag>}
      >
      </Column>
      <Column 
      title='Action' 
      key='action'
      render = {(_, record) => (
        <Space size="middle">
      <>
        <Button type="primary" onClick={() => setDonationsVisible(true)}>
          Add Donation
        </Button>
        <Modal
          title="Add Donations"
          visible={donationsVisible}
          onCancel={handleDonationsCancel}
          footer={[
            <Button key="back" onClick={handleDonationsCancel}>
              Return
            </Button>,
          ]}
        >
          <DonationsForm/>
        </Modal>
      </>
          <a href="#" onClick={(e) => updateRow(record.id, e)}>Update</a>
          <a href="#" onClick={(e) => deleteRow(record.id, e)}>Delete</a>
        </Space>
      )}
      >
      </Column>
    </Table>
  );
}

export function DonorsPage() {
    return (
        <>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" >
            <Link to="/donors-form">Add Donors</Link>
          </Button>
        </div>
            <DonorsTable/>
        </>
    );
}