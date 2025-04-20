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
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Title } = Typography;

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  status: 'active' | 'inactive';
  attendance: number;
  performance: number;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simulated API call
    setLoading(true);
    setTimeout(() => {
      const mockData: Student[] = [
        {
          id: '1',
          name: 'John Doe',
          grade: '10',
          section: 'A',
          rollNumber: '1001',
          status: 'active',
          attendance: 95,
          performance: 85,
        },
        // Add more mock data as needed
      ];
      setStudents(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: Student) => {
    // Implement edit functionality
    console.log('Edit student:', record);
  };

  const handleDelete = (record: Student) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this student?',
      content: `This will permanently delete ${record.name}'s records.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Implement delete functionality
        message.success('Student deleted successfully');
      },
    });
  };

  const actionMenu = (record: Student): MenuProps => ({
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

  const columns: ColumnsType<Student> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filtered: true,
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      filters: [
        { text: '9', value: '9' },
        { text: '10', value: '10' },
        { text: '11', value: '11' },
        { text: '12', value: '12' },
      ],
      onFilter: (value, record) => record.grade === value,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Roll Number',
      dataIndex: 'rollNumber',
      key: 'rollNumber',
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
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance: number) => `${attendance}%`,
      sorter: (a, b) => a.attendance - b.attendance,
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (performance: number) => `${performance}%`,
      sorter: (a, b) => a.performance - b.performance,
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
          <Title level={3}>Student List</Title>
          <Space>
            <Input
              placeholder="Search students..."
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
          dataSource={students}
          loading={loading}
          rowKey="id"
          pagination={{
            total: students.length,
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