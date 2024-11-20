import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { studentService } from '../../../../services/api/student.service';
import './AttendanceChart.css';

const AttendanceChart = ({ studentId }) => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('month'); // month, semester, year

    useEffect(() => {
        fetchAttendanceData();
    }, [studentId, filter]);

    const fetchAttendanceData = async () => {
        try {
            const data = await studentService.getStudentAttendance(studentId, filter);
            setAttendanceData(data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading attendance data...</div>;
    if (!attendanceData) return <div>No attendance data available</div>;

    const chartData = {
        labels: attendanceData.labels,
        datasets: [
            {
                label: 'Attendance Rate',
                data: attendanceData.values,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4
            }
        ]
    };

    return (
        <div className="attendance-chart">
            <div className="chart-header">
                <h3>Attendance Overview</h3>
                <div className="chart-filters">
                    <button
                        className={`filter-button ${filter === 'month' ? 'active' : ''}`}
                        onClick={() => setFilter('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`filter-button ${filter === 'semester' ? 'active' : ''}`}
                        onClick={() => setFilter('semester')}
                    >
                        Semester
                    </button>
                    <button
                        className={`filter-button ${filter === 'year' ? 'active' : ''}`}
                        onClick={() => setFilter('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            <div className="chart-container">
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    callback: value => `${value}%`
                                }
                            }
                        }
                    }}
                />
            </div>

            <div className="attendance-stats">
                <div className="stat-card">
                    <span className="stat-value">{attendanceData.totalClasses}</span>
                    <span className="stat-label">Total Classes</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{attendanceData.attendedClasses}</span>
                    <span className="stat-label">Classes Attended</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{attendanceData.averageAttendance}%</span>
                    <span className="stat-label">Average Attendance</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceChart; 