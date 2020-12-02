import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { Popconfirm, Table, Tag, Space, Button, Modal } from 'antd';
import { useMsal } from "@azure/msal-react";
import {DonationsForm} from './DonationsForm'
import { DonorsModal } from './DonorsModal';
import { CampaignModal } from './Campaign';
import * as donorsService from './services/DonorsService';

const { Column, ColumnGroup} = Table;

function DonorsTable(props) {

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
        <Table dataSource={props.dataSource} rowKey={r => r.donorId} loading={props.loading}>
      <Column title='Name' dataIndex='name' key='name' render={(_, record) =>
        (<Link to={`profile/${record.donorId}`}>{record.name}</Link>)}>
      </Column>
      <Column title='Email' dataIndex="email" ></Column>
      <ColumnGroup title="Address">
        <Column title='Street' dataIndex={['address', 'street']} ></Column>
        <Column title='City' dataIndex={['address', 'city']} ></Column>
        <Column title='State' dataIndex={['address', 'state']} ></Column>
        <Column title='Zip' dataIndex={['address', 'zip']} ></Column>
      </ColumnGroup>
      <Column 
      title='Donor Type' 
      dataIndex='type'
      key='type' 
      render = {(type, color) => <Tag color={color = type === "Business" ? "blue": "green"} key={type}>{type?.toUpperCase()}</Tag>}
      >
      </Column>
      {/* <Column title='Total Donations' dataIndex='donationTotal' key='donationTotal'></Column> */}
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
          onConfirm={(e) => deleteRow(record.donorId, e)}
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

  let [loading, setLoading] = useState(false);
  let [dataSource, setDataSource] = useState(null);
  const { instance, accounts, inProgress } = useMsal();

  useEffect(() => {
      async function getDonors() {
          setLoading(true);
          let response = await donorsService.getDonors(instance);
          setDataSource(response);
          setLoading(false);
      }
      getDonors();
  }, []);

  const addDonor = (donor) => {
    setLoading(true);
    setDataSource([...dataSource, donor]);
    setLoading(false);
    }

    return (
        <>
        <div style={{ marginBottom: 16 }}>
        <DonorsModal text="Add Donor" addDonor={addDonor} />
        <CampaignModal />
        </div>
            <DonorsTable dataSource={dataSource} loading={loading}/>
        </>
    );
}