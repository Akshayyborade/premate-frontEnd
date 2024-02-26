import React from 'react';
import Registration from './Registration'; // import your components as needed
import StudentAdmissionForm from '../../student/js/StudentAddmission';

const MainContent = ({ component , setMainContentComponent }) => {
    const renderComponent = () => {
        switch (component) {
            case 'admissionRegistration':
                return <Registration setMainContentComponent={setMainContentComponent}/>;
            // Add more cases for other components as needed
            case 'AddmissionForm': 
                return <StudentAdmissionForm/>;
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
