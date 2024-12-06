import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Radio, Space, Card, Button, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import ManualLayout from './ManualLayout';
import AILayout from './AILayout';

const { TabPane } = Tabs;

const ExamPaperLayout = ({ onConfigSubmit }) => {
    const [activeTab, setActiveTab] = useState('manual');
    const [basicConfig, setBasicConfig] = useState({
        subject: '',
        board: '',
        academicYear: '',
        examType: 'Final',
        totalMarks: '',
        duration: '',
        class: '',
        term: '',
    });

    return (
        <div className="exam-paper-configuration">
            <h2>Exam Paper Configuration</h2>

            {/* Basic Configuration - Common for both layouts */}
            <Card className="basic-config-section">
                <BasicConfigForm 
                    config={basicConfig} 
                    onChange={setBasicConfig} 
                />
            </Card>

            {/* Layout Selection Tabs */}
            <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                className="layout-tabs"
            >
                <TabPane tab="Manual Creation" key="manual">
                    <ManualLayout 
                        basicConfig={basicConfig}
                        onConfigSubmit={onConfigSubmit}
                    />
                </TabPane>
                <TabPane tab="AI-Assisted Creation" key="ai">
                    <AILayout 
                        basicConfig={basicConfig}
                        onConfigSubmit={onConfigSubmit}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ExamPaperLayout;