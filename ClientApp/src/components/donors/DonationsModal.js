import React, { useState }  from 'react';
import { Button, Modal } from 'antd';
import {DonorsForm} from './DonorsForm'

export function DonationsModal() {
    let [donorsModalVisible, setDonorsModalVisible] = useState(false);

    const handleDonorsModalCancel = e => {
        console.log(e);
        setDonorsModalVisible(false);
    };

    return (
        <>
        <Button type="primary" onClick={() => setDonorsModalVisible(true)}>
            Add Donor
        </Button>
        <Modal
            title="Add Donors"
            visible={donorsModalVisible}
            onCancel={handleDonorsModalCancel}
            footer={[
            <Button key="back" onClick={handleDonorsModalCancel}>
                Return
            </Button>,
            ]}
        >
            <DonorsForm/>
        </Modal>
      </>
    );
}