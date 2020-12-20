import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { Popconfirm, Table, Tag, Space, Button, message, Spin } from 'antd';
import { Tabs } from 'antd';

import {DonationsModal} from '../shared/DonationsModal'
import { DonorsModal } from '../shared/DonorsModal';
import { CampaignModal } from '../shared/Campaign';
import * as donorsService from '../services/DonorsService';
import { getCampaigns, postCampaign } from '../services/CampaignsService';

const { Column, ColumnGroup} = Table;
const { TabPane } = Tabs;

function DonorsTable(props) {


  const deleteDonor = async (donorId, e) => {
    e.preventDefault();
    props.deleteDonor(donorId);
    }

    return (
        <Table dataSource={props.dataSource} rowKey={r => r.donorId}>
          <Column title='Name' dataIndex='name' key='name' render={(_, record) =>
            (<Link 
              to={{ pathname:`profile/${record.donorId}`,
                    state: {donor: record, donorType: props.donorType}}}>
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

            <DonorsModal addOrUpdate="Update" initialValues={record} updateDonor={props.updateDonor} donorType={props.donorType}/>
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

export function DonorsPage(props) {

  let [loading, setLoading] = useState(false);
  let [dataSource, setDataSource] = useState(null);
  let [campaignsSource, setCampaignsSource] = useState(null);

  // Pass tab history back from profile page to DonorsPage
  const defaultDonorToDisplay = props.location.state?.tab ?? "Business"
  let [donorTypeSource, setDonorTypeSource] = useState("Business");

  useEffect(() => {
      async function setupPage() {
        await getDonorsAndCampaigns(defaultDonorToDisplay);
      }
      setupPage();
  }, []);

  async function getDonorsAndCampaigns(donorType) {
    setLoading(true);
    let [donorResponse, campaignsResponse] = await Promise.all([donorsService.getDonors(donorType), getCampaigns()]);
    setDataSource(donorResponse);
    setCampaignsSource(campaignsResponse);
    setLoading(false);
  }

  const addCampaign = async (campaign) => {

    try {
      await postCampaign(campaign);
      setCampaignsSource(campaignsSource.concat(campaign));
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

  const selectTab = async (key) => {
    setDonorTypeSource(key);
    await getDonorsAndCampaigns(key);
  }

  const DonorPane = ()=> {
   
      if (loading){
        return (
          <div class="center-container">
          <Spin />
        </div>
        );
      } else {
        return (
          <>
          <DonorsModal addOrUpdate="Add" addDonor={addDonor} donorType={donorTypeSource}/>
          <CampaignModal addCampaign={addCampaign}/>
          <DonorsTable dataSource={dataSource} 
            deleteDonor={deleteDonor} 
            updateDonor={updateDonor} 
            donorType={donorTypeSource}
            campaigns={campaignsSource}/>
        </>
        );
      }
  };

    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <Tabs defaultActiveKey={defaultDonorToDisplay} onChange={selectTab}>
            <TabPane tab="Business" key="Business">
              <DonorPane />
            </TabPane>
            <TabPane tab="Individual" key="Individual">
              <DonorPane />
            </TabPane>
          </Tabs>
        </div>
      </>
    );
}