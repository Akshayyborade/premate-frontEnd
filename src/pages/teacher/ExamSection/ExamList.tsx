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
  DatePicker,
  Avatar,
  Badge,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: string;
  totalMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  students: number;
}

const ExamList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const columns: ColumnsType<Exam> = [
    {
      title: 'Exam Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Avatar icon={<FileTextOutlined />} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.subject}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <ClockCircleOutlined />
          {dayjs(date).format('MMM D, YYYY h:mm A')}
        </Space>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
      render: (marks) => <Tag color="blue">{marks} marks</Tag>,
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

  const mockData: Exam[] = [
    {
      id: '1',
      title: 'Mathematics Midterm',
      subject: 'Mathematics',
      date: '2024-04-25T09:00:00',
      duration: '2 hours',
      totalMarks: 100,
      status: 'upcoming',
      students: 25,
    },
    {
      id: '2',
      title: 'Science Final',
      subject: 'Science',
      date: '2024-04-28T10:00:00',
      duration: '3 hours',
      totalMarks: 150,
      status: 'upcoming',
      students: 30,
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Exam List</Title>
          <Space>
            <Input
              placeholder="Search exams..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              style={{ width: 150 }}
            >
              <Option value="all">All Subjects</Option>
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
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
            <Button type="primary" icon={<PlusOutlined />}>
              Create Exam
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

export default ExamList; 