import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Space,
  Typography,
  Button,
  Input,
  Rate,
  Tag,
  Modal,
  Form,
  Select,
  message,
  Avatar,
  Tooltip,
  Row,
  Col,
  Statistic,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  StarOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface Feedback {
  id: string;
  studentName: string;
  examName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'reviewed' | 'resolved';
  response?: string;
}

const ExamFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulated API call
    setLoading(true);
    setTimeout(() => {
      const mockData: Feedback[] = [
        {
          id: '1',
          studentName: 'John Doe',
          examName: 'Midterm Mathematics',
          rating: 4,
          comment: 'The exam was well-structured but some questions were unclear.',
          date: '2024-03-15',
          status: 'pending',
        },
        // Add more mock data as needed
      ];
      setFeedbacks(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: Feedback) => {
    setSelectedFeedback(record);
    form.setFieldsValue({
      response: record.response || '',
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: Feedback) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this feedback?',
      content: `This will permanently delete ${record.studentName}'s feedback for ${record.examName}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Implement delete functionality
        message.success('Feedback deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission
      console.log('Form values:', values);
      message.success('Feedback updated successfully');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const actionMenu = (record: Feedback): MenuProps => ({
    items: [
      {
        key: '1',
        icon: <EditOutlined />,
        label: 'Edit',
        onClick: () => handleEdit(record),
      },
      {
        key: '2',
        icon: <DeleteOutlined />,
        label: 'Delete',
        danger: true,
        onClick: () => handleDelete(record),
      },
    ],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'reviewed':
        return 'processing';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Feedback> = [
    {
      title: 'Student',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (text) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Exam',
      dataIndex: 'examName',
      key: 'examName',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'pending' ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
          {' '}{status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Exam Feedback</Title>
          <Space>
            <Input
              placeholder="Search feedback..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="primary" icon={<ExportOutlined />}>
              Export
            </Button>
          </Space>
        </Space>

        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Feedback"
                value={feedbacks.length}
                prefix={<MessageOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Average Rating"
                value={4.2}
                precision={1}
                prefix={<StarOutlined />}
                suffix="/5"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pending Reviews"
                value={feedbacks.filter(f => f.status === 'pending').length}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Resolved"
                value={feedbacks.filter(f => f.status === 'resolved').length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={feedbacks}
          loading={loading}
          rowKey="id"
          pagination={{
            total: feedbacks.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />

        <Modal
          title="Edit Feedback"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="response"
              label="Response"
              rules={[{ required: true, message: 'Please enter your response' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter your response to the feedback" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Option value="pending">Pending</Option>
                <Option value="reviewed">Reviewed</Option>
                <Option value="resolved">Resolved</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </div>
  );
};

export default ExamFeedback; 