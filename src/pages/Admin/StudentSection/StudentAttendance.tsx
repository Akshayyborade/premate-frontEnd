import React, { useState } from 'react';
import {
  Card,
  Table,
  DatePicker,
  Select,
  Space,
  Typography,
  Button,
  Tag,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  attendance: 'present' | 'absent' | 'late';
  totalPresent: number;
  totalAbsent: number;
  attendancePercentage: number;
}

const StudentAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      grade: '10',
      section: 'A',
      rollNumber: '1001',
      attendance: 'present',
      totalPresent: 85,
      totalAbsent: 5,
      attendancePercentage: 94.4,
    },
    // Add more mock data as needed
  ];

  const columns: ColumnsType<Student> = [
    {
      title: 'Roll No',
      dataIndex: 'rollNumber',
      key: 'rollNumber',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      width: 100,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      width: 100,
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (status: string) => {
        let color = '';
        let icon = null;
        switch (status) {
          case 'present':
            color = 'success';
            icon = <CheckCircleOutlined />;
            break;
          case 'absent':
            color = 'error';
            icon = <CloseCircleOutlined />;
            break;
          case 'late':
            color = 'warning';
            icon = <CalendarOutlined />;
            break;
          default:
            color = 'default';
        }
        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Total Present',
      dataIndex: 'totalPresent',
      key: 'totalPresent',
      width: 120,
    },
    {
      title: 'Total Absent',
      dataIndex: 'totalAbsent',
      key: 'totalAbsent',
      width: 120,
    },
    {
      title: 'Attendance %',
      dataIndex: 'attendancePercentage',
      key: 'attendancePercentage',
      render: (value: number) => `${value}%`,
      width: 120,
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={3}>Student Attendance</Title>

        <Row gutter={24}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Students"
                value={150}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Present Today"
                value={142}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Absent Today"
                value={8}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Attendance Rate"
                value={94.7}
                suffix="%"
                precision={1}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>

        <Space style={{ marginBottom: 16 }}>
          <DatePicker
            onChange={(date, dateString) => setSelectedDate(dateString)}
            placeholder="Select Date"
          />
          <Select
            placeholder="Select Grade"
            style={{ width: 120 }}
            onChange={(value) => setSelectedGrade(value)}
          >
            <Option value="9">Grade 9</Option>
            <Option value="10">Grade 10</Option>
            <Option value="11">Grade 11</Option>
            <Option value="12">Grade 12</Option>
          </Select>
          <Select
            placeholder="Select Section"
            style={{ width: 120 }}
            onChange={(value) => setSelectedSection(value)}
          >
            <Option value="A">Section A</Option>
            <Option value="B">Section B</Option>
            <Option value="C">Section C</Option>
          </Select>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export Report
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={students}
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

export default StudentAttendance; 