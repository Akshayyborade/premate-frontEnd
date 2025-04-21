import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Typography, Button, Modal, Form, Input, InputNumber, Select, Switch, Tag, Row, Col, Statistic } from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    DollarOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { License, Subscription, Payment } from '../Settings/types';
import { LICENSE_TYPES, SUBSCRIPTION_STATUS } from '../Settings/constants';

const { Title, Text } = Typography;
const { Option } = Select;

const LicenseManager: React.FC = () => {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'license' | 'subscription'>('license');
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Mock data for demonstration
            setLicenses([
                {
                    id: '1',
                    type: 'premium',
                    name: 'Premium License',
                    description: 'Full access to all features',
                    features: ['Unlimited Users', 'Advanced Analytics', 'Priority Support'],
                    price: 99.99,
                    duration: 12,
                    maxUsers: 1000,
                    isActive: true
                }
            ]);

            setSubscriptions([
                {
                    id: '1',
                    licenseId: '1',
                    organizationId: 'org1',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                    status: 'active',
                    paymentStatus: 'paid',
                    totalAmount: 1199.88,
                    currency: 'USD',
                    billingCycle: 'yearly',
                    autoRenew: true
                }
            ]);

            setPayments([
                {
                    id: '1',
                    subscriptionId: '1',
                    amount: 1199.88,
                    currency: 'USD',
                    status: 'success',
                    paymentMethod: 'Credit Card',
                    transactionId: 'txn_123456',
                    paymentDate: '2024-01-01'
                }
            ]);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const licenseColumns = [
        {
            title: 'License',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: License) => (
                <Space direction="vertical">
                    <Text strong>{text}</Text>
                    <Text type="secondary">{record.description}</Text>
                </Space>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (
                <Tag color={type === 'enterprise' ? 'purple' : type === 'premium' ? 'blue' : type === 'basic' ? 'green' : 'default'}>
                    {type.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price}/month`,
        },
        {
            title: 'Max Users',
            dataIndex: 'maxUsers',
            key: 'maxUsers',
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean) => (
                <Tag color={isActive ? 'success' : 'error'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: License) => (
                <Space>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const subscriptionColumns = [
        {
            title: 'Organization',
            dataIndex: 'organizationId',
            key: 'organizationId',
        },
        {
            title: 'License',
            dataIndex: 'licenseId',
            key: 'licenseId',
            render: (licenseId: string) => {
                const license = licenses.find(l => l.id === licenseId);
                return license?.name || 'Unknown License';
            },
        },
        {
            title: 'Period',
            dataIndex: 'startDate',
            key: 'period',
            render: (_: any, record: Subscription) => (
                <Space>
                    <Text>{record.startDate}</Text>
                    <Text>to</Text>
                    <Text>{record.endDate}</Text>
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'success' : status === 'expired' ? 'error' : 'warning'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Payment',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => (
                <Tag color={status === 'paid' ? 'success' : status === 'unpaid' ? 'error' : 'warning'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number, record: Subscription) => (
                <Text>{record.currency} {amount}</Text>
            ),
        },
    ];

    const handleEdit = (record: License | Subscription) => {
        form.setFieldsValue(record);
        setModalType(record.hasOwnProperty('type') ? 'license' : 'subscription');
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        // Implement delete functionality
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            // Implement save functionality
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <div className="license-manager">
            <Title level={2}>License & Subscription Management</Title>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Licenses"
                            value={licenses.length}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Active Subscriptions"
                            value={subscriptions.filter(s => s.status === 'active').length}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={subscriptions.reduce((sum, sub) => sum + sub.totalAmount, 0)}
                            prefix={<DollarOutlined />}
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Expired Subscriptions"
                            value={subscriptions.filter(s => s.status === 'expired').length}
                            prefix={<CloseCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card
                title="Licenses"
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                        setModalType('license');
                        setIsModalVisible(true);
                    }}>
                        Add License
                    </Button>
                }
            >
                <Table
                    columns={licenseColumns}
                    dataSource={licenses}
                    rowKey="id"
                    loading={loading}
                />
            </Card>

            <Card
                title="Subscriptions"
                style={{ marginTop: 24 }}
            >
                <Table
                    columns={subscriptionColumns}
                    dataSource={subscriptions}
                    rowKey="id"
                    loading={loading}
                />
            </Card>

            <Modal
                title={modalType === 'license' ? 'Add License' : 'Add Subscription'}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    {modalType === 'license' ? (
                        <>
                            <Form.Item
                                name="name"
                                label="License Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="License Type"
                                rules={[{ required: true }]}
                            >
                                <Select>
                                    {Object.entries(LICENSE_TYPES).map(([key, value]) => (
                                        <Option key={key} value={key}>{value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    min={0}
                                    step={0.01}
                                    prefix="$"
                                />
                            </Form.Item>
                            <Form.Item
                                name="maxUsers"
                                label="Maximum Users"
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    min={1}
                                />
                            </Form.Item>
                            <Form.Item
                                name="isActive"
                                label="Active"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name="organizationId"
                                label="Organization"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="licenseId"
                                label="License"
                                rules={[{ required: true }]}
                            >
                                <Select>
                                    {licenses.map(license => (
                                        <Option key={license.id} value={license.id}>
                                            {license.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="billingCycle"
                                label="Billing Cycle"
                                rules={[{ required: true }]}
                            >
                                <Select>
                                    <Option value="monthly">Monthly</Option>
                                    <Option value="yearly">Yearly</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="autoRenew"
                                label="Auto Renew"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default LicenseManager; 