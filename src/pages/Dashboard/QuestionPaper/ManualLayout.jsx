import React, { useState, useCallback } from 'react';
import { Form, Input, Select, InputNumber, Switch, Radio, Space, message, Card, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import QuestionSection from './components/QuestionSection';
import SubQuestionForm from './components/SubQuestionForm';

const { Option } = Select;
const { TextArea } = Input;

const ManualLayout = ({ basicConfig, onConfigSubmit }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // -----------------------------
    // State Management
    // -----------------------------
    const [paperConfig, setPaperConfig] = useState({
        questionSection: {
            sections: [
                {
                    sectionName: 'Section A',
                    sectionInstructions: '',
                    questions: [
                        {
                            id: 1,
                            mainQuestion: {
                                content: '',
                                contentType: 'text', // text, table, diagram, paragraph
                                marks: 0,
                                instructions: '', // e.g., "Attempt any two"
                                attachments: [], // for diagrams/images
                            },
                            subQuestions: [
                                {
                                    id: 1,
                                    content: '',
                                    contentType: 'text',
                                    marks: 0,
                                    attachments: [],
                                }
                            ],
                            style: {
                                numbering: 'numeric', // numeric, roman, alphabetic
                                indent: true,
                            }
                        }
                    ]
                }
            ]
        },
        paperStyle: {
            layout: 'Bullets',
            fontSize: 12,
            fontFamily: 'Arial',
            pageOrientation: 'Portrait',
            marginSettings: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1
            }
        },
        additionalFeatures: {
            languageOptions: [],
            optionalQuestions: {
                enabled: false,
                optionalQuestionCount: 0,
                totalQuestionsToAttempt: 0
            },
            specialInstructions: '',
            assistiveTools: {
                calculatorAllowed: false,
                graphPaperAllowed: false,
                formulaSheetAllowed: false
            }
        }
    });

    // -----------------------------
    // Update Handlers
    // -----------------------------
    const updateSectionQuestionType = useCallback((sectionIndex, questionTypeIndex, field, value) => {
        setPaperConfig(prev => {
            const updatedSections = [...prev.questionSection.sections];
            updatedSections[sectionIndex].questionTypes[questionTypeIndex] = {
                ...updatedSections[sectionIndex].questionTypes[questionTypeIndex],
                [field]: value
            };
            return {
                ...prev,
                questionSection: {
                    ...prev.questionSection,
                    sections: updatedSections
                }
            };
        });
    }, []);

    // -----------------------------
    // Validation and Submission
    // -----------------------------
    const validateConfiguration = useCallback(() => {
        const errors = {};

        // Calculate total marks
        const calculatedTotalMarks = paperConfig.questionSection.sections.reduce((total, section) => {
            return total + section.questions.reduce((sectionTotal, question) => {
                const mainQuestionMarks = question.mainQuestion.marks || 0;
                const subQuestionMarks = question.subQuestions.reduce((subTotal, subQ) => 
                    subTotal + (subQ.marks || 0), 0);
                return sectionTotal + mainQuestionMarks + subQuestionMarks;
            }, 0);
        }, 0);

        if (calculatedTotalMarks !== Number(basicConfig.totalMarks)) {
            errors.totalMarks = 'Total marks do not match question configuration';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }, [paperConfig, basicConfig.totalMarks]);

    const handleSubmit = useCallback(async (values) => {
        try {
            const { isValid, errors } = validateConfiguration();

            if (!isValid) {
                Object.keys(errors).forEach(key => {
                    message.error(errors[key]);
                });
                return;
            }

            await onConfigSubmit({ ...basicConfig, ...values });
            message.success('Exam paper configuration saved successfully!');
            navigate('/admin/exams/preview');
        } catch (error) {
            message.error('Failed to save configuration: ' + error.message);
        }
    }, [basicConfig, validateConfiguration, onConfigSubmit, navigate]);

    // -----------------------------
    // Section and Question Handlers
    // -----------------------------
    const handleAddSection = () => {
        setPaperConfig(prev => ({
            ...prev,
            questionSection: {
                sections: [
                    ...prev.questionSection.sections,
                    {
                        sectionName: `Section ${String.fromCharCode(65 + prev.questionSection.sections.length)}`,
                        sectionInstructions: '',
                        questions: []
                    }
                ]
            }
        }));
    };

    const handleAddQuestion = (sectionIndex) => {
        setPaperConfig(prev => {
            const newSections = [...prev.questionSection.sections];
            newSections[sectionIndex].questions.push({
                id: Date.now(),
                mainQuestion: {
                    content: '',
                    contentType: 'text',
                    marks: 0,
                    instructions: '',
                    attachments: [],
                },
                subQuestions: [],
                style: {
                    numbering: 'numeric',
                    indent: true,
                }
            });
            return {
                ...prev,
                questionSection: { sections: newSections }
            };
        });
    };

    const handleAddSubQuestion = (sectionIndex, questionIndex) => {
        setPaperConfig(prev => {
            const newSections = [...prev.questionSection.sections];
            newSections[sectionIndex].questions[questionIndex].subQuestions.push({
                id: Date.now(),
                content: '',
                contentType: 'text',
                marks: 0,
                attachments: [],
            });
            return {
                ...prev,
                questionSection: { sections: newSections }
            };
        });
    };

    const handleRemoveQuestion = (sectionIndex, questionIndex) => {
        setPaperConfig(prev => {
            const newSections = [...prev.questionSection.sections];
            newSections[sectionIndex].questions.splice(questionIndex, 1);
            return {
                ...prev,
                questionSection: { sections: newSections }
            };
        });
    };

    const handleRemoveSubQuestion = (sectionIndex, questionIndex, subIndex) => {
        setPaperConfig(prev => {
            const newSections = [...prev.questionSection.sections];
            newSections[sectionIndex].questions[questionIndex].subQuestions.splice(subIndex, 1);
            return {
                ...prev,
                questionSection: { sections: newSections }
            };
        });
    };

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={paperConfig}
        >
            {/* Question Configuration Section */}
            <div className="configuration-section">
                <h3>Question Configuration</h3>
                {paperConfig.questionSection.sections.map((section, sectionIndex) => (
                    <QuestionSection
                        key={sectionIndex}
                        section={section}
                        sectionIndex={sectionIndex}
                        onUpdate={updateSectionQuestionType}
                        handleAddQuestion={handleAddQuestion}
                        handleAddSubQuestion={handleAddSubQuestion}
                        handleRemoveQuestion={handleRemoveQuestion}
                        handleRemoveSubQuestion={handleRemoveSubQuestion}
                    />
                ))}
                <Button
                    type="dashed"
                    onClick={handleAddSection}
                    icon={<PlusOutlined />}
                    style={{ marginTop: '16px' }}
                >
                    Add New Section
                </Button>
            </div>

            {/* Paper Style Section */}
            <div className="configuration-section">
                <h3>Paper Style</h3>
                <div className="form-grid">
                    <Form.Item
                        label="Layout"
                        name={['paperStyle', 'layout']}
                    >
                        <Select>
                            <Option value="Bullets">Bullets</Option>
                            <Option value="Numbers">Numbers</Option>
                            <Option value="Roman">Roman Numerals</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Font Size"
                        name={['paperStyle', 'fontSize']}
                    >
                        <InputNumber min={8} max={16} />
                    </Form.Item>

                    <Form.Item
                        label="Font Family"
                        name={['paperStyle', 'fontFamily']}
                    >
                        <Select>
                            <Option value="Arial">Arial</Option>
                            <Option value="Times">Times New Roman</Option>
                            <Option value="Calibri">Calibri</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Page Orientation"
                        name={['paperStyle', 'pageOrientation']}
                    >
                        <Radio.Group>
                            <Radio value="Portrait">Portrait</Radio>
                            <Radio value="Landscape">Landscape</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div>

            {/* Additional Features Section */}
            <div className="configuration-section">
                <h3>Additional Features</h3>
                <div className="form-grid">
                    <Form.Item
                        label="Language Options"
                        name={['additionalFeatures', 'languageOptions']}
                    >
                        <Select mode="multiple" placeholder="Select languages">
                            <Option value="english">English</Option>
                            <Option value="hindi">Hindi</Option>
                            <Option value="gujarati">Gujarati</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Optional Questions"
                        name={['additionalFeatures', 'optionalQuestions', 'enabled']}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Special Instructions"
                        name={['additionalFeatures', 'specialInstructions']}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Assistive Tools">
                        <Space direction="vertical">
                            <Form.Item
                                name={['additionalFeatures', 'assistiveTools', 'calculatorAllowed']}
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Calculator</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name={['additionalFeatures', 'assistiveTools', 'graphPaperAllowed']}
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Graph Paper</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name={['additionalFeatures', 'assistiveTools', 'formulaSheetAllowed']}
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Formula Sheet</Checkbox>
                            </Form.Item>
                        </Space>
                    </Form.Item>
                </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
                <Space size="large">
                    <Button type="primary" htmlType="submit">
                        Generate Paper
                    </Button>
                    <Button onClick={() => navigate('/admin/exams')}>
                        Cancel
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default ManualLayout; 