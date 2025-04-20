import React, { useState } from 'react';
import {
  Card,
  Table,
  Select,
  Space,
  Typography,
  Button,
  Tag,
  Modal,
  message,
  Input,
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  PlusOutlined,
  ExportOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Enrollment {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  courseCode: string;
  status: 'enrolled' | 'waitlisted' | 'dropped';
  enrollmentDate: string;
}

const CourseEnrollment: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock data
  const enrollments: Enrollment[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'S001',
      course: 'Introduction to Computer Science',
      courseCode: 'CS101',
      status: 'enrolled',
      enrollmentDate: '2024-01-15',
    },
    // Add more mock data as needed
  ];

  const handleEnroll = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // Implement enrollment logic
    message.success('Student enrolled successfully');
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<Enrollment> = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (text) => (
        <Space>
          <BookOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Course Code',
      dataIndex: 'courseCode',
      key: 'courseCode',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'enrolled':
            color = 'success';
            break;
          case 'waitlisted':
            color = 'warning';
            break;
          case 'dropped':
            color = 'error';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Enrollment Date',
      dataIndex: 'enrollmentDate',
      key: 'enrollmentDate',
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Course Enrollment</Title>
          <Space>
            <Input
              placeholder="Search students..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Select Course"
              style={{ width: 200 }}
              onChange={(value) => setSelectedCourse(value)}
            >
              <Option value="cs101">CS101 - Introduction to Computer Science</Option>
              <Option value="math101">MATH101 - Calculus I</Option>
              <Option value="phy101">PHY101 - Physics I</Option>
            </Select>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleEnroll}>
              Enroll Student
            </Button>
            <Button icon={<ExportOutlined />}>Export</Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={enrollments}
          rowKey="id"
          pagination={{
            total: enrollments.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />

        <Modal
          title="Enroll Student"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Select
              placeholder="Select Student"
              style={{ width: '100%' }}
              showSearch
            >
              <Option value="s001">John Doe (S001)</Option>
              <Option value="s002">Jane Smith (S002)</Option>
            </Select>
            <Select
              placeholder="Select Course"
              style={{ width: '100%' }}
              showSearch
            >
              <Option value="cs101">CS101 - Introduction to Computer Science</Option>
              <Option value="math101">MATH101 - Calculus I</Option>
              <Option value="phy101">PHY101 - Physics I</Option>
            </Select>
          </Space>
        </Modal>
      </Space>
    </Card>
  );
};

export default CourseEnrollment; 