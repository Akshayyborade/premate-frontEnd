import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface TeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  gradeLevels: string[];
  joinDate: string;
  qualifications: string;
  experience: string;
  photo: any;
}

const TeacherRegistration = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: TeacherFormData) => {
    setLoading(true);
    try {
      // Handle form submission
      console.log('Form values:', values);
      message.success('Teacher registered successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to register teacher');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Teacher Registration</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            subjects: [],
            gradeLevels: [],
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subjects"
            name="subjects"
            rules={[{ required: true, message: 'Please select subjects!' }]}
          >
            <Select mode="multiple" placeholder="Select subjects">
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
              <Option value="english">English</Option>
              <Option value="history">History</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Grade Levels"
            name="gradeLevels"
            rules={[{ required: true, message: 'Please select grade levels!' }]}
          >
            <Select mode="multiple" placeholder="Select grade levels">
              <Option value="grade1">Grade 1</Option>
              <Option value="grade2">Grade 2</Option>
              <Option value="grade3">Grade 3</Option>
              <Option value="grade4">Grade 4</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Join Date"
            name="joinDate"
            rules={[{ required: true, message: 'Please select join date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Qualifications"
            name="qualifications"
            rules={[{ required: true, message: 'Please input qualifications!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true, message: 'Please input experience!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Photo"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="photo" listType="picture">
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register Teacher
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TeacherRegistration; 