import React from 'react';
import { Card, Form, Input, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const SectionCard = ({
    section,
    secIndex,
    onAddQuestion,
    onRemoveSection,
    onGenerateAI,
    loading,
    aiSuggestions,
    form
}) => {
    return (
        <Card
            className="section-card"
            title={`Section ${section.id}`}
            extra={
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onRemoveSection(section.id)}
                >
                    Remove Section
                </Button>
            }
        >
            <Form.Item
                name={['sections', secIndex, 'title']}
                label="Section Title"
                rules={[{ required: true, message: 'Please enter section title' }]}
            >
                <Input placeholder="Enter section title" />
            </Form.Item>

            <Space direction="vertical" style={{ width: '100%' }}>
                {section.questions.map((question, qIndex) => (
                    <Card key={qIndex} size="small">
                        <Form.Item
                            name={['sections', secIndex, 'questions', qIndex, 'text']}
                            rules={[{ required: true, message: 'Question text is required' }]}
                        >
                            <Input.TextArea placeholder="Enter question text" />
                        </Form.Item>

                        <Button
                            type="dashed"
                            onClick={() => onGenerateAI(qIndex)}
                            loading={loading}
                        >
                            Generate AI Suggestions
                        </Button>

                        {aiSuggestions.length > 0 && qIndex === aiSuggestions.activeIndex && (
                            <div className="ai-suggestions">
                                {/* AI suggestions content */}
                            </div>
                        )}
                    </Card>
                ))}

                <Button type="dashed" onClick={onAddQuestion}>
                    Add Question
                </Button>
            </Space>
        </Card>
    );
};

SectionCard.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        questions: PropTypes.array
    }).isRequired,
    secIndex: PropTypes.number.isRequired,
    onAddQuestion: PropTypes.func.isRequired,
    onRemoveSection: PropTypes.func.isRequired,
    onGenerateAI: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    aiSuggestions: PropTypes.array,
    form: PropTypes.object
};

export default SectionCard;
