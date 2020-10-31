import React, { useState }  from 'react';
import { Descriptions, Timeline, Card, Row, Col, Rate, Typography, Statistic } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export function Profile() {

    let [donorRating, setDonorRating] = useState(3);

    return (
        <>
        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">Mark Meadows</Descriptions.Item>
            <Descriptions.Item label="Telephone">585-201-1555</Descriptions.Item>
            <Descriptions.Item label="City">Newark, NY</Descriptions.Item>
            <Descriptions.Item label="Address">110 Park Street, Newark NY</Descriptions.Item>
            <Descriptions.Item label="Email">markmeadows@example.com</Descriptions.Item>
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

                        <Title level={5} style={{marginTop: 100}}>Rate Engagement</Title>
                        <span>
                        <Rate tooltips={desc} onChange={(rating) => setDonorRating(rating)} value={donorRating} />
                        {donorRating ? <span className="ant-rate-text">{desc[donorRating - 1]}</span> : ''}
                        </span>
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