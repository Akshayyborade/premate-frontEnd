import React from 'react';
import { Form, Input, Card, Button, Space, InputNumber, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import QuestionCard from './QuestionCard';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const { Option } = Select;

const QuestionSection = ({
    section,
    sectionIndex,
    onUpdate,
    handleAddQuestion,
    handleAddSubQuestion,
    handleRemoveQuestion,
    handleRemoveSubQuestion
}) => {
    // Ensure section has all required properties with defaults
    const safeSection = {
        sectionName: section?.sectionName || '',
        sectionInstructions: section?.sectionInstructions || '',
        numberOfQuestions: section?.numberOfQuestions || 0,
        numberingFormat: section?.numberingFormat || 'numeric',
        textStyle: section?.textStyle || 'normal',
        questions: section?.questions?.map(q => ({
            id: q?.id || Math.random().toString(36).substr(2, 9),
            mainQuestion: {
                content: q?.mainQuestion?.content || '',
                marks: q?.mainQuestion?.marks || 0,
                instructions: q?.mainQuestion?.instructions || ''
            },
            subQuestions: (q?.subQuestions || []).map(sq => ({
                content: sq?.content || '',
                marks: sq?.marks || 0,
                instructions: sq?.instructions || ''
            }))
        })) || []
    };

    // Calculate total marks safely
    const calculateSectionMarks = () => {
        return (safeSection.questions || []).reduce((total, q) => {
            const mainMarks = q?.mainQuestion?.marks || 0;
            const subMarks = (q?.subQuestions || []).reduce((subTotal, sq) => 
                subTotal + (sq?.marks || 0), 0);
            return total + mainMarks + subMarks;
        }, 0);
    };

    // Safe question rendering function
    const renderQuestionOverview = (question, idx) => {
        if (!question || !question.mainQuestion) return null;

        return (
            <div key={question.id || idx} style={{ marginBottom: '8px' }}>
                <Space>
                    <span>Q{idx + 1}:</span>
                    <span>{question.mainQuestion.content || '[Empty Question]'}</span>
                    <span>({question.mainQuestion.marks || 0} marks)</span>
                    <span>{(question.subQuestions || []).length} sub-questions</span>
                </Space>
            </div>
        );
    };

    return (
        <Card 
            className="section-container"
            title={
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Form.Item
                        name={['questionSection', 'sections', sectionIndex, 'sectionName']}
                        noStyle
                    >
                        <Input 
                            placeholder="Section Name"
                            value={safeSection.sectionName}
                            onChange={(e) => {
                                onUpdate(sectionIndex, {
                                    ...safeSection,
                                    sectionName: e.target.value
                                });
                            }}
                        />
                    </Form.Item>
                    
                    <div className="section-summary" style={{ fontSize: '12px', color: '#666' }}>
                        Questions: {safeSection.questions.length} | 
                        Total Marks: {calculateSectionMarks()}
                    </div>
                </Space>
            }
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                {/* Section Configuration */}
                <Card size="small">
                    <Space wrap>
                        <Form.Item
                            label="Main Questions"
                            name={['questionSection', 'sections', sectionIndex, 'numberOfQuestions']}
                        >
                            <InputNumber 
                                min={0} 
                                value={safeSection.numberOfQuestions}
                                placeholder="No. of Questions"
                                onChange={(value) => {
                                    const diff = value - safeSection.questions.length;
                                    if (diff > 0) {
                                        // Add questions
                                        for (let i = 0; i < diff; i++) {
                                            handleAddQuestion(sectionIndex);
                                        }
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Numbering Format"
                            name={['questionSection', 'sections', sectionIndex, 'numberingFormat']}
                        >
                            <Select 
                                style={{ width: 120 }} 
                                value={safeSection.numberingFormat}
                            >
                                <Option value="numeric">1, 2, 3</Option>
                                <Option value="roman">I, II, III</Option>
                                <Option value="alphabetic">a, b, c</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Text Style"
                            name={['questionSection', 'sections', sectionIndex, 'textStyle']}
                        >
                            <Select 
                                style={{ width: 120 }} 
                                value={safeSection.textStyle}
                            >
                                <Option value="normal">Normal</Option>
                                <Option value="bold">Bold</Option>
                                <Option value="italic">Italic</Option>
                            </Select>
                        </Form.Item>
                    </Space>
                </Card>

                <Form.Item
                    label="Section Instructions"
                    name={['questionSection', 'sections', sectionIndex, 'sectionInstructions']}
                >
                    <TextArea 
                        rows={2}
                        placeholder="Enter instructions for this section"
                        value={safeSection.sectionInstructions}
                        onChange={(e) => {
                            onUpdate(sectionIndex, {
                                ...safeSection,
                                sectionInstructions: e.target.value
                            });
                        }}
                    />
                </Form.Item>

                {/* Questions List Summary */}
                <Card size="small" title="Questions Overview">
                    {safeSection.questions.map(renderQuestionOverview)}
                </Card>

                {/* Questions Container */}
                <div className="questions-container">
                    {safeSection.questions.map((question, questionIndex) => (
                        <QuestionCard
                            key={question.id || questionIndex}
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

QuestionSection.propTypes = {
    section: PropTypes.shape({
        sectionName: PropTypes.string,
        sectionInstructions: PropTypes.string,
        numberOfQuestions: PropTypes.number,
        numberingFormat: PropTypes.string,
        textStyle: PropTypes.string,
        questions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            mainQuestion: PropTypes.shape({
                content: PropTypes.string,
                marks: PropTypes.number,
                instructions: PropTypes.string
            }),
            subQuestions: PropTypes.arrayOf(PropTypes.shape({
                content: PropTypes.string,
                marks: PropTypes.number,
                instructions: PropTypes.string
            }))
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