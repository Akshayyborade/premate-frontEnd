import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TeacherProfile.css';

const TeacherProfile = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Mock data - replace with API call
        setTeacher({
            id: id,
            teacherId: "TCH001",
            name: "Dr. Sarah Johnson",
            department: "Computer Science",
            subjects: ["Programming", "Data Structures"],
            status: "Active",
            email: "sarah.j@example.com",
            phone: "+1234567890",
            joinDate: "2023-01-15",
            education: [
                {
                    degree: "Ph.D. in Computer Science",
                    institution: "Stanford University",
                    year: "2018"
                },
                {
                    degree: "M.S. in Computer Science",
                    institution: "MIT",
                    year: "2015"
                }
            ],
            schedule: [
                {
                    day: "Monday",
                    classes: ["CS101 - 9:00 AM", "CS202 - 2:00 PM"]
                },
                {
                    day: "Wednesday",
                    classes: ["CS101 - 9:00 AM", "CS303 - 3:30 PM"]
                }
            ]
        });
    }, [id]);

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="teacher-profile">
            <div className="profile-header">
                <h1>{teacher.name}</h1>
                <span className={`status-badge ${teacher.status.toLowerCase()}`}>
                    {teacher.status}
                </span>
            </div>

            <div className="profile-grid">
                <div className="profile-section basic-info">
                    <h2>Basic Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Teacher ID</label>
                            <span>{teacher.teacherId}</span>
                        </div>
                        <div className="info-item">
                            <label>Department</label>
                            <span>{teacher.department}</span>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <span>{teacher.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Phone</label>
                            <span>{teacher.phone}</span>
                        </div>
                        <div className="info-item">
                            <label>Join Date</label>
                            <span>{teacher.joinDate}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-section education">
                    <h2>Education</h2>
                    {teacher.education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <h3>{edu.degree}</h3>
                            <p>{edu.institution} - {edu.year}</p>
                        </div>
                    ))}
                </div>

                <div className="profile-section schedule">
                    <h2>Class Schedule</h2>
                    {teacher.schedule.map((day, index) => (
                        <div key={index} className="schedule-item">
                            <h3>{day.day}</h3>
                            <ul>
                                {day.classes.map((cls, idx) => (
                                    <li key={idx}>{cls}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile; 