import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { Popconfirm, Table, Tag, Space, Button, message } from 'antd';

import {DonationsModal} from '../shared/DonationsModal'
import { DonorsModal } from '../shared/DonorsModal';
import { CampaignModal } from '../shared/Campaign';
import * as donorsService from '../services/DonorsService';
import { getCampaigns, postCampaign } from '../services/CampaignsService';

const { Column, ColumnGroup} = Table;

function DonorsTable(props) {


  const deleteDonor = async (donorId, e) => {
    e.preventDefault();
    props.deleteDonor(donorId);
    }

    return (
        <Table dataSource={props.dataSource} rowKey={r => r.donorId} loading={props.loading}>
          <Column title='Name' dataIndex='name' key='name' render={(_, record) =>
            (<Link 
              to={{ pathname:`profile/${record.donorId}`,
                    state: {donor: record}}}>
                {record.name}
            </Link>)}>
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
   
        <Column 
        title='Action' 
        key='action'
        render = {(_, record) => (
          <Space size="middle">

            <DonationsModal initialValues={record} campaigns={props.campaigns}/>

            <DonorsModal addOrUpdate="Update" initialValues={record} updateDonor={props.updateDonor}/>
            <Popconfirm
              title={`Are you sure delete ${record.name}?`}
              onConfirm={(e) => deleteDonor(record.donorId, e)}
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
  let [campaigns, setCampaigns] = useState(null);
  
  useEffect(() => {
      async function getDonorsAndCampaigns() {
        setLoading(true);
         
        let [donorData, campaignsData] = await Promise.all([donorsService.getDonors(), getCampaigns()])
        setLoading(false);
        setDataSource(donorData);
        setCampaigns(campaignsData);
      }
      getDonorsAndCampaigns();
  }, []);


  const addCampaign = async (campaign) => {

    try {
      await postCampaign(campaign);
      setCampaigns(campaigns.concat(campaign));
      message.success("Campaign added!");
    }
    catch(error) {
      message.error('Sorry, something went wrong... contact system administrator')
    }
  }

  const addDonor = (donor) => {
    setDataSource([...dataSource, donor]);
  }

  const updateDonor = (donor) => {
    var newData = dataSource.map(el => {
      if(el.donorId == donor.donorId)
         return Object.assign({}, donor, {valid:true})
      return el
  });
    setDataSource(newData);
  }
  
  const deleteDonor = async (donorId) => {

    try {
      await donorsService.deleteDonor(donorId);
      setDataSource(dataSource.filter(donor => donor.donorId !== donorId));
    }catch(error){
      message.error('Sorry, something went wrong... contact system administrator')
    }
  }
    return (
      <>
        <div style={{ marginBottom: 16 }}>
        <DonorsModal addOrUpdate="Add" addDonor={addDonor} />
        <CampaignModal addCampaign={addCampaign}/>
        </div>
        <DonorsTable dataSource={dataSource} loading={loading} deleteDonor={deleteDonor} updateDonor={updateDonor} campaigns={campaigns}/>
      </>
    );
}