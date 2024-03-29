﻿import React from 'react';
import { Form, 
    InputNumber, 
    Button,
    message,
    Select } from 'antd';

import { postDonation } from '../services/DonationsService';

const { Option, OptGroup } = Select;

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

export function DonationsForm(props){

    const [form] = Form.useForm();

    const onFinish = async donation => {
        try {
            await postDonation(props.donorId, donation)
            .then(form.resetFields());
            message.success(`Adding a $${donation.amount} donation`)
        }catch(error){
            message.error('Sorry, something went wrong... contact system administrator');
        }
    }
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

        <Form.Item label="Amount:" name='amount' rules={[{ type: 'number', required: true }]}>
            <InputNumber
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
        </Form.Item>

        <Form.Item label="Campaign:" name='campaignId'>
            <Select style={{ width: 120 }}
            placeholder="Not Required..."
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            >
                <>
                {props.campaigns?.map((c) => 
                    <Option key={c.campaignId} value={c.campaignId}>{c.name}</Option>
                )}
                </>
                
            </Select>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{position: "absolute", top: 25}}>
            Submit
          </Button>
        </Form.Item>

      </Form>
    )
}
