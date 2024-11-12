export const sidebarItems = [
    {
        category: 'Dashboard',
        icon: 'faBars', // Store icon as a string to be dynamically imported
        items: [{ name: 'Admin', component: 'AdminDashboard' }],
    },
    {
        category: 'Student',
        icon: 'faUserGraduate',
        items: [
            { name: 'Admissions', component: 'AdmissionRegistration' },
            { name: 'Fees', component: 'FeeCollection' },
            { name: 'Profile', component: 'StudentProfile' },
        ],
    },
    {
        category: 'Faculty',
        icon: 'faPersonChalkboard',
        items: [
            { name: 'Hire', component: 'TeacherRegistration' },
            { name: 'Salary', component: 'TeacherSalary' },
            { name: 'Attendance', component: 'AttendanceRoster' },
            { name: 'Profile', component: 'TeacherProfile' },
        ],
    },
    {
        category: 'Classroom',
        icon: 'faBookReader',
        items: [
            { name: 'Class', component: 'ClassSubjects' },
            { name: 'Attendance', component: 'AttendanceSheet' },
            { name: 'Demographics', component: 'ClassDemographics' },
            { name: 'Timetable', component: 'Timetable' },
        ],
    },
    {
        category: 'Communications',
        icon: 'faEnvelopeOpenText',
        items: [
            { name: 'Announcements', component: 'Announcements' },
            { name: 'Messaging', component: 'Messaging' },
            { name: 'Events', component: 'Events' },
        ],
    },
    {
        category: 'Exam',
        icon: 'faCalendarCheck',
        items: [
            { name: 'Schedule', component: 'ExamSchedule' },
            { name: 'Marks', component: 'MarksEntry' },
            { name: 'Results', component: 'ResultDeclaration' },
            { name: 'Syllabus', component: 'SyllabusUpload' },
            { name: 'Questions', component: 'QuestionBank' },
        ],
    },
];
