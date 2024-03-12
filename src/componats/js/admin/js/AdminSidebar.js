import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse, Container } from 'reactstrap';
import '../css/admin-dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faBars, faBookReader, faCalendarCheck, faChevronDown, faChevronRight, faEnvelopeOpenText, faPersonChalkboard, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AdminSidebar({ setMainContentComponent }) {
    const [activeTab, setActiveTab] = useState('Student Management');
    const [openDropdown, setOpenDropdown] = useState('');

    const handleTabClick = (component) => {
        setMainContentComponent(component);
    };

    const handleDropdownToggle = (category) => {
        setOpenDropdown(openDropdown === category ? '' : category);
    };

    const sidebarItems = [
        {
            category: 'Dashboard',
            icon: faBars,
            items: [{ name: 'Admin', component: 'AdminDashboard' }],
        },
        {  
            category: 'Student',
            icon: faUserGraduate,
            items: [
                { name: 'Admissions', component: 'AdmissionRegistration' },
                { name: 'Fees', component: 'FeeCollection' },
                { name: 'Profile', component: 'StudentProfile' },
                // Add more items as needed
            ]
        },
        {
            category: 'Faculty',
            icon: faPersonChalkboard,
            items: [
                { name: 'Hire', component: 'TeacherRegistration' },
                { name: 'Salary', component: 'TeacherSalary' },
                { name: 'Attendance', component: 'AttendanceRoster' },
                { name: 'Profile', component: 'TeacherProfile' },
                // Add more items as needed
            ]
        },
        {
            category: 'Classroom',
            icon: faBookReader,
            items: [
                { name: 'Class', component: 'ClassSubjects' },
                { name: 'Attendance', component: 'AttendanceSheet' },
                { name: 'Demographics', component: 'ClassDemographics' },
                { name: 'Timetable', component: 'Timetable' },
                // Add more items as needed
            ]
        },
        {
            category: 'Communications',
            icon: faEnvelopeOpenText,
            items: [
                { name: 'Announcements', component: 'Announcements' },
                { name: 'Messaging', component: 'Messaging' },
                { name: 'Events', component: 'Events' },
                // Add more items as needed
            ]
        },
        {
            category: 'Exam',
            icon: faCalendarCheck,
            items: [
                { name: 'Schedule', component: 'ExamSchedule' },
                { name: 'Marks', component: 'MarksEntry' },
                { name: 'Results', component: 'ResultDeclaration' },
                { name: 'Syllabus', component: 'SyllabusUpload' },
                { name: 'Questions', component: 'QuestionBank' },
                // Add more items as needed
            ]
        },
        // Add more categories as needed
    ];
    

    return (
        <Container className='slidebar-admin background-overlay drop-shadow border-radius '>
            <ListGroup className='tabs-admin'>
                {sidebarItems.map((categoryObj, index) => (
                    <React.Fragment key={index}>
                        <ListGroupItem tag="div" className="tabs-category background-overlay" onClick={() => handleDropdownToggle(categoryObj.category)}>
                        <FontAwesomeIcon icon={categoryObj.icon} />
                         <span className='px-2'>{categoryObj.category}</span>
                            <FontAwesomeIcon icon={openDropdown === categoryObj.category ? faChevronDown : faChevronRight} className="mr-2" />
                        </ListGroupItem>
                        <Collapse isOpen={openDropdown === categoryObj.category}>
                            {categoryObj.items.map((item, i) => (
                                <Link key={i} to={item.path} onClick={() => handleTabClick(item.component)}>
                                    <ListGroupItem className='items-admin background-overlay'>
                                        {item.name}
                                    </ListGroupItem>
                                </Link>
                            ))}
                        </Collapse>
                    </React.Fragment>
                ))}
            </ListGroup>
        </Container>
        
    );
}

export default AdminSidebar;
