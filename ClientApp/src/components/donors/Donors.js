import React, { useState } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import './Donors.css';



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

export function Donors() {

    const [donor, setDonor] = useState(0);

  return (
   <div>
    <h2>Add a Donor</h2>
        <div className="center-container">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'website']} label="Website">
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form >
        </div>
   </div>
  );
}