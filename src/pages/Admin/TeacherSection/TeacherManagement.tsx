import React, { useState } from 'react';
import { Layout, Menu, Card, Typography, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  LineChartOutlined,
  TeamOutlined,
  CalendarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Sider, Content } = Layout;

const TeacherManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    switch (key) {
      case '1':
        navigate('/admin/teachers/list');
        break;
      case '2':
        navigate('/admin/teachers/register');
        break;
      case '3':
        navigate('/admin/teachers/performance');
        break;
      case '4':
        navigate('/admin/teachers/leave');
        break;
      case '5':
        navigate('/admin/teachers/qualifications');
        break;
      case '6':
        navigate('/admin/teachers/communication');
        break;
      case '7':
        navigate('/admin/teachers/training');
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
          <Menu.Item key="1" icon={<UserOutlined />}>
            Teacher List
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            Registration
          </Menu.Item>
          <Menu.Item key="3" icon={<LineChartOutlined />}>
            Performance
          </Menu.Item>
          <Menu.Item key="4" icon={<CalendarOutlined />}>
            Leave Management
          </Menu.Item>
          <Menu.Item key="5" icon={<BookOutlined />}>
            Qualifications
          </Menu.Item>
          <Menu.Item key="6" icon={<TeamOutlined />}>
            Communication
          </Menu.Item>
          <Menu.Item key="7" icon={<CheckCircleOutlined />}>
            Training
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '24px', minHeight: 280 }}>
        <Title level={2}>Teacher Management Dashboard</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Teachers"
                value={45}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Teachers"
                value={42}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="On Leave"
                value={3}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Average Rating"
                value={4.5}
                precision={1}
                prefix={<LineChartOutlined />}
                suffix="/5"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TeacherManagement; 