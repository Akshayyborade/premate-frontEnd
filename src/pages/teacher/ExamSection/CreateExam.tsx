import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Typography,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Divider,
  List,
  message,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

const CreateExam: React.FC = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Here you would typically make an API call to save the exam
      console.log('Exam details:', values);
      console.log('Questions:', questions);
      message.success('Exam created successfully!');
      form.resetFields();
      setQuestions([]);
    } catch (error) {
      message.error('Failed to create exam. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={3}>Create New Exam</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            duration: 120,
            totalMarks: 100,
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Form.Item
              name="title"
              label="Exam Title"
              rules={[{ required: true, message: 'Please enter exam title' }]}
            >
              <Input placeholder="Enter exam title" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please select subject' }]}
            >
              <Select placeholder="Select subject">
                <Option value="mathematics">Mathematics</Option>
                <Option value="science">Science</Option>
                <Option value="english">English</Option>
              </Select>
            </Form.Item>

            <Space>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: 'Please select time' }]}
              >
                <TimePicker format="HH:mm" />
              </Form.Item>

              <Form.Item
                name="duration"
                label="Duration (minutes)"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <InputNumber min={30} max={180} />
              </Form.Item>

              <Form.Item
                name="totalMarks"
                label="Total Marks"
                rules={[{ required: true, message: 'Please enter total marks' }]}
              >
                <InputNumber min={10} max={200} />
              </Form.Item>
            </Space>

            <Form.Item
              name="instructions"
              label="Instructions"
            >
              <TextArea rows={4} placeholder="Enter exam instructions" />
            </Form.Item>

            <Divider>Questions</Divider>

            <List
              dataSource={questions}
              renderItem={(question) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeQuestion(question.id)}
                    />,
                  ]}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                      placeholder="Enter question"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    />
                    <Space direction="vertical">
                      {question.options.map((option, index) => (
                        <Input
                          key={index}
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options];
                            newOptions[index] = e.target.value;
                            updateQuestion(question.id, 'options', newOptions);
                          }}
                        />
                      ))}
                    </Space>
                    <Space>
                      <Select
                        placeholder="Correct Answer"
                        value={question.correctAnswer}
                        onChange={(value) => updateQuestion(question.id, 'correctAnswer', value)}
                        style={{ width: 200 }}
                      >
                        {question.options.map((_, index) => (
                          <Option key={index} value={`option${index + 1}`}>
                            Option {index + 1}
                          </Option>
                        ))}
                      </Select>
                      <InputNumber
                        placeholder="Marks"
                        value={question.marks}
                        onChange={(value) => updateQuestion(question.id, 'marks', value)}
                        min={1}
                        max={10}
                      />
                    </Space>
                  </Space>
                </List.Item>
              )}
            />

            <Button
              type="dashed"
              onClick={addQuestion}
              icon={<PlusOutlined />}
              style={{ width: '100%' }}
            >
              Add Question
            </Button>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                style={{ width: '100%' }}
              >
                Create Exam
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Space>
    </Card>
  );
};

export default CreateExam; 