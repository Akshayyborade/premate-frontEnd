import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../../components/common/DataTable/DataTable';
import Button from '../../../../components/common/Button/Button';
import SearchBar from '../../../../components/common/SearchBar/SearchBar';
import { studentService } from '../../../../services/api/student.service';
import './StudentList.css';
import FilterSection from '../../../../components/common/FilterSection/FilterSection'; // Adjust the import path as necessary

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        course: '',
        status: ''
    });

    const navigate = useNavigate();

    // Table columns
    const columns = [
        { header: 'Student ID', accessor: 'studentId' },
        { header: 'Name', accessor: 'name' },
        { header: 'Course', accessor: 'course' },
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
                        onClick={() => {
                            console.log(`Navigating to view student ID: ${row.studentId}`);
                            navigate(`/admin/students/${row.studentId}`);
                        }}
                    >
                        View
                    </Button>
                    <Button
                        variant="outline"
                        size="small"
                        onClick={() => {
                            console.log(`Navigating to edit student ID: ${row.studentId}`);
                            navigate(`/admin/students/${row.studentId}/edit`);
                        }}
                    >
                        Edit
                    </Button>
                </div>
            )
        }
    ];

    const fetchStudents = async () => {
        try {
            setLoading(true);

            // Fetch raw data from the API
            const data = await studentService.getAllStudents();
            console.log(data)
            // Map the API response to match the expected structure with safe checks
            const mappedData = data.map(student => ({
                

                studentId: student.stud_id || 'N/A', // Use 'N/A' if stud_id is missing
                name: student.name
                    ? `${student.name.fname || ''} ${student.name.mname || ''} ${student.name.lname || ''}`.trim()
                    : 'Unknown Name', // Fallback if studentName is undefined
                course: student.grade ? student.grade.gradeName || 'N/A' : 'N/A', // Fallback for missing grade
                enrollmentDate: student.dateOfAddmission
                || 'N/A', // Fallback for missing dobDate
                status: student.isactive ? "Active" : "Inactive"
            }));

            setStudents(mappedData); // Update state with mapped data
            console.log('Mapped data:', mappedData);

        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };


    // Fetch students on component mount
    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle search term changes
    const handleSearch = (term) => {
        setSearchTerm(term);
        // Add your search logic here
    };

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        // Add your filter logic here
    };

    // Filter students based on search and filters
    const filteredStudents = students.filter(student => {
        console.log(student);
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = !filters.course || student.course === filters.course;
        const matchesStatus = !filters.status || student.status === filters.status;
        return matchesSearch && matchesCourse && matchesStatus;
    });

    const filterOptions = [
        {
            name: 'course',
            placeholder: 'All Courses',
            options: [
                { value: '', label: 'All Courses' },
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
            ],
        },
        {
            name: 'status',
            placeholder: 'All Status',
            options: [
                { value: '', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Pending', label: 'Pending' },
            ],
        },
    ];

    // Render component
    return (
        <div className="student-list-container">
            <div className="page-header">
                <h1>Students</h1>
                <Button
                    variant="primary"
                    onClick={() => navigate('/admin/students/new')}
                >
                    Add New Student
                </Button>
            </div>

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
            />
        </div>
    );
};

export default StudentList;
