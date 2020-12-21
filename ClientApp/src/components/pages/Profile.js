import React, {useEffect, useState} from 'react';
import { 
    Descriptions, 
    Timeline, 
    Card, 
    Row, 
    Col, 
    Statistic, 
    Button, 
    Tooltip,
    Input,
    Typography } from 'antd';

import { DollarCircleOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import {getDonorProfile} from '../services/ProfileService'
import * as notesService from '../services/NotesService'

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export function Profile(props) {
    const donor = props.location.state.donor;
    const address = donor?.address;
    const fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zip}`;

    const[donorProfile, setDonorProfile] = useState(null);

    const [donorNote, setDonorNote] = useState(null);
    const history = useHistory();
  
    useEffect(() => {
        async function getPageLoadData() {
            let [profile, note] = await Promise.allSettled([getDonorProfile(donor.donorId), notesService.getNote(donor.donorId)]);
            setDonorNote(note.value);  
            setDonorProfile(profile.value);
        }
        getPageLoadData();
    }, []);

    const createOrUpdateOrDeleteNotes = async text => {
 
        const newNote = !donorNote?.text ?? text;
        const existingNote = donorNote?.text;
        const deletedNote = existingNote && !text;
        
        if (newNote) {
            const newNote = { text: text, donorId: donor.donorId };
            const r = await notesService.addNote(newNote)
            setDonorNote({...newNote, noteId: r.noteId});
        }
        else if (deletedNote) {
            const deletedNote = null;
            await notesService.deleteNote(donorNote.noteId)
            .then(setDonorNote(deletedNote))
        }
        else {
            const updatedNote = { text: text, noteId: donorNote.noteId };
            await notesService.updateNote(updatedNote)
            .then(setDonorNote(updatedNote));
        }

    };

    return (
        <>
        <div style={{paddingBottom: 10}}>
            <Tooltip title="Go Back">
                <Button type="text" icon={<ArrowLeftOutlined />}  onClick={() =>history.push({
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

        <Row gutter={16} style={{marginTop: 100}}>
            <Col span={8}>
                <Card title="Notes" bordered={false}>
                    <Paragraph maxLength={8000} editable={{ onChange: createOrUpdateOrDeleteNotes }}>{donorNote?.text}</Paragraph>    
                </Card>
            </Col>

            <Col span={8}>

            </Col>
        </Row>
        </>
    );
}

function TimelineCard(props) {
    
    const timelineItem = props?.profile?.donationHistory?.map((date) =>
        <Timeline.Item key={date}>Donated on {new Date(date).toLocaleDateString("en-US")}</Timeline.Item>
    );

    return(
        <Card title="Donation History" bordered={false}>
            {timelineItem ? timelineItem : "No Donations Entered"}
        </Card>
    );
}
