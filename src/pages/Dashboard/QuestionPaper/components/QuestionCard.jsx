import React from 'react';
import { Card, Form, Input, InputNumber, Button, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

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
    // Ensure question has all required properties with defaults
    const safeQuestion = {
        id: question?.id || '',
        mainQuestion: {
            content: question?.mainQuestion?.content || '',
            marks: question?.mainQuestion?.marks || 0,
            instructions: question?.mainQuestion?.instructions || '',
            ...question?.mainQuestion
        },
        subQuestions: question?.subQuestions || [],
        style: question?.style || {}
    };

    // Calculate total marks safely
    const calculateTotalMarks = () => {
        const mainMarks = safeQuestion.mainQuestion?.marks || 0;
        const subMarks = safeQuestion.subQuestions.reduce((total, sub) => 
            total + (sub?.marks || 0), 0);
        return mainMarks + subMarks;
    };

    return (
        <Card 
            className="question-card"
            title={`Question ${questionIndex + 1}`}
            extra={
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)}
                >
                    Remove Question
                </Button>
            }
        >
            {/* Main Question */}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Form.Item
                    label="Question Content"
                    name={['questionSection', 'sections', sectionIndex, 'questions', questionIndex, 'mainQuestion', 'content']}
                >
                    <TextArea 
                        rows={2}
                        placeholder="Enter question content"
                        value={safeQuestion.mainQuestion.content}
                        onChange={(e) => {
                            onUpdate(sectionIndex, {
                                ...safeQuestion,
                                mainQuestion: {
                                    ...safeQuestion.mainQuestion,
                                    content: e.target.value
                                }
                            });
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Marks"
                    name={['questionSection', 'sections', sectionIndex, 'questions', questionIndex, 'mainQuestion', 'marks']}
                >
                    <InputNumber
                        min={0}
                        value={safeQuestion.mainQuestion.marks}
                        onChange={(value) => {
                            onUpdate(sectionIndex, {
                                ...safeQuestion,
                                mainQuestion: {
                                    ...safeQuestion.mainQuestion,
                                    marks: value || 0
                                }
                            });
                        }}
                    />
                </Form.Item>

                {/* Sub Questions */}
                {safeQuestion.subQuestions.map((subQuestion, subIndex) => (
                    <Card 
                        key={subIndex}
                        size="small"
                        title={`Sub Question ${subIndex + 1}`}
                        extra={
                            <Button
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemoveSubQuestion(sectionIndex, questionIndex, subIndex)}
                            >
                                Remove
                            </Button>
                        }
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form.Item
                                label="Content"
                                name={['questionSection', 'sections', sectionIndex, 'questions', questionIndex, 'subQuestions', subIndex, 'content']}
                            >
                                <TextArea 
                                    rows={2}
                                    placeholder="Enter sub-question content"
                                    value={subQuestion?.content || ''}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Marks"
                                name={['questionSection', 'sections', sectionIndex, 'questions', questionIndex, 'subQuestions', subIndex, 'marks']}
                            >
                                <InputNumber
                                    min={0}
                                    value={subQuestion?.marks || 0}
                                />
                            </Form.Item>
                        </Space>
                    </Card>
                ))}

                <Button
                    type="dashed"
                    onClick={() => handleAddSubQuestion(sectionIndex, questionIndex)}
                    icon={<PlusOutlined />}
                >
                    Add Sub-Question
                </Button>

                <div className="question-summary">
                    Total Marks: {calculateTotalMarks()}
                </div>
            </Space>
        </Card>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        mainQuestion: PropTypes.shape({
            content: PropTypes.string,
            marks: PropTypes.number,
            instructions: PropTypes.string
        }),
        subQuestions: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            marks: PropTypes.number
        })),
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