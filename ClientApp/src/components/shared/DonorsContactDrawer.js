import React, {useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Drawer, 
  Form, 
  Button, 
  Col, 
  Row, 
  Input, 
  Select, 
  InputNumber, 
  Popconfirm,
  Modal } from 'antd';

import {states} from '../data/geo';

const { Option } = Select


export function DonorsContactDrawer(props) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const onDelete = async () => {
    const donor = props.initialValues;
    await props.deleteContact(donor.donorContactId);
  }

  const drawer = (
      <Drawer
        title="Contacts"
        placement="left"
        width={720}
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
          </div>
        }
      >
        <DonorsContactForm 
          closeDrawer={closeDrawer}
          openDrawer={openDrawer}
          addDonorContact={props.addDonorContact} 
          initialValues={props.initialValues}
          updateContact={props.updateContact}
          editMode={props.editMode}/>
      </Drawer>
  );

  const addNewContactDrawer = (
    <>
      <Button onClick={openDrawer}>
        <PlusOutlined /> New Contact
      </Button>
      {drawer}
    </>
  );

  const edititableDrawer = 
  (
    <>
      <Button type="link" onClick={openDrawer}>
              View
      </Button>

      <Popconfirm
        title={'Are you sure delete this?'}
        onConfirm={onDelete}
        okText="Yes"
        cancelText="No"
      >
          <Button type="text" danger>
              Delete
          </Button>
      </Popconfirm>
      {drawer}
    </>
  );

  let contactDrawer;

  if (props.editMode){
    contactDrawer = edititableDrawer;
  } else {
    contactDrawer = addNewContactDrawer;
  }

  return (
    contactDrawer
  );
}

function DonorsContactForm(props) {
  
  const [form] = Form.useForm();

  const onFinish = async donor => {
    if (props.editMode){
      await props.updateContact(donor);
      props.closeDrawer();
    }
    else {
      await props.addDonorContact(donor);
      props.closeDrawer();
    }
  }

  const statesSelect = states.map((states) => 
  <Option key={states.short} value={states.short}>{states.name}</Option>
  );
  
  return (
    <Form form={form} layout="vertical" hideRequiredMark onFinish={onFinish} initialValues={props.initialValues}>
      <Form.Item name='donorContactId' hidden={true}/>
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
          <Form.Item name='email' label="Email" rules={[{ type: 'email', required: false}]}>
            <Input placeholder="Enter email"/>
          </Form.Item>
        </Col>

      <Col span={12}>
      <Form.Item name="tags" label="Relationship"
       rules={[{ required: true, message: 'Please enter Relationship' }]}>
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
            {props.editMode ? "Update" : "Submit"}
      </Button>

      <Button type="dashed" onClick={() => form.resetFields()} style={{ marginTop: 20 }}>
          Reset
      </Button>

    </Form.Item>

  </Form>
  );
}