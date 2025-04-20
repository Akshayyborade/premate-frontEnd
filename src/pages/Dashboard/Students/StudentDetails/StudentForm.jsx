import React from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';

const StudentForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('Student information saved successfully');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'Please enter first name' }]}
      >
        <Input placeholder="Enter first name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: 'Please enter last name' }]}
      >
        <Input placeholder="Enter last name" />
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
        name="grade"
        label="Grade"
        rules={[{ required: true, message: 'Please select grade' }]}
      >
        <Select placeholder="Select grade">
          <Select.Option value="9">Grade 9</Select.Option>
          <Select.Option value="10">Grade 10</Select.Option>
          <Select.Option value="11">Grade 11</Select.Option>
          <Select.Option value="12">Grade 12</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="enrollmentDate"
        label="Enrollment Date"
        rules={[{ required: true, message: 'Please select enrollment date' }]}
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

export default StudentForm; 