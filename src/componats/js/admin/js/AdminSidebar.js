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
            items: [{ name: 'Admin Dashboard', component: 'AdminDashboard' }],
        },
        {  
            category: 'Student Management',
            icon: faUserGraduate,
            items: [
                { name: 'Admissions & Registrations', component: 'admissionRegistration' },
                { name: 'Fee Collection', path: '/fee-collection' },
                { name: 'Student Profile', path: '/student-profile' },
                // Add more items as needed
            ]
        },
        {
            category: 'Faculty Management',
            icon: faPersonChalkboard,
            items: [
                { name: 'Hire and Resignation', path: '/hire-resignation' },
                { name: 'Salary', path: '/salary' },
                { name: 'Attendance and Roster', path: '/attendance-roster' },
                { name: 'Teacher Profile', path: '/teacher-profile' },
                // Add more items as needed
            ]
        },
        {
            category: 'Classroom Management',
            icon: faBookReader,
            items: [
                { name: 'Class and Subjects', path: '/class-subjects' },
                { name: 'Attendance Sheet', path: '/attendance-sheet' },
                { name: 'Class Demographics', path: '/class-demographics' },
                { name: 'Timetable', path: '/timetable' },
                // Add more items as needed
            ]
        },
        {
            category: 'Communications',
            icon: faEnvelopeOpenText,
            items: [
                { name: 'Announcements', path: '/announcements' },
                { name: 'Messaging', path: '/messaging' },
                { name: 'Events', path: '/events' },
                // Add more items as needed
            ]
        },
        {
            category: 'Exam',
            icon: faCalendarCheck,
            items: [
                { name: 'Exam Schedule', path: '/exam-schedule' },
                { name: 'Marks Entry', path: '/marks-entry' },
                { name: 'Result Declaration', path: '/result-declaration' },
                { name: 'Syllabus Upload', path: '/syllabus-upload' },
                { name: 'Question Bank', path: '/question-bank' },
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
