import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Space, Typography, Button, DatePicker, Select, Badge, List, Tag } from 'antd';
import { 
    UserOutlined, 
    TeamOutlined, 
    BookOutlined, 
    CalendarOutlined,
    FileTextOutlined,
    BellOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { adminService } from '../Settings/services';
import { DashboardStats, AuditLog, Notification } from '../Settings/types';

const { Title, Text } = Typography;
const { Option } = Select;

interface AnalyticsData {
    revenue: number[];
    enrollments: number[];
    attendance: {
        labels: string[];
        values: number[];
    };
}

interface CalendarEvent {
    title: string;
    date: string;
    type: 'meeting' | 'deadline' | 'training';
}

interface TimetableData {
    grades: string[];
    batches: string[];
    schedule: {
        id: number;
        grade: string;
        batch: string;
        subject: string;
        teacher: string;
        time: string;
        date: string;
    }[];
}

const DashboardHome: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentActivities, setRecentActivities] = useState<AuditLog[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, activitiesData, notificationsData] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getAuditLogs(),
                adminService.getNotifications()
            ]);
            setStats(statsData);
            setRecentActivities(activitiesData);
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mock data for demonstration
    const analyticsData: AnalyticsData = {
        revenue: [1500, 2300, 3200, 4100, 2800, 3500],
        enrollments: [50, 75, 100, 125, 150, 175],
        attendance: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            values: [85, 90, 88, 92, 87]
        }
    };

    const calendarEvents: CalendarEvent[] = [
        {
            title: 'Team Meeting',
            date: '2024-03-15',
            type: 'meeting'
        },
        {
            title: 'Project Deadline',
            date: '2024-03-20',
            type: 'deadline'
        },
        {
            title: 'Training Session',
            date: '2024-03-25',
            type: 'training'
        }
    ];

    const timetableData: TimetableData = {
        grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
        batches: ['A', 'B', 'C'],
        schedule: [
            {
                id: 1,
                grade: 'Grade 9',
                batch: 'A',
                subject: 'Mathematics',
                teacher: 'John Doe',
                time: '09:00 - 10:30',
                date: '2024-03-15'
            }
        ]
    };

    const activityColumns = [
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
        }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <Title level={2}>Welcome, Admin</Title>
                <Space>
                    <DatePicker />
                    <Select defaultValue="all" style={{ width: 120 }}>
                        <Option value="all">All Activities</Option>
                        <Option value="today">Today</Option>
                        <Option value="week">This Week</Option>
                        <Option value="month">This Month</Option>
                    </Select>
                </Space>
            </header>

            <div className="dashboard-content">
                <main className="dashboard-main">
                    <section className="dashboard-stats">
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Total Users"
                                        value={stats?.totalUsers || 0}
                                        prefix={<UserOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Active Users"
                                        value={stats?.activeUsers || 0}
                                        prefix={<TeamOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Total Roles"
                                        value={stats?.totalRoles || 0}
                                        prefix={<BookOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="System Settings"
                                        value={stats?.totalSettings || 0}
                                        prefix={<FileTextOutlined />}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </section>

                    <section className="dashboard-activities">
                        <Card title="Recent Activities">
                            <Table
                                columns={activityColumns}
                                dataSource={recentActivities}
                                rowKey="id"
                                pagination={{ pageSize: 5 }}
                                loading={loading}
                            />
                        </Card>
                    </section>
                </main>

                <aside className="dashboard-sidebar">
                    <section className="sidebar-section notifications">
                        <Card 
                            title={
                                <Space>
                                    <BellOutlined />
                                    <Text>Notifications</Text>
                                    <Badge count={stats?.unreadNotifications || 0} />
                                </Space>
                            }
                        >
                            <List
                                dataSource={notifications}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<BellOutlined />}
                                            title={item.title}
                                            description={item.message}
                                        />
                                        <Text type="secondary">
                                            <ClockCircleOutlined /> {item.createdAt}
                                        </Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </section>

                    <section className="sidebar-section calendar">
                        <Card title={<Space><CalendarOutlined /><Text>Upcoming Events</Text></Space>}>
                            <List
                                dataSource={calendarEvents}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item.title}
                                            description={item.date}
                                        />
                                        <Tag color={item.type === 'meeting' ? 'blue' : item.type === 'deadline' ? 'red' : 'green'}>
                                            {item.type}
                                        </Tag>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default DashboardHome; 