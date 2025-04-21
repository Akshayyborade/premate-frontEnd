import React, { useState } from 'react';
import { Table, Card, Space, Typography, Tag, Button, Input, Avatar, Badge, Tooltip } from 'antd';
import { SearchOutlined, FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './AssignmentList.css';

const { Title, Text } = Typography;

interface Assignment {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'late';
    marks?: number;
    totalMarks: number;
}

const AssignmentList = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Assignment Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Assignment) => (
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
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (text: string) => (
                <Space>
                    <ClockCircleOutlined />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'submitted' ? 'green' : status === 'late' ? 'red' : 'orange';
                const text = status === 'submitted' ? 'SUBMITTED' : status === 'late' ? 'LATE' : 'PENDING';
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Marks',
            dataIndex: 'marks',
            key: 'marks',
            render: (marks: number | undefined, record: Assignment) => {
                if (record.status === 'submitted' && marks !== undefined) {
                    return (
                        <Tooltip title={`${marks}/${record.totalMarks}`}>
                            <Badge
                                status={marks >= record.totalMarks * 0.5 ? 'success' : 'error'}
                                text={`${marks}/${record.totalMarks}`}
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
            render: (_: any, record: Assignment) => (
                <Space>
                    {record.status === 'pending' && (
                        <Button type="primary" size="small">Submit</Button>
                    )}
                    {record.status === 'submitted' && (
                        <Button type="link" size="small">View Feedback</Button>
                    )}
                </Space>
            ),
        },
    ];

    const mockData: Assignment[] = [
        {
            id: '1',
            title: 'Mathematics Homework',
            subject: 'Mathematics',
            dueDate: '2024-04-25 11:59 PM',
            status: 'pending',
            totalMarks: 100,
        },
        {
            id: '2',
            title: 'Science Project',
            subject: 'Science',
            dueDate: '2024-04-20 11:59 PM',
            status: 'submitted',
            marks: 85,
            totalMarks: 100,
        },
    ];

    return (
        <div className="assignment-list">
            <Card>
                <div className="assignment-list-header">
                    <Title level={4}>My Assignments</Title>
                    <Space>
                        <Input
                            placeholder="Search assignments..."
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

export default AssignmentList; 