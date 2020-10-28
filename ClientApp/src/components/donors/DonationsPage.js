import React from 'react';
import { Row, Col } from 'antd';
import { Form, 
    Input, 
    InputNumber, 
    Button,
    message } from 'antd';


const layout = {
    labelCol: {
        span: 5,
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

const onFinish = values => {
    message.success(`Successfully Added ${values.donation.name }!`);
    console.log('Success:', values);
    };

const onFinishFailed = (errorInfo) => {
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

export function DonationsForm(){

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
      >

        <Form.Item label="Amount:" name={['donation', 'amount']} defaultValue={0} rules={[{ type: 'number', required: true }]}>
            <InputNumber
                defaultValue={0}
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




export function DonationsPage() {
    return (   
        <Row>
            <Col span={8}>
                <h2>Add a Donation</h2>
                <br/>
                <DonationsForm></DonationsForm>
            </Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
        </Row>
    )
}