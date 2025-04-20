import React from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
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
  BookOutlined,
  UserOutlined,
  SaveOutlined,
  ClearOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface CourseFormData {
  name: string;
  code: string;
  description: string;
  instructor: string;
  department: string;
  capacity: number;
  credits: number;
  prerequisites: string[];
  schedule: {
    days: string[];
    time: string;
    room: string;
  };
}

const CourseCreate: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: CourseFormData) => {
    console.log('Form values:', values);
    message.success('Course created successfully!');
    form.resetFields();
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={3}>Create New Course</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Title level={4}>Basic Information</Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Course Name"
                rules={[{ required: true, message: 'Please enter course name' }]}
              >
                <Input prefix={<BookOutlined />} placeholder="Course Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Course Code"
                rules={[{ required: true, message: 'Please enter course code' }]}
              >
                <Input placeholder="Course Code" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <TextArea rows={4} placeholder="Course Description" />
              </Form.Item>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={4}>Course Details</Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instructor"
                rules={[{ required: true, message: 'Please select instructor' }]}
              >
                <Select placeholder="Select Instructor">
                  <Option value="john_smith">John Smith</Option>
                  <Option value="jane_doe">Jane Doe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please select department' }]}
              >
                <Select placeholder="Select Department">
                  <Option value="computer_science">Computer Science</Option>
                  <Option value="mathematics">Mathematics</Option>
                  <Option value="physics">Physics</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Class Capacity"
                rules={[{ required: true, message: 'Please enter capacity' }]}
              >
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="credits"
                label="Credits"
                rules={[{ required: true, message: 'Please enter credits' }]}
              >
                <InputNumber min={1} max={6} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={4}>Schedule Information</Title>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['schedule', 'days']}
                label="Days"
                rules={[{ required: true, message: 'Please select days' }]}
              >
                <Select mode="multiple" placeholder="Select Days">
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['schedule', 'time']}
                label="Time"
                rules={[{ required: true, message: 'Please enter time' }]}
              >
                <Input placeholder="e.g., 9:00 AM - 10:30 AM" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['schedule', 'room']}
                label="Room"
                rules={[{ required: true, message: 'Please enter room' }]}
              >
                <Input placeholder="Room Number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Create Course
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

export default CourseCreate; 