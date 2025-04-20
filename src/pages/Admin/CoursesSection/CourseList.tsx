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
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  BookOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Title } = Typography;

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  department: string;
  status: 'active' | 'inactive';
  students: number;
  capacity: number;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simulated API call
    setLoading(true);
    setTimeout(() => {
      const mockData: Course[] = [
        {
          id: '1',
          name: 'Introduction to Computer Science',
          code: 'CS101',
          instructor: 'John Smith',
          department: 'Computer Science',
          status: 'active',
          students: 45,
          capacity: 50,
        },
        // Add more mock data as needed
      ];
      setCourses(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: Course) => {
    // Implement edit functionality
    console.log('Edit course:', record);
  };

  const handleDelete = (record: Course) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this course?',
      content: `This will permanently delete ${record.name}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Implement delete functionality
        message.success('Course deleted successfully');
      },
    });
  };

  const actionMenu = (record: Course): MenuProps => ({
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

  const columns: ColumnsType<Course> = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <BookOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Course Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Enrollment',
      key: 'enrollment',
      render: (_, record) => `${record.students}/${record.capacity}`,
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
          <Title level={3}>Course List</Title>
          <Space>
            <Input
              placeholder="Search courses..."
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
          dataSource={courses}
          loading={loading}
          rowKey="id"
          pagination={{
            total: courses.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Space>
    </Card>
  );
};

export default CourseList; 