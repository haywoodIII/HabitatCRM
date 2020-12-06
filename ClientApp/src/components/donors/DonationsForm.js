import React from 'react';
import { Form, 
    InputNumber, 
    Button,
    message,
    Select } from 'antd';
import { postDonation } from './services/DonationsService';
import { useMsal } from "@azure/msal-react";

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
    const { instance } = useMsal();

    const onFinish = async donation => {
        await postDonation(props.donorId, donation, instance)
        .then(form.resetFields())
        .catch((error) => {
            message.error('Sorry, something went wrong... contact system administrator')
          });
          message.success("Donation added!")
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

        <Form.Item label="Amount:" name={['amount']} rules={[{ type: 'number', required: true }]}>
            <InputNumber
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
        </Form.Item>

        <Form.Item label="Campaign:" name={['donation', 'campaign']}>
            <Select style={{ width: 120 }}
            placeholder="Not Required..."
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            >
                <Option value="guid1">No Campaign</Option>
                <Option value="guid2">5k</Option>
                <Option value="guid3">Women's Build</Option>
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
