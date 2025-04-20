import React, { useState } from 'react';
import { Layout, Menu, Card, Typography, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Sider, Content } = Layout;

const StudentManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    switch (key) {
      case '1':
        navigate('/admin/students/list');
        break;
      case '2':
        navigate('/admin/students/registration');
        break;
      case '3':
        navigate('/admin/students/attendance');
        break;
      case '4':
        navigate('/admin/students/performance');
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
            Student List
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            Registration
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckCircleOutlined />}>
            Attendance
          </Menu.Item>
          <Menu.Item key="4" icon={<LineChartOutlined />}>
            Performance
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '24px', minHeight: 280 }}>
        <Title level={2}>Student Management Dashboard</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Students"
                value={256}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Present Today"
                value={240}
                prefix={<CheckCircleOutlined />}
                suffix="/ 256"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Average Performance"
                value={85}
                prefix={<LineChartOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="New Admissions"
                value={12}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default StudentManagement; 