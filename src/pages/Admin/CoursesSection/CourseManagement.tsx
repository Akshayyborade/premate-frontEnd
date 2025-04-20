import React, { useState } from 'react';
import { Layout, Menu, Card, Typography, Row, Col, Statistic } from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Sider, Content } = Layout;

const CourseManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    switch (key) {
      case '1':
        navigate('/admin/courses/list');
        break;
      case '2':
        navigate('/admin/courses/create');
        break;
      case '3':
        navigate('/admin/courses/schedule');
        break;
      case '4':
        navigate('/admin/courses/enrollment');
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
          <Menu.Item key="1" icon={<BookOutlined />}>
            Course List
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            Create Course
          </Menu.Item>
          <Menu.Item key="3" icon={<ScheduleOutlined />}>
            Course Schedule
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            Student Enrollment
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '24px', minHeight: 280 }}>
        <Title level={2}>Course Management Dashboard</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Courses"
                value={24}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Courses"
                value={20}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Students"
                value={450}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Average Enrollment"
                value={18.75}
                precision={2}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CourseManagement; 