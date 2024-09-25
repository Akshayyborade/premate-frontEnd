import React, { useState, useEffect } from 'react';
import { Typography, Select, MenuItem, Card, Container, Grid, TextField, Button } from '@mui/material';
import { CardBody, CardSubtitle, CardTitle, Row } from 'reactstrap';
import './css/card.css'
import './css/DashboardHome.css'

import AbsentsChart from './chart/AbsentsChart';

const DashboardTimetable = () => {
    const dates = Array.from({ length: 10 }, (_, i) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        return currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    });

    // Set initial values: grade to "1st Grade", batch to "Batch 1"
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedGrade, setSelectedGrade] = useState('1st Grade'); // Set default grade
    const [selectedBatch, setSelectedBatch] = useState('Batch 1'); // Default batch
    const [students, setStudents] = useState([]);

    // Example counts for present and absent students
    const present = 25; // Example number of students present
    const absent = 5;

    useEffect(() => {
        // Initialize grade to "1st Grade" and batch to "Batch 1"
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


    // State for tasks
    const [tasks, setTasks] = useState({
        upcoming: [],
        completed: [],
        setTasks: [],
    });

    // State for notices
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState('');

    // Function to add a new task
    const addTask = (task) => {
        setTasks((prev) => ({
            ...prev,
            setTasks: [...prev.setTasks, task],
        }));
    };

    // Function to add a new notice
    const addNotice = () => {
        if (newNotice) {
            setNotices((prev) => [...prev, newNotice]);
            setNewNotice('');
        }
    };


    return (
        <div className='dashboard'>
            <div className="container" >
                <div className="left_panel">
                    <div className="timetable-container" >
                        <div className="scrollmenu student-card" style={{ overflowX: 'auto', whiteSpace: 'nowrap', backgroundColor: '#24244d', display: 'flex' }}>
                            {dates.map((date, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        color: selectedDate === date ? 'transparent' : 'white',
                                        textAlign: 'center',
                                        padding: '16px',
                                        textDecoration: 'none',
                                        backgroundClip: selectedDate === date ? 'text' : 'initial',
                                        WebkitBackgroundClip: selectedDate === date ? 'text' : 'initial',
                                        WebkitTextFillColor: selectedDate === date ? 'transparent' : 'initial',
                                        backgroundImage: selectedDate === date ? 'linear-gradient(101deg,  #f5a623, #f76c6c)' : 'none',
                                    }}
                                    onClick={() => handleDateChange(date)}
                                >
                                    {date}
                                </a>
                            ))}
                        </div>

                        <div className='grade-batch'>
                            <div className="grade-container" >
                                <Select
                                    variant="outlined"
                                    value={selectedGrade} // Keep default grade selected
                                    className="grade-selector"
                                    onChange={(e) => handleGradeChange(e.target.value)}
                                    fullWidth
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                                        <MenuItem key={grade} value={`${grade}th Grade`}>
                                            {`${grade}th Grade`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="batch-container">
                                <Select
                                    variant="outlined"
                                    value={selectedBatch} // Keep batch as "Batch 1"
                                    className="batch-selector"
                                    onChange={(e) => handleBatchChange(e.target.value)}
                                    fullWidth
                                >
                                    {Array.from({ length: 3 }, (_, i) => i + 1).map((batch) => (
                                        <MenuItem key={batch} value={`Batch ${batch}`}>
                                            {`Batch ${batch}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div id="content-div" style={{ width: '100%', padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                            <Typography variant="body1">
                                {filteredTimetable.length > 0 ? (
                                    <ul>
                                        {filteredTimetable.map((item, index) => (
                                            <li key={index}>{item.subject}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    'No subjects scheduled for this date, grade, and batch.'
                                )}
                            </Typography>
                        </div>
                    </div>
                    <div className="demography_right">
                        <Container sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Card className='background-card '>
                                        <CardBody>
                                            <CardTitle tag="h5">Total Students</CardTitle>
                                            <strong style={{ fontSize: '21px' }}>{students.length}</strong>
                                            <CardSubtitle className="mb-2 text-muted " tag="h6">Absents</CardSubtitle>
                                            <strong style={{ fontSize: '21px' }}>{students.filter(student => !student.isactive).length}</strong>
                                        </CardBody>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className='background-card '>
                                        <CardBody>
                                            <CardTitle tag="h5">Total Teacher</CardTitle>
                                            <strong style={{ fontSize: '21px' }}>{students.length}</strong>
                                            <CardSubtitle className="mb-2 text-muted " tag="h6">Absents</CardSubtitle>
                                            <strong style={{ fontSize: '21px' }}>{students.filter(student => !student.isactive).length}</strong>
                                        </CardBody>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className='background-card'>
                                        <CardBody>
                                            <CardTitle tag="h5">Fees Collected</CardTitle>
                                            <strong style={{ fontSize: '21px' }}>{students.length}</strong>
                                            <CardSubtitle className="mb-2 text-muted " tag="h6">Fees pending</CardSubtitle>
                                            <strong style={{ fontSize: '21px' }}>{students.filter(student => !student.isactive).length}</strong>
                                        </CardBody>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className='background-card drop-shadow border-0  mx-auto'>
                                        <CardBody>
                                            <CardTitle tag="h5">Total Holidays</CardTitle>
                                            <strong style={{ fontSize: '21px' }}>{students.length}</strong>
                                            <CardSubtitle className="mb-2 text-muted " tag="h6">Next Holiday</CardSubtitle>
                                            <strong style={{ fontSize: '21px' }}>{students.filter(student => !student.isactive).length}</strong>
                                        </CardBody>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>


                <div className="demography_bottom">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, height: '100%' }}>
                                <AbsentsChart absent={absent} present={present} />
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Card sx={{ padding: 2, height: '100%' }}>
                                <Typography variant="h6">Tasks</Typography>
                                <Typography variant="subtitle1">Upcoming</Typography>
                                <ul>
                                    {tasks.upcoming.map((task, index) => (
                                        <li key={index}>{task}</li>
                                    ))}
                                </ul>
                                <Typography variant="subtitle1">Completed</Typography>
                                <ul>
                                    {tasks.completed.map((task, index) => (
                                        <li key={index}>{task}</li>
                                    ))}
                                </ul>
                                <Typography variant="subtitle1">Set Tasks</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Add a task"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addTask(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Card sx={{ padding: 2, height: '100%' }}>
                                <Typography variant="h6">Notices</Typography>
                                <ul>
                                    {notices.map((notice, index) => (
                                        <li key={index}>{notice}</li>
                                    ))}
                                </ul>
                                <TextField
                                    variant="outlined"
                                    placeholder="Add a notice"
                                    value={newNotice}
                                    onChange={(e) => setNewNotice(e.target.value)}
                                />
                                <Button variant="contained" color="primary" onClick={addNotice}>
                                    Add Notice
                                </Button>
                            </Card>
                        </Grid>
                    </Grid>
                </div>



            </div>
        </div>
    );
};

export default DashboardTimetable;
