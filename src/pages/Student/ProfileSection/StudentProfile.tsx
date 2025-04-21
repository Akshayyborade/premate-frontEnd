import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, Avatar, Typography, Row, Col, Space, Tag } from 'antd';
import { UserOutlined, UploadOutlined, MailOutlined, PhoneOutlined, BookOutlined } from '@ant-design/icons';
import './StudentProfile.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface StudentProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    subjects: string[];
}

const StudentProfile = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        setLoading(true);
        // Handle form submission here
        console.log('Form values:', values);
        setLoading(false);
    };

    const mockProfile: StudentProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, City, Country',
        bio: 'A passionate student interested in mathematics and science.',
        subjects: ['Mathematics', 'Science', 'English'],
    };

    return (
        <div className="student-profile">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Card className="profile-card">
                        <div className="profile-header">
                            <Avatar size={100} icon={<UserOutlined />} />
                            <Title level={4} style={{ marginTop: 16 }}>{mockProfile.name}</Title>
                            <Text type="secondary">Student ID: ST12345</Text>
                        </div>
                        <div className="profile-subjects">
                            <Title level={5}>Enrolled Subjects</Title>
                            <Space wrap>
                                {mockProfile.subjects.map((subject, index) => (
                                    <Tag key={index} color="blue">
                                        <BookOutlined /> {subject}
                                    </Tag>
                                ))}
                            </Space>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card title="Edit Profile">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={mockProfile}
                        >
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        label="Full Name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true, message: 'Please input your email!' },
                                            { type: 'email', message: 'Please enter a valid email!' }
                                        ]}
                                    >
                                        <Input prefix={<MailOutlined />} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input prefix={<PhoneOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[{ required: true, message: 'Please input your address!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="bio"
                                label="Bio"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Update Profile
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentProfile; 