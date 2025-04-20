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
} from 'antd';
import {
  PlusOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface ScheduleItem {
  id: string;
  title: string;
  subject: string;
  time: string;
  location: string;
  students: number;
  type: 'class' | 'meeting' | 'exam';
}

const ClassSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const mockSchedule: Record<string, ScheduleItem[]> = {
    '2024-04-20': [
      {
        id: '1',
        title: 'Mathematics Class',
        subject: 'Mathematics',
        time: '09:00 AM - 10:30 AM',
        location: 'Room 101',
        students: 25,
        type: 'class',
      },
      {
        id: '2',
        title: 'Science Class',
        subject: 'Science',
        time: '11:00 AM - 12:30 PM',
        location: 'Room 102',
        students: 30,
        type: 'class',
      },
    ],
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'blue';
      case 'meeting':
        return 'green';
      case 'exam':
        return 'red';
      default:
        return 'default';
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
                    {item.time}
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

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Class Schedule</Title>
          <Space>
            <Select defaultValue="all" style={{ width: 200 }}>
              <Option value="all">All Classes</Option>
              <Option value="mathematics">Mathematics</Option>
              <Option value="science">Science</Option>
            </Select>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Schedule
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
                    <Button type="link">View Details</Button>,
                    <Button type="link">Edit</Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.type === 'class' ? (
                            <BookOutlined />
                          ) : item.type === 'meeting' ? (
                            <UserOutlined />
                          ) : (
                            <ClockCircleOutlined />
                          )
                        }
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
                          <ClockCircleOutlined /> {item.time}
                        </Text>
                        <Text type="secondary">
                          <UserOutlined /> {item.students} students
                        </Text>
                        <Text type="secondary">{item.location}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </Space>
    </Card>
  );
};

export default ClassSchedule; 