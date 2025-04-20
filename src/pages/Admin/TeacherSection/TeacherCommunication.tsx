import React, { useState } from 'react';
import { Row, Col, Card, Typography, Tabs, List, Input, Button, Tag, Space, Avatar, Badge, Form, Select } from 'antd';
import { MessageOutlined, NotificationOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

const TeacherCommunication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      content: 'Meeting scheduled for tomorrow at 10 AM',
      timestamp: '2024-03-20 14:30',
      read: false,
    },
    {
      id: '2',
      sender: 'Jane Smith',
      content: 'Please review the lesson plan',
      timestamp: '2024-03-19 16:45',
      read: true,
    },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Staff Meeting',
      content: 'Monthly staff meeting will be held on Friday',
      author: 'Principal',
      timestamp: '2024-03-20 10:00',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Training Session',
      content: 'New teaching methodology workshop next week',
      author: 'Training Coordinator',
      timestamp: '2024-03-19 09:30',
      priority: 'medium',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState<{
    title: string;
    content: string;
    priority: 'high' | 'medium' | 'low';
  }>({
    title: '',
    content: '',
    priority: 'medium',
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        read: true,
      };
      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        ...newAnnouncement,
        author: 'You',
        timestamp: new Date().toLocaleString(),
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', priority: 'medium' });
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'messages',
      label: (
        <span>
          <MessageOutlined />
          Messages
        </span>
      ),
      children: (
        <Card>
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteMessage(message.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={!message.read}>
                      <Avatar>{message.sender[0]}</Avatar>
                    </Badge>
                  }
                  title={message.sender}
                  description={
                    <Space direction="vertical">
                      <Text>{message.content}</Text>
                      <Text type="secondary">{message.timestamp}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
          <div style={{ marginTop: 16 }}>
            <TextArea
              rows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              style={{ marginTop: 8 }}
            >
              Send
            </Button>
          </div>
        </Card>
      ),
    },
    {
      key: 'announcements',
      label: (
        <span>
          <NotificationOutlined />
          Announcements
        </span>
      ),
      children: (
        <Card>
          <List
            dataSource={announcements}
            renderItem={(announcement) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      {announcement.title}
                      <Tag color={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical">
                      <Text>{announcement.content}</Text>
                      <Text type="secondary">
                        By {announcement.author} on {announcement.timestamp}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
          <div style={{ marginTop: 16 }}>
            <Form layout="vertical">
              <Form.Item label="Title">
                <Input
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Content">
                <TextArea
                  rows={4}
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Priority">
                <Select
                  value={newAnnouncement.priority}
                  onChange={(value) =>
                    setNewAnnouncement({ ...newAnnouncement, priority: value })
                  }
                >
                  <Select.Option value="high">High</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="low">Low</Select.Option>
                </Select>
              </Form.Item>
              <Button type="primary" onClick={handleAddAnnouncement}>
                Post Announcement
              </Button>
            </Form>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Teacher Communication</Title>
        </Col>
      </Row>
      <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
    </div>
  );
};

export default TeacherCommunication; 