import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, DatePicker, Space, Card, Alert } from 'antd';
import PropTypes from 'prop-types';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { EXAM_TYPES, BOARD_OPTIONS, CLASS_OPTIONS } from '../../../constants/examConstants';
import chaptersData from './components/chapters.json'; // Import chapters data
import instructionData from './components/exam_instruction.json'


import './BasicConfigForm.css';

const { Option } = Select;

const BasicConfigForm = ({
    config,
    onChange,
    disabled = false,
    showValidation = true,
    onChaptersChange, // Pass the function

}) => {
    // Custom validation hook
    const [selectedStream, setSelectedStream] = useState(null);
    const { validateField, errors, validateForm } = useFormValidation();
    const [examDetails, setExamDetails] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Add state for selected language

    // Effect for initial validation
    useEffect(() => {
        if (showValidation) {
            validateForm(config);
        }
    }, [config, showValidation, validateForm]);

    // Change handlers with validation
    const handleChange = useCallback((field, value) => {
        const error = validateField(field, value);
        if (!error || !showValidation) {
            onChange({ ...config, [field]: value });

            // Check if the field is class, subject, or stream to trigger chapter change
            if (field === 'classLevel' || field === 'subject' || field === 'stream') {
                const classLevel = field === 'classLevel' ? value : config.classLevel;
                const subject = field === 'subject' ? value : config.subject;
                const stream = field === 'stream' ? value : selectedStream; // Get the stream if it's changed
                onChaptersChange(classLevel, subject, stream); // Call the function to update chapters
            }

        }
    }, [config, onChange, validateField, showValidation, selectedStream]);

    // Duration formatter
    const formatDuration = useCallback((minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }, []);



    return (
        <Card className="basic-config-form" title="Exam Configuration">

            {/* Error Display */}
            {showValidation && errors.length > 0 && (
                <Alert
                    message="Validation Errors"
                    description={
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    }
                    type="error"
                    showIcon
                    className="error-alert"
                />
            )}

            <Form layout="vertical">

                <Space direction="horizontal" size="large" style={{ width: '100%' }}>



                    {/* Board Selection */}
                    <Form.Item
                        label="Board"
                        required
                        validateStatus={errors.includes('board') ? 'error' : ''}
                    >
                        <Select
                            style={{ width: 90 }}
                            value={config.board}
                            onChange={(value) => handleChange('board', value)}
                            placeholder="Select board"
                            disabled={disabled}
                        >
                            {BOARD_OPTIONS.map(board => (
                                <Option key={board.value} value={board.value}>
                                    {board.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Class Selection */}
                    <Form.Item
                        label="Class"
                        required
                        validateStatus={errors.includes('classLevel') ? 'error' : ''}
                    >
                        <Select
                            style={{ width: 90 }}
                            value={config.classLevel}
                            onChange={(value) => {
                                handleChange('classLevel', value);
                                setSelectedStream(null); // Reset stream when class changes
                            }}
                            placeholder="Select Class"
                        >
                            {chaptersData.boards.Maharashtra.classes ? (
                                Object.keys(chaptersData.boards.Maharashtra.classes).map((classLevel) => (
                                    <Select.Option key={classLevel} value={classLevel}>
                                        {classLevel}
                                    </Select.Option>
                                ))
                            ) : (
                                <Select.Option disabled>No classes available</Select.Option>
                            )}
                        </Select>
                    </Form.Item>

                    {/* Stream Selection */}
                    {config.classLevel === '11' || config.classLevel === '12' ? (
                        <Form.Item label="Stream" required>
                            <Select
                                value={selectedStream} // Use selectedStream state
                                onChange={(value) => {
                                    handleChange('stream', value); // Update stream
                                    setSelectedStream(value); // Set selected stream
                                }}
                                placeholder="Select Stream"
                            >
                                {config.classLevel && chaptersData.boards.Maharashtra.classes[config.classLevel] &&
                                    chaptersData.boards.Maharashtra.classes[config.classLevel].streams ? (
                                    Object.keys(chaptersData.boards.Maharashtra.classes[config.classLevel].streams).map((stream) => (
                                        <Option key={stream} value={stream}>
                                            {stream}
                                        </Option>
                                    ))
                                ) : (
                                    <Option disabled>No streams available</Option> // Handle case where no streams are available
                                )}
                            </Select>
                        </Form.Item>
                    ) : null}

                    {/* Subject Selection */}
                    {config.classLevel && (
                        <Form.Item
                            label="Subject"
                            required
                            validateStatus={errors.includes('subject') ? 'error' : ''}
                        >
                            <Select
                                value={config.subject}
                                onChange={(value) => handleChange('subject', value)}
                                placeholder="Select Subject"
                                disabled={!config.classLevel} // Disable if no class is selected
                            >
                                {config.classLevel && (config.classLevel === '11' || config.classLevel === '12') ? (
                                    // Check if stream and subjects exist before accessing them
                                    chaptersData.boards.Maharashtra.classes[config.classLevel]?.streams[config.stream]?.subjects ? (
                                        Object.keys(chaptersData.boards.Maharashtra.classes[config.classLevel].streams[config.stream].subjects).map((subject) => (
                                            <Option key={subject} value={subject}>
                                                {subject}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option disabled>No subjects available</Option> // Handle case where no subjects are available
                                    )
                                ) : (
                                    Object.keys(chaptersData.boards.Maharashtra.classes[config.classLevel]?.subjects || {}).map((subject) => (
                                        <Option key={subject} value={subject}>
                                            {subject}
                                        </Option>
                                    ))
                                )}
                            </Select>
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Instruction Categories"
                        required
                        validateStatus={errors.includes('instructionCategories') ? 'error' : ''}
                    >
                        <Select
                            value={config.instructionCategories}
                            onChange={(value) => handleChange('instructionCategories', value)}
                        >
                            {instructionData.examInstructions.map((sections) =>
                                <Option key={sections.section} value={sections.section}>
                                    {sections.section}
                                </Option>
                            )}

                        </Select>

                    </Form.Item>
                    {config.instructionCategories && (
                        <Form.Item
                          
                            label="Instructions"
                            required
                            validateStatus={errors.includes('instructions') ? 'error' : ''}
                        >
                            <Select
                                mode="tags"
                                value={config.instructions}
                                onChange={(value) => handleChange('instructions', value)}
                            >
                                {instructionData.examInstructions.find((item) => item.section == config.instructionCategories).instructions.map((instruction) =>
                                    <Option key={instruction} value={instruction}>
                                        {instruction}
                                    </Option>
                                )

                                }

                            </Select>

                        </Form.Item>
                    )}

                </Space>
                <Space direction='vertical'>

                    {/* Exam Configuration */}

                    <Space wrap>

                        {/* Total Marks */}
                        <Form.Item
                            label="Total Marks"
                            required
                            validateStatus={errors.includes('totalMarks') ? 'error' : ''}
                        >
                            <InputNumber
                                style={{ width: 90 }}
                                min={0}
                                value={config.totalMarks}
                                onChange={(value) => handleChange('totalMarks', value)}
                                disabled={disabled}
                            />
                        </Form.Item>

                        {/* Duration */}
                        <Form.Item
                            label="Duration (minutes)"
                            required
                            validateStatus={errors.includes('duration') ? 'error' : ''}
                        >
                            <InputNumber
                                min={0}
                                max={180}
                                value={config.duration}
                                onChange={(value) => handleChange('duration', value)}
                                formatter={(value) => formatDuration(value)}
                                parser={(value) => value.replace(/[^0-9]/g, '')}
                                disabled={disabled}
                            />
                        </Form.Item>
                        {/* Subject Selection */}
                        <Form.Item

                            label="Instituition Name"
                            required
                            validateStatus={errors.includes('institutionName') ? 'error' : ''}
                            help={errors.includes('institutionName') ? 'institution name is required' : ''}
                        >
                            <Input
                                value={config?.institutionName}
                                onChange={(e) => handleChange('institutionName', e.target.value)}
                                placeholder="Enter institution name"
                                disabled={disabled}
                            />
                        </Form.Item>

                        <Form.Item label="Academic Year">
                            <DatePicker
                                style={{ width: 185 }}
                                picker="year"
                                value={config.academicYear}
                                onChange={(date) => handleChange('academicYear', date)}
                                disabled={disabled}
                            />
                        </Form.Item>

                        {/* Exam Type */}
                        <Form.Item label="Exam Type">
                            <Select
                                value={config.examType}
                                onChange={(value) => handleChange('examType', value)}
                                style={{ width: 140 }}
                                disabled={disabled}
                            >
                                {EXAM_TYPES.map(type => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {/* Term */}
                        <Form.Item label="Term">
                            <Select
                        
                                value={config.term}
                                onChange={(value) => handleChange('term', value)}
                                style={{ width: 140 }}
                                disabled={disabled}
                            >
                                <Option value="1">Term 1</Option>
                                <Option value="2">Term 2</Option>
                                <Option value="3">Term 3</Option>
                            </Select>
                        </Form.Item>
                    </Space>



                </Space>
            </Form>
        </Card>
    );
};

BasicConfigForm.propTypes = {
    config: PropTypes.shape({
        subject: PropTypes.string,
        board: PropTypes.string,
        classLevel: PropTypes.string,
        totalMarks: PropTypes.number,
        duration: PropTypes.number,
        examType: PropTypes.string,
        academicYear: PropTypes.object, // moment object
        term: PropTypes.string,
        stream: PropTypes.string // Add stream to prop types
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    showValidation: PropTypes.bool
};

export default React.memo(BasicConfigForm); 