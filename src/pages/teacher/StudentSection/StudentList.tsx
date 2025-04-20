import React, { useState } from 'react';
import {
  Table,
  Card,
  Space,
  Typography,
  Tag,
  Button,
  Input,
  Select,
  Avatar,
  Badge,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BookOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  grade: string;
  subjects: string[];
  attendance: number;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

const StudentList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const columns: ColumnsType<Student> = [
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.studentId}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <MailOutlined />
            {record.email}
          </Space>
          <Space>
            <PhoneOutlined />
            {record.phone}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => <Tag color="blue">{grade}</Tag>,
    },
    {
      title: 'Subjects',
      dataIndex: 'subjects',
      key: 'subjects',
      render: (subjects: string[]) => (
        <Space size={[0, 4]} wrap>
          {subjects.map((subject) => (
            <Tag key={subject} icon={<BookOutlined />}>
              {subject}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance) => (
        <Badge
          count={`${attendance}%`}
          style={{
            backgroundColor: attendance >= 90 ? '#52c41a' : attendance >= 75 ? '#faad14' : '#f5222d',
          }}
        />
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (performance) => {
        const performanceConfig = {
          excellent: { color: 'green', text: 'Excellent' },
          good: { color: 'blue', text: 'Good' },
          average: { color: 'orange', text: 'Average' },
          poor: { color: 'red', text: 'Poor' },
        };
        const config = performanceConfig[performance];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            View Profile
          </Button>
          <Button type="link" size="small">
            Performance
          </Button>
          <Button type="link" size="small">
            Attendance
          </Button>
        </Space>
      ),
    },
  ];

  const mockData: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      studentId: 'ST001',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8901',
      grade: 'Grade 10',
      subjects: ['Mathematics', 'Science', 'English'],
      attendance: 95,
      performance: 'excellent',
    },
    {
      id: '2',
      name: 'Jane Smith',
      studentId: 'ST002',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8902',
      grade: 'Grade 10',
      subjects: ['Mathematics', 'Science', 'History'],
      attendance: 85,
      performance: 'good',
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Student List</Title>
          <Space>
            <Input
              placeholder="Search students..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              value={selectedGrade}
              onChange={setSelectedGrade}
              style={{ width: 150 }}
            >
              <Option value="all">All Grades</Option>
              <Option value="9">Grade 9</Option>
              <Option value="10">Grade 10</Option>
              <Option value="11">Grade 11</Option>
              <Option value="12">Grade 12</Option>
            </Select>
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              style={{ width: 150 }}
            >
              <Option value="all">All Subjects</Option>
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
              <Option value="english">English</Option>
            </Select>
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

export default StudentList; 