import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Timetable.css';

const Timetable = ({ data }) => {
    const [selectedGrade, setSelectedGrade] = useState(data.grades[0]);
    const [selectedBatch, setSelectedBatch] = useState(data.batches[0]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleDateChange = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + direction);
        setCurrentDate(newDate);
    };

    return (
        <div className="timetable">
            <div className="timetable-header">
                <h2>Class Timetable</h2>
                <div className="timetable-filters">
                    <select 
                        value={selectedGrade} 
                        onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                        {data.grades.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                        ))}
                    </select>
                    <select 
                        value={selectedBatch} 
                        onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                        {data.batches.map(batch => (
                            <option key={batch} value={batch}>Batch {batch}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="timetable-date-navigator">
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <span>{currentDate.toLocaleDateString()}</span>
                <button onClick={() => handleDateChange(1)}>&gt;</button>
            </div>

            <div className="timetable-content">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.schedule
                            .filter(item => 
                                item.grade === selectedGrade && 
                                item.batch === selectedBatch &&
                                new Date(item.date).toDateString() === currentDate.toDateString()
                            )
                            .map(item => (
                                <tr key={item.id}>
                                    <td>{item.time}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.teacher}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

Timetable.propTypes = {
    data: PropTypes.shape({
        grades: PropTypes.arrayOf(PropTypes.string).isRequired,
        batches: PropTypes.arrayOf(PropTypes.string).isRequired,
        schedule: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            grade: PropTypes.string.isRequired,
            batch: PropTypes.string.isRequired,
            subject: PropTypes.string.isRequired,
            teacher: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
};

export default Timetable; 