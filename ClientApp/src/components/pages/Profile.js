import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import moment from 'moment'
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
    Modal,
    Table,
    Space,
    message } from 'antd';

import { DollarCircleOutlined, ArrowLeftOutlined} from '@ant-design/icons';

import {DonorsContactDrawer} from '../shared/DonorsContactDrawer'
import { getDonorProfile } from '../services/ProfileService'
import * as notesService from '../services/NotesService'
import * as contactsService from '../services/DonorContactsService'
import * as donationsService from '../services/DonationsService'
import { DonationsForm } from '../shared/DonationsForm';
import '../shared/css/Profile.css';


const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const { Column, ColumnGroup } = Table;

export function Profile(props) {
    const donor = props.location.state.donor;
    const campaigns = props.location.state.campaigns;
    const address = donor?.address;
    const fullAddress = `${address.street} ${address.city}, ${address.state} ${address.zip}`;

    const[donorProfile, setDonorProfile] = useState(null);
    const[donorData, setDonorData] = useState(null);
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
            setDonorData(donor);
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

    const updateDonation = donations => {
        const updatedDonor = {...donorData}
        updatedDonor.donations = donations;
        setDonorData(updatedDonor);
      }

    const addDonorContact = async contact => {
        try {
            contact.donorId = donor.donorId;
            await contactsService.addContact(contact);
            setContacts([...contacts, contact]);
            message.success(`Success`);
        } catch (error) {
            message.error('Sorry, something went wrong... contact system administrator')
        }
    }

    const deleteContact = async donorContactId => {
        try {
            await contactsService.deleteContact(donorContactId);
            setContacts(contacts.filter(c => c.donorContactId !== donorContactId));
        } catch (error) {
            message.error('Sorry, something went wrong... contact system administrator')
        }
    }

    const updateContact = async contact => {
        try {
            await contactsService.updateContact(contact);

            var updatedData = contacts.map(e => {
                if (e.donorContactId === contact.donorContactId)
                   return Object.assign({}, contact, {valid:true})
                return e
            });
            message.success(`Success`);
            setContacts(updatedData);
        } catch (error) {
            message.error('Sorry, something went wrong... contact system administrator')
        }
    }

    const cards =  
    <>
        <div className="site-card-wrapper">
            <Row gutter={16} style={{marginTop: 100}}>
                <Col span={8}>
                    <TimelineCard profile={donorProfile} donor={donorData} campaigns={campaigns} updateDonation={updateDonation}></TimelineCard>
                </Col>
                <Col span={8}>
                    <StatsCard donorProfile={donorProfile}/>
                </Col>
                <Col>
                    <Card title="Notes" bordered={false}>
                        <Paragraph maxLength={8000} editable={{ onChange: createOrUpdateOrDeleteNotes }}>{donorNote?.text}</Paragraph>    
                    </Card>  
                </Col>
            </Row>
        </div>

        <Row gutter={16} style={{marginTop: 100}}>
            <Col span={8}>
            <DonorsContactCard 
                    addDonorContact={addDonorContact} 
                    contacts={contacts}
                    deleteContact={deleteContact}
                    updateContact={updateContact}
                    />
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </>
    
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
        
        {loaded 
        ? cards
        : 
        <div className="center-container">
            <Spin/>
        </div>
        }
        </>
    );
}

function DonorsContactCard(props) {

    return (
        <Card title="Contacts" bordered={false}>
            <DonorsContactDrawer 
            addDonorContact={props.addDonorContact} editMode={false}/>
        <List
        dataSource={props.contacts}
        renderItem={contact => (
            <List.Item>
            <List.Item.Meta
                title={<a href="https://ant.design">{`${contact.name}`}</a>}
                description={`Lives at ${contact.street}, ${contact.city}, ${contact.state} ${contact.zip}`}
            />
            {""}
            <Text type="secondary">{`${contact.tags}, ${contact.age ?? ''} ${contact.email ?? ''}`}</Text>
            <br/>
            <DonorsContactDrawer 
                    updateContact={props.updateContact}
                    deleteContact={props.deleteContact}
                    initialValues={contact}
                    editMode={true}
            />
            </List.Item>  
        )}
        />
        </Card>
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
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRow, setSelectedRow]  = useState(false);
    
    const timelineItem = props?.profile?.donationHistory?.map((date) =>
        <Timeline.Item key={date}>
            Donated on {new Date(date).toLocaleDateString("en-US")} 
        </Timeline.Item>
    );

    const setRow = record => {
        setSelectedRow(record);
        record.date = new moment(record?.date)
        record.isUpdated = true;
    }

    const updateDonation = async donation => {
        const updatedCampaign = props.campaigns.filter(c => c.campaignId === donation.campaignId);
        const updatedDonor = props.donor?.donations.map(el => {
            if (el.donationId === donation.donationId)
            {
                donation.campaign = updatedCampaign[0];
                return {...donation}
            }
            return el
        });
        props.updateDonation(updatedDonor);
    }

    return (
        <>
        <Card title="Donation History" bordered={false}>
            {timelineItem ? timelineItem : "No Donations Entered"}
        </Card>
        <Button onClick={() => setIsModalVisible(true)}>Details</Button>
        <Modal title="Donation Details" 
        visible={isModalVisible} 
        onOk={() => setIsModalVisible(false)} 
        onCancel={() => setIsModalVisible(false)} 
        centered
        width={1000}>
            <DonationsForm selected={selectedRow} 
            campaigns={props.campaigns}
            updateDonation = {updateDonation}
            />
            <Table dataSource={props.donor?.donations} rowKey={r => r.donationId}>
                <Column title="Campaign" dataIndex={["campaign", "name"]} />
                
                <Column 
                title="Amount" 
                dataIndex="amount" 
                render = {amount=> (
                   
                    <span>{`$${amount.toFixed(2)}`}</span>
                  
                    )}/>

                <Column 
                title="Donation Date" 
                dataIndex="date" 
                render = {date => <span>{moment(date).format('MM/DD/YYYY') }</span>}/>
              
                <Column 
                    title='Action' 
                    key='operation'
                    fixed='right'
                    width={100}
                    render = {(_, record) => (
                    <Space size="middle">
                        <Button onClick={() => setRow(record)}>Edit</Button>
                    </Space>
                    )}
                />
            </Table>
        </Modal>
        </>
    );
}


