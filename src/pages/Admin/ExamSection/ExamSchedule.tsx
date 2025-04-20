import React, { useState } from 'react';
import {
  Card,
  Calendar,
  Select,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  TimePicker,
  DatePicker,
  InputNumber,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface ExamSchedule {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  participants: number;
}

const ExamSchedule: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission
      console.log('Form values:', values);
      message.success('Exam scheduled successfully');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const dateCellRender = (date: Dayjs) => {
    // Add exam indicators to calendar cells
    const formattedDate = date.format('YYYY-MM-DD');
    const hasExam = false; // Replace with actual exam check
    return hasExam ? (
      <div style={{ background: '#e6f7ff', height: '100%' }} />
    ) : null;
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Exam Schedule</Title>
          <Space>
            <Select defaultValue="all" style={{ width: 200 }}>
              <Option value="all">All Subjects</Option>
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
              <Option value="english">English</Option>
            </Select>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Exam
            </Button>
          </Space>
        </Space>

        <Calendar
          onSelect={handleDateSelect}
          dateCellRender={dateCellRender}
          mode="month"
        />

        <Modal
          title="Schedule New Exam"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              date: selectedDate,
              duration: 120,
            }}
          >
            <Form.Item
              name="title"
              label="Exam Title"
              rules={[{ required: true, message: 'Please enter exam title' }]}
            >
              <Input placeholder="Enter exam title" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please select subject' }]}
            >
              <Select placeholder="Select subject">
                <Option value="math">Mathematics</Option>
                <Option value="science">Science</Option>
                <Option value="english">English</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="time"
              label="Time"
              rules={[{ required: true, message: 'Please select time' }]}
            >
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Duration (minutes)"
              rules={[{ required: true, message: 'Please enter duration' }]}
            >
              <InputNumber min={30} max={300} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input placeholder="Enter exam location" />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Card>
  );
};

export default ExamSchedule; 