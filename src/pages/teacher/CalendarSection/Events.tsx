import React, { useState } from 'react';
import {
  Card,
  Table,
  Space,
  Typography,
  Tag,
  Button,
  Input,
  Select,
  DatePicker,
  Avatar,
  Badge,
  Modal,
  Form,
  message,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  CalendarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface Event {
  id: string;
  title: string;
  type: 'academic' | 'sports' | 'cultural' | 'other';
  date: string;
  time: string;
  location: string;
  organizer: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const Events: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<Event> = [
    {
      title: 'Event Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Avatar icon={<CalendarOutlined />} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Organized by: {record.organizer}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeConfig = {
          academic: { color: 'blue', text: 'Academic' },
          sports: { color: 'green', text: 'Sports' },
          cultural: { color: 'purple', text: 'Cultural' },
          other: { color: 'default', text: 'Other' },
        };
        const config = typeConfig[type];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <CalendarOutlined />
            {dayjs(record.date).format('MMM D, YYYY')}
          </Space>
          <Space>
            <ClockCircleOutlined />
            {record.time}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants) => (
        <Badge count={participants} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          upcoming: { color: 'blue', text: 'Upcoming' },
          ongoing: { color: 'green', text: 'Ongoing' },
          completed: { color: 'default', text: 'Completed' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            View Details
          </Button>
          <Button type="link" size="small">
            Edit
          </Button>
          <Button type="link" size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const mockData: Event[] = [
    {
      id: '1',
      title: 'Science Fair',
      type: 'academic',
      date: '2024-05-15',
      time: '09:00 AM - 03:00 PM',
      location: 'School Auditorium',
      organizer: 'Science Department',
      participants: 150,
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Annual Sports Day',
      type: 'sports',
      date: '2024-06-01',
      time: '08:00 AM - 05:00 PM',
      location: 'School Ground',
      organizer: 'Sports Department',
      participants: 300,
      status: 'upcoming',
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      message.success('Event created successfully!');
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
          <Title level={3}>Events</Title>
          <Space>
            <Input
              placeholder="Search events..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              value={selectedType}
              onChange={setSelectedType}
              style={{ width: 150 }}
            >
              <Option value="all">All Types</Option>
              <Option value="academic">Academic</Option>
              <Option value="sports">Sports</Option>
              <Option value="cultural">Cultural</Option>
              <Option value="other">Other</Option>
            </Select>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: 150 }}
            >
              <Option value="all">All Status</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="ongoing">Ongoing</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add Event
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={mockData}
          loading={loading}
          rowKey="id"
          pagination={{
            total: mockData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />

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
                <Option value="academic">Academic</Option>
                <Option value="sports">Sports</Option>
                <Option value="cultural">Cultural</Option>
                <Option value="other">Other</Option>
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
              <Input placeholder="e.g., 09:00 AM - 03:00 PM" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>

            <Form.Item
              name="organizer"
              label="Organizer"
              rules={[{ required: true, message: 'Please enter organizer' }]}
            >
              <Input placeholder="Enter organizer" />
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

export default Events; 