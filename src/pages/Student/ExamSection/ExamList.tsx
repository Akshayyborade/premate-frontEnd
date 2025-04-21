import React, { useState } from 'react';
import { Table, Card, Space, Typography, Tag, Button, Input, Avatar, Badge, Tooltip } from 'antd';
import { SearchOutlined, FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './ExamList.css';

const { Title, Text } = Typography;

interface Exam {
    id: string;
    title: string;
    subject: string;
    date: string;
    duration: string;
    totalMarks: number;
    status: 'upcoming' | 'completed' | 'missed';
    score?: number;
}

const ExamList = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Exam Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Exam) => (
                <Space>
                    <Avatar icon={<FileTextOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary">{record.subject}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            key: 'date',
            render: (text: string, record: Exam) => (
                <Space>
                    <ClockCircleOutlined />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Total Marks',
            dataIndex: 'totalMarks',
            key: 'totalMarks',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: Exam) => {
                const color = status === 'upcoming' ? 'blue' : status === 'completed' ? 'green' : 'red';
                const text = status === 'upcoming' ? 'UPCOMING' : status === 'completed' ? 'COMPLETED' : 'MISSED';
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (score: number | undefined, record: Exam) => {
                if (record.status === 'completed' && score !== undefined) {
                    return (
                        <Tooltip title={`${score}/${record.totalMarks}`}>
                            <Badge
                                status={score >= record.totalMarks * 0.5 ? 'success' : 'error'}
                                text={`${score}/${record.totalMarks}`}
                            />
                        </Tooltip>
                    );
                }
                return '-';
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Exam) => (
                <Space>
                    {record.status === 'upcoming' && (
                        <Button type="primary" size="small">Start Exam</Button>
                    )}
                    {record.status === 'completed' && (
                        <Button type="link" size="small">View Results</Button>
                    )}
                </Space>
            ),
        },
    ];

    const mockData: Exam[] = [
        {
            id: '1',
            title: 'Mathematics Midterm',
            subject: 'Mathematics',
            date: '2024-04-25 09:00 AM',
            duration: '2 hours',
            totalMarks: 100,
            status: 'upcoming',
        },
        {
            id: '2',
            title: 'Science Final',
            subject: 'Science',
            date: '2024-04-20 10:00 AM',
            duration: '3 hours',
            totalMarks: 100,
            status: 'completed',
            score: 85,
        },
    ];

    return (
        <div className="exam-list">
            <Card>
                <div className="exam-list-header">
                    <Title level={4}>My Exams</Title>
                    <Space>
                        <Input
                            placeholder="Search exams..."
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

export default ExamList; 