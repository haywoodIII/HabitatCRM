import React, { useState, useEffect } from 'react';
import { Form, 
    InputNumber, 
    DatePicker,
    Button,
    message,
    Select } from 'antd';

import * as donationService from '../services/DonationsService';

const { Option, OptGroup } = Select;

const layout = {
    labelCol: {
        span: 50,
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
    const [isEditMode, isUpdateable]  = useState(false);
  
    useEffect(() => {
        form.setFieldsValue(props.selected)

        if (props.selected?.isUpdated === true){
            isUpdateable(true);
        }

       }, [form, props.selected])

    const onFinish = async donation => {
        if (donation?.isUpdated) {
            await updateDonation(donation);
            props.updateDonation(donation);
        }
        else {
            addDonation(donation);
        }
    }

    const addDonation = async donation => {
        try {
            await donationService.postDonation(props.donorId, donation)
            .then(form.resetFields());
            message.success(`Adding a $${donation.amount} donation`)
        } catch(error){
            message.error('Sorry, something went wrong... contact system administrator');
        }
    }

    const updateDonation = async donation => {
        try {
            await donationService.updateDonation(donation)
            .then(form.resetFields());
            message.success(`Updating donation`)
        } catch(error){
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

        <Form.Item label="Date:" name='date' required={true}>
            <DatePicker />
        </Form.Item>

        <Form.Item label="Campaign:" name='campaignId'>
            <Select
            style={{width: 150}}
            placeholder="Not Required..."
            showSearch
            optionFilterProp="children"
            >
                <>
                {props.campaigns?.map((c) => 
                    <Option key={c.campaignId} value={c.campaignId}>{c.name}</Option>
                )}
                </>
                
            </Select>
        </Form.Item>
  
        <Form.Item {...tailLayout} style={{paddingLeft: 20}}>
          <Button type="primary" htmlType="submit" disabled={!isEditMode}>
            Submit
          </Button>
        </Form.Item>

        <Form.Item name='isUpdated' hidden={true}>
        </Form.Item>

        <Form.Item name='donationId' hidden={true}>
        </Form.Item>

        <Form.Item name='campaign' hidden={true}>
        </Form.Item>

      </Form>
    )
}
