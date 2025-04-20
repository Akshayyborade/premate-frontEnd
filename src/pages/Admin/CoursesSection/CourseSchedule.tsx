import React, { useState } from 'react';
import {
  Card,
  Calendar,
  Select,
  Space,
  Typography,
  Button,
  Table,
  Tag,
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Schedule {
  id: string;
  course: string;
  instructor: string;
  room: string;
  time: string;
  days: string[];
  students: number;
}

const CourseSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  // Mock data
  const schedules: Schedule[] = [
    {
      id: '1',
      course: 'Introduction to Computer Science',
      instructor: 'John Smith',
      room: 'Room 101',
      time: '9:00 AM - 10:30 AM',
      days: ['Monday', 'Wednesday', 'Friday'],
      students: 45,
    },
    // Add more mock data as needed
  ];

  const columns: ColumnsType<Schedule> = [
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (text) => (
        <Space>
          <CalendarOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text) => (
        <Space>
          <ClockCircleOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
      render: (days: string[]) => (
        <Space>
          {days.map((day) => (
            <Tag key={day} color="blue">
              {day}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Course Schedule</Title>
          <Space>
            <Select
              placeholder="Select Department"
              style={{ width: 200 }}
              onChange={(value) => setSelectedDepartment(value)}
            >
              <Option value="computer_science">Computer Science</Option>
              <Option value="mathematics">Mathematics</Option>
              <Option value="physics">Physics</Option>
            </Select>
            <Button type="primary" icon={<ExportOutlined />}>
              Export Schedule
            </Button>
          </Space>
        </Space>

        <Calendar
          onSelect={(date) => setSelectedDate(date.format('YYYY-MM-DD'))}
        />

        <Table
          columns={columns}
          dataSource={schedules}
          rowKey="id"
          pagination={{
            total: schedules.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Space>
    </Card>
  );
};

export default CourseSchedule; 