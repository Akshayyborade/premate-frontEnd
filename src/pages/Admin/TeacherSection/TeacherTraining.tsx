import React, { useState } from 'react';
import { Row, Col, Card, Typography, Tabs, List, Input, Button, Tag, Space, Avatar, Badge, Form, Select, Progress, DatePicker } from 'antd';
import { BookOutlined, HistoryOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface TrainingRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherName: string;
  enrollmentDate: string;
  completionDate: string | null;
  status: 'enrolled' | 'in-progress' | 'completed';
}

const TeacherTraining: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState<TrainingCourse[]>([
    {
      id: '1',
      title: 'Classroom Management',
      description: 'Learn effective classroom management techniques',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      instructor: 'Dr. Sarah Johnson',
      maxParticipants: 20,
      currentParticipants: 15,
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Digital Teaching Tools',
      description: 'Master modern digital teaching tools and platforms',
      startDate: '2024-03-15',
      endDate: '2024-03-30',
      instructor: 'Prof. Michael Chen',
      maxParticipants: 25,
      currentParticipants: 22,
      status: 'ongoing',
    },
  ]);

  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>([
    {
      id: '1',
      courseId: '1',
      courseTitle: 'Classroom Management',
      teacherName: 'John Doe',
      enrollmentDate: '2024-03-10',
      completionDate: null,
      status: 'enrolled',
    },
    {
      id: '2',
      courseId: '2',
      courseTitle: 'Digital Teaching Tools',
      teacherName: 'Jane Smith',
      enrollmentDate: '2024-03-01',
      completionDate: '2024-03-30',
      status: 'completed',
    },
  ]);

  const [newCourse, setNewCourse] = useState<Partial<TrainingCourse>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    instructor: '',
    maxParticipants: 0,
    status: 'upcoming',
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleAddCourse = () => {
    if (
      newCourse.title &&
      newCourse.description &&
      newCourse.startDate &&
      newCourse.endDate &&
      newCourse.instructor &&
      newCourse.maxParticipants
    ) {
      const course: TrainingCourse = {
        id: Date.now().toString(),
        ...newCourse,
        currentParticipants: 0,
      } as TrainingCourse;
      setCourses([...courses, course]);
      setNewCourse({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        instructor: '',
        maxParticipants: 0,
        status: 'upcoming',
      });
    }
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'blue';
      case 'ongoing':
        return 'green';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getRecordStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled':
        return 'blue';
      case 'in-progress':
        return 'orange';
      case 'completed':
        return 'green';
      default:
        return 'default';
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'courses',
      label: (
        <span>
          <BookOutlined />
          Training Courses
        </span>
      ),
      children: (
        <Card>
          <List
            dataSource={courses}
            renderItem={(course) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {/* Handle edit */}}
                  />,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCourse(course.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      {course.title}
                      <Tag color={getStatusColor(course.status)}>
                        {course.status}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical">
                      <Text>{course.description}</Text>
                      <Text type="secondary">
                        Instructor: {course.instructor}
                      </Text>
                      <Text type="secondary">
                        Dates: {dayjs(course.startDate).format('MMM D, YYYY')} - {dayjs(course.endDate).format('MMM D, YYYY')}
                      </Text>
                      <Progress
                        percent={(course.currentParticipants / course.maxParticipants) * 100}
                        format={() => `${course.currentParticipants}/${course.maxParticipants}`}
                      />
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
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Description">
                <TextArea
                  rows={4}
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Instructor">
                <Input
                  value={newCourse.instructor}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, instructor: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Max Participants">
                <Input
                  type="number"
                  value={newCourse.maxParticipants}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, maxParticipants: parseInt(e.target.value) })
                  }
                />
              </Form.Item>
              <Form.Item label="Start Date">
                <DatePicker
                  value={newCourse.startDate ? dayjs(newCourse.startDate) : null}
                  onChange={(date) =>
                    setNewCourse({ ...newCourse, startDate: date?.format('YYYY-MM-DD') })
                  }
                />
              </Form.Item>
              <Form.Item label="End Date">
                <DatePicker
                  value={newCourse.endDate ? dayjs(newCourse.endDate) : null}
                  onChange={(date) =>
                    setNewCourse({ ...newCourse, endDate: date?.format('YYYY-MM-DD') })
                  }
                />
              </Form.Item>
              <Button type="primary" onClick={handleAddCourse}>
                Add Course
              </Button>
            </Form>
          </div>
        </Card>
      ),
    },
    {
      key: 'records',
      label: (
        <span>
          <HistoryOutlined />
          Training Records
        </span>
      ),
      children: (
        <Card>
          <List
            dataSource={trainingRecords}
            renderItem={(record) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Space>
                      {record.courseTitle}
                      <Tag color={getRecordStatusColor(record.status)}>
                        {record.status}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical">
                      <Text>Teacher: {record.teacherName}</Text>
                      <Text type="secondary">
                        Enrolled: {dayjs(record.enrollmentDate).format('MMM D, YYYY')}
                      </Text>
                      {record.completionDate && (
                        <Text type="secondary">
                          Completed: {dayjs(record.completionDate).format('MMM D, YYYY')}
                        </Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Teacher Training & Development</Title>
        </Col>
      </Row>
      <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
    </div>
  );
};

export default TeacherTraining; 