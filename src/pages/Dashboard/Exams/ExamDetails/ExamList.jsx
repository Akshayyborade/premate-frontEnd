import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ExamList.css';
import FilterSection from '../../../../components/common/FilterSection/FilterSection';

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
                    <Link to="new" className="create-exam-btn">
                        Create New Exam
                    </Link>
                </div>
            </div>

            <FilterSection 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                filterOptions={[
                    { name: 'subject', placeholder: 'All Subjects', options: [
                        { value: '', label: 'All Subjects' },
                        { value: 'Mathematics', label: 'Mathematics' },
                        { value: 'Science', label: 'Science' },
                        { value: 'English', label: 'English' },
                    ]},
                    { name: 'class', placeholder: 'All Classes', options: [
                        { value: '', label: 'All Classes' },
                        { value: '9th', label: '9th' },
                        { value: '10th', label: '10th' },
                        { value: '11th', label: '11th' },
                        { value: '12th', label: '12th' },
                    ]},
                    { name: 'status', placeholder: 'All Status', options: [
                        { value: '', label: 'All Status' },
                        { value: 'upcoming', label: 'Upcoming' },
                        { value: 'ongoing', label: 'Ongoing' },
                        { value: 'completed', label: 'Completed' },
                        { value: 'draft', label: 'Draft' },
                    ]},
                ]}
            />

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