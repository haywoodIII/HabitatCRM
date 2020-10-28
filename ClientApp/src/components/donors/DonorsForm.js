import React, { useState } from 'react';
import { Form, 
  Input, 
  InputNumber, 
  Button,
  Select,
  message } from 'antd';
import './Donors.css';
import {states} from '../data/geo'


const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = values => {
    values.donor.gender = values.gender === 'other' ? values.genderOther : values.gender
    message.success(`Successfully Added ${values.donor.name }!`);
    console.log('Success:', values);
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

function GenderSelect() {
  return (
    <div >           
      <Form.Item
      name="gender"
      label="Gender"
  
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        placeholder="Select..."
        allowClear
      >
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
    >
      {({ getFieldValue }) => {
        return getFieldValue("gender") === 'other' ? (
          <Form.Item
            name="genderOther"
            label="Enter Gender: "
            rules ={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : null;
      }}
    </Form.Item>
  </div>
    
  );
}

function AddressSelect() {
  const statesSelect = states.map((states) => 
  <Option key={states.short} value={states.short}>{states.name}</Option>
);
  
  return(
    <div>
      <Form.Item label="Address" >
      <Input.Group>
        <Form.Item
          name={['donor', 'address', 'street']}
          noStyle
          rules={[{ required: true, message: 'Street is required' }]}
        >
          <Input placeholder="Input street" />
        </Form.Item>

        <Form.Item
          name={['donor', 'address', 'city']}
          noStyle
          rules={[{ required: true, message: 'City is required' }]}
        >
          <Input placeholder="Input City" />
        </Form.Item>

        <Form.Item
          name={['donor', 'address', 'state']}
          noStyle
          rules={[{ required: true, message: 'State is required' }]}
        >
        <Select 
          showSearch 
          style={{ width: 200 }}
          placeholder="Select State" 
          optionFilterProp="children"  
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {statesSelect}
        </Select>
        </Form.Item>

        <Form.Item
          name={['donor', 'address', 'zip']}
          noStyle
          rules={[{ required: true, message: 'Zip is required' }]}
        >
          <Input placeholder="Input Zip" maxLength={5}/>
        </Form.Item>
        
      </Input.Group>
    </Form.Item>
  </div>
  );
}

export function DonorsForm() {

  return (
   <div>
    <h2>Add a Donor</h2>
        <div className="center-container">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item name={['donor', 'name']} label="Name" rules={[{ required: true }]}>
                  <Input />
              </Form.Item>
              <Form.Item name={['donor', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                  <Input />
              </Form.Item>
              <Form.Item name={['donor', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                  <InputNumber />
              </Form.Item>
              <AddressSelect/>
              <GenderSelect/>
              <Form.Item
                name={['donor', 'type']} 
                label="Donor Type:"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select..."
                  allowClear
                >
                  <Option value={0}>Individual</Option>
                  <Option value={1}>Business</Option>
                </Select>
              </Form.Item>

              <Form.Item
              name={['donor', 'phone']} 
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number!'}]}
              >
        <Input style={{ width: '100%' }} />
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