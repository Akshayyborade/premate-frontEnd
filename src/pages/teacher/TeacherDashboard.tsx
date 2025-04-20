import React from 'react';
import { Card, Row, Col, Statistic, Space, Typography } from 'antd';
import { UserOutlined, BookOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import './TeacherDashboard.css';

const { Title } = Typography;

const TeacherDashboard = () => {
    // Mock data - replace with actual data from your backend
    const stats = {
        totalStudents: 45,
        activeClasses: 6,
        upcomingExams: 3,
        scheduledEvents: 8
    };

    return (
        <div className="teacher-dashboard">
            <Title level={2}>Dashboard Overview</Title>
            
            <Row gutter={[16, 16]} className="stats-row">
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Total Students"
                            value={stats.totalStudents}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Active Classes"
                            value={stats.activeClasses}
                            prefix={<BookOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Upcoming Exams"
                            value={stats.upcomingExams}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Scheduled Events"
                            value={stats.scheduledEvents}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="content-row">
                <Col xs={24} md={12}>
                    <Card title="Recent Activities">
                        {/* Add recent activities list here */}
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Typography.Text>No recent activities</Typography.Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Upcoming Events">
                        {/* Add upcoming events list here */}
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Typography.Text>No upcoming events</Typography.Text>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TeacherDashboard; 