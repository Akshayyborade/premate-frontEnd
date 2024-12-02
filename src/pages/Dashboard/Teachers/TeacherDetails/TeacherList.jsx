import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherList.css';
import FilterSection from '../../../../components/common/FilterSection/FilterSection';
import DataTable from '../../../../components/common/DataTable/DataTable';
import Button from '../../../../components/common/Button/Button';
import SearchBar from '../../../../components/common/SearchBar/SearchBar';

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
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        department: 'all',
        status: 'all'
    });
    const handleSearch = (term) => {
        setSearchTerm(term);
        // Add your search logic here
    };
    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        // Add your filter logic here
    };
  


    const handleViewTeacher = (teacherId) => {
        navigate(`/admin/teachers/${teacherId}`);
    };

    // Table columns
    const columns = [
        { header: 'Teacher ID', accessor: 'teacherId' },
        { header: 'Name', accessor: 'name' },
        { header: 'Department', accessor: 'department' },
        { header: 'Subjects', accessor: 'subjects', cell: (row) => row.subjects.join(', ') },
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
                        onClick={() => handleViewTeacher(row.id)}
                    >
                        View
                    </Button>
                    <Button variant="outline" size="small">Edit</Button>
                    <Button variant="outline" size="small">Delete</Button>
                </div>
            )
        }
    ];

    // Fetch teachers logic can be added here if needed

    // Filter teachers based on search and filters
    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = filters.department === 'all' || teacher.department === filters.department;
        const matchesStatus = filters.status === 'all' || teacher.status === filters.status;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Render component
    return (
        <div className="teacher-list-page">
            <div className="page-header">
                <h1>Teachers</h1>
                <Button
                    variant="primary"
                    onClick={() => navigate('/admin/teachers/new')}
                >
                    Add New Teacher
                </Button>
            </div>

            <FilterSection
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                filters={filters}
                onFilterChange={handleFilterChange}
                filterOptions={[
                    { name: 'department', placeholder: 'All Departments', options: [{ value: 'all', label: 'All Departments' }, { value: 'Computer Science', label: 'Computer Science' }, { value: 'Mathematics', label: 'Mathematics' }] },
                    { name: 'status', placeholder: 'All Status', options: [{ value: 'all', label: 'All Status' }, { value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }] },
                ]}
            />

            <DataTable
                columns={columns}
                data={filteredTeachers}
                loading={!loading}
                pagination
                itemsPerPage={10}
            />
        </div>
    );
};

export default TeacherList; 