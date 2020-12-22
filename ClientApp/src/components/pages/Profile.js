import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
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
    Typography,
    Spin, 
    List,
    message } from 'antd';

import { DollarCircleOutlined, ArrowLeftOutlined} from '@ant-design/icons';

import {DonorsContactDrawer} from '../shared/DonorsContactDrawer'
import { getDonorProfile } from '../services/ProfileService'
import * as notesService from '../services/NotesService'
import * as contactsService from '../services/DonorContactsService'

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

export function Profile(props) {
    const donor = props.location.state.donor;
    const address = donor?.address;
    const fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zip}`;

    const[donorProfile, setDonorProfile] = useState(null);
    const [donorNote, setDonorNote] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();
  
    useEffect(() => {
        async function getPageLoadData() {
            let [profile, note, contacts] = await Promise.allSettled([
                getDonorProfile(donor.donorId), 
                notesService.getNote(donor.donorId),
                contactsService.getContacts(donor.donorId)
            ]);
            setLoaded(true);
            setDonorNote(note.value);  
            setDonorProfile(profile.value);
            setContacts(contacts.value);
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
        else { // Updated Note
            const updatedNote = { text: text, noteId: donorNote.noteId };
            await notesService.updateNote(updatedNote)
            .then(setDonorNote(updatedNote));
        }

    };

    const addDonorContact = async contact => {
        try {
            contact.donorId = donor.donorId;
            await contactsService.addContact(contact);
            setContacts([...contacts, contact]);
            message.success(`Welcome ${contact.name}`);
        } catch (error) {
            message.error('Sorry, something went wrong... contact system administrator')
        }
    }

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
                {loaded 
                ? <TimelineCard profile={donorProfile}></TimelineCard>
                : <Spin/>
                } 
                </Col>

                <Col span={8}>
                {loaded
                ? <StatsCard donorProfile={donorProfile}/>
                : <Spin/>
                }
                </Col>

                <Col>
                {loaded
                ? <DonorsContactCard addDonorContact={addDonorContact} contacts={contacts}/>
                : <Spin/>
                }
                    
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

function DonorsContactCard(props) {

    return (
        <>
        <Card title="Contacts" bordered={false}>
               <DonorsContactDrawer addDonorContact={props.addDonorContact}/>
        </Card>
        <List
        itemLayout="horizontal"
        dataSource={props.contacts}
        renderItem={contact => (
            <List.Item>
            <List.Item.Meta
                title={<a href="https://ant.design">{`${contact.name} ${contact.age ?? ''}`}</a>}
                description={`Lives at ${contact.street}, ${contact.city}, ${contact.state} ${contact.zip}`}
            />
            { contact.tags && contact.tags }
            </List.Item>
        )}
        />
        </>
    )
}

function StatsCard(props) {
    return (
    <Card title="Stats" bordered={false}>
        <Statistic title="Total Donations:" value={props.donorProfile?.totalDonations} />
        <Statistic
            title="Total Amount:"
            value={props.donorProfile?.totalAmountDonated}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<DollarCircleOutlined style={{verticalAlign: "baseline"}}/>}
        />
    </Card>
    )
}

function TimelineCard(props) {
    
    const timelineItem = props?.profile?.donationHistory?.map((date) =>
        <Timeline.Item key={date}>Donated on {new Date(date).toLocaleDateString("en-US")}</Timeline.Item>
    );

    return (
        <Card title="Donation History" bordered={false}>
            {timelineItem ? timelineItem : "No Donations Entered"}
        </Card>
    );
}
