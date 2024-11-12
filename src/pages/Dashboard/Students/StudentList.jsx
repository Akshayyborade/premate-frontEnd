import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable/DataTable';
import Button from '../../../components/common/Button/Button';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import { studentService } from '../../../services/api/student.service';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        course: '',
        status: ''
    });
    
    const navigate = useNavigate();

    const columns = [
        {
            header: 'Student ID',
            accessor: 'studentId',
        },
        {
            header: 'Name',
            accessor: 'name',
            cell: (row) => (
                <div className="student-name-cell">
                    <div className="student-avatar">
                        {row.name.charAt(0)}
                    </div>
                    {row.name}
                </div>
            )
        },
        {
            header: 'Course',
            accessor: 'course',
        },
        {
            header: 'Enrollment Date',
            accessor: 'enrollmentDate',
            cell: (row) => new Date(row.enrollmentDate).toLocaleDateString()
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (row) => (
                <span className={`status-badge ${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row) => (
                <div className="action-buttons">
                    <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => navigate(`/dashboard/students/${row.id}`)}
                    >
                        View
                    </Button>
                    <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => navigate(`/dashboard/students/${row.id}/edit`)}
                    >
                        Edit
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await studentService.getAllStudents();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = !filters.course || student.course === filters.course;
        const matchesStatus = !filters.status || student.status === filters.status;
        
        return matchesSearch && matchesCourse && matchesStatus;
    });

    return (
        <div className="student-list-container">
            <div className="page-header">
                <h1>Students</h1>
                <Button 
                    variant="primary"
                    onClick={() => navigate('/dashboard/students/new')}
                >
                    Add New Student
                </Button>
            </div>

            <div className="filters-section">
                <SearchBar 
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search students..."
                />
                
                <div className="filter-controls">
                    <select
                        value={filters.course}
                        onChange={(e) => handleFilterChange('course', e.target.value)}
                    >
                        <option value="">All Courses</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>

            <DataTable 
                columns={columns}
                data={filteredStudents}
                loading={loading}
                pagination
                itemsPerPage={10}
            />
        </div>
    );
};

export default StudentList; 