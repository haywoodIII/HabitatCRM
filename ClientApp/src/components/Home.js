import React from 'react';
import { Row, Col, Statistic, Card, Progress, Typography, Select, List} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { DollarOutlined} from '@ant-design/icons';
import { useMsalAuthentication } from "@azure/msal-react";

const { Title } = Typography;
const { Option, OptGroup } = Select;

const recentDonors = [
  {
    "donor": {
      donorId: '1',
      name: 'Pioneer Library',
      donation: 5.00,
      date: '10/30/2020'
    }
  },
  {
    "donor": {
      donorId: '2',
      name: 'Jake Taft',
      donation: 20.00,
      date: '10/30/2020'
    }
  },
  {
    "donor": {
      donorId: '3',
      name: 'TD Dholkia',
      donation: 20.00,
      date: '10/30/2020'
    }
  },
  {
    "donor": {
      donorId: '4',
      name: 'James Rowe',
      donation: 20.00,
      date: '10/30/2020'
    }
  },
  {
    "donor": {
      donorId: '5',
      name: 'Don Cotter',
      donation: 20.00,
      date: '10/30/2020'
    }
  },
];

const gridStyle = {
  width: '100%',
  textAlign: 'center',
};

const title = {
  marginBottom: '10px',
  color: 'rgb(0 0 0 / 67%)',
  fontSize: '25px'
}

const campaignSelect = (

      <Select style={{ width: 120 }}
      defaultValue="Current Year"
      showSearch
      style={{ width: 200 }}
      optionFilterProp="children"
      >
        <Option value="jack">5k</Option>
        <Option value="lucy">Women's Build</Option>
      </Select>

)

export function Home (){

  const {login, result, error} = useMsalAuthentication("popup");

  return (
    <Row gutter={16}>
      <Col flex={3}>
        <Title style={{marginBottom: 25, opacity:"35%", fontWeight:"10"}}>Dashboard</Title>
        
        <Card className="stack-card">
          <Card.Grid style={{ width: '34%', textAlign: 'center'}} hoverable={false}>
                <span style={title}>Daily Donations</span>
                <Statistic
                  value={0}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined style={{verticalAlign: "baseline"}}/>}
                />
            </Card.Grid>
            <Card.Grid style={{ width: '33%', textAlign: 'center'}} hoverable={false}>
                <span style={title}>Monthly Donations</span>
                <Statistic
                  value={120}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined style={{verticalAlign: "baseline"}}/>}
                />
            </Card.Grid>
            <Card.Grid style={{ width: '33%', textAlign: 'center'}} hoverable={false}>
                <span style={title}>Yearly Donations</span>
                <Statistic
                  value={35000}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined style={{verticalAlign: "baseline"}}/>}
                />
            </Card.Grid>
        </Card>

        <Card className="stack-card">
          <Card.Grid style={gridStyle} hoverable={false}>
            <span style={title}>Donor Rentention</span>
            <br/>
            <Progress type="circle" percent={34} />
            <br/>
            <span className="ant-statistic-title">59 of 169 Donors Retained</span>
          </Card.Grid>
        </Card>

        <Card className="stack-card">
          <Card.Grid style={{boxShadow: "none", "WebkitBoxShadow": "none", width:"100%", textAlign:"center", padding: 0}} hoverable={false}>
              <span style={title}>Campaigns</span>
              <Progress percent={50} status="active" />

              <div style={{display:"flex", width: "100%"}}>
                <span style={{color:"var(--money-green)", fontSize: 20}}>Raised $12,014</span>
                <span style={{marginLeft: "auto", color:"var(--money-green)", fontSize: 20}}>Goal: $20,000</span>   
              </div>

              <div style={{display:"flex", width: "100%", paddingTop: 10}}>
                {campaignSelect}
              </div>
          </Card.Grid>
        </Card>

      </Col>
      <Col flex={2} style={{paddingTop: 120}}>
      <List
        header={<div>Recent Donations</div>}
        itemLayout="horizontal"
        dataSource={recentDonors}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.donor.name}
              description={'$' + item.donor.donation}
            />
            <span className="ant-statistic-title">{item.donor.date}</span>
          </List.Item>
        )}
      />

      </Col>
  </Row>
  );
}

