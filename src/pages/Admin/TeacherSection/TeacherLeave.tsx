import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Tag, Typography, Space } from 'antd';
import { PlusOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface LeaveRequest {
  id: string;
  teacherName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
}

const TeacherLeave = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      teacherName: 'John Doe',
      leaveType: 'Sick Leave',
      startDate: '2023-01-15',
      endDate: '2023-01-17',
      reason: 'Medical appointment',
      status: 'pending',
      submissionDate: '2023-01-10',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Teacher',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: LeaveRequest) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedRequest(record);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="link"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record.id)}
              >
                Approve
              </Button>
              <Button
                type="link"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReject(record.id)}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleApprove = (id: string) => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === id ? { ...request, status: 'approved' } : request
      )
    );
  };

  const handleReject = (id: string) => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
  };

  const handleSubmit = (values: any) => {
    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      teacherName: values.teacherName,
      leaveType: values.leaveType,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
      reason: values.reason,
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Title level={2}>Leave Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          New Leave Request
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={leaveRequests}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={selectedRequest ? 'Leave Request Details' : 'New Leave Request'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedRequest(null);
          form.resetFields();
        }}
        footer={null}
      >
        {selectedRequest ? (
          <div>
            <p><strong>Teacher:</strong> {selectedRequest.teacherName}</p>
            <p><strong>Leave Type:</strong> {selectedRequest.leaveType}</p>
            <p><strong>Start Date:</strong> {selectedRequest.startDate}</p>
            <p><strong>End Date:</strong> {selectedRequest.endDate}</p>
            <p><strong>Reason:</strong> {selectedRequest.reason}</p>
            <p><strong>Status:</strong> <Tag color={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Tag></p>
            <p><strong>Submission Date:</strong> {selectedRequest.submissionDate}</p>
          </div>
        ) : (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="teacherName"
              label="Teacher Name"
              rules={[{ required: true, message: 'Please select teacher!' }]}
            >
              <Select placeholder="Select teacher">
                <Option value="John Doe">John Doe</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="leaveType"
              label="Leave Type"
              rules={[{ required: true, message: 'Please select leave type!' }]}
            >
              <Select placeholder="Select leave type">
                <Option value="Sick Leave">Sick Leave</Option>
                <Option value="Annual Leave">Annual Leave</Option>
                <Option value="Personal Leave">Personal Leave</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Date Range"
              rules={[{ required: true, message: 'Please select date range!' }]}
            >
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="reason"
              label="Reason"
              rules={[{ required: true, message: 'Please input reason!' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TeacherLeave; 