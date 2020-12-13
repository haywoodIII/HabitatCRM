import React, { useState }  from 'react';
import { Button, Modal, Form, Input, DatePicker, InputNumber} from 'antd';
import {uuidv4} from '../services/HelpersService';

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select a date range!' }],
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function CampaignForm(props) {

  const [form] = Form.useForm();

  const onFinish = async (campaign) => {
    const startDate = campaign.rangePicker[0].format('YYYY-MM-DD');
    const endDate = campaign.rangePicker[1].format('YYYY-MM-DD');
    const campaignId = uuidv4()
    
    await props.addCampaign(
      {goal: campaign.goal, 
        name: campaign.name, 
        campaignId: campaignId,
        startDate: startDate, 
        endDate: endDate
      })
    .then(form.resetFields());
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
    {...layout}
    form={form}
    name="basic"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Campaign Name"
      name="name"
      rules={[{ required: true, message: 'Please input a campaign name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Goal"
      name="goal"
      rules={[{ required: true, message: 'Please input a campaign goal!' }]}
    >
      <InputNumber
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
      />
    </Form.Item>

    <Form.Item name="rangePicker" label="Date Range" {...rangeConfig}>
      <RangePicker />
    </Form.Item>

    <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

        <Button htmlType="button" onClick={() => form.resetFields()} style={{marginLeft: 10}}>
          Reset
      </Button>

      </Form.Item>

  </Form>
  );
}


export function CampaignModal(props) {
    let [modalVisible, setModalVisible] = useState(false);
  
    const handleModalCancel = e => {
        setModalVisible(false); 
    };

    return (
        <>
        <Button onClick={() => setModalVisible(true)}>
            Add Campaign
        </Button>
        <Modal
            title='Add Campaign'
            visible={modalVisible}
            onCancel={handleModalCancel}
            footer={[
            <Button key="back" onClick={handleModalCancel}>
                Return
            </Button>,
            ]}
        >
        <CampaignForm addCampaign={props.addCampaign} campaigns={props.campaigns}/>
        </Modal>
      </>
    );
}