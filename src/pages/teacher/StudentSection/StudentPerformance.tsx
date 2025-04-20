import React, { useState } from 'react';
import {
  Card,
  Space,
  Typography,
  Select,
  Table,
  Progress,
  Avatar,
  Row,
  Col,
  Statistic,
  Button,
  DatePicker,
  Tag,
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  LineChartOutlined,
  TrophyOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface PerformanceRecord {
  id: string;
  subject: string;
  examType: string;
  date: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  rank: number;
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  overallPerformance: number;
  attendance: number;
  examsTaken: number;
  averageScore: number;
}

const StudentPerformance: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');

  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      studentId: 'ST001',
      grade: 'Grade 10',
      overallPerformance: 85,
      attendance: 95,
      examsTaken: 5,
      averageScore: 82,
    },
    {
      id: '2',
      name: 'Jane Smith',
      studentId: 'ST002',
      grade: 'Grade 10',
      overallPerformance: 92,
      attendance: 98,
      examsTaken: 5,
      averageScore: 90,
    },
  ];

  const mockPerformanceData: PerformanceRecord[] = [
    {
      id: '1',
      subject: 'Mathematics',
      examType: 'Midterm',
      date: '2024-03-15',
      totalMarks: 100,
      obtainedMarks: 85,
      grade: 'A',
      rank: 3,
    },
    {
      id: '2',
      subject: 'Science',
      examType: 'Final',
      date: '2024-04-20',
      totalMarks: 100,
      obtainedMarks: 90,
      grade: 'A+',
      rank: 1,
    },
  ];

  const columns: ColumnsType<PerformanceRecord> = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => (
        <Space>
          <BookOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Exam Type',
      dataIndex: 'examType',
      key: 'examType',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {dayjs(date).format('MMM D, YYYY')}
        </Space>
      ),
    },
    {
      title: 'Marks',
      key: 'marks',
      render: (_, record) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Progress
            percent={Math.round((record.obtainedMarks / record.totalMarks) * 100)}
            size="small"
            status={
              record.obtainedMarks / record.totalMarks >= 0.9
                ? 'success'
                : record.obtainedMarks / record.totalMarks >= 0.7
                ? 'normal'
                : 'exception'
            }
          />
          <Text>
            {record.obtainedMarks}/{record.totalMarks}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => (
        <Tag color={grade === 'A+' ? 'green' : grade === 'A' ? 'blue' : 'orange'}>
          {grade}
        </Tag>
      ),
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank) => (
        <Tag icon={<TrophyOutlined />} color={rank === 1 ? 'gold' : 'default'}>
          {rank}
        </Tag>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Student Performance</Title>
          <Space>
            <Select
              value={selectedStudent}
              onChange={setSelectedStudent}
              style={{ width: 200 }}
            >
              <Option value="all">All Students</Option>
              {mockStudents.map((student) => (
                <Option key={student.id} value={student.id}>
                  {student.name}
                </Option>
              ))}
            </Select>
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              style={{ width: 150 }}
            >
              <Option value="all">All Subjects</Option>
              <Option value="math">Mathematics</Option>
              <Option value="science">Science</Option>
              <Option value="english">English</Option>
            </Select>
            <Select
              value={selectedTimeRange}
              onChange={setSelectedTimeRange}
              style={{ width: 150 }}
            >
              <Option value="all">All Time</Option>
              <Option value="month">This Month</Option>
              <Option value="quarter">This Quarter</Option>
              <Option value="year">This Year</Option>
            </Select>
          </Space>
        </Space>

        <Row gutter={[16, 16]}>
          {mockStudents.map((student) => (
            <Col span={12} key={student.id}>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <Title level={4}>{student.name}</Title>
                      <Text type="secondary">
                        {student.studentId} • {student.grade}
                      </Text>
                    </div>
                  </Space>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic
                        title="Overall Performance"
                        value={student.overallPerformance}
                        suffix="%"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Attendance"
                        value={student.attendance}
                        suffix="%"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Average Score"
                        value={student.averageScore}
                        suffix="%"
                      />
                    </Col>
                  </Row>

                  <Progress
                    percent={student.overallPerformance}
                    status={
                      student.overallPerformance >= 90
                        ? 'success'
                        : student.overallPerformance >= 70
                        ? 'normal'
                        : 'exception'
                    }
                  />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Table
          columns={columns}
          dataSource={mockPerformanceData}
          rowKey="id"
          pagination={{
            total: mockPerformanceData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Space>
    </Card>
  );
};

export default StudentPerformance; 