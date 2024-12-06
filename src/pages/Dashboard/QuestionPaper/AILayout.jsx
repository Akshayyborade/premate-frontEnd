import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Card, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AILayout = ({ basicConfig, onConfigSubmit }) => {
    const [form] = Form.useForm();

    const [sections, setSections] = useState([
        {
            id: 1,
            sectionType: 'mcq', // mcq, short, long
            questionCount: 5,
            questionsWithSubQuestions: [],
            totalMarks: 10
        }
    ]);

    const handleGenerateQuestion = async (sectionId) => {
        try {
            const values = await form.validateFields();
            const section = sections.find(s => s.id === sectionId);
            
            // Here you would make an API call to your AI service
            // Example payload structure:
            const aiRequestPayload = {
                subject: basicConfig.subject,
                class: basicConfig.class,
                sectionType: section.sectionType,
                questionCount: section.questionCount,
                marksPerQuestion: section.totalMarks / section.questionCount,
                subQuestionRequirements: values.subQuestionRequirements,
                difficultyLevel: values.difficultyLevel,
                topicsToInclude: values.topicsToInclude,
                topicsToExclude: values.topicsToExclude
            };

            // TODO: Replace with actual API call
            message.info('Generating questions using AI...');
        } catch (error) {
            message.error('Failed to generate questions');
        }
    };

    return (
        <Form form={form} layout="vertical">
            <Card title="AI Generation Settings">
                <Space direction="vertical" style={{ width: '100%' }}>
                    {sections.map((section, index) => (
                        <Card 
                            key={section.id} 
                            size="small" 
                            title={`Section ${index + 1}`}
                        >
                            <Space wrap>
                                <Form.Item label="Section Type">
                                    <Select
                                        value={section.sectionType}
                                        onChange={(value) => {
                                            const newSections = [...sections];
                                            newSections[index].sectionType = value;
                                            setSections(newSections);
                                        }}
                                    >
                                        <Select.Option value="mcq">Multiple Choice</Select.Option>
                                        <Select.Option value="short">Short Answer</Select.Option>
                                        <Select.Option value="long">Long Answer</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Number of Questions">
                                    <InputNumber
                                        min={1}
                                        value={section.questionCount}
                                        onChange={(value) => {
                                            const newSections = [...sections];
                                            newSections[index].questionCount = value;
                                            setSections(newSections);
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item label="Total Marks">
                                    <InputNumber
                                        min={1}
                                        value={section.totalMarks}
                                        onChange={(value) => {
                                            const newSections = [...sections];
                                            newSections[index].totalMarks = value;
                                            setSections(newSections);
                                        }}
                                    />
                                </Form.Item>

                                <Button 
                                    type="primary"
                                    onClick={() => handleGenerateQuestion(section.id)}
                                >
                                    Generate Questions
                                </Button>
                            </Space>

                            <Form.Item label="Topics to Include">
                                <Select mode="tags" placeholder="Enter topics to include">
                                    {/* Add your subject-specific topics here */}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Topics to Exclude">
                                <Select mode="tags" placeholder="Enter topics to exclude">
                                    {/* Add your subject-specific topics here */}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Difficulty Level">
                                <Select>
                                    <Select.Option value="easy">Easy</Select.Option>
                                    <Select.Option value="medium">Medium</Select.Option>
                                    <Select.Option value="hard">Hard</Select.Option>
                                    <Select.Option value="mixed">Mixed</Select.Option>
                                </Select>
                            </Form.Item>
                        </Card>
                    ))}

                    <Button 
                        type="dashed" 
                        onClick={() => setSections([...sections, {
                            id: Date.now(),
                            sectionType: 'mcq',
                            questionCount: 5,
                            questionsWithSubQuestions: [],
                            totalMarks: 10
                        }])}
                        icon={<PlusOutlined />}
                    >
                        Add Section
                    </Button>
                </Space>
            </Card>
        </Form>
    );
};

export default AILayout; 