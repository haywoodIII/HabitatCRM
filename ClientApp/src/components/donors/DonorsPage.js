import React, { useState } from 'react';
import { Popconfirm, Table, Tag, Space, Button, Modal } from 'antd';
import {DonationsForm} from './DonationsForm'
import { DonorsModal } from './DonorsModal';

const { Column, ColumnGroup} = Table;

const dataSource = [
    {
      "donor": {
        donorId: '1',
        name: 'Pioneer Library',
        age: 32,
        "address": {
          street: '10 Downing Street',
          city: 'Canandaigua',
          state: 'NY', 
          zip: '14424',
        },
        phone: '585-396-3584',
        email: 'pioneer@test.com',
        type: 'Business',
        gender: 'Other',
        genderOther: 'Non-Binary',
        donationTotal: 5
      }
    },
    {
      "donor": {
        donorId: '2',
        name: 'John',
        age: 42,
        "address": {
          street: '101 Main Street',
          city: 'Canandaigua',
          state: 'NY', 
          zip: '14424',
        },
        phone: '585-396-3584',
        email: 'john@test.com',
        type: 'Individual',
        gender: 'Male',
        donationTotal: 4
      }
    },
  ];



function DonorsTable(){

  let [donationsVisible, setDonationsVisible] = useState(false);

  const updateRow = (key, e) => {
    e.preventDefault();
    setDonationsVisible(true)
    console.log(key);
    }

  const deleteRow = (key, e) => {
    e.preventDefault();
    console.log(key);
    }

  const handleDonationsCancel = e => {
      console.log(e);
      setDonationsVisible(false);
  };

  return (
    <Table dataSource={dataSource} rowKey={r => r.donor.donorId}>
      <Column title='Name' dataIndex={['donor', 'name']} key='name' render={text => <a>{text}</a>}></Column>
      <Column title='Email' dataIndex={['donor', 'email']} ></Column>
      <ColumnGroup title="Address">
        <Column title='Street' dataIndex={['donor', 'address', 'street']} ></Column>
        <Column title='City' dataIndex={['donor', 'address', 'city']} ></Column>
        <Column title='State' dataIndex={['donor', 'address', 'state']} ></Column>
        <Column title='Zip' dataIndex={['donor', 'address', 'zip']} ></Column>
      </ColumnGroup>
      <Column 
      title='Donor Type' 
      dataIndex={['donor', 'type']} 
      key='type' 
      render = {(type, color) => <Tag color={color = type === "Business" ? "blue": "green"} key={type}>{type.toUpperCase()}</Tag>}
      >
      </Column>
      <Column title='Total Donations' dataIndex={['donor', 'donationTotal']} key='donationTotal'></Column>
      <Column 
      title='Action' 
      key='action'
      render = {(_, record) => (
        <Space size="middle">
      <>
        <Button onClick={() => setDonationsVisible(true)}>
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
          <DonorsModal text="Update" initialValues={record}/>
          <Popconfirm
            title={`Are you sure delete ${record.name}?`}
            onConfirm={(e) => deleteRow(record.key, e)}
            okText="Yes"
            cancelText="No"
          >
        <Button danger>
          Delete
        </Button>
        </Popconfirm>
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
        <DonorsModal text="Add Donor"/>
        </div>
            <DonorsTable/>
        </>
    );
}