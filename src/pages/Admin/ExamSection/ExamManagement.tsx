import React, { useState } from 'react';
import { Layout, Menu, Card, Typography, Row, Col, Statistic } from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  LineChartOutlined,
  TeamOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Sider, Content } = Layout;

const ExamManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    switch (key) {
      case '1':
        navigate('/admin/exams/list');
        break;
      case '2':
        navigate('/admin/exams/schedule');
        break;
      case '3':
        navigate('/admin/exams/results');
        break;
      case '4':
        navigate('/admin/exams/grades');
        break;
      case '5':
        navigate('/admin/exams/analysis');
        break;
      case '6':
        navigate('/admin/exams/feedback');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="1" icon={<FileTextOutlined />}>
            Exam List
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Schedule
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckCircleOutlined />}>
            Results
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            Grades
          </Menu.Item>
          <Menu.Item key="5" icon={<LineChartOutlined />}>
            Analysis
          </Menu.Item>
          <Menu.Item key="6" icon={<TeamOutlined />}>
            Feedback
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '24px', minHeight: 280 }}>
        <Title level={2}>Exam Management Dashboard</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Upcoming Exams"
                value={5}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Completed Exams"
                value={12}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Average Score"
                value={85}
                prefix={<LineChartOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pass Rate"
                value={92}
                prefix={<ScheduleOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ExamManagement; 