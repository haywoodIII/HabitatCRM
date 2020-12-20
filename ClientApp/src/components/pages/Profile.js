import React, {useEffect, useState} from 'react';
import { Descriptions, Timeline, Card, Row, Col, Rate, Typography, Statistic, Button, Tooltip } from 'antd';
import { DollarCircleOutlined, StepBackwardOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import {getDonorProfile} from '../services/ProfileService'

const { Title } = Typography;

export function Profile(props) {
    const donor = props.location.state.donor;
    const address = donor?.address;
    const fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zip}`;

    let [donorProfile, setDonorProfile] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function getProfile() {

          let profile = await getDonorProfile(donor.donorId);
          setDonorProfile(profile);
        }
        getProfile();
    }, []);

    return (
        <>
        <div style={{paddingBottom: 10}}>
            <Tooltip title="Go Back">
                <Button type="text" icon={<StepBackwardOutlined />}  onClick={() =>history.push({
                    pathname: "/donors",
                    state: { tab: props.location.state.donorType },
                        })}>
                </Button>
            </Tooltip>
        </div>
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
                <TimelineCard profile={donorProfile}></TimelineCard>
                </Col>
                <Col span={8}>
                    <Card title="Stats" bordered={false}>
                        <Statistic title="Total Donations:" value={donorProfile?.totalDonations} />
                        <Statistic
                            title="Total Amount:"
                            value={donorProfile?.totalAmountDonated}
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

function TimelineCard(props) {
    
    const timelineItem = props?.profile?.donationHistory.map((date) =>
        <Timeline.Item>Donated on {new Date(date).toLocaleString("en-US")}</Timeline.Item>
    );


    return(
        <Card title="Donation History" bordered={false}>
            {timelineItem}
        </Card>
    );
}
