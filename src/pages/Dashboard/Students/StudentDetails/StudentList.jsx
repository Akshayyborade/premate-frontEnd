import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../../components/common/DataTable/DataTable';
import Button from '../../../../components/common/Button/Button';
import SearchBar from '../../../../components/common/SearchBar/SearchBar';
import { studentService } from '../../../../services/api/student.service';
import BulkOperations from '../../../../components/features/Students/BulkOperations/BulkOperations';
import { FaEye, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import './StudentList.css';
import FilterSection from '../../../../components/common/FilterSection/FilterSection';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        grade: '',
        status: '',
        enrollmentDate: ''
    });
    const [selectedStudents, setSelectedStudents] = useState([]);

    const navigate = useNavigate();

    // Table columns
    const columns = [
        { 
            header: 'Student ID', 
            accessor: 'studentId',
            sortable: true
        },
        { 
            header: 'Name', 
            accessor: 'name',
            sortable: true,
            cell: (row) => (
                <div className="student-name-cell">
                    {row.photo && (
                        <img src={row.photo} alt={row.name} className="student-photo" />
                    )}
                    <span>{row.name}</span>
                </div>
            )
        },
        { 
            header: 'Grade', 
            accessor: 'grade',
            sortable: true
        },
        {
            header: 'Enrollment Date',
            accessor: 'enrollmentDate',
            sortable: true,
            cell: (row) => new Date(row.enrollmentDate).toLocaleDateString()
        },
        {
            header: 'Status',
            accessor: 'status',
            sortable: true,
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
                        variant="icon"
                        onClick={() => navigate(`/admin/students/${row.studentId}`)}
                        title="View Details"
                    >
                        <FaEye />
                    </Button>
                    <Button
                        variant="icon"
                        onClick={() => navigate(`/admin/students/${row.studentId}/edit`)}
                        title="Edit"
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        variant="icon"
                        onClick={() => handleDelete(row.studentId)}
                        title="Delete"
                        className="delete-button"
                    >
                        <FaTrash />
                    </Button>
                </div>
            )
        }
    ];

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await studentService.getAllStudents();
            
            const mappedData = data.map(student => ({
                studentId: student.stud_id || 'N/A',
                name: student.name
                    ? `${student.name.fname || ''} ${student.name.mname || ''} ${student.name.lname || ''}`.trim()
                    : 'Unknown Name',
                grade: student.grade?.gradeName || 'N/A',
                enrollmentDate: student.dateOfAddmission || 'N/A',
                status: student.isactive ? "Active" : "Inactive",
                photo: student.photo
            }));

            setStudents(mappedData);
        } catch (error) {
            setError('Failed to fetch students. Please try again later.');
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await studentService.deleteStudent(studentId);
                setStudents(prev => prev.filter(s => s.studentId !== studentId));
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student. Please try again.');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedStudents.length === 0) {
            alert('Please select students to delete');
            return;
        }

        if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} students?`)) {
            try {
                await Promise.all(selectedStudents.map(id => studentService.deleteStudent(id)));
                setStudents(prev => prev.filter(s => !selectedStudents.includes(s.studentId)));
                setSelectedStudents([]);
            } catch (error) {
                console.error('Error deleting students:', error);
                alert('Failed to delete students. Please try again.');
            }
        }
    };

    const handleRefresh = () => {
        fetchStudents();
    };

    const filterOptions = [
        {
            name: 'grade',
            placeholder: 'All Grades',
            options: [
                { value: '', label: 'All Grades' },
                ...Array.from(new Set(students.map(s => s.grade))).map(grade => ({
                    value: grade,
                    label: grade
                }))
            ]
        },
        {
            name: 'status',
            placeholder: 'All Status',
            options: [
                { value: '', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
            ]
        }
    ];

    const filteredStudents = students.filter(student => {
        const matchesSearch = 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = !filters.grade || student.grade === filters.grade;
        const matchesStatus = !filters.status || student.status === filters.status;
        return matchesSearch && matchesGrade && matchesStatus;
    });

    return (
        <div className="student-list-container">
            <div className="page-header">
                <div className="header-left">
                    <h1>Students</h1>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        title="Refresh List"
                    >
                        Refresh
                    </Button>
                </div>
                <div className="header-right">
                    <BulkOperations onSuccess={handleRefresh} />
                    <Button
                        variant="primary"
                        onClick={() => navigate('/admin/students/new')}
                        icon={<FaUserPlus />}
                    >
                        Add New Student
                    </Button>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <FilterSection
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                filters={filters}
                onFilterChange={handleFilterChange}
                filterOptions={filterOptions}
            />

            <DataTable
                columns={columns}
                data={filteredStudents}
                loading={loading}
                pagination
                itemsPerPage={10}
                selectable
                onSelectionChange={setSelectedStudents}
                selectedItems={selectedStudents}
            />

            {selectedStudents.length > 0 && (
                <div className="bulk-actions">
                    <Button
                        variant="danger"
                        onClick={handleBulkDelete}
                        icon={<FaTrash />}
                    >
                        Delete Selected ({selectedStudents.length})
                    </Button>
                </div>
            )}
        </div>
    );
};

export default StudentList;
