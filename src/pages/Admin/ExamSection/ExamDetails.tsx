import React, { useState, useEffect } from 'react';
import {
  Card,
  Descriptions,
  Typography,
  Space,
  Button,
  Tag,
  Table,
  Progress,
  Statistic,
  Row,
  Col,
  Divider,
  Tabs,
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  BarChartOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface ExamDetails {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  totalMarks: number;
  passingMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: number;
  averageScore?: number;
  highestScore?: number;
  passRate?: number;
}

interface Question {
  id: string;
  question: string;
  marks: number;
  type: 'multiple-choice' | 'short-answer' | 'essay';
}

const ExamDetails: React.FC = () => {
  const [examDetails, setExamDetails] = useState<ExamDetails>({
    id: '1',
    name: 'Midterm Mathematics',
    subject: 'Mathematics',
    date: '2024-03-15',
    time: '09:00 AM',
    duration: '2 hours',
    totalMarks: 100,
    passingMarks: 40,
    status: 'upcoming',
    participants: 45,
    averageScore: 75,
    highestScore: 95,
    passRate: 85,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'Solve the quadratic equation: x² + 5x + 6 = 0',
      marks: 10,
      type: 'short-answer',
    },
    {
      id: '2',
      question: 'What is the derivative of sin(x)?',
      marks: 5,
      type: 'multiple-choice',
    },
    // Add more questions as needed
  ]);

  const questionColumns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'multiple-choice' ? 'blue' : type === 'short-answer' ? 'green' : 'purple'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Marks',
      dataIndex: 'marks',
      key: 'marks',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'blue';
      case 'ongoing':
        return 'orange';
      case 'completed':
        return 'green';
      default:
        return 'default';
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: (
        <Card>
          <Descriptions title="Exam Information" bordered>
            <Descriptions.Item label="Exam Name">{examDetails.name}</Descriptions.Item>
            <Descriptions.Item label="Subject">{examDetails.subject}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(examDetails.status)}>{examDetails.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              <Space>
                <CalendarOutlined />
                {examDetails.date}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Time">
              <Space>
                <ClockCircleOutlined />
                {examDetails.time}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Duration">{examDetails.duration}</Descriptions.Item>
            <Descriptions.Item label="Total Marks">{examDetails.totalMarks}</Descriptions.Item>
            <Descriptions.Item label="Passing Marks">{examDetails.passingMarks}</Descriptions.Item>
            <Descriptions.Item label="Participants">
              <Space>
                <UserOutlined />
                {examDetails.participants}
              </Space>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="Average Score"
                value={examDetails.averageScore}
                suffix="/100"
                prefix={<BarChartOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Highest Score"
                value={examDetails.highestScore}
                suffix="/100"
                prefix={<TrophyOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Pass Rate"
                value={examDetails.passRate}
                suffix="%"
                prefix={<CheckCircleOutlined />}
              />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: '2',
      label: 'Questions',
      children: (
        <Card>
          <Table
            columns={questionColumns}
            dataSource={questions}
            rowKey="id"
            pagination={false}
          />
        </Card>
      ),
    },
    {
      key: '3',
      label: 'Results',
      children: (
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>Performance Overview</Title>
            <Progress
              percent={examDetails.passRate}
              status="active"
              format={(percent) => `${percent}% Pass Rate`}
            />
            <Text type="secondary">
              {examDetails.participants} students participated in this exam
            </Text>
          </Space>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>{examDetails.name}</Title>
          <Space>
            <Button type="primary" icon={<EditOutlined />}>
              Edit Exam
            </Button>
            <Button icon={<DeleteOutlined />} danger>
              Delete Exam
            </Button>
          </Space>
        </Space>

        <Tabs defaultActiveKey="1" items={items} />
      </Space>
    </div>
  );
};

export default ExamDetails; 