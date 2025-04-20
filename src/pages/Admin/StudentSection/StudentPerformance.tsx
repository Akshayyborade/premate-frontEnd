import React, { useState } from 'react';
import {
  Card,
  Table,
  Select,
  Space,
  Typography,
  Progress,
  Row,
  Col,
  Statistic,
  Tabs,
} from 'antd';
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  BookOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface StudentPerformanceData {
  id: string;
  name: string;
  grade: string;
  section: string;
  subjects: {
    [key: string]: {
      marks: number;
      totalMarks: number;
      percentage: number;
    };
  };
  overallPerformance: number;
  rank: number;
  attendance: number;
}

const StudentPerformance: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');

  // Mock data
  const students: StudentPerformanceData[] = [
    {
      id: '1',
      name: 'John Doe',
      grade: '10',
      section: 'A',
      subjects: {
        Mathematics: { marks: 85, totalMarks: 100, percentage: 85 },
        Science: { marks: 92, totalMarks: 100, percentage: 92 },
        English: { marks: 88, totalMarks: 100, percentage: 88 },
      },
      overallPerformance: 88.33,
      rank: 1,
      attendance: 95,
    },
    // Add more mock data as needed
  ];

  const columns: ColumnsType<StudentPerformanceData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'Mathematics',
      dataIndex: ['subjects', 'Mathematics', 'percentage'],
      key: 'mathematics',
      render: (value: number) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 75 ? 'success' : value >= 50 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: 'Science',
      dataIndex: ['subjects', 'Science', 'percentage'],
      key: 'science',
      render: (value: number) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 75 ? 'success' : value >= 50 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: 'English',
      dataIndex: ['subjects', 'English', 'percentage'],
      key: 'english',
      render: (value: number) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 75 ? 'success' : value >= 50 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: 'Overall',
      dataIndex: 'overallPerformance',
      key: 'overall',
      render: (value: number) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 75 ? 'success' : value >= 50 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (value: number) => (
        <Space>
          <TrophyOutlined style={{ color: '#ffc107' }} />
          {value}
        </Space>
      ),
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      width: 120,
      render: (value: number) => `${value}%`,
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={3}>Student Performance</Title>

        <Row gutter={24}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Class Average"
                value={82.5}
                suffix="%"
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Top Performer"
                value={95.8}
                suffix="%"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Most Improved"
                value={15.2}
                prefix={<RiseOutlined />}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Needs Improvement"
                value={8}
                prefix={<FallOutlined />}
                suffix="students"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        <Space style={{ marginBottom: 16 }}>
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
        </Space>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Performance Overview" key="1">
            <Table
              columns={columns}
              dataSource={students}
              rowKey="id"
              scroll={{ x: 1000 }}
              pagination={{
                total: students.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
            />
          </TabPane>
          <TabPane tab="Subject Analysis" key="2">
            {/* Add subject-wise analysis charts here */}
          </TabPane>
          <TabPane tab="Progress Report" key="3">
            {/* Add progress report generation here */}
          </TabPane>
        </Tabs>
      </Space>
    </Card>
  );
};

export default StudentPerformance; 