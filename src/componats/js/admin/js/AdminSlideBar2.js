import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ExpandLess,
  ExpandMore,
  Collapse,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAmbulance,
  faBars,
  faBookReader,
  faCalendarCheck,
  faUserGraduate,
  faPersonChalkboard,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ExpandLessSharp, ExpandMoreSharp } from '@mui/icons-material';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

function AdminSidebar2({ setMainContentComponent }) {
  const [activeTab, setActiveTab] = useState('Student Management');
  const [openDropdown, setOpenDropdown] = useState('');

  const handleTabClick = (component) => {
    setMainContentComponent(component);
  };

  const handleDropdownToggle = (category) => {
    setOpenDropdown(openDropdown === category ? '' : category);
  };

  // ... sidebarItems and other parts unchanged
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
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // // width: 200, // Adjust width as needed
        bgcolor: 'background.paper', // Use Material UI colors
        borderRadius: 'inherit',
      }}
    >
      {sidebarItems.map((categoryObj, index) => (
        <React.Fragment key={index}>
          <ListItem button onClick={() => handleDropdownToggle(categoryObj.category)}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <FontAwesomeIcon icon={categoryObj.icon} />
            </ListItemIcon>
            <ListItemText sx={{ pl: 2 , textAlign:'left' ,paddingRight:3}} primary={categoryObj.category}  color='success' />
            {openDropdown === categoryObj.category ? <ExpandLessSharp   /> : <ExpandMoreSharp />}
          </ListItem>
          <Collapse in={openDropdown === categoryObj.category} timeout="auto" unmountOnExit>
            {categoryObj.items.map((item, i) => (
              <Link style={{textDecoration:'none', color:'inherit'}} key={i} to={item.path} onClick={() => handleTabClick(item.component)}>
                <ListItem button component={Link} >
                  <ListItemText primary={item.name} color='black' />
                </ListItem>
              </Link>
            ))}
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}

export default AdminSidebar2;
