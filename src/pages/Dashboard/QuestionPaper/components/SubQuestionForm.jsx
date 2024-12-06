import React from 'react';
import { Form, Input, Select, InputNumber, Card, Space, Upload, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Option } = Select;
const { TextArea } = Input;

const SubQuestionForm = ({
    sectionIndex,
    questionIndex,
    subIndex,
    onRemove
}) => {
    return (
        <Card 
            size="small" 
            className="sub-question-form"
            extra={
                <Button
                    type="text"
                    danger
                    onClick={onRemove}
                    icon={<DeleteOutlined />}
                >
                    Remove
                </Button>
            }
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                {/* Sub Question Content */}
                <Form.Item
                    label="Sub Question Content"
                    name={[
                        'questionSection',
                        'sections',
                        sectionIndex,
                        'questions',
                        questionIndex,
                        'subQuestions',
                        subIndex,
                        'content'
                    ]}
                    rules={[{ required: true, message: 'Please enter sub-question content' }]}
                >
                    <TextArea rows={2} placeholder="Enter the sub-question" />
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
                            'subQuestions',
                            subIndex,
                            'contentType'
                        ]}
                    >
                        <Select style={{ width: 120 }}>
                            <Option value="text">Text</Option>
                            <Option value="table">Table</Option>
                            <Option value="diagram">Diagram</Option>
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
                            'subQuestions',
                            subIndex,
                            'marks'
                        ]}
                        rules={[{ required: true, message: 'Please enter marks' }]}
                    >
                        <InputNumber min={0} />
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
                        'subQuestions',
                        subIndex,
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
            </Space>
        </Card>
    );
};

SubQuestionForm.propTypes = {
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    subIndex: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default SubQuestionForm; 