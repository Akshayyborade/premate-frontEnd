import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
//import '../css/Teacher-dashboard.css'

function MainSlidebar(slidebar) {
    const [activeTab, setActiveTab] = useState('dashboard-tab');
    const [dynamicContent, setDynamicContent] = useState(null);

    useEffect(() => {
        changeContent('dashboard-tab'); // Call the function with "dashboard-tab" option on component mount
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    const changeContent = (option) => {
        setActiveTab(option);

        switch (option) {
            case "dashboard-tab":
                setDynamicContent(
                    <div className="dashboard" id="dashboard">
                        <div className="roster">
                            <div className="days-present">
                                <h5>Days Present:</h5>
                                <h4>20 days</h4>
                            </div>
                            <div className="days-absent">
                                <h5>Days Absent:</h5>
                                <h4>20 Days</h4>
                            </div>
                        </div>
                        <div className="marks-exam">
                            <div className="submit-Marks">
                                <h4>Submit Marks</h4>
                            </div>
                            <div className="sent-notice">
                                <h4>Notice</h4>
                            </div>
                        </div>
                    </div>
                );
                break;
            // Add other cases for different tabs as needed
            default:
                break;
        }
    };

    return (
        <>
            <ListGroup>
                <ListGroupItem tag="div" action id="dashboard-tab" onClick={() => changeContent('dashboard-tab')}>
                    <h6>{slidebar.name}</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="time-table-tab" onClick={() => changeContent('time-table-tab')}>
                    <h6>Time Table</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="student-info" onClick={() => changeContent('student-info')}>
                    <h6>Student information</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="attendance" onClick={() => changeContent('attendance')}>
                    <h6>Attendance</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="exam" onClick={() => changeContent('exam')}>
                    <h6>Exam</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="syllabus" onClick={() => changeContent('syllabus')}>
                    <h6>Syllabus</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="salary" onClick={() => changeContent('salary')}>
                    <h6>Salary</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="roster" onClick={() => changeContent('roster')}>
                    <h6>Roster</h6>
                </ListGroupItem>
                <ListGroupItem tag="div" action id="notice" onClick={() => changeContent('notice')}>
                    <h6>Notice</h6>
                </ListGroupItem>
            </ListGroup>

            <div id="content-dashboard">{dynamicContent}</div>
        </>
    );
}

export default MainSlidebar;
