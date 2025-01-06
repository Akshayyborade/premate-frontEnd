import React, { useCallback } from 'react';
import { Form, InputNumber, Select, Button, Card, Space, Table, message } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { usePaperConfig } from './context/PaperConfigContext';


const AILayout = ({ basicConfig, chapters, onConfigSubmit, loading }) => {
    const topicOptions = chapters.map(chapter => ({ value: chapter, label: chapter }));
    const [form] = Form.useForm();
    const { 
       state, 
       loading: paperLoading,
        addSection, 
        removeSection, 
        updateSection,
        setExamDetails
    } = usePaperConfig();
    const { sections } = state; 

    const handleAddSection = useCallback(() => {
        const nextSectionId = String.fromCharCode(65 + sections.length);
        addSection({
            id: nextSectionId,
            questions: [{
                id: 1,
                mainQuestionType: '',
                questionTypes:[],
                subQuestionCount: 0,
                marksPerQuestion: 0,
                totalMarks: 0,
                topicsToInclude: [],
                topicsToExclude: [],
                optional: false,
                noOfOption: 0,
            }]
        });
    }, [sections.length, addSection]);

    const handleAddQuestion = useCallback((sectionId) => {
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            const updatedQuestions = [...section.questions, {
                id: section.questions.length + 1,
                mainQuestionType: '',
                questionTypes:[],
                subQuestionCount: 0,
                marksPerQuestion: 0,
                totalMarks: 0,
                topicsToInclude: [],
                topicsToExclude: [],
                optional: false,
                noOfOption: 0,
            }];

            updateSection({
                ...section,
                questions: updatedQuestions
            });
        }
    }, [sections, updateSection]);

    const handleRemoveQuestion = useCallback((sectionId, questionId) => {
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            const updatedQuestions = section.questions.filter(q => q.id !== questionId);
            updateSection({
                ...section,
                questions: updatedQuestions
            });
        }
    }, [sections, updateSection]);

    const handleReorderQuestion = useCallback((sectionId, index, direction) => {
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            const questions = [...section.questions];
            const [removed] = questions.splice(index, 1);
            questions.splice(index + direction, 0, removed);
            
            questions.forEach((q, idx) => (q.id = idx + 1));
            
            updateSection({
                ...section,
                questions
            });
        }
    }, [sections, updateSection]);

    const updateTotalMarks = useCallback((sectionId, index) => {
        const section = sections.find(s => s.id === sectionId);
        if (section && section.questions[index]) {
            const questions = [...section.questions];
            const question = questions[index];
            
            const subCount = Number(question.subQuestionCount) || 0;
            const marksPerQ = Number(question.marksPerQuestion) || 0;
            
            question.totalMarks = subCount * marksPerQ;
            
            updateSection({
                ...section,
                questions
            });
        }
    }, [sections, updateSection]);

    const handleGenerate = useCallback(async () => {
        const totalMarks = sections.reduce((sectionTotal, section) => {
            return sectionTotal + section.questions.reduce((questionTotal, question) => {
                return questionTotal + (question.totalMarks || 0);
            }, 0);
        }, 0);

        if (totalMarks !== Number(basicConfig.totalMarks)) {
            message.error(`Total marks (${totalMarks}) do not match the configured total (${basicConfig.totalMarks})`);
            return;
        }

        const commonAttributes = {
            institutionName: basicConfig.institutionName,
            subject: basicConfig.subject,
            board: basicConfig.board,
            classLevel: basicConfig.classLevel,
            instructions: basicConfig.instructions,
            duration: basicConfig.duration,
            totalMarks: basicConfig.totalMarks,
            academicYear:basicConfig.academicYear,            
            examType:basicConfig.examType,
            term:basicConfig.term
        };

        const sectionsPayload = sections.map(section => ({
            section: section.id,
            questions: section.questions.map(q => ({
                mainQuestionType: q.mainQuestionType || '',
                questionTypes:q.questionTypes||[],
                subQuestionCount: q.subQuestionCount || 0,
                marksPerQuestion: q.marksPerQuestion || 0,
                totalMarks: q.totalMarks || 0,
                topicsToInclude: q.topicsToInclude || [],
                topicsToExclude: q.topicsToExclude || [],
                optional: q.optional || false,
                noOfOption: q.noOfOption || 0,
                bloomTaxonomy: q.bloomTaxonomy || [],
            }))
        }));

        const payload = {
            commonAttributes,
            sections: sectionsPayload
        };

        await onConfigSubmit(payload);
    }, [sections, basicConfig, setExamDetails, onConfigSubmit]);

    const columns = useCallback((section) => [
        {
            title: 'Main Question Type',
            dataIndex: 'mainQuestionType',
            key: 'mainQuestionType',
            render: (_, record, index) => (
                <Select
                    placeholder="Question Type"
                    value={record.mainQuestionType}
                    disabled={loading}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].mainQuestionType = value;
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                >
                    <Select.Option value="MCQ">MCQ</Select.Option>
                    <Select.Option value="One line">One Line</Select.Option>
                    <Select.Option value="Short Ans">Short</Select.Option>
                    <Select.Option value="Long">Long</Select.Option>
                    <Select.Option value="Multi Question">Multi Question</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Sub Question Types',
            dataIndex: 'questionTypes',
            key: 'questionTypes',
            render: (_, record, index) => (
                <Select
                    placeholder="Question Type"
                    mode='tags'
                    value={record.questionTypes}
                    disabled={loading}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].questionTypes = value;
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                >
                    <Select.Option value="Graph">Graph</Select.Option>
                    <Select.Option value="Theoretical">Theory</Select.Option>
                    <Select.Option vlaue="Problems">Problems</Select.Option>
                    <Select.Option value="Diagram">Diagram</Select.Option>
                    <Select.Option value="Paragraph">Paragraph</Select.Option>
                    <Select.Option value="Activity">Activity</Select.Option>
                    <Select.Option value="Match">Match</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Sub-Questions',
            dataIndex: 'subQuestionCount',
            key: 'subQuestionCount',
            render: (_, record, index) => (
                <InputNumber
                    min={0}
                    value={record.subQuestionCount}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].subQuestionCount = value;
                        updateTotalMarks(section.id, index);
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                />
            ),
        },
        {
            title: 'Marks Per Question',
            dataIndex: 'marksPerQuestion',
            key: 'marksPerQuestion',
            render: (_, record, index) => (
                <InputNumber
                    min={0}
                    value={record.marksPerQuestion}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].marksPerQuestion = value;
                        updateTotalMarks(section.id, index);
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                />
            ),
        },
        {
            title: 'Total Marks',
            dataIndex: 'totalMarks',
            key: 'totalMarks',
            render: (_, record) => <span>{record.totalMarks}</span>,
        },
        {
            title: 'Topics Include',
            dataIndex: 'topicsToInclude',
            key: 'topicsToInclude',
            render: (_, record, index) => (
                <Select
                    isMulti
                    mode="tags"
                    placeholder="Include Topics"
                    value={record.topicsToInclude}
                    disabled={loading}
                    options={topicOptions}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].topicsToInclude = value;
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                />
            ),
        },
        {
            title: 'Topics Exclude',
            dataIndex: 'topicsToExclude',
            key: 'topicsToExclude',
            render: (_, record, index) => (
                <Select
                    isMulti
                    mode="tags"
                    placeholder="Exclude Topics"
                    value={record.topicsToExclude}
                    options={topicOptions}
                    disabled={loading}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].topicsToExclude = value;
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                />
            ),
        },
        {
            title: 'Optional',
            dataIndex: 'optional',
            key: 'optional',
            render: (_, record, index) => (
                <Select
                    placeholder="Optional?"
                    value={record.optional}
                    disabled={loading}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].optional = value;
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                </Select>
            ),
        },
        ...(section.questions.some((q) => q.optional)
            ? [
                {
                    title: 'No of Options',
                    dataIndex: 'noOfOption',
                    key: 'noOfOption',
                    render: (_, record, index) =>
                        record.optional ? (
                            <InputNumber
                                min={0}
                                placeholder="No of Options"
                                value={record.noOfOption}
                                onChange={(value) => {
                                    const updatedQuestions = [...section.questions];
                                    updatedQuestions[index].noOfOption = value;
                                    updateSection({
                                        ...section,
                                        questions: updatedQuestions
                                    });
                                }}
                            />
                        ) : null,
                },
            ]
            : []),
        {
            title: 'Bloom\'s Taxonomy',
            dataIndex: 'bloomTaxonomy',
            key: 'bloomTaxonomy',
            render: (_, record, index) => (
                <Select
                    mode="multiple"
                    placeholder="Select Bloom's Levels"
                    value={record.bloomTaxonomy}
                    disabled={loading}
                    onChange={(value) => {
                        const updatedQuestions = [...section.questions];
                        updatedQuestions[index].bloomTaxonomy = value;
                        updateSection({
                            ...section,
                            questions: updatedQuestions
                        });
                    }}
                >
                    <Select.Option value="Remember">Remember</Select.Option>
                    <Select.Option value="Understand">Understand</Select.Option>
                    <Select.Option value="Apply">Apply</Select.Option>
                    <Select.Option value="Analyze">Analyze</Select.Option>
                    <Select.Option value="Evaluate">Evaluate</Select.Option>
                    <Select.Option value="Create">Create</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, __, index) => (
                <Space>
                    <Button
                        icon={<ArrowUpOutlined />}
                        disabled={index === 0 || loading}
                        onClick={() => handleReorderQuestion(section.id, index, -1)}
                    />
                    <Button
                        icon={<ArrowDownOutlined />}
                        disabled={index === section.questions.length - 1 || loading}
                        onClick={() => handleReorderQuestion(section.id, index, 1)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        disabled={loading}
                        onClick={() => handleRemoveQuestion(section.id, __.id)}
                    />
                </Space>
            ),
        },
    ], [loading, updateSection, updateTotalMarks, handleReorderQuestion, handleRemoveQuestion]);

    return (
        <Form form={form} layout="vertical">
            <Card title="AI Question Paper Generator">
                <Space direction="vertical" style={{ width: '100%' }}>
                {Array.isArray(sections) ? (
                    sections.map((section) => (
                        <Card
                            key={`section-${section.id}`}
                            title={`Section ${section.id}`}
                            extra={
                                <Space>
                                    <Button
                                        type="dashed"
                                        onClick={() => handleAddQuestion(section.id)}
                                        icon={<PlusOutlined />}
                                        disabled={loading}
                                    >
                                        Add Question
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => removeSection(section.id)}
                                        icon={<DeleteOutlined />}
                                        disabled={loading}
                                    >
                                        Remove Section
                                    </Button>
                                    
                                </Space>
                            }
                        >
                            <Table
                                dataSource={section.questions}
                                pagination={false}
                                rowKey="id"
                                columns={columns(section)}
                            />
                        </Card>

                    ))
                ) : (
                    <p>No sections available.</p>
                )}

                    <Button 
                        type="dashed" 
                        onClick={handleAddSection}
                        disabled={loading}
                    >
                        Add Section
                    </Button>

                    <Button 
                        type="primary" 
                        onClick={handleGenerate}
                        loading={loading}
                    >
                        Generate Paper
                    </Button>
                </Space>
            </Card>
        </Form>
    );
};

export default AILayout;