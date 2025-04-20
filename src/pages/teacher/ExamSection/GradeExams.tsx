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
  InputNumber,
  Progress,
  Avatar,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface StudentExam {
  id: string;
  studentName: string;
  studentId: string;
  examTitle: string;
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  status: 'graded' | 'pending';
  submissionDate: string;
}

const GradeExams: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const columns: ColumnsType<StudentExam> = [
    {
      title: 'Student',
      dataIndex: 'studentName',
      key: 'studentName',
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
      title: 'Exam',
      dataIndex: 'examTitle',
      key: 'examTitle',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.subject}</div>
        </div>
      ),
    },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      render: (date) => (
        <Space>
          <ClockCircleOutlined />
          {date}
        </Space>
      ),
    },
    {
      title: 'Marks',
      key: 'marks',
      render: (_, record) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Progress
            percent={Math.round((record.obtainedMarks / record.totalMarks) * 100)}
            size="small"
            status={record.status === 'graded' ? 'success' : 'normal'}
          />
          <Space>
            <InputNumber
              min={0}
              max={record.totalMarks}
              value={record.obtainedMarks}
              onChange={(value) => {
                // Here you would typically update the marks in your backend
                console.log('Updating marks for student:', record.id, 'to:', value);
              }}
              disabled={record.status === 'graded'}
            />
            <span>/ {record.totalMarks}</span>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          graded: { color: 'green', icon: <CheckCircleOutlined />, text: 'Graded' },
          pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
        };
        const config = statusConfig[status];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            disabled={record.status === 'graded'}
            onClick={() => {
              // Here you would typically submit the grade to your backend
              console.log('Submitting grade for student:', record.id);
            }}
          >
            Submit Grade
          </Button>
          <Button type="link" size="small">
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const mockData: StudentExam[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'ST001',
      examTitle: 'Mathematics Midterm',
      subject: 'Mathematics',
      totalMarks: 100,
      obtainedMarks: 0,
      status: 'pending',
      submissionDate: '2024-04-20',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'ST002',
      examTitle: 'Mathematics Midterm',
      subject: 'Mathematics',
      totalMarks: 100,
      obtainedMarks: 85,
      status: 'graded',
      submissionDate: '2024-04-20',
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Grade Exams</Title>
          <Space>
            <Input
              placeholder="Search students..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              value={selectedExam}
              onChange={setSelectedExam}
              style={{ width: 200 }}
            >
              <Option value="all">All Exams</Option>
              <Option value="math-midterm">Mathematics Midterm</Option>
              <Option value="science-final">Science Final</Option>
            </Select>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: 150 }}
            >
              <Option value="all">All Status</Option>
              <Option value="graded">Graded</Option>
              <Option value="pending">Pending</Option>
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

export default GradeExams; 