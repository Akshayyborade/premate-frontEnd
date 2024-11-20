import React, { useState, useEffect } from 'react';
import './css/card.css';
import './css/DashboardHome.css';

import AbsentsChart from './chart/AbsentsChart';

const DashboardHome = () => {
    const dates = Array.from({ length: 10 }, (_, i) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        return currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    });

    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedGrade, setSelectedGrade] = useState('1st Grade');
    const [selectedBatch, setSelectedBatch] = useState('Batch 1');
    const [students, setStudents] = useState([]);

    const present = 25;
    const absent = 5;

    useEffect(() => {
        setSelectedGrade('1st Grade');
        setSelectedBatch('Batch 1');
    }, []);

    const timetable = [
        { date: dates[0], grade: '1st Grade', batch: 'Batch 1', subject: 'Maths' },
        { date: dates[0], grade: '1st Grade', batch: 'Batch 1', subject: 'Science' },
        { date: dates[0], grade: '1st Grade', batch: 'Batch 1', subject: 'English' },
    ];

    const filteredTimetable = timetable.filter((item) =>
        item.date === selectedDate &&
        item.grade === selectedGrade &&
        item.batch === selectedBatch
    );

    const handleDateChange = (date) => setSelectedDate(date);
    const handleGradeChange = (grade) => setSelectedGrade(grade);
    const handleBatchChange = (batch) => setSelectedBatch(batch);

    const [tasks, setTasks] = useState({
        upcoming: [],
        completed: [],
        setTasks: [],
    });

    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState('');

    const addTask = (task) => {
        setTasks((prev) => ({
            ...prev,
            setTasks: [...prev.setTasks, task],
        }));
    };

    const addNotice = () => {
        if (newNotice) {
            setNotices((prev) => [...prev, newNotice]);
            setNewNotice('');
        }
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="top_panel">
                    <div className="left_up">
                        <div className="scrollmenu student-card">
                            {dates.map((date, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={selectedDate === date ? 'selected' : ''}
                                    onClick={() => handleDateChange(date)}
                                >
                                    {date}
                                </a>
                            ))}
                        </div>

                        <div className="grade-batch">
                            <div className="grade-container">
                                <select value={selectedGrade} onChange={(e) => handleGradeChange(e.target.value)}>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                                        <option key={grade} value={`${grade}th Grade`}>{`${grade}th Grade`}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="batch-container">
                                <select value={selectedBatch} onChange={(e) => handleBatchChange(e.target.value)}>
                                    {Array.from({ length: 3 }, (_, i) => i + 1).map((batch) => (
                                        <option key={batch} value={`Batch ${batch}`}>{`Batch ${batch}`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="content-div">
                            {filteredTimetable.length > 0 ? (
                                <ul>
                                    {filteredTimetable.map((item, index) => (
                                        <li key={index}>{item.subject}</li>
                                    ))}
                                </ul>
                            ) : (
                                'No subjects scheduled for this date, grade, and batch.'
                            )}
                        </div>
                    </div>

                    {/* Middle panel content */}
                    <div className="middle_up">
                        
                        <div className="events">
                            <h5>Upcoming Events</h5>
                            <p>Science Fair on Oct 12</p>
                            <p>Parent-Teacher Meet on Oct 15</p>
                        </div>
                    </div>

                    <div className="right_up">
                        <div className="card-container">
                            <div className="info-card">
                                <h5>Total Students</h5>
                                <strong>{students.length}</strong>
                                <h6>Absents</h6>
                                <strong>{students.filter(student => !student.isactive).length}</strong>
                            </div>
                            <div className="info-card">
                                <h5>Total Teacher</h5>
                                <strong>{students.length}</strong>
                                <h6>Absents</h6>
                                <strong>{students.filter(student => !student.isactive).length}</strong>
                            </div>
                            <div className="info-card">
                                <h5>Fees Collected</h5>
                                <strong>{students.length}</strong>
                                <h6>Fees pending</h6>
                                <strong>{students.filter(student => !student.isactive).length}</strong>
                            </div>
                            <div className="info-card">
                                <h5>Total Holidays</h5>
                                <strong>{students.length}</strong>
                                <h6>Next Holiday</h6>
                                <strong>{students.filter(student => !student.isactive).length}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom_panel">
                    <div className="chart-card">
                        <AbsentsChart absent={absent} present={present} />
                    </div>

                    <div className="tasks-card">
                        <h6>Tasks</h6>
                        <h6>Upcoming</h6>
                        <ul>
                            {tasks.upcoming.map((task, index) => (
                                <li key={index}>{task}</li>
                            ))}
                        </ul>
                        <h6>Completed</h6>
                        <ul>
                            {tasks.completed.map((task, index) => (
                                <li key={index}>{task}</li>
                            ))}
                        </ul>
                        <h6>Set Tasks</h6>
                        <input
                            type="text"
                            placeholder="Add a task"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTask(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                    </div>

                    <div className="notices-card">
                        <h6>Notices</h6>
                        <ul>
                            {notices.map((notice, index) => (
                                <li key={index}>{notice}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Add a notice"
                            value={newNotice}
                            onChange={(e) => setNewNotice(e.target.value)}
                        />
                        <button onClick={addNotice}>Add Notice</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
