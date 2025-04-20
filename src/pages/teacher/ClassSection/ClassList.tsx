import React, { useState } from 'react';
import {
  Table,
  Card,
  Space,
  Typography,
  Tag,
  Button,
  Input,
  Avatar,
  Badge,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Class {
  id: string;
  name: string;
  subject: string;
  grade: string;
  students: number;
  schedule: string;
  status: 'active' | 'completed';
}

const ClassList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const columns: ColumnsType<Class> = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.subject}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      render: (students) => (
        <Badge count={students} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (schedule) => (
        <Space>
          <ClockCircleOutlined />
          {schedule}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link">View Details</Button>
          <Button type="link">Attendance</Button>
        </Space>
      ),
    },
  ];

  const mockData: Class[] = [
    {
      id: '1',
      name: 'Mathematics Class A',
      subject: 'Mathematics',
      grade: 'Grade 10',
      students: 25,
      schedule: 'Mon, Wed, Fri 9:00 AM',
      status: 'active',
    },
    {
      id: '2',
      name: 'Science Class B',
      subject: 'Science',
      grade: 'Grade 9',
      students: 30,
      schedule: 'Tue, Thu 10:00 AM',
      status: 'active',
    },
    // Add more mock data as needed
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>My Classes</Title>
          <Space>
            <Input
              placeholder="Search classes..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button type="primary" icon={<PlusOutlined />}>
              Add Class
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
      </Space>
    </Card>
  );
};

export default ClassList; 