import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './QuestionPaperGenerator.css';
import { Select, Slider, Button, Tooltip, message, Modal, Spin } from 'antd';
import { CloudDownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

const QuestionPaperGenerator = ({ paperConfig, setPaperConfig }) => {
    // -----------------------------
    // State Management
    // -----------------------------
    
    // Define default sections for the paper
    const [sections, setSections] = useState([
        { name: 'Section A - MCQ', marks: 30, questions: [] },
        { name: 'Section B - Short Answer', marks: 40, questions: [] },
        { name: 'Section C - Long Answer', marks: 30, questions: [] },
        { name: 'Section D - Case Studies', marks: 20, questions: [] }
    ]);

    // UI state management
    const [loading, setLoading] = useState(false);
    const [generatedPaper, setGeneratedPaper] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState('final');

    // -----------------------------
    // Callback Functions
    // -----------------------------

    // Handle changes to paper configuration
    const handleConfigChange = useCallback((field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            [field]: value
        }));
    }, [setPaperConfig]);

    // Generate sample questions (replace with actual AI implementation)
    const generateAIQuestions = async (sectionName, questionCount) => {
        // TODO: Replace with actual AI API call
        return Array.from({ length: questionCount }, (_, index) => ({
            text: `Sample question ${index + 1} for ${sectionName}`,
            marks: 1,
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        }));
    };

    // -----------------------------
    // Main Functions
    // -----------------------------

    // Generate the complete paper
    const generatePaper = async () => {
        try {
            setLoading(true);
            
            // Validate distributions
            const totalDifficulty = Object.values(paperConfig.difficultyDistribution).reduce((a, b) => a + b, 0);
            const totalQuestionTypes = Object.values(paperConfig.questionTypes).reduce((a, b) => a + b, 0);

            if (totalDifficulty !== 100 || totalQuestionTypes !== 100) {
                throw new Error('Distribution percentages must sum to 100%');
            }

            // Generate questions for each section
            const generatedSections = await Promise.all(
                sections.map(async (section) => {
                    const questionCount = Math.ceil(
                        (section.marks / paperConfig.totalMarks) * paperConfig.blueprint.totalQuestions
                    );
                    const questions = await generateAIQuestions(section.name, questionCount);
                    return { ...section, questions };
                })
            );

            // Set the generated paper with metadata
            setGeneratedPaper({
                metadata: {
                    ...paperConfig,
                    generatedDate: new Date().toISOString(),
                    paperID: Math.random().toString(36).substr(2, 9)
                },
                sections: generatedSections
            });

            setShowPreview(true);
            message.success('Question paper generated successfully!');
        } catch (error) {
            message.error('Error generating paper: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle paper download
    const downloadPaper = (format) => {
        // TODO: Implement actual download functionality
        console.log(`Downloading paper in ${format} format`);
    };

    // -----------------------------
    // Distribution Handlers
    // -----------------------------

    // Handle difficulty distribution changes
    const handleDifficultyChange = (level, value) => {
        setPaperConfig(prev => ({
            ...prev,
            difficultyDistribution: {
                ...prev.difficultyDistribution,
                [level]: value
            }
        }));
    };

    // Handle question type distribution changes
    const handleQuestionTypeChange = (type, value) => {
        setPaperConfig(prev => ({
            ...prev,
            questionTypes: {
                ...prev.questionTypes,
                [type]: value
            }
        }));
    };

    // ... rest of your code ...
};

export default QuestionPaperGenerator; 