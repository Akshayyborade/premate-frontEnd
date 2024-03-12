import React from 'react';
import Registration from './student/Registration'; // import your components as needed
import StudentAdmissionForm from './student/StudentAddmission';
import TeacherRegistrationForm from './teacher/TeacherRegistrationFrom';
import TeacherManagement from './teacher/Hire';
import SalarySection from './teacher/TeacherSalary';
import TeacherAttendance from './teacher/TeacherAttendance';

const MainContent = ({ component, setMainContentComponent }) => {
    const renderComponent = () => {
        switch (component) {
            case 'AdmissionRegistration':
                return <Registration setMainContentComponent={setMainContentComponent} />;
            // Add more cases for other components as needed
            case 'AddmissionForm':
                return <StudentAdmissionForm />;
            case 'TeacherRegistration':
                return <TeacherManagement setMainContentComponent={setMainContentComponent} />;
            case 'HireTeacher':
                return <TeacherRegistrationForm />
            case 'TeacherSalary':
                return <SalarySection />

            case 'AttendanceRoster':
                return <TeacherAttendance/>

            default:
                return null;
        }
    };

    return (
        <div className='main-content background-overlay drop-shadow border-radius'>
            {renderComponent()}
        </div>
    );
};

export default MainContent;
