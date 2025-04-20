import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Select,
  Button,
  Space,
  Typography,
  Input,
  Tag,
  Progress,
  Tooltip,
  Modal,
  Form,
  InputNumber,
  message,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Title } = Typography;
const { Option } = Select;

interface ExamResult {
  id: string;
  studentName: string;
  examName: string;
  subject: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'pass' | 'fail';
  rank: number;
}

const ExamResults: React.FC = () => {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulated API call
    setLoading(true);
    setTimeout(() => {
      const mockData: ExamResult[] = [
        {
          id: '1',
          studentName: 'John Doe',
          examName: 'Midterm Mathematics',
          subject: 'Mathematics',
          score: 85,
          totalMarks: 100,
          percentage: 85,
          grade: 'A',
          status: 'pass',
          rank: 1,
        },
        // Add more mock data as needed
      ];
      setResults(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: ExamResult) => {
    setSelectedResult(record);
    form.setFieldsValue({
      score: record.score,
      totalMarks: record.totalMarks,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: ExamResult) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this result?',
      content: `This will permanently delete ${record.studentName}'s result for ${record.examName}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Implement delete functionality
        message.success('Result deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission
      console.log('Form values:', values);
      message.success('Result updated successfully');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const actionMenu = (record: ExamResult): MenuProps => ({
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
    return status === 'pass' ? 'success' : 'error';
  };

  const columns: ColumnsType<ExamResult> = [
    {
      title: 'Student',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Exam',
      dataIndex: 'examName',
      key: 'examName',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.subject}</div>
        </Space>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div>
            {record.score}/{record.totalMarks}
          </div>
          <Progress
            percent={record.percentage}
            size="small"
            status={record.status === 'pass' ? 'success' : 'exception'}
          />
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => (
        <Tag color={grade === 'A' ? 'gold' : grade === 'B' ? 'blue' : 'green'}>
          {grade}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'pass' ? (
            <CheckCircleOutlined /> + ' PASS'
          ) : (
            <CloseCircleOutlined /> + ' FAIL'
          )}
        </Tag>
      ),
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank) => (
        <Tooltip title="Class Rank">
          <Tag icon={<TrophyOutlined />} color="gold">
            #{rank}
          </Tag>
        </Tooltip>
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
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={3}>Exam Results</Title>
          <Space>
            <Select
              value={selectedExam}
              onChange={setSelectedExam}
              style={{ width: 200 }}
            >
              <Option value="all">All Exams</Option>
              <Option value="midterm">Midterm Exams</Option>
              <Option value="final">Final Exams</Option>
            </Select>
            <Input
              placeholder="Search results..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="primary" icon={<ExportOutlined />}>
              Export
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={results}
          loading={loading}
          rowKey="id"
          pagination={{
            total: results.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />

        <Modal
          title="Edit Result"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          width={400}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="score"
              label="Score"
              rules={[{ required: true, message: 'Please enter score' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="totalMarks"
              label="Total Marks"
              rules={[{ required: true, message: 'Please enter total marks' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Card>
  );
};

export default ExamResults; 