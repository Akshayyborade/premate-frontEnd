import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  message,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  SaveOutlined,
  ClearOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  section: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  parentInfo: {
    name: string;
    email: string;
    phone: string;
    occupation: string;
  };
}

const StudentRegistration: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: StudentFormData) => {
    console.log('Form values:', values);
    message.success('Student registration submitted successfully!');
    form.resetFields();
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={3}>Student Registration</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Title level={4}>Personal Information</Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
                rules={[{ required: true, message: 'Please select date of birth' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender' }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={4}>Academic Information</Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true, message: 'Please select grade' }]}
              >
                <Select placeholder="Select grade">
                  <Option value="9">Grade 9</Option>
                  <Option value="10">Grade 10</Option>
                  <Option value="11">Grade 11</Option>
                  <Option value="12">Grade 12</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="section"
                label="Section"
                rules={[{ required: true, message: 'Please select section' }]}
              >
                <Select placeholder="Select section">
                  <Option value="A">Section A</Option>
                  <Option value="B">Section B</Option>
                  <Option value="C">Section C</Option>
                </Select>
              </Form.Item>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={4}>Address Information</Title>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['address', 'street']}
                label="Street Address"
                rules={[{ required: true, message: 'Please enter street address' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Street Address" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['address', 'city']}
                label="City"
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['address', 'state']}
                label="State"
                rules={[{ required: true, message: 'Please enter state' }]}
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['address', 'zipCode']}
                label="ZIP Code"
                rules={[{ required: true, message: 'Please enter ZIP code' }]}
              >
                <Input placeholder="ZIP Code" />
              </Form.Item>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={4}>Parent/Guardian Information</Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['parentInfo', 'name']}
                label="Parent Name"
                rules={[{ required: true, message: 'Please enter parent name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Parent Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['parentInfo', 'email']}
                label="Parent Email"
                rules={[
                  { required: true, message: 'Please enter parent email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Parent Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['parentInfo', 'phone']}
                label="Parent Phone"
                rules={[{ required: true, message: 'Please enter parent phone' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Parent Phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['parentInfo', 'occupation']}
                label="Parent Occupation"
                rules={[{ required: true, message: 'Please enter parent occupation' }]}
              >
                <Input placeholder="Parent Occupation" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Register Student
              </Button>
              <Button icon={<ClearOutlined />} onClick={() => form.resetFields()}>
                Reset Form
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default StudentRegistration; 