import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { Popconfirm, Table, Tag, Space, Button, message, Spin, Pagination, Tabs, Input  } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import {DonationsModal} from '../shared/DonationsModal'
import { DonorsModal } from '../shared/DonorsModal';
import { CampaignModal } from '../shared/Campaign';
import * as donorsService from '../services/DonorsService';
import { getCampaigns, postCampaign } from '../services/CampaignsService';

const { Column, ColumnGroup} = Table;
const { TabPane } = Tabs;

function DonorsTable(props) {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchColumn] = useState(null);

  let searchInput = null; 

  const deleteDonor = async (donorId, e) => {
    e.preventDefault();
    props.deleteDonor(donorId);
    }

    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => {
        
        const navigatedRecord = () => {
          let navigatedObj;
          for (const el of dataIndex) {
            navigatedObj = navigatedObj ? navigatedObj[el] : record[el];
          }
          return navigatedObj
        }

        const filter = navigatedRecord() 
        ? navigatedRecord().toString().toLowerCase().includes(value.toLowerCase())
        : ''
        return filter;
      },

      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text =>
        JSON.stringify(searchedColumn) ===  JSON.stringify(dataIndex) ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchColumn(dataIndex)
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setSearchText('');
    };

    return (
        <Table 
          dataSource={props.dataSource} 
          rowKey={r => r.donorId}
          pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100']}}
          >
          <Column 
            title='Name' 
            dataIndex='name'
            width={200}
            {...getColumnSearchProps(['name'])}
            key='name' render={(_, record) =>
              (<Link 
                to={{ pathname:`profile/${record.donorId}`,
                      state: {donor: record, donorType: props.donorType}}}>
                  {record.name}
              </Link>)}>
          </Column>
          <Column title='Email' dataIndex="email" width={250} ></Column>
          <ColumnGroup title="Address">
            <Column title='Street' dataIndex={['address', 'street']} width={200}></Column>
            <Column title='City' dataIndex={['address', 'city']} {...getColumnSearchProps(['address', 'city'])} width={150}></Column>
            <Column title='State' dataIndex={['address', 'state']} width={75}></Column>
            <Column title='Zip' dataIndex={['address', 'zip']} width={100}></Column>
          </ColumnGroup>
          {/* <Column 
          title='Donor Type' 
          dataIndex='type'
          key='type' 
          width={100}
          render = {(type, color) => <Tag color={color = type === "Business" ? "blue": "green"} key={type}>{type?.toUpperCase()}</Tag>}
          >
          </Column> */}
   
        <Column 
        title='Action' 
        key='operation'
        fixed='right'
        width={100}
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
  let [donorTypeSource, setDonorTypeSource] = useState(defaultDonorToDisplay);

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