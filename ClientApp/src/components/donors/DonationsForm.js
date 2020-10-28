import React from 'react';
import { Form, 
    InputNumber, 
    Button,
    message } from 'antd';


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        span: 16,
    },
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

export function DonationsForm(){

    const [form] = Form.useForm();

    const onFinish = values => {
        message.success(`Successfully Added ${values.donation.amount} dollar donation!`);
        form.resetFields();
        console.log('Success:', values);
        };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };

    return (
        <Form
        {...layout}
        name="donationsForm"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        form={form}
      >

        <Form.Item label="Amount:" name={['donation', 'amount']} rules={[{ type: 'number', required: true }]}>
            <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{position: "absolute", top: 25}}>
            Submit
          </Button>
        </Form.Item>

      </Form>
    )
}
