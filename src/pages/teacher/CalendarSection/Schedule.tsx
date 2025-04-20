import React, { useState } from 'react';
import {
  Card,
  Calendar,
  Select,
  Button,
  Space,
  Typography,
  Tag,
  List,
  Badge,
  Avatar,
  Modal,
  Form,
  Input,
  TimePicker,
} from 'antd';
import {
  PlusOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface ScheduleItem {
  id: string;
  title: string;
  type: 'class' | 'meeting' | 'event';
  startTime: string;
  endTime: string;
  location: string;
  participants?: string[];
  description?: string;
}

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const mockSchedule: Record<string, ScheduleItem[]> = {
    '2024-04-20': [
      {
        id: '1',
        title: 'Mathematics Class',
        type: 'class',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Room 101',
        participants: ['Grade 10A'],
      },
      {
        id: '2',
        title: 'Department Meeting',
        type: 'meeting',
        startTime: '14:00',
        endTime: '15:30',
        location: 'Conference Room',
        participants: ['Math Department'],
      },
    ],
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'blue';
      case 'meeting':
        return 'green';
      case 'event':
        return 'purple';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOutlined />;
      case 'meeting':
        return <TeamOutlined />;
      case 'event':
        return <ClockCircleOutlined />;
      default:
        return null;
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const listData = mockSchedule[dateStr] || [];

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={getTypeColor(item.type) as any}
              text={
                <Space direction="vertical" size={0}>
                  <Text strong>{item.title}</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {item.startTime} - {item.endTime}
                  </Text>
                </Space>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Schedule</Title>
          <Space>
            <Select defaultValue="all" style={{ width: 200 }}>
              <Option value="all">All Events</Option>
              <Option value="class">Classes</Option>
              <Option value="meeting">Meetings</Option>
              <Option value="event">Events</Option>
            </Select>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Event
            </Button>
          </Space>
        </Space>

        <Calendar
          dateCellRender={dateCellRender}
          onSelect={onSelect}
          style={{ width: '100%' }}
        />

        {selectedDate && (
          <Card title={`Schedule for ${selectedDate.format('MMMM D, YYYY')}`}>
            <List
              dataSource={mockSchedule[selectedDate.format('YYYY-MM-DD')] || []}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link">Edit</Button>,
                    <Button type="link" danger>
                      Delete
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={getTypeIcon(item.type)}
                        style={{ backgroundColor: getTypeColor(item.type) }}
                      />
                    }
                    title={
                      <Space>
                        <Text strong>{item.title}</Text>
                        <Tag color={getTypeColor(item.type)}>
                          {item.type.toUpperCase()}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">
                          <ClockCircleOutlined /> {item.startTime} - {item.endTime}
                        </Text>
                        <Text type="secondary">{item.location}</Text>
                        {item.participants && (
                          <Text type="secondary">
                            <TeamOutlined /> {item.participants.join(', ')}
                          </Text>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}

        <Modal
          title="Add New Event"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Event Title"
              rules={[{ required: true, message: 'Please enter event title' }]}
            >
              <Input placeholder="Enter event title" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Event Type"
              rules={[{ required: true, message: 'Please select event type' }]}
            >
              <Select placeholder="Select event type">
                <Option value="class">Class</Option>
                <Option value="meeting">Meeting</Option>
                <Option value="event">Event</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="time"
              label="Time"
              rules={[{ required: true, message: 'Please select time' }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Card>
  );
};

export default Schedule; 