import React, { useState } from 'react';
import { Table, Card, Space, Typography, Tag, Button, Input, Avatar, Badge, Tooltip } from 'antd';
import { SearchOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import './CourseList.css';

const { Title, Text } = Typography;

interface Course {
    id: string;
    name: string;
    subject: string;
    teacher: string;
    schedule: string;
    progress: number;
    status: 'active' | 'completed' | 'upcoming';
}

const CourseList = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Course) => (
                <Space>
                    <Avatar icon={<BookOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary">{record.subject}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            render: (text: string) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress: number) => (
                <Tooltip title={`${progress}% Complete`}>
                    <Badge
                        status={progress === 100 ? 'success' : 'processing'}
                        text={`${progress}%`}
                    />
                </Tooltip>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'active' ? 'green' : status === 'completed' ? 'blue' : 'orange';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Course) => (
                <Space>
                    <Button type="link" size="small">View Details</Button>
                    <Button type="link" size="small">View Materials</Button>
                </Space>
            ),
        },
    ];

    const mockData: Course[] = [
        {
            id: '1',
            name: 'Mathematics 101',
            subject: 'Mathematics',
            teacher: 'John Smith',
            schedule: 'Mon, Wed, Fri 9:00 AM',
            progress: 75,
            status: 'active',
        },
        {
            id: '2',
            name: 'Science Basics',
            subject: 'Science',
            teacher: 'Jane Doe',
            schedule: 'Tue, Thu 10:00 AM',
            progress: 30,
            status: 'active',
        },
    ];

    return (
        <div className="course-list">
            <Card>
                <div className="course-list-header">
                    <Title level={4}>My Courses</Title>
                    <Space>
                        <Input
                            placeholder="Search courses..."
                            prefix={<SearchOutlined />}
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 200 }}
                        />
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={mockData}
                    loading={loading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default CourseList; 