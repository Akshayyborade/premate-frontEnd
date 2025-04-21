import React from 'react';
import { Card, Row, Col, Statistic, Space, Typography, List, Avatar, Tag } from 'antd';
import { 
    BookOutlined, 
    FileTextOutlined, 
    CalendarOutlined, 
    CheckCircleOutlined,
    ClockCircleOutlined 
} from '@ant-design/icons';
import './Dashboard.css';

const { Title, Text } = Typography;

const StudentDashboard = () => {
    // Mock data - replace with actual data from your backend
    const stats = {
        enrolledCourses: 5,
        upcomingExams: 3,
        assignmentsDue: 2,
        attendanceRate: 95
    };

    const recentActivities = [
        {
            id: 1,
            title: 'Mathematics Assignment',
            type: 'assignment',
            date: '2024-04-20',
            status: 'completed'
        },
        {
            id: 2,
            title: 'Science Quiz',
            type: 'exam',
            date: '2024-04-22',
            status: 'upcoming'
        }
    ];

    return (
        <div className="student-dashboard">
            <Title level={2}>Student Dashboard</Title>
            
            <Row gutter={[16, 16]} className="stats-row">
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Enrolled Courses"
                            value={stats.enrolledCourses}
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
                            title="Assignments Due"
                            value={stats.assignmentsDue}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Attendance Rate"
                            value={stats.attendanceRate}
                            suffix="%"
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="content-row">
                <Col xs={24} md={12}>
                    <Card title="Recent Activities">
                        <List
                            dataSource={recentActivities}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar 
                                                icon={item.type === 'assignment' ? <FileTextOutlined /> : <CalendarOutlined />}
                                                style={{ backgroundColor: item.type === 'assignment' ? '#1890ff' : '#52c41a' }}
                                            />
                                        }
                                        title={item.title}
                                        description={
                                            <Space>
                                                <Text type="secondary">{item.date}</Text>
                                                <Tag color={item.status === 'completed' ? 'success' : 'warning'}>
                                                    {item.status === 'completed' ? 'Completed' : 'Upcoming'}
                                                </Tag>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Upcoming Deadlines">
                        <List
                            dataSource={recentActivities}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar 
                                                icon={<ClockCircleOutlined />}
                                                style={{ backgroundColor: '#faad14' }}
                                            />
                                        }
                                        title={item.title}
                                        description={
                                            <Space>
                                                <Text type="secondary">Due: {item.date}</Text>
                                                <Tag color="warning">Pending</Tag>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentDashboard; 