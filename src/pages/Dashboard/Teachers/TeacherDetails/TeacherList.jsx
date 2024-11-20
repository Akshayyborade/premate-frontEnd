import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherList.css';

const TeacherList = () => {
    const navigate = useNavigate();
    const [teachers] = useState([
        {
            id: 1,
            teacherId: "TCH001",
            name: "Dr. Sarah Johnson",
            department: "Computer Science",
            subjects: ["Programming", "Data Structures"],
            status: "Active",
            email: "sarah.j@example.com",
            phone: "+1234567890",
            joinDate: "2023-01-15"
        },
        {
            id: 2,
            teacherId: "TCH002",
            name: "Prof. Michael Smith",
            department: "Mathematics",
            subjects: ["Calculus", "Linear Algebra"],
            status: "Active",
            email: "michael.s@example.com",
            phone: "+1234567891",
            joinDate: "2023-02-20"
        }
    ]);

    const [filters, setFilters] = useState({
        search: '',
        department: 'all',
        status: 'all'
    });

    const handleViewTeacher = (teacherId) => {
        navigate(`/admin/teachers/${teacherId}`);
    };

    return (
        <div className="teacher-list-page">
            <div className="page-header">
                <h1>Teachers</h1>
                <button 
                    className="add-teacher-btn"
                    onClick={() => navigate('/admin/teachers/new')}
                >
                    Add New Teacher
                </button>
            </div>

            <div className="teacher-stats">
                <div className="stat-card">
                    <div className="stat-value">{teachers.length}</div>
                    <div className="stat-label">Total Teachers</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {teachers.filter(t => t.status === 'Active').length}
                    </div>
                    <div className="stat-label">Active Teachers</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {new Set(teachers.map(t => t.department)).size}
                    </div>
                    <div className="stat-label">Departments</div>
                </div>
            </div>

            <div className="filters-section">
                <input
                    type="text"
                    placeholder="Search teachers..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
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

            <div className="teachers-table-container">
                <table className="teachers-table">
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Subjects</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher.id}>
                                <td>{teacher.teacherId}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.department}</td>
                                <td>{teacher.subjects.join(', ')}</td>
                                <td>
                                    <span className={`status-badge ${teacher.status.toLowerCase()}`}>
                                        {teacher.status}
                                    </span>
                                </td>
                                <td>{teacher.email}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="view-btn"
                                            onClick={() => handleViewTeacher(teacher.id)}
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

export default TeacherList; 