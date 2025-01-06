import React, { useState, useCallback, useEffect } from 'react';
import { Form, Card, Tabs, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from './components/LoadingOverlay';
import ManualLayout from './ManualLayout';
import AILayout from './AILayout';
import BasicConfigForm from './BasicConfigForm';
import ErrorBoundary from '../../../components/common/ErrorBoundary';
import { usePaperConfig, PaperConfigProvider } from './context/PaperConfigContext';
import useForm from '../../../hooks/useForm';
import { examPaperService } from '../../../services/api/examPaper.service';
import './ExamPaperLayout.css';
import chaptersData from './components/chapters.json'; // Import chapters data

const { TabPane } = Tabs;

const ExamPaperLayout = () => {
    const [activeTab, setActiveTab] = useState('manual');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [examPaperId, setExamPaperId] = useState(null);
    const { 
        setExamDetails, 
        updateSections, 
        state: { examDetails, sections },
        resetState 
    } = usePaperConfig();

    // Form Management using custom hook with proper initial values
    const { values: basicConfig, setValues: setBasicConfig, errors } = useForm();

    const [chapters, setChapters] = useState([]);

    const handleChaptersChange = (classLevel, subject, stream) => {
        let classData;

        // Check if the class level is 11 or 12 to handle streams
        if (classLevel === '11' || classLevel === '12') {
            classData = chaptersData.boards.Maharashtra.classes[classLevel].streams[stream];
        } else {
            classData = chaptersData.boards.Maharashtra.classes[classLevel];
        }

        if (classData && classData.subjects[subject]) {
            setChapters(classData.subjects[subject].chapters); // Set chapters based on selected class and subject
        } else {
            setChapters([]); // Reset if no chapters found
        }
    };

    // Fetch exam paper details if editing
    useEffect(() => {
        const fetchExamPaper = async () => {
            if (examPaperId) {
                setLoading(true);
                try {
                    const examPaper = await examPaperService.getExamPaperById(examPaperId);
                    const { sections: examSections, ...examDetails } = examPaper;
                    
                    setExamDetails(examDetails);
                    updateSections(examSections);
                    setBasicConfig(examDetails);// Assuming the response structure matches the form structure
                } catch (error) {
                    message.error('Failed to fetch exam paper details');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchExamPaper();
    }, [examPaperId, setBasicConfig, setExamDetails, updateSections, resetState]);

    const handleConfigSubmit = useCallback(async (payload) => {
        // Include chapters in the payload if needed
        const updatedPayload = {
            ...payload,
            chapters // Add chapters to the payload
        };
        console.log(updatedPayload);
        const json = JSON.stringify(updatedPayload);
        setLoading(true);
        try {
            if (examPaperId) {
                // Update existing exam paper
                await examPaperService.updateExamPaper(examPaperId, updatedPayload);
                message.success('Exam paper updated successfully');
            } else {
                // Create new exam paper
                const response = await examPaperService.createExamPaper(json);
                const { sections: newSections, ...newExamDetails } = response;
                
                // Update context
                setExamDetails(newExamDetails);
                updateSections(newSections);

             
                message.success('Exam paper created successfully');
            }
            navigate('/admin/exams/preview');
        } catch (error) {
            message.error('Failed to save exam paper');
            console.error('Error saving exam paper:', error);
        } finally {
            setLoading(false);
        }
    }, [chapters, basicConfig, navigate]);

    // Load exam details from local storage on component mount
    // useEffect(() => {
    //     const storedExamDetails = localStorage.getItem('examDetails');
    //     if (storedExamDetails) {
    //         const parsedDetails = JSON.parse(storedExamDetails);
    //         setExamDetails(parsedDetails); // Set the exam details in context
    //         // You can also set the basicConfig if needed
    //         setBasicConfig(parsedDetails);
    //     }
    // }, [setExamDetails, setBasicConfig]);

    const handleTabChange = useCallback((key) => {
        setActiveTab(key);
    }, []);
    const handleTest=()=>{
        setLoading(true);
    }

    return (
        <ErrorBoundary>
            <PaperConfigProvider>
            <LoadingOverlay loadingState={loading} />
                <div className="exam-paper-configuration">
                    <h2>Exam Paper Configuration</h2>

                    <Card className="basic-config-section">
                        <BasicConfigForm
                            config={basicConfig}
                            onChange={setBasicConfig}
                            onChaptersChange={handleChaptersChange}
                            errors={errors}
                        />
                    </Card>

                    <Tabs
                        activeKey={activeTab}
                        onChange={handleTabChange}
                        className="layout-tabs"
                    >
                        <TabPane 
                            tab="Manual Creation" 
                            key="manual"
                            disabled={loading}
                        >
                            <ManualLayout
                                basicConfig={basicConfig}
                                onConfigSubmit={handleConfigSubmit}
                                loading={loading}
                            />
                        </TabPane>
                        <TabPane 
                            tab="AI-Assisted Creation" 
                            key="ai"
                            disabled={loading}
                        >
                            <AILayout
                                basicConfig={basicConfig}
                                chapters={chapters}
                                onConfigSubmit={handleConfigSubmit}
                                loading={loading}
                            />
                        </TabPane>
                    </Tabs>
                    <Button onClick={handleTest}>show</Button>
                </div>
            </PaperConfigProvider>
        </ErrorBoundary>
    );
};

export default ExamPaperLayout;