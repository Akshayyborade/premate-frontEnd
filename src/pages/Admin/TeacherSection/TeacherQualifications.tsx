import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Upload, Typography, Tag, Space, message } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'expired';
  fileUrl: string;
}

interface Qualification {
  id: string;
  title: string;
  institution: string;
  year: string;
  documents: Document[];
}

const TeacherQualifications = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [qualifications, setQualifications] = useState<Qualification[]>([
    {
      id: '1',
      title: 'Bachelor of Education',
      institution: 'University of Education',
      year: '2015',
      documents: [
        {
          id: '1',
          name: 'Degree Certificate',
          type: 'PDF',
          uploadDate: '2023-01-15',
          status: 'verified',
          fileUrl: '/path/to/certificate.pdf',
        },
      ],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleAddQualification = () => {
    setIsModalVisible(true);
    setSelectedQualification(null);
    form.resetFields();
  };

  const handleEditQualification = (qualification: Qualification) => {
    setSelectedQualification(qualification);
    setIsModalVisible(true);
    form.setFieldsValue(qualification);
  };

  const handleDeleteQualification = (id: string) => {
    setQualifications(qualifications.filter(q => q.id !== id));
    message.success('Qualification deleted successfully');
  };

  const handleDownloadDocument = (document: Document) => {
    // Implement download logic
    message.success(`Downloading ${document.name}`);
  };

  const handleDeleteDocument = (qualificationId: string, documentId: string) => {
    setQualifications(qualifications.map(q => {
      if (q.id === qualificationId) {
        return {
          ...q,
          documents: q.documents.filter(d => d.id !== documentId)
        };
      }
      return q;
    }));
    message.success('Document deleted successfully');
  };

  const handleSubmit = (values: any) => {
    if (selectedQualification) {
      setQualifications(qualifications.map(q => {
        if (q.id === selectedQualification.id) {
          return { ...q, ...values };
        }
        return q;
      }));
      message.success('Qualification updated successfully');
    } else {
      const newQualification: Qualification = {
        id: Date.now().toString(),
        ...values,
        documents: [],
      };
      setQualifications([...qualifications, newQualification]);
      message.success('Qualification added successfully');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Title level={2}>Teacher Qualifications</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddQualification}>
          Add Qualification
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {qualifications.map(qualification => (
          <Card
            key={qualification.id}
            title={qualification.title}
            extra={
              <Space>
                <Button type="link" onClick={() => handleEditQualification(qualification)}>
                  Edit
                </Button>
                <Button type="link" danger onClick={() => handleDeleteQualification(qualification.id)}>
                  Delete
                </Button>
              </Space>
            }
          >
            <p><strong>Institution:</strong> {qualification.institution}</p>
            <p><strong>Year:</strong> {qualification.year}</p>
            
            <Title level={4} style={{ marginTop: '16px' }}>Documents</Title>
            {qualification.documents.map(document => (
              <Card
                key={document.id}
                size="small"
                style={{ marginBottom: '8px' }}
                extra={
                  <Space>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadDocument(document)}
                    />
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteDocument(qualification.id, document.id)}
                    />
                  </Space>
                }
              >
                <p><strong>Name:</strong> {document.name}</p>
                <p><strong>Type:</strong> {document.type}</p>
                <p><strong>Upload Date:</strong> {document.uploadDate}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Tag color={getStatusColor(document.status)}>{document.status}</Tag>
                </p>
              </Card>
            ))}

            <Upload style={{ marginTop: '16px' }}>
              <Button icon={<UploadOutlined />}>Upload Document</Button>
            </Upload>
          </Card>
        ))}
      </div>

      <Modal
        title={selectedQualification ? 'Edit Qualification' : 'Add Qualification'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedQualification(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input qualification title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="institution"
            label="Institution"
            rules={[{ required: true, message: 'Please input institution name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: 'Please input year!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedQualification ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherQualifications; 