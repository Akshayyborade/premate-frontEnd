import React, { useState, useEffect } from 'react';
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
  Modal,
  Avatar,
  Tag,
  Tooltip,
  Popconfirm,
  Table,
  DatePicker,
  Badge,
  List,
  Statistic,
  Progress
} from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  NotificationOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  MailOutlined,
  CloudUploadOutlined,
  LockOutlined,
  TeamOutlined,
  BellOutlined,
  FileOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HistoryOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { User, Role, SystemSetting, AuditLog, Notification, DashboardStats } from './types';
import { adminService } from './services.ts';
import { PERMISSIONS, USER_ROLES, SETTING_TYPES, TABLE_PAGE_SIZE, DATE_FORMAT } from './constants.ts';
import './Settings.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface UserForm {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface RoleForm {
  name: string;
  permissions: string[];
  description: string;
}

interface SettingForm {
  key: string;
  value: string;
  type: 'number' | 'boolean' | 'text';
  description: string;
}

const Settings: React.FC = () => {
  const [form] = Form.useForm<UserForm | RoleForm | SettingForm>();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'user' | 'role' | 'setting'>('user');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([]);

  // Fetch initial data
  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
    fetchRoles();
    fetchSettings();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, logsData, notificationsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAuditLogs(),
        adminService.getNotifications()
      ]);
      setStats(statsData);
      setAuditLogs(logsData);
      setNotifications(notificationsData);
    } catch (error) {
      message.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await adminService.getUsers();
      setUsers(usersData);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesData = await adminService.getRoles();
      setRoles(rolesData);
    } catch (error) {
      message.error('Failed to fetch roles');
    }
  };

  const fetchSettings = async () => {
    try {
      const settingsData = await adminService.getSettings();
      setSystemSettings(settingsData);
    } catch (error) {
      message.error('Failed to fetch settings');
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const showModal = (type: 'user' | 'role' | 'setting', item?: User | Role | SystemSetting) => {
    setModalType(type);
    setSelectedItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (selectedItem) {
        // Update existing item
        if (modalType === 'user') {
          await adminService.updateUser(selectedItem.id, values as Partial<UserForm>);
        } else if (modalType === 'role') {
          await adminService.updateRole(selectedItem.id, values as Partial<RoleForm>);
        } else {
          await adminService.updateSetting(selectedItem.id, values as Partial<SettingForm>);
        }
        message.success(`${modalType} updated successfully`);
      } else {
        // Add new item
        if (modalType === 'user') {
          await adminService.createUser(values as UserForm);
        } else if (modalType === 'role') {
          await adminService.createRole(values as RoleForm);
        } else {
          await adminService.createSetting(values as SettingForm);
        }
        message.success(`${modalType} added successfully`);
      }
      
      setIsModalVisible(false);
      form.resetFields();
      fetchDashboardData();
    } catch (error) {
      message.error('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id: string, type: 'user' | 'role' | 'setting') => {
    try {
      setLoading(true);
      if (type === 'user') {
        await adminService.deleteUser(id);
      } else if (type === 'role') {
        await adminService.deleteRole(id);
      } else {
        await adminService.deleteSetting(id);
      }
      message.success(`${type} deleted successfully`);
      fetchDashboardData();
    } catch (error) {
      message.error('Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      await adminService.markNotificationAsRead(id);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      message.error('Failed to mark notification as read');
    }
  };

  const userColumns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: User) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary">{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'ADMIN' ? 'red' : role === 'TEACHER' ? 'blue' : 'green'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="link" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => showModal('user', record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id, 'user')}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const roleColumns = [
    {
      title: 'Role',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Tag color={name === 'ADMIN' ? 'red' : name === 'TEACHER' ? 'blue' : 'green'}>
          {name}
        </Tag>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.map((permission, index) => (
            <Tag key={index}>{permission}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Role) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => showModal('role', record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => handleDelete(record.id, 'role')}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const settingColumns = [
    {
      title: 'Setting',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: SystemSetting) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => showModal('setting', record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this setting?"
            onConfirm={() => handleDelete(record.id, 'setting')}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
            // onFinish={onFinish}
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

  const onFinish = async (values: UserForm | RoleForm | SettingForm) => {
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

  return (
    <div className="settings-container">
      <Title level={2}>Admin Settings</Title>
      
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab={<span><UserOutlined /> User Management</span>} key="1">
          <Card>
            <div className="table-header">
              <Title level={4}>Users</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('user')}>
                Add User
              </Button>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: TABLE_PAGE_SIZE }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><TeamOutlined /> Role Management</span>} key="2">
          <Card>
            <div className="table-header">
              <Title level={4}>Roles & Permissions</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('role')}>
                Add Role
              </Button>
            </div>
            <Table
              columns={roleColumns}
              dataSource={roles}
              rowKey="id"
              pagination={{ pageSize: TABLE_PAGE_SIZE }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><SettingOutlined /> System Settings</span>} key="3">
          <Card>
            <div className="table-header">
              <Title level={4}>System Configuration</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('setting')}>
                Add Setting
              </Button>
            </div>
            <Table
              columns={settingColumns}
              dataSource={systemSettings}
              rowKey="id"
              pagination={{ pageSize: TABLE_PAGE_SIZE }}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title={selectedItem ? `Edit ${modalType}` : `Add ${modalType}`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          {modalType === 'user' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please input the email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                  >
                    <Select>
                      {Object.entries(USER_ROLES).map(([key, value]) => (
                        <Option key={key} value={key}>{value}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                  >
                    <Select>
                      <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {modalType === 'role' && (
            <>
              <Form.Item
                name="name"
                label="Role Name"
                rules={[{ required: true, message: 'Please input the role name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="permissions"
                label="Permissions"
                rules={[{ required: true, message: 'Please select permissions!' }]}
              >
                <Select mode="multiple">
                  {Object.entries(PERMISSIONS).map(([key, value]) => (
                    <Option key={key} value={key}>{value}</Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}

          {modalType === 'setting' && (
            <>
              <Form.Item
                name="key"
                label="Setting Key"
                rules={[{ required: true, message: 'Please input the setting key!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="value"
                label="Value"
                rules={[{ required: true, message: 'Please input the value!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please select the type!' }]}
              >
                <Select>
                  {Object.entries(SETTING_TYPES).map(([key, value]) => (
                    <Option key={key} value={key}>{value}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Settings; 