import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './ExamForm.css';

const { Option } = Select;
const { TextArea } = Input;

/**
 * ExamForm Component
 * 
 * Handles creation and editing of exam details.
 * Features:
 * - Form validation
 * - Date selection
 * - Subject and class selection
 * - Duration and marks configuration
 * - Instructions management
 */
const ExamForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    // -----------------------------
    // State Management
    // -----------------------------
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(null);

    // -----------------------------
    // Data Fetching
    // -----------------------------
    const fetchExamData = useCallback(async () => {
        if (!isEditMode) return;

        try {
            setLoading(true);
            // TODO: Replace with actual API call
            const response = await fetch(`/api/exams/${id}`);
            const data = await response.json();
            
            // Transform date strings to moment objects
            const formattedData = {
                ...data,
                examDate: moment(data.examDate),
                startTime: moment(data.startTime),
            };
            
            setInitialValues(formattedData);
            form.setFieldsValue(formattedData);
        } catch (error) {
            message.error('Failed to fetch exam data');
            console.error('Error fetching exam data:', error);
        } finally {
            setLoading(false);
        }
    }, [id, isEditMode, form]);

    useEffect(() => {
        fetchExamData();
    }, [fetchExamData]);

    // -----------------------------
    // Form Submission
    // -----------------------------
    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const endpoint = isEditMode ? `/api/exams/${id}` : '/api/exams';
            const method = isEditMode ? 'PUT' : 'POST';

            // TODO: Replace with actual API call
            await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            message.success(`Exam ${isEditMode ? 'updated' : 'created'} successfully`);
            navigate('/admin/exams');
        } catch (error) {
            message.error(`Failed to ${isEditMode ? 'update' : 'create'} exam`);
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // Form Validation Rules
    // -----------------------------
    const validationRules = {
        required: {
            required: true,
            message: 'This field is required',
        },
        number: {
            type: 'number',
            min: 0,
            message: 'Please enter a valid number',
        },
    };

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <div className="exam-form-container">
            <div className="form-header">
                <h2>{isEditMode ? 'Edit Exam' : 'Create New Exam'}</h2>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={initialValues}
                className="exam-form"
            >
                {/* Basic Information */}
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid">
                        <Form.Item
                            name="examName"
                            label="Exam Name"
                            rules={[validationRules.required]}
                        >
                            <Input placeholder="Enter exam name" />
                        </Form.Item>

                        <Form.Item
                            name="subject"
                            label="Subject"
                            rules={[validationRules.required]}
                        >
                            <Select placeholder="Select subject">
                                <Option value="mathematics">Mathematics</Option>
                                <Option value="science">Science</Option>
                                <Option value="english">English</Option>
                                {/* Add more subjects as needed */}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="class"
                            label="Class"
                            rules={[validationRules.required]}
                        >
                            <Select placeholder="Select class">
                                {[...Array(12)].map((_, i) => (
                                    <Option key={i + 1} value={i + 1}>
                                        Class {i + 1}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="examDate"
                            label="Exam Date"
                            rules={[validationRules.required]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </div>
                </div>

                {/* Exam Configuration */}
                <div className="form-section">
                    <h3>Exam Configuration</h3>
                    <div className="form-grid">
                        <Form.Item
                            name="duration"
                            label="Duration (minutes)"
                            rules={[validationRules.required, validationRules.number]}
                        >
                            <InputNumber min={0} placeholder="Enter duration" />
                        </Form.Item>

                        <Form.Item
                            name="totalMarks"
                            label="Total Marks"
                            rules={[validationRules.required, validationRules.number]}
                        >
                            <InputNumber min={0} placeholder="Enter total marks" />
                        </Form.Item>

                        <Form.Item
                            name="passingMarks"
                            label="Passing Marks"
                            rules={[validationRules.required, validationRules.number]}
                        >
                            <InputNumber min={0} placeholder="Enter passing marks" />
                        </Form.Item>
                    </div>
                </div>

                {/* Instructions */}
                <div className="form-section">
                    <h3>Instructions</h3>
                    <Form.Item
                        name="instructions"
                        rules={[validationRules.required]}
                    >
                        <TextArea 
                            rows={4} 
                            placeholder="Enter exam instructions"
                        />
                    </Form.Item>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <Space size="middle">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                        >
                            {isEditMode ? 'Update Exam' : 'Create Exam'}
                        </Button>
                        <Button 
                            onClick={() => navigate('/admin/exams')}
                        >
                            Cancel
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default ExamForm; 