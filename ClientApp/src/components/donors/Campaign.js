import React, { useState }  from 'react';
import { Button, Modal, message, Form, Input, DatePicker} from 'antd';

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select a date range!' }],
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function CampaignForm() {

  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);

   
  const onFinish = (values) => {
    values.startDate = values.rangePicker[0].format('YYYY-MM-DD')
    values.endDate = values.rangePicker[1].format('YYYY-MM-DD')
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`New Campaign Added!`);
      form.resetFields();
    }, 3000);
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
      name="campaignName"
      rules={[{ required: true, message: 'Please input a campaign name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item name="rangePicker" label="Date Range" {...rangeConfig}>
      <RangePicker />
    </Form.Item>

    <Form.Item >
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>

        <Button htmlType="button" onClick={() => form.resetFields()} style={{marginLeft: 10}}>
          Reset
      </Button>

      </Form.Item>

  </Form>
  );
}


export function CampaignModal() {
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
        <CampaignForm />
        </Modal>
      </>
    );
}