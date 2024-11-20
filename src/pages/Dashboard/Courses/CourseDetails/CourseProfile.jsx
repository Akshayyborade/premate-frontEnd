import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseProfile.css';

const CourseProfile = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Mock data - replace with API call
        setCourse({
            id: id,
            courseCode: "CS101",
            name: "Introduction to Programming",
            department: "Computer Science",
            instructor: "Dr. Sarah Johnson",
            credits: 3,
            duration: "4 months",
            enrolledStudents: 45,
            status: "Active",
            startDate: "2024-01-15",
            schedule: "Mon, Wed 10:00 AM",
            description: "An introductory course to programming concepts and practices.",
            prerequisites: ["Basic Mathematics", "Computer Literacy"],
            syllabus: [
                {
                    week: 1,
                    topic: "Introduction to Programming Concepts",
                    content: ["Basic syntax", "Variables", "Data types"]
                },
                {
                    week: 2,
                    topic: "Control Structures",
                    content: ["Conditionals", "Loops", "Switch statements"]
                }
            ],
            enrolledStudentsList: [
                {
                    id: 1,
                    name: "John Doe",
                    studentId: "STU001",
                    grade: "A"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    studentId: "STU002",
                    grade: "B+"
                }
            ]
        });
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-profile">
            <div className="profile-header">
                <h1>{course.name}</h1>
                <span className={`status-badge ${course.status.toLowerCase()}`}>
                    {course.status}
                </span>
            </div>

            <div className="profile-grid">
                <div className="profile-section basic-info">
                    <h2>Course Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Course Code</label>
                            <span>{course.courseCode}</span>
                        </div>
                        <div className="info-item">
                            <label>Department</label>
                            <span>{course.department}</span>
                        </div>
                        <div className="info-item">
                            <label>Instructor</label>
                            <span>{course.instructor}</span>
                        </div>
                        <div className="info-item">
                            <label>Credits</label>
                            <span>{course.credits}</span>
                        </div>
                        <div className="info-item">
                            <label>Duration</label>
                            <span>{course.duration}</span>
                        </div>
                        <div className="info-item">
                            <label>Schedule</label>
                            <span>{course.schedule}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-section syllabus">
                    <h2>Course Syllabus</h2>
                    {course.syllabus.map((week, index) => (
                        <div key={index} className="syllabus-item">
                            <h3>Week {week.week}: {week.topic}</h3>
                            <ul>
                                {week.content.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="profile-section enrolled-students">
                    <h2>Enrolled Students ({course.enrolledStudents})</h2>
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {course.enrolledStudentsList.map(student => (
                                <tr key={student.id}>
                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{student.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourseProfile; 