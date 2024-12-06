import React from 'react';
import { Form, Input, Card, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import QuestionCard from './QuestionCard';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const QuestionSection = ({
    section,
    sectionIndex,
    onUpdate,
    handleAddQuestion,
    handleAddSubQuestion,
    handleRemoveQuestion,
    handleRemoveSubQuestion
}) => {
    return (
        <Card 
            className="section-container"
            title={
                <Form.Item
                    name={['questionSection', 'sections', sectionIndex, 'sectionName']}
                    noStyle
                >
                    <Input placeholder="Section Name" />
                </Form.Item>
            }
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                {/* Section Instructions */}
                <Form.Item
                    label="Section Instructions"
                    name={['questionSection', 'sections', sectionIndex, 'sectionInstructions']}
                >
                    <TextArea 
                        rows={2}
                        placeholder="Enter instructions for this section"
                    />
                </Form.Item>

                {/* Questions */}
                <div className="questions-container">
                    {section.questions.map((question, questionIndex) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            sectionIndex={sectionIndex}
                            questionIndex={questionIndex}
                            onUpdate={onUpdate}
                            handleAddSubQuestion={handleAddSubQuestion}
                            handleRemoveQuestion={handleRemoveQuestion}
                            handleRemoveSubQuestion={handleRemoveSubQuestion}
                        />
                    ))}
                </div>

                {/* Add Question Button */}
                <Button
                    type="dashed"
                    onClick={() => handleAddQuestion(sectionIndex)}
                    icon={<PlusOutlined />}
                    style={{ marginTop: '16px' }}
                >
                    Add Question
                </Button>
            </Space>
        </Card>
    );
};

// Add PropTypes for better development experience
QuestionSection.propTypes = {
    section: PropTypes.shape({
        sectionName: PropTypes.string,
        sectionInstructions: PropTypes.string,
        questions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            mainQuestion: PropTypes.object,
            subQuestions: PropTypes.array,
            style: PropTypes.object
        }))
    }).isRequired,
    sectionIndex: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleAddSubQuestion: PropTypes.func.isRequired,
    handleRemoveQuestion: PropTypes.func.isRequired,
    handleRemoveSubQuestion: PropTypes.func.isRequired
};

export default QuestionSection; 