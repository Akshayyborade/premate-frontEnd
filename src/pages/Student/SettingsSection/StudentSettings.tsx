import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Typography, Row, Col, Space, Divider } from 'antd';
import { LockOutlined, BellOutlined, MailOutlined, SafetyOutlined } from '@ant-design/icons';
import './StudentSettings.css';

const { Title, Text } = Typography;

const StudentSettings = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        setLoading(true);
        // Handle form submission here
        console.log('Form values:', values);
        setLoading(false);
    };

    return (
        <div className="student-settings">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Account Security">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="currentPassword"
                                label="Current Password"
                                rules={[{ required: true, message: 'Please input your current password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                label="New Password"
                                rules={[{ required: true, message: 'Please input your new password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm New Password"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Please confirm your new password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Update Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Notification Settings">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div className="setting-item">
                                <Space>
                                    <BellOutlined />
                                    <Text>Email Notifications</Text>
                                </Space>
                                <Switch defaultChecked />
                            </div>
                            <Divider />
                            <div className="setting-item">
                                <Space>
                                    <MailOutlined />
                                    <Text>Assignment Reminders</Text>
                                </Space>
                                <Switch defaultChecked />
                            </div>
                            <Divider />
                            <div className="setting-item">
                                <Space>
                                    <SafetyOutlined />
                                    <Text>Exam Notifications</Text>
                                </Space>
                                <Switch defaultChecked />
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentSettings; 