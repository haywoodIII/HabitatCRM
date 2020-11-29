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
            {props.text}
        </Button>
        <Modal
            title={props.text}
            visible={donorsModalVisible}
            onCancel={handleDonorsModalCancel}
            footer={[
            <Button key="back" onClick={handleDonorsModalCancel}>
                Return
            </Button>,
            ]}
        >
            <DonorsForm initialValues={props.initialValues} addDonor={props.addDonor} text={props.text}/>
        </Modal>
      </>
    );
}