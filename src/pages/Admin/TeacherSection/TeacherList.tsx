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
  Avatar,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  ExportOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Title } = Typography;

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  subjects: string[];
  experience: number;
  rating: number;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simulated API call
    setLoading(true);
    setTimeout(() => {
      const mockData: Teacher[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1 234 567 8901',
          department: 'Computer Science',
          status: 'active',
          subjects: ['Programming', 'Data Structures'],
          experience: 5,
          rating: 4.8,
        },
        // Add more mock data as needed
      ];
      setTeachers(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: Teacher) => {
    // Implement edit functionality
    console.log('Edit teacher:', record);
  };

  const handleDelete = (record: Teacher) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this teacher?',
      content: `This will permanently delete ${record.name}'s records.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Implement delete functionality
        message.success('Teacher deleted successfully');
      },
    });
  };

  const actionMenu = (record: Teacher): MenuProps => ({
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

  const columns: ColumnsType<Teacher> = [
    {
      title: 'Teacher',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <Space>
                <MailOutlined />
                {record.email}
              </Space>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => (
        <Space>
          <PhoneOutlined />
          {text}
        </Space>
      ),
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
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'active':
            color = 'success';
            break;
          case 'inactive':
            color = 'error';
            break;
          case 'on_leave':
            color = 'warning';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status.replace('_', ' ').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Subjects',
      dataIndex: 'subjects',
      key: 'subjects',
      render: (subjects: string[]) => (
        <Space>
          {subjects.map((subject) => (
            <Tag key={subject} color="blue">
              {subject}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (value) => `${value} years`,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (value) => `${value}/5`,
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
          <Title level={3}>Teacher List</Title>
          <Space>
            <Input
              placeholder="Search teachers..."
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
          dataSource={teachers}
          loading={loading}
          rowKey="id"
          pagination={{
            total: teachers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Space>
    </Card>
  );
};

export default TeacherList; 