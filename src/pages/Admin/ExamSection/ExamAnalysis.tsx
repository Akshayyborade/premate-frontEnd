import React, { useState, useEffect } from 'react';
import {
  Card,
  Select,
  Row,
  Col,
  Typography,
  Statistic,
  Progress,
  Table,
  Space,
  Button,
} from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ExportOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface PerformanceData {
  name: string;
  score: number;
  average: number;
}

interface GradeDistribution {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ExamAnalysis: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('midterm');
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [gradeDistribution, setGradeDistribution] = useState<GradeDistribution[]>(
    []
  );

  useEffect(() => {
    // Simulated API call for performance data
    const mockPerformanceData: PerformanceData[] = [
      { name: 'Jan', score: 85, average: 75 },
      { name: 'Feb', score: 78, average: 72 },
      { name: 'Mar', score: 92, average: 80 },
      { name: 'Apr', score: 88, average: 78 },
      { name: 'May', score: 95, average: 82 },
    ];

    // Simulated API call for grade distribution
    const mockGradeDistribution: GradeDistribution[] = [
      { name: 'A', value: 30 },
      { name: 'B', value: 45 },
      { name: 'C', value: 15 },
      { name: 'D', value: 7 },
      { name: 'F', value: 3 },
    ];

    setPerformanceData(mockPerformanceData);
    setGradeDistribution(mockGradeDistribution);
  }, []);

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (value: number) => (
        <span style={{ color: value >= 0 ? '#3f8600' : '#cf1322' }}>
          {value >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {Math.abs(value)}%
        </span>
      ),
    },
  ];

  const data = [
    { metric: 'Average Score', value: '85%', change: 5 },
    { metric: 'Pass Rate', value: '92%', change: 2 },
    { metric: 'Top Score', value: '98%', change: 0 },
    { metric: 'Participation', value: '95%', change: -1 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Exam Analysis</Title>
          <Space>
            <Select
              value={selectedExam}
              onChange={setSelectedExam}
              style={{ width: 200 }}
            >
              <Option value="midterm">Midterm Exams</Option>
              <Option value="final">Final Exams</Option>
              <Option value="quiz">Quizzes</Option>
            </Select>
            <Button type="primary" icon={<ExportOutlined />}>
              Export Report
            </Button>
          </Space>
        </Space>

        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Average Score"
                value={85}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pass Rate"
                value={92}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Highest Score"
                value={98}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Participation"
                value={95}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Card title="Performance Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    name="Class Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="#82ca9d"
                    name="School Average"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Grade Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Card title="Performance Metrics">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="metric"
          />
        </Card>
      </Space>
    </div>
  );
};

export default ExamAnalysis; 