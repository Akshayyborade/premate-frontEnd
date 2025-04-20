import React from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';

const TeacherForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('Teacher information saved successfully');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter teacher name' }]}
      >
        <Input placeholder="Enter teacher name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please enter phone number' }]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        name="department"
        label="Department"
        rules={[{ required: true, message: 'Please select department' }]}
      >
        <Select placeholder="Select department">
          <Select.Option value="math">Mathematics</Select.Option>
          <Select.Option value="science">Science</Select.Option>
          <Select.Option value="english">English</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="joinDate"
        label="Join Date"
        rules={[{ required: true, message: 'Please select join date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherForm; 