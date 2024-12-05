import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tabs, Button, message, Spin, Modal } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EyeOutlined,
    PrinterOutlined
} from '@ant-design/icons';
import './ExamProfile.css';

const { TabPane } = Tabs;

/**
 * ExamProfile Component
 * 
 * Displays detailed information about a specific exam.
 * Features:
 * - Basic exam information
 * - Question paper preview
 * - Student performance analytics
 * - Export and print functionality
 */
const ExamProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // -----------------------------
    // State Management
    // -----------------------------
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('1');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // -----------------------------
    // Data Fetching
    // -----------------------------
    const fetchExamDetails = useCallback(async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual API call
            const response = await fetch(`/api/exams/${id}`);
            const data = await response.json();
            setExam(data);
        } catch (error) {
            message.error('Failed to fetch exam details');
            console.error('Error fetching exam details:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchExamDetails();
    }, [fetchExamDetails]);

    // -----------------------------
    // Action Handlers
    // -----------------------------
    const handleEdit = () => {
        navigate(`/admin/exams/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            // TODO: Replace with actual API call
            await fetch(`/api/exams/${id}`, { method: 'DELETE' });
            message.success('Exam deleted successfully');
            navigate('/admin/exams');
        } catch (error) {
            message.error('Failed to delete exam');
            console.error('Error deleting exam:', error);
        }
    };

    const handleDownload = async () => {
        try {
            // TODO: Implement download functionality
            message.success('Exam paper downloaded successfully');
        } catch (error) {
            message.error('Failed to download exam paper');
            console.error('Error downloading exam paper:', error);
        }
    };

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    // -----------------------------
    // Render Helpers
    // -----------------------------
    const renderBasicInfo = () => (
        <Card title="Basic Information" className="info-card">
            <div className="info-grid">
                <div className="info-item">
                    <label>Subject</label>
                    <p>{exam?.subject}</p>
                </div>
                <div className="info-item">
                    <label>Class</label>
                    <p>{exam?.class}</p>
                </div>
                <div className="info-item">
                    <label>Date</label>
                    <p>{new Date(exam?.date).toLocaleDateString()}</p>
                </div>
                <div className="info-item">
                    <label>Duration</label>
                    <p>{exam?.duration}</p>
                </div>
                <div className="info-item">
                    <label>Total Marks</label>
                    <p>{exam?.totalMarks}</p>
                </div>
                <div className="info-item">
                    <label>Status</label>
                    <span className={`status-badge ${exam?.status.toLowerCase()}`}>
                        {exam?.status}
                    </span>
                </div>
            </div>
        </Card>
    );

    const renderQuestionPaper = () => (
        <Card title="Question Paper" className="question-paper-card">
            {/* TODO: Implement question paper preview */}
            <div className="question-paper-preview">
                Question paper content goes here...
            </div>
        </Card>
    );

    const renderAnalytics = () => (
        <Card title="Performance Analytics" className="analytics-card">
            {/* TODO: Implement analytics visualization */}
            <div className="analytics-content">
                Analytics content goes here...
            </div>
        </Card>
    );

    // -----------------------------
    // Main Render
    // -----------------------------
    if (loading) {
        return (
            <div className="loading-container">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="exam-profile">
            {/* Header Section */}
            <div className="profile-header">
                <h1>{exam?.name}</h1>
                <div className="action-buttons">
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button 
                        icon={<EyeOutlined />} 
                        onClick={() => setActiveTab('2')}
                    >
                        Preview
                    </Button>
                    <Button 
                        icon={<DownloadOutlined />} 
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                    <Button 
                        icon={<PrinterOutlined />} 
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                    <Button 
                        icon={<DeleteOutlined />} 
                        danger
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {/* Content Tabs */}
            <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                className="profile-tabs"
            >
                <TabPane tab="Basic Info" key="1">
                    {renderBasicInfo()}
                </TabPane>
                <TabPane tab="Question Paper" key="2">
                    {renderQuestionPaper()}
                </TabPane>
                <TabPane tab="Analytics" key="3">
                    {renderAnalytics()}
                </TabPane>
            </Tabs>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Exam"
                visible={showDeleteModal}
                onOk={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this exam? This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default ExamProfile; 