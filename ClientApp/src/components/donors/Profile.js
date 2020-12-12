import React, { useState }  from 'react';
import { Descriptions, Timeline, Card, Row, Col, Rate, Typography, Statistic } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { useMsal } from "@azure/msal-react";

const { Title } = Typography;

export function Profile(props) {

    let [donationsSource, setDonationsSource] = useState(null);

    const donor = props.location.state.donor;
    const address = donor?.address;
    const fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zip}`
    return (
        <>
        <Descriptions title="User Info">
    <Descriptions.Item label="UserName">{donor?.name}</Descriptions.Item>
    <Descriptions.Item label="Telephone">{donor?.phone}</Descriptions.Item>
    <Descriptions.Item label="City">{address.city}</Descriptions.Item>
    <Descriptions.Item label="Address">{fullAddress}</Descriptions.Item>
    <Descriptions.Item label="Email">{donor?.email}</Descriptions.Item>
        </Descriptions>

        <div className="site-card-wrapper">
            <Row gutter={16} style={{marginTop: 100}}>
                <Col span={8}>
                    <Card title="Donation History" bordered={false}>
                        <Timeline>
                        <Timeline.Item>Became a Donor 2015-09-01</Timeline.Item>
                        <Timeline.Item>Donated 2015-09-01</Timeline.Item>
                        <Timeline.Item>Donated 2015-09-01</Timeline.Item>
                        <Timeline.Item>Donated 2015-09-01</Timeline.Item>
                        <Timeline.Item>Last Donated 2015-09-01</Timeline.Item>
                        </Timeline>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Stats" bordered={false}>
                        <Statistic title="Total Donations" value={3} />
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<DollarCircleOutlined style={{verticalAlign: "baseline"}}/>}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    );
}