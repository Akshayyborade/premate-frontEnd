import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ExamList.css';

const ExamList = () => {
    const [exams, setExams] = useState([
        {
            id: 1,
            name: 'Mid-Term Mathematics',
            subject: 'Mathematics',
            class: '10th',
            date: '2024-03-15',
            duration: '3 hours',
            totalMarks: 100,
            status: 'upcoming'
        },
        {
            id: 2,
            name: 'Science Final',
            subject: 'Science',
            class: '9th',
            date: '2024-03-20',
            duration: '3 hours',
            totalMarks: 100,
            status: 'draft'
        }
        // Add more exam data
    ]);

    const [filters, setFilters] = useState({
        subject: '',
        class: '',
        status: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const filteredExams = exams.filter(exam => {
        return (
            (filters.subject === '' || exam.subject === filters.subject) &&
            (filters.class === '' || exam.class === filters.class) &&
            (filters.status === '' || exam.status === filters.status) &&
            (searchTerm === '' || 
             exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             exam.subject.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="exam-list-page">
            <div className="exam-list-header">
                <h1>Exam Management</h1>
                <div className="header-actions">
                    <Link to="generator" className="create-exam-btn">
                        Create New Exam
                    </Link>
                </div>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search exams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-controls">
                    <select
                        value={filters.subject}
                        onChange={(e) => handleFilterChange('subject', e.target.value)}
                    >
                        <option value="">All Subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                    </select>

                    <select
                        value={filters.class}
                        onChange={(e) => handleFilterChange('class', e.target.value)}
                    >
                        <option value="">All Classes</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            <div className="exam-grid">
                {filteredExams.map(exam => (
                    <motion.div
                        key={exam.id}
                        className="exam-card"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="exam-card-header">
                            <h3>{exam.name}</h3>
                            <span className={`status-badge ${exam.status}`}>
                                {exam.status}
                            </span>
                        </div>
                        
                        <div className="exam-card-content">
                            <div className="exam-info">
                                <p><strong>Subject:</strong> {exam.subject}</p>
                                <p><strong>Class:</strong> {exam.class}</p>
                                <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
                                <p><strong>Duration:</strong> {exam.duration}</p>
                                <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
                            </div>
                        </div>

                        <div className="exam-card-actions">
                            <Link to={`${exam.id}`} className="view-btn">
                                View Details
                            </Link>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredExams.length === 0 && (
                <div className="no-results">
                    <h3>No exams found</h3>
                    <p>Try adjusting your filters or search term</p>
                </div>
            )}
        </div>
    );
};

export default ExamList; 