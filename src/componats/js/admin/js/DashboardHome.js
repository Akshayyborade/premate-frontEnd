import React, { useState, useEffect } from 'react';
import {  Badge, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
// import { AddTask } from './AddTask'; // Import your AddTask component

const DashboardHome = () => {
    const [todoList, setTodoList] = useState([]);
    const [studentCount, setStudentCount] = useState(0);
    const [recentActive, setRecentActive] = useState([]);
    const [teacherCount, setTeacherCount] = useState(0);
    const [studentAbsent, setStudentAbsent] = useState(0);
    const [notices, setNotices] = useState([]);

    // Fetch data (replace with your API calls)
    // useEffect(() => {
    //     const fetchStudentCount = async () => {
    //         const response = await fetch('/api/students/count');
    //         const data = await response.json();
    //         setStudentCount(data.count);
    //     };

    //     const fetchRecentActive = async () => {
    //         const response = await fetch('/api/students/recent-active');
    //         const data = await response.json();
    //         setRecentActive(data);
    //     };

    //     const fetchTeacherCount = async () => {
    //         const response = await fetch('/api/teachers/count');
    //         const data = await response.json();
    //         setTeacherCount(data.count);
    //     };

    //     const fetchStudentAbsent = async () => {
    //         const response = await fetch('/api/attendance/absent/today');
    //         const data = await response.json();
    //         setStudentAbsent(data.count);
    //     };

    //     const fetchNotices = async () => {
    //         const response = await fetch('/api/notices');
    //         const data = await response.json();
    //         setNotices(data);
    //     };

    //     fetchStudentCount();
    //     fetchRecentActive();
    //     fetchTeacherCount();
    //     fetchStudentAbsent();
    //     fetchNotices();
    // }, []);

    const handleAddTask = (task) => {
        setTodoList([...todoList, task]);
    };

    return (
        <div className="dashboard-home">
            {/* Calendar */}
            <div className="calendar-container">
                {/* <DatePicker /> */}
            </div>

            {/* To-Do List */}
            <div className="todo-list-container">
                <Typography variant="h6">To-Do List</Typography>
                <List>
                    {todoList.map((task) => (
                        <ListItem key={task.id}>
                            <ListItemText primary={task.text} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    {/* Add delete functionality here */}
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                {/* <AddTask onAddTask={handleAddTask} /> */}
            </div>

            {/* Student Information */}
            <div className="student-info-container">
                <div>
                    <Typography variant="h6">Total Students</Typography>
                    <Badge badgeContent={studentCount} color="primary">
                        <Typography variant="h4">{studentCount}</Typography>
                    </Badge>
                </div>
                <div>
                    <Typography variant="h6">Recent Active</Typography>
                    <List>
                        {recentActive.map((student) => (
                            <ListItem key={student.id}>
                                <ListItemText primary={student.name} />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div>
                    <Typography variant="h6">Total Teachers</Typography>
                    <Badge badgeContent={teacherCount} color="primary">
                        <Typography variant="h4">{teacherCount}</Typography>
                    </Badge>
                </div>
                <div>
                    <Typography variant="h6">Absent Today</Typography>
                    <Badge badgeContent={studentAbsent} color="error">
                        <Typography variant="h4">{studentAbsent}</Typography>
                    </Badge>
                </div>
            </div>

            {/* Notices */}
            <div className="notices-container">
                <Typography variant="h6">Notices</Typography>
                <List dense={true}>
                    {notices.map((notice) => (
                        <ListItem key={notice.id}>
                            <ListItemText primary={notice.title} secondary={notice.excerpt} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default DashboardHome;
