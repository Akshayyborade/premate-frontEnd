import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Input,
  Button,
  Space,
  Tag,
  Modal,
  message,
  Typography,
  Dropdown,
  Badge,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExportOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  BookOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Title } = Typography;

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  totalMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: number;
}

const ExamList: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simulated API call
    setLoading(true);
    setTimeout(() => {
      const mockData: Exam[] = [
        {
          id: '1',
          name: 'Midterm Mathematics',
          subject: 'Mathematics',
          date: '2024-03-15',
          time: '09:00 AM',
          duration: '2 hours',
          totalMarks: 100,
          status: 'upcoming',
          participants: 45,
        },
        // Add more mock data as needed
      ];
      setExams(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: Exam) => {
    // Implement edit functionality
    console.log('Edit exam:', record);
  };

  const handleDelete = (record: Exam) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this exam?',
      content: `This will permanently delete ${record.name}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Implement delete functionality
        message.success('Exam deleted successfully');
      },
    });
  };

  const actionMenu = (record: Exam): MenuProps => ({
    items: [
      {
        key: '1',
        icon: <EditOutlined />,
        label: 'Edit',
        onClick: () => handleEdit(record),
      },
      {
        key: '2',
        icon: <DeleteOutlined />,
        label: 'Delete',
        danger: true,
        onClick: () => handleDelete(record),
      },
    ],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'processing';
      case 'ongoing':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Exam> = [
    {
      title: 'Exam Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <Space>
              <BookOutlined />
              {record.subject}
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <CalendarOutlined />
            {record.date}
          </Space>
          <Space>
            <ClockCircleOutlined />
            {record.time}
          </Space>
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={getStatusColor(status)} text={status.toUpperCase()} />
      ),
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
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
            />
            <Button type="primary" icon={<ExportOutlined />}>
              Export
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={exams}
          loading={loading}
          rowKey="id"
          pagination={{
            total: exams.length,
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