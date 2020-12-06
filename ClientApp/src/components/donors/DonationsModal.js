import React, { useState }  from 'react';
import { Button, Modal, Divider } from 'antd';
import {DonationsForm} from './DonationsForm'

export function DonationsModal(props) {
    let [modalVisible, setModalVisible] = useState(false);

    const handleModalCancel = e => {
       
        setModalVisible(false);
    };

    return (
        <>
        <Button onClick={() => setModalVisible(true)}>
            Add Donation
        </Button>
        <Modal
            visible={modalVisible}
            onCancel={handleModalCancel}
            footer={[
            <Button key="back" onClick={handleModalCancel}>
                Return
            </Button>,
            ]}
        >
            <h1>{props.initialValues.name}</h1>
            <Divider />
            <DonationsForm donorId={props.initialValues.donorId} campaigns={props.campaigns}/>
        </Modal>
      </>
    );
}