import React, { useCallback } from 'react';
import { Form, Input, Select, InputNumber, Switch, Radio, Space, Card, Upload, Button, Checkbox, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePaperConfig } from './context/PaperConfigContext';
import QuestionSection from './components/QuestionSection';
import SubQuestionForm from './components/SubQuestionForm';

const { Option } = Select;
const { TextArea } = Input;

const ManualLayout = ({ basicConfig, onConfigSubmit, loading }) => {
    const [form] = Form.useForm();
    const { 
        state: { sections }, 
        addSection, 
        removeSection, 
        updateSection 
    } = usePaperConfig();

    // -----------------------------
    // Section Handlers
    // -----------------------------
    const handleAddSection = useCallback(() => {
        const sectionId = String.fromCharCode(65 + sections.length); // A, B, C, etc.
        addSection({
            id: sectionId,
            sectionName: `Section ${sectionId}`,
            sectionInstructions: '',
            numberOfQuestions: 1,
            numberingFormat: 'numeric',
            textStyle: 'normal',
            questions: [{  // Add a default question
                id: 1,
                mainQuestion: {
                    content: '',
                    marks: 0,
                    instructions: '',
                },
                subQuestions: [],
                totalMarks: 0
            }]
        });
    }, [sections.length, addSection]);

    const handleUpdateSection = useCallback((sectionId, updates) => {
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            updateSection({
                ...section,
                ...updates,
                questions: updates.questions?.map(q => ({
                    ...q,
                    totalMarks: calculateQuestionMarks(q)
                })) || section.questions
            });
        }
    }, [updateSection, sections]);

    // Calculate total marks for a question
    const calculateQuestionMarks = (question) => {
        const mainMarks = question.mainQuestion?.marks || 0;
        const subMarks = question.subQuestions?.reduce((total, sub) => 
            total + (sub.marks || 0), 0) || 0;
        return mainMarks + subMarks;
    };

    const handleAddQuestion = (sectionIndex) => {
        // Logic to add a question to the specified section
        const section = sections[sectionIndex];
        if (section) {
            const newQuestion = {
                id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
                mainQuestion: {
                    content: '',
                    marks: 0,
                    instructions: ''
                },
                subQuestions: []
            };
            updateSection({
                ...section,
                questions: [...section.questions, newQuestion]
            });
        }
    };

    const handleRemoveQuestion = (sectionIndex, questionIndex) => {
        // Logic to remove a question from the specified section
        const section = sections[sectionIndex];
        if (section) {
            updateSection({
                ...section,
                questions: section.questions.filter((_, idx) => idx !== questionIndex)
            });
        }
    };

    const handleAddSubQuestion = (sectionIndex, questionIndex) => {
        // Logic to add a sub-question to the specified question
        const section = sections[sectionIndex];
        if (section) {
            const question = section.questions[questionIndex];
            if (question) {
                const newSubQuestion = {
                    content: '',
                    marks: 0,
                    instructions: ''
                };
                updateSection({
                    ...section,
                    questions: section.questions.map((q, idx) => 
                        idx === questionIndex 
                            ? { ...q, subQuestions: [...q.subQuestions, newSubQuestion] } 
                            : q
                    )
                });
            }
        }
    };

    // -----------------------------
    // Form Submission
    // -----------------------------
    const handleSubmit = useCallback(async (values) => {
        // Calculate total marks for validation
        const totalMarks = sections.reduce((sectionTotal, section) => {
            return sectionTotal + section.questions.reduce((questionTotal, question) => {
                return questionTotal + calculateQuestionMarks(question);
            }, 0);
        }, 0);

        // Validate total marks match basic config
        if (totalMarks !== Number(basicConfig.totalMarks)) {
            message.error(`Total marks (${totalMarks}) do not match the configured total (${basicConfig.totalMarks})`);
            return;
        }

        const payload = {
            ...basicConfig,
            sections: sections.map(section => ({
                ...section,
                questions: section.questions.map(question => ({
                    ...question,
                    totalMarks: calculateQuestionMarks(question)
                }))
            })),
            paperStyle: values.paperStyle,
            additionalFeatures: values.additionalFeatures
        };

        await onConfigSubmit(payload);
    }, [basicConfig, sections, onConfigSubmit]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            disabled={loading}
        >
            {/* Question Configuration Section */}
            <div className="configuration-section">
                <h3>Question Configuration</h3>
                {sections.map((section, index) => (
                    <QuestionSection
                        key={section.sectionName}
                        section={section}
                        sectionIndex={index}
                        onUpdate={updateSection}
                        handleAddQuestion={handleAddQuestion}
                        handleAddSubQuestion={handleAddSubQuestion}
                        handleRemoveQuestion={handleRemoveQuestion}
                        onRemove={() => removeSection(section.sectionName)}
                        disabled={loading}
                    />
                ))}
                <Button
                    type="dashed"
                    onClick={handleAddSection}
                    icon={<PlusOutlined />}
                    disabled={loading}
                    style={{ marginTop: '16px' }}
                >
                    Add New Section
                </Button>
            </div>

            {/* Paper Style Section */}
            <Card title="Paper Style" className="configuration-section">
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
            </Card>

            {/* Additional Features Section */}
            <Card title="Additional Features" className="configuration-section">
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
            </Card>

            {/* Form Actions */}
            <div className="form-actions">
                <Space size="large">
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={loading}
                    >
                        Generate Paper
                    </Button>
                    <Button disabled={loading}>
                        Cancel
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default ManualLayout; 