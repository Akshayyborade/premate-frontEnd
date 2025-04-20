import React, { useState } from 'react';
import { Card, Table, Tag, Typography, Select, Row, Col, Progress, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { Option } = Select;

interface PerformanceData {
  id: string;
  teacherName: string;
  subject: string;
  class: string;
  attendance: number;
  studentFeedback: number;
  assessmentScore: number;
  overallRating: number;
}

const TeacherPerformance = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');

  const performanceData: PerformanceData[] = [
    {
      id: '1',
      teacherName: 'John Doe',
      subject: 'Mathematics',
      class: 'Grade 10',
      attendance: 95,
      studentFeedback: 4.5,
      assessmentScore: 88,
      overallRating: 4.2,
    },
  ];

  const columns = [
    {
      title: 'Teacher',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance: number) => (
        <Progress percent={attendance} size="small" status={attendance >= 90 ? 'success' : 'normal'} />
      ),
    },
    {
      title: 'Student Feedback',
      dataIndex: 'studentFeedback',
      key: 'studentFeedback',
      render: (rating: number) => (
        <Tag color={rating >= 4 ? 'success' : rating >= 3 ? 'warning' : 'error'}>
          {rating.toFixed(1)}
        </Tag>
      ),
    },
    {
      title: 'Assessment Score',
      dataIndex: 'assessmentScore',
      key: 'assessmentScore',
      render: (score: number) => (
        <Tag color={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'}>
          {score}%
        </Tag>
      ),
    },
    {
      title: 'Overall Rating',
      dataIndex: 'overallRating',
      key: 'overallRating',
      render: (rating: number) => (
        <Tag color={rating >= 4 ? 'success' : rating >= 3 ? 'warning' : 'error'}>
          {rating.toFixed(1)}
        </Tag>
      ),
    },
  ];

  const chartData = [
    { name: 'Jan', performance: 4.2 },
    { name: 'Feb', performance: 4.5 },
    { name: 'Mar', performance: 4.3 },
    { name: 'Apr', performance: 4.6 },
    { name: 'May', performance: 4.4 },
    { name: 'Jun', performance: 4.7 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Teacher Performance</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            value={selectedTeacher}
            onChange={setSelectedTeacher}
            placeholder="Select Teacher"
          >
            <Option value="all">All Teachers</Option>
            <Option value="1">John Doe</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select Time Range"
          >
            <Option value="week">Last Week</Option>
            <Option value="month">Last Month</Option>
            <Option value="quarter">Last Quarter</Option>
            <Option value="year">Last Year</Option>
          </Select>
        </Col>
      </Row>

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Performance Overview</Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="performance" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={performanceData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default TeacherPerformance; 