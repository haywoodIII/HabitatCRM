import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {states} from '../data/geo';

const { Option } = Select

export function DonorsContactDrawer(props) {

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>
        <PlusOutlined /> New Contact
      </Button>
      <Drawer
        title="Add a New Contact"
        width={720}
        onClose={() => setVisible(false)}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
          </div>
        }
      >
        <DonorsContactForm addDonorContact={props.addDonorContact}/>
      </Drawer>
    </>
  );
}

function DonorsContactForm(props) {
  
  const [form] = Form.useForm();

  const statesSelect = states.map((states) => 
  <Option key={states.short} value={states.short}>{states.name}</Option>
  );
  
  return (
    <Form form={form} layout="vertical" hideRequiredMark onFinish={props.addDonorContact}>
      <Row gutter={16}>

        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter contact name' }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name='age' label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber  min={0} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='email' label="Email" rules={[{ type: 'email', required: true }]}>
            <Input placeholder="Enter email"/>
          </Form.Item>
        </Col>

      <Col span={12}>
      <Form.Item name="tags" label="Relationship">
            <Input placeholder="Enter Relationship to Contact" />
          </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
            label="Street"
            name='street'
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input placeholder="Enter street" />
          </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
            label='City'
            name='city'
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input placeholder="Enter City" />
          </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
            label='State'
            name='state'
            rules={[{ required: true, message: 'State is required' }]}
          >
          <Select 
            showSearch 
            style={{ width: 200 }}
            placeholder="Enter State" 
            optionFilterProp="children"  
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
          {statesSelect}
        </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label='Zip'
          name='zip'
          rules={[{ required: true, message: 'Zip is required' }]}
        >
          <Input placeholder="Enter Zip" maxLength={5}/>
        </Form.Item>
      </Col>
    </Row>
    
    <Form.Item>
    <Button type="primary" htmlType="submit" style={{ marginTop: 20, marginRight: 10}}>
            Submit
      </Button>

      <Button type="dashed" onClick={() => form.resetFields()} style={{ marginTop: 20 }}>
          Reset
      </Button>

    </Form.Item>

  </Form>
  );
}