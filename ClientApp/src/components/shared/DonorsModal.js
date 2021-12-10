import React, { useState }  from 'react';
import { Button, Modal } from 'antd';
import {DonorsForm} from './DonorsForm'

export function DonorsModal(props) {
    let [donorsModalVisible, setDonorsModalVisible] = useState(false);

    const handleDonorsModalCancel = e => {
       
        setDonorsModalVisible(false);
    };

    return (
        <>
        <Button onClick={() => setDonorsModalVisible(true)}>
            {props.addOrUpdate}
        </Button>
        <Modal
            title={props.addOrUpdate}
            visible={donorsModalVisible}
            onCancel={handleDonorsModalCancel}
            footer={[
            <Button key="back" onClick={handleDonorsModalCancel}>
                Return
            </Button>,
            ]}
        >
            <DonorsForm initialValues={props.initialValues} 
            addDonor={props.addDonor} 
            updateDonor={props.updateDonor} 
            addOrUpdate={props.addOrUpdate}
            donorType={props.donorType}
            />
        </Modal>
      </>
    );
}