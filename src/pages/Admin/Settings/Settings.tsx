import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Space,
  Typography,
  Divider,
  Tabs,
  Row,
  Col,
  Upload,
  message,
  InputNumber,
} from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  NotificationOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  MailOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

interface SettingsForm {
  schoolName: string;
  schoolCode: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  timezone: string;
  dateFormat: string;
  language: string;
  enableNotifications: boolean;
  enableEmailAlerts: boolean;
  enableSMSAlerts: boolean;
  backupFrequency: string;
  maxLoginAttempts: number;
  sessionTimeout: number;
}

const Settings: React.FC = () => {
  const [form] = Form.useForm<SettingsForm>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SettingsForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Settings saved successfully');
    } catch (error) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General Settings',
      icon: <SettingOutlined />,
      children: (
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              schoolName: 'Premate School',
              schoolCode: 'PS001',
              timezone: 'UTC+5:30',
              dateFormat: 'DD/MM/YYYY',
              language: 'en',
              enableNotifications: true,
              enableEmailAlerts: true,
              enableSMSAlerts: false,
              backupFrequency: 'daily',
              maxLoginAttempts: 5,
              sessionTimeout: 30,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="schoolName"
                  label="School Name"
                  rules={[{ required: true, message: 'Please enter school name' }]}
                >
                  <Input placeholder="Enter school name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="schoolCode"
                  label="School Code"
                  rules={[{ required: true, message: 'Please enter school code' }]}
                >
                  <Input placeholder="Enter school code" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea rows={3} placeholder="Enter school address" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="website"
              label="Website"
              rules={[{ required: true, message: 'Please enter website URL' }]}
            >
              <Input placeholder="Enter website URL" />
            </Form.Item>

            <Divider orientation="left">Regional Settings</Divider>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="timezone"
                  label="Timezone"
                  rules={[{ required: true, message: 'Please select timezone' }]}
                >
                  <Select placeholder="Select timezone">
                    <Option value="UTC+5:30">UTC+5:30 (IST)</Option>
                    <Option value="UTC+0">UTC+0 (GMT)</Option>
                    <Option value="UTC-5">UTC-5 (EST)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="dateFormat"
                  label="Date Format"
                  rules={[{ required: true, message: 'Please select date format' }]}
                >
                  <Select placeholder="Select date format">
                    <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                    <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                    <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="language"
                  label="Language"
                  rules={[{ required: true, message: 'Please select language' }]}
                >
                  <Select placeholder="Select language">
                    <Option value="en">English</Option>
                    <Option value="es">Spanish</Option>
                    <Option value="fr">French</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">Notification Settings</Divider>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="enableNotifications"
                  label="Enable Notifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="enableEmailAlerts"
                  label="Email Alerts"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="enableSMSAlerts"
                  label="SMS Alerts"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">Security Settings</Divider>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="maxLoginAttempts"
                  label="Maximum Login Attempts"
                  rules={[{ required: true, message: 'Please enter maximum login attempts' }]}
                >
                  <InputNumber min={3} max={10} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sessionTimeout"
                  label="Session Timeout (minutes)"
                  rules={[{ required: true, message: 'Please enter session timeout' }]}
                >
                  <InputNumber min={15} max={120} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">Backup Settings</Divider>

            <Form.Item
              name="backupFrequency"
              label="Backup Frequency"
              rules={[{ required: true, message: 'Please select backup frequency' }]}
            >
              <Select placeholder="Select backup frequency">
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: '2',
      label: 'User Management',
      icon: <UserOutlined />,
      children: (
        <Card>
          <Title level={4}>User Management Settings</Title>
          <Text>Configure user roles, permissions, and access controls.</Text>
          {/* Add user management settings here */}
        </Card>
      ),
    },
    {
      key: '3',
      label: 'System Backup',
      icon: <CloudUploadOutlined />,
      children: (
        <Card>
          <Title level={4}>System Backup</Title>
          <Text>Manage system backups and data export.</Text>
          {/* Add backup settings here */}
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={2}>Settings</Title>
        <Tabs defaultActiveKey="1" items={items} />
      </Space>
    </div>
  );
};

export default Settings; 