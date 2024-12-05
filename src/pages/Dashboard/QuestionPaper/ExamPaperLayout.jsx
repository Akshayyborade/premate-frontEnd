import React, { useState, useCallback } from 'react';
import { Form, Input, Select, InputNumber, Switch, Radio, Space, message, Checkbox } from 'antd';
import './ExamPaperLayout.css';
import Button from '../../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

/**
 * ExamPaperLayout Component
 * 
 * Handles the layout and configuration of exam papers.
 * Features:
 * - Basic exam information
 * - Section configuration
 * - Question type management
 * - Paper styling options
 * - Additional features configuration
 * 
 * @param {Object} props
 * @param {Function} props.onConfigSubmit - Callback for configuration submission
 */
const ExamPaperLayout = ({ onConfigSubmit }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // -----------------------------
    // State Management
    // -----------------------------
    const [paperConfig, setPaperConfig] = useState({
        basicInfo: {
            subject: '',
            board: '',
            academicYear: '',
            examType: 'Final',
            totalMarks: '',
            duration: '',
            class: '',
            term: '',
        },
        questionSection: {
            sections: [
                {
                    sectionName: 'Section A',
                    questionTypes: [
                        { 
                            type: 'MCQ', 
                            count: 0, 
                            marksPerQuestion: 0,
                            optionCount: 4,
                            negativeMarking: false,
                            negativeMarkingValue: 0
                        },
                        { 
                            type: 'ShortAnswer', 
                            count: 0, 
                            marksPerQuestion: 0,
                            wordLimit: 0
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
                otherTools: []
            }
        }
    });

    // -----------------------------
    // Update Handlers
    // -----------------------------
    const updateBasicInfo = useCallback((field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                [field]: value
            }
        }));
    }, []);

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
        const { basicInfo, questionSection } = paperConfig;

        // Basic info validations
        if (!basicInfo.subject) errors.subject = 'Subject is required';
        if (!basicInfo.totalMarks || basicInfo.totalMarks <= 0) 
            errors.totalMarks = 'Total marks must be positive';

        // Calculate total marks
        const calculatedTotalMarks = questionSection.sections.reduce((total, section) => {
            return total + section.questionTypes.reduce((sectionTotal, qType) => {
                return sectionTotal + (qType.count * qType.marksPerQuestion);
            }, 0);
        }, 0);

        if (calculatedTotalMarks !== Number(basicInfo.totalMarks)) {
            errors.totalMarks = 'Total marks do not match question configuration';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }, [paperConfig]);

    const handleSubmit = useCallback(async (values) => {
        try {
            const { isValid, errors } = validateConfiguration();

            if (!isValid) {
                Object.keys(errors).forEach(key => {
                    message.error(errors[key]);
                });
                return;
            }

            await onConfigSubmit(paperConfig);
            message.success('Exam paper configuration saved successfully!');
            navigate('/admin/exams/preview');
        } catch (error) {
            message.error('Failed to save configuration: ' + error.message);
        }
    }, [paperConfig, validateConfiguration, onConfigSubmit, navigate]);

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <div className="exam-paper-configuration">
            <h2>Advanced Exam Paper Configuration</h2>
            
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={paperConfig}
                className="config-form"
            >
                {/* Basic Information Section */}
                <div className="configuration-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid">
                        <Form.Item
                            label="Subject"
                            name={['basicInfo', 'subject']}
                            rules={[{ required: true, message: 'Please enter subject' }]}
                        >
                            <Input placeholder="Enter subject name" />
                        </Form.Item>

                        <Form.Item
                            label="Board"
                            name={['basicInfo', 'board']}
                            rules={[{ required: true, message: 'Please select board' }]}
                        >
                            <Select placeholder="Select board">
                                <Option value="CBSE">CBSE</Option>
                                <Option value="ICSE">ICSE</Option>
                                <Option value="State">State Board</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Class"
                            name={['basicInfo', 'class']}
                            rules={[{ required: true, message: 'Please select class' }]}
                        >
                            <Select placeholder="Select class">
                                {[...Array(12)].map((_, i) => (
                                    <Option key={i + 1} value={`${i + 1}`}>
                                        Class {i + 1}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Total Marks"
                            name={['basicInfo', 'totalMarks']}
                            rules={[{ required: true, message: 'Please enter total marks' }]}
                        >
                            <InputNumber min={1} placeholder="Enter total marks" />
                        </Form.Item>

                        <Form.Item
                            label="Duration (minutes)"
                            name={['basicInfo', 'duration']}
                            rules={[{ required: true, message: 'Please enter duration' }]}
                        >
                            <InputNumber min={15} step={15} placeholder="Enter duration" />
                        </Form.Item>

                        <Form.Item
                            label="Exam Type"
                            name={['basicInfo', 'examType']}
                        >
                            <Radio.Group>
                                <Radio value="Final">Final</Radio>
                                <Radio value="Midterm">Midterm</Radio>
                                <Radio value="Practice">Practice</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                </div>

                {/* Question Configuration Section */}
                <div className="configuration-section">
                    <h3>Question Configuration</h3>
                    {paperConfig.questionSection.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="section-config">
                            <h4>{section.sectionName}</h4>
                            {section.questionTypes.map((qType, typeIndex) => (
                                <div key={typeIndex} className="question-type-config">
                                    <Space size="large">
                                        <Form.Item
                                            label="Question Type"
                                            name={['questionSection', 'sections', sectionIndex, 'questionTypes', typeIndex, 'type']}
                                        >
                                            <Select style={{ width: 120 }}>
                                                <Option value="MCQ">MCQ</Option>
                                                <Option value="ShortAnswer">Short Answer</Option>
                                                <Option value="LongAnswer">Long Answer</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Count"
                                            name={['questionSection', 'sections', sectionIndex, 'questionTypes', typeIndex, 'count']}
                                        >
                                            <InputNumber min={0} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Marks per Question"
                                            name={['questionSection', 'sections', sectionIndex, 'questionTypes', typeIndex, 'marksPerQuestion']}
                                        >
                                            <InputNumber min={0} />
                                        </Form.Item>

                                        {qType.type === 'MCQ' && (
                                            <>
                                                <Form.Item
                                                    label="Option Count"
                                                    name={['questionSection', 'sections', sectionIndex, 'questionTypes', typeIndex, 'optionCount']}
                                                >
                                                    <InputNumber min={2} max={6} />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Negative Marking"
                                                    name={['questionSection', 'sections', sectionIndex, 'questionTypes', typeIndex, 'negativeMarking']}
                                                    valuePropName="checked"
                                                >
                                                    <Switch />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Space>
                                </div>
                            ))}
                        </div>
                    ))}
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

                        <Form.Item
                            label="Assistive Tools"
                            name={['additionalFeatures', 'assistiveTools']}
                        >
                            <Checkbox.Group>
                                <Checkbox value="calculator">Calculator</Checkbox>
                                <Checkbox value="graphPaper">Graph Paper</Checkbox>
                                <Checkbox value="formulaSheet">Formula Sheet</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <Space size="large">
                        <Button type="primary" htmlType="submit">
                            Generate Configuration
                        </Button>
                        <Button onClick={() => navigate('/admin/exams')}>
                            Cancel
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default ExamPaperLayout;