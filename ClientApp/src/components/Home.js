import React from 'react';
import { Row, Col, Statistic, Card, Progress, Typography, Select, Descriptions} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { DollarOutlined} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

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
    <>
      <Select style={{ width: 120 }}
      showSearch
      style={{ width: 200 }}
      placeholder="Select a Campaign"
      optionFilterProp="children"
      >
        <Option value="jack">5k (October 2020)</Option>
        <Option value="lucy">Women's Build</Option>
        <Option value="Yiminghe">2020 Year</Option>
      </Select>
    </>
)

export function Home (){
  return (
    <Row gutter={16}>
      <Col flex={3}>
        <Title style={{marginBottom: 25, opacity:"35%", fontWeight:"10"}}>Dashboard</Title>
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
          <Card.Grid style={gridStyle} hoverable={false}>
              <span style={title}>Monthly Donations</span>
              <Statistic
                value={120}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined style={{verticalAlign: "baseline"}}/>}
              />
          </Card.Grid>
        </Card>

        <Card className="stack-card">
          <Card.Grid style={{boxShadow: "none", "WebkitBoxShadow": "none", width:"100%", textAlign:"center", padding: 0}} hoverable={false}>
              <span style={title}>Compaign Progress</span>
              <Progress percent={50} status="active" />

              <div style={{display:"flex", width: "100%"}}>
                <span style={{color:"var(--money-green)"}}>Raised $12,014</span>
                <span style={{marginLeft: "auto", color:"var(--money-green)"}}>Goal: $20,000</span>   
              </div>

              <div style={{display:"flex", width: "100%", paddingTop: 10}}>
                {campaignSelect}
              </div>
          </Card.Grid>
        </Card>

      </Col>
      <Col flex={2} style={{paddingTop: 96}}>
        <Card title="Newest Donor" >
          <Title level={5}>Jane Smith</Title>
          <span className="ant-statistic-title">$20.00 Donation</span>
          <br/>
          <span className="ant-statistic-title">10/16/2020</span>
        </Card>
      </Col>
  </Row>
  );
}

