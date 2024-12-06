import React from 'react';
import { Form, Input, Select, InputNumber, Switch, Space, Card, Upload, Button } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import SubQuestionForm from './SubQuestionForm';

const { Option } = Select;
const { TextArea } = Input;

const QuestionCard = ({
    question,
    sectionIndex,
    questionIndex,
    onUpdate,
    handleAddSubQuestion,
    handleRemoveQuestion,
    handleRemoveSubQuestion
}) => {
    return (
        <Card
            className="question-card"
            extra={
                <Button
                    type="text"
                    danger
                    onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)}
                    icon={<DeleteOutlined />}
                >
                    Remove Question
                </Button>
            }
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                {/* Main Question Content */}
                <Form.Item
                    label="Question Content"
                    name={[
                        'questionSection',
                        'sections',
                        sectionIndex,
                        'questions',
                        questionIndex,
                        'mainQuestion',
                        'content'
                    ]}
                    rules={[{ required: true, message: 'Please enter question content' }]}
                >
                    <TextArea rows={3} placeholder="Enter the main question" />
                </Form.Item>

                <Space wrap>
                    {/* Content Type */}
                    <Form.Item
                        label="Content Type"
                        name={[
                            'questionSection',
                            'sections',
                            sectionIndex,
                            'questions',
                            questionIndex,
                            'mainQuestion',
                            'contentType'
                        ]}
                    >
                        <Select style={{ width: 120 }}>
                            <Option value="text">Text</Option>
                            <Option value="table">Table</Option>
                            <Option value="diagram">Diagram</Option>
                            <Option value="paragraph">Paragraph</Option>
                        </Select>
                    </Form.Item>

                    {/* Marks */}
                    <Form.Item
                        label="Marks"
                        name={[
                            'questionSection',
                            'sections',
                            sectionIndex,
                            'questions',
                            questionIndex,
                            'mainQuestion',
                            'marks'
                        ]}
                        rules={[{ required: true, message: 'Please enter marks' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    {/* Instructions */}
                    <Form.Item
                        label="Instructions"
                        name={[
                            'questionSection',
                            'sections',
                            sectionIndex,
                            'questions',
                            questionIndex,
                            'mainQuestion',
                            'instructions'
                        ]}
                    >
                        <Input placeholder="e.g., Attempt any two" />
                    </Form.Item>
                </Space>

                {/* Attachments */}
                <Form.Item
                    label="Attachments"
                    name={[
                        'questionSection',
                        'sections',
                        sectionIndex,
                        'questions',
                        questionIndex,
                        'mainQuestion',
                        'attachments'
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        multiple
                        beforeUpload={() => false}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Sub Questions */}
                <div className="sub-questions">
                    {question.subQuestions.map((subQ, subIndex) => (
                        <SubQuestionForm
                            key={subQ.id}
                            sectionIndex={sectionIndex}
                            questionIndex={questionIndex}
                            subIndex={subIndex}
                            onRemove={() => handleRemoveSubQuestion(sectionIndex, questionIndex, subIndex)}
                        />
                    ))}
                </div>

                {/* Add Sub-Question Button */}
                <Button
                    type="dashed"
                    onClick={() => handleAddSubQuestion(sectionIndex, questionIndex)}
                    icon={<PlusOutlined />}
                >
                    Add Sub-Question
                </Button>

                {/* Question Styling */}
                <Space>
                    <Form.Item
                        label="Numbering Style"
                        name={[
                            'questionSection',
                            'sections',
                            sectionIndex,
                            'questions',
                            questionIndex,
                            'style',
                            'numbering'
                        ]}
                    >
                        <Select style={{ width: 120 }}>
                            <Option value="numeric">1, 2, 3</Option>
                            <Option value="roman">i, ii, iii</Option>
                            <Option value="alphabetic">a, b, c</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Indent Sub-questions"
                        name={[
                            'questionSection',
                            'sections',
                            sectionIndex,
                            'questions',
                            questionIndex,
                            'style',
                            'indent'
                        ]}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Space>
            </Space>
        </Card>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        mainQuestion: PropTypes.object,
        subQuestions: PropTypes.array,
        style: PropTypes.object
    }).isRequired,
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    handleAddSubQuestion: PropTypes.func.isRequired,
    handleRemoveQuestion: PropTypes.func.isRequired,
    handleRemoveSubQuestion: PropTypes.func.isRequired
};

export default QuestionCard; 