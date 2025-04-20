import React, { useState } from 'react';
import {
  Table,
  Card,
  Space,
  Typography,
  Tag,
  Button,
  Select,
  DatePicker,
  Avatar,
  Badge,
  Tooltip,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  SearchOutlined,
  ExportOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface AttendanceRecord {
  id: string;
  studentName: string;
  studentId: string;
  status: 'present' | 'absent' | 'late';
  date: string;
  remarks?: string;
}

const ClassAttendance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const columns: ColumnsType<AttendanceRecord> = [
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          present: { color: 'green', icon: <CheckCircleOutlined />, text: 'Present' },
          absent: { color: 'red', icon: <CloseCircleOutlined />, text: 'Absent' },
          late: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Late' },
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      render: (remarks) => remarks || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
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

  const mockData: AttendanceRecord[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'ST001',
      status: 'present',
      date: '2024-04-20',
      remarks: 'On time',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'ST002',
      status: 'late',
      date: '2024-04-20',
      remarks: 'Arrived 10 minutes late',
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Class Attendance</Title>
          <Space>
            <Select
              value={selectedClass}
              onChange={setSelectedClass}
              style={{ width: 200 }}
            >
              <Option value="all">All Classes</Option>
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
            </Select>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date || dayjs())}
            />
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
            <Button icon={<ExportOutlined />}>Export</Button>
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

export default ClassAttendance; 