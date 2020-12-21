import React from 'react';
import { Form, 
  Input, 
  InputNumber, 
  Button,
  Select,
  message } from 'antd';
import './css/Donors.css';
import {states} from '../data/geo';
import * as donorsService from '../services/DonorsService';

const { Option } = Select;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
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
      name='gender'
      label="Gender"
  
      rules={[
        {
          required: false,
        },
      ]}
    >
      <Select
        placeholder="Select..."
        allowClear
      >
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
        <Option value="Other">Other</Option>
      </Select>
    </Form.Item>
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => prevValues !== currentValues}
    >
      {({ getFieldValue }) => {
        return getFieldValue('gender') === 'Other' ? (
          <Form.Item
            name='genderOther'
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
      <Form.Item label="Address" required={true}>
      <Form.Item name={['address', 'addressId']} hidden={true}/>
      <Input.Group>
        <Form.Item
          name={['address', 'street']}
          noStyle
          rules={[{ required: true, message: 'Street is required' }]}
        >
          <Input placeholder="Input street" />
        </Form.Item>

        <Form.Item
          name={['address', 'city']}
          noStyle
          rules={[{ required: true, message: 'City is required' }]}
        >
          <Input placeholder="Input City" />
        </Form.Item>

        <Form.Item
          initialValue="New York"
          name={['address', 'state']}
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
          name={['address', 'zip']}
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

export function DonorsForm(props) {
  
  const [form] = Form.useForm();

  const onFinish = async donor => {

    donor.type = props.donorType;
    
    if (props.addOrUpdate == "Add") {
      try {
          await donorsService.postDonor(donor)
          .then(form.resetFields());
          props.addDonor(donor);
          message.success(`Adding ${donor.name}`);
      } catch(error) {
          message.error('Sorry, something went wrong... contact system administrator');
        }

    } else if (props.addOrUpdate == "Update") {

      try {
            const updatedDonor = await donorsService.updateDonor(donor)
            props.updateDonor(updatedDonor); 
            message.success(`Updating ${donor.name}`);
      } catch(error) {
        message.error('Sorry, something went wrong... contact system administrator');
      }  
    };
  }


  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish} validateMessages={validateMessages} initialValues={props.initialValues}>
      <Form.Item name='donorId' hidden={true}/>
      <Form.Item name='name' label="Name" rules={[{ required: true }]}>
          <Input />
      </Form.Item>
      <Form.Item name='email' label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
      </Form.Item>
      
      {props.donorType === "Individual" &&
      <Form.Item name='age' label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber  min={0}/>
      </Form.Item>
      }

      <AddressSelect/>

      {props.donorType === "Individual" &&
        <GenderSelect/>
      }
    
      <Form.Item
      name='phone'
      label="Phone Number"
      rules={[{ required: true, message: 'Please input your phone number!'}]}
      >
      <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
          Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>Reset</Button>

      </Form.Item>

    </Form >
    
  );
}