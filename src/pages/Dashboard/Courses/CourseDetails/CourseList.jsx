import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseList.css';

const CourseList = () => {
    const navigate = useNavigate();
    const [courses] = useState([
        {
            id: 1,
            courseCode: "CS101",
            name: "Introduction to Programming",
            department: "Computer Science",
            instructor: "Dr. Sarah Johnson",
            credits: 3,
            duration: "4 months",
            enrolledStudents: 45,
            status: "Active",
            startDate: "2024-01-15",
            schedule: "Mon, Wed 10:00 AM"
        },
        {
            id: 2,
            courseCode: "MATH201",
            name: "Advanced Calculus",
            department: "Mathematics",
            instructor: "Prof. Michael Smith",
            credits: 4,
            duration: "4 months",
            enrolledStudents: 32,
            status: "Active",
            startDate: "2024-01-20",
            schedule: "Tue, Thu 2:00 PM"
        }
    ]);

    const [filters, setFilters] = useState({
        search: '',
        department: 'all',
        status: 'all'
    });

    const handleSearch = (e) => {
        setFilters({ ...filters, search: e.target.value });
    };

    return (
        <div className="course-list-page">
            <div className="page-header">
                <h1>Course Management</h1>
                <button 
                    className="add-course-btn"
                    onClick={() => navigate('/admin/courses/new')}
                >
                    Add New Course
                </button>
            </div>

            <div className="course-stats">
                <div className="stat-card">
                    <div className="stat-value">{courses.length}</div>
                    <div className="stat-label">Total Courses</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {courses.filter(c => c.status === 'Active').length}
                    </div>
                    <div className="stat-label">Active Courses</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
                    </div>
                    <div className="stat-label">Total Enrollments</div>
                </div>
            </div>

            <div className="filters-section">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={filters.search}
                    onChange={handleSearch}
                    className="search-input"
                />
                
                <select 
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                    className="filter-select"
                >
                    <option value="all">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                </select>

                <select 
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="filter-select"
                >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="courses-table-container">
                <table className="courses-table">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Department</th>
                            <th>Instructor</th>
                            <th>Credits</th>
                            <th>Enrolled</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.courseCode}</td>
                                <td>{course.name}</td>
                                <td>{course.department}</td>
                                <td>{course.instructor}</td>
                                <td>{course.credits}</td>
                                <td>{course.enrolledStudents}</td>
                                <td>
                                    <span className={`status-badge ${course.status.toLowerCase()}`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="view-btn"
                                            onClick={() => navigate(`/admin/courses/${course.id}`)}
                                        >
                                            View
                                        </button>
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseList; 