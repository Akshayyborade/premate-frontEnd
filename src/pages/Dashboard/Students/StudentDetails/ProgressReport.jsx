import React, { useState, useEffect } from 'react';
import { studentService } from '../../../../services/api/student.service';
import { Line, Bar } from 'react-chartjs-2';
import Button from '../../../../components/common/Button';
import './ProgressReport.css';

const ProgressReport = ({ studentId }) => {
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedExam, setSelectedExam] = useState('all');

    useEffect(() => {
        fetchProgressData();
    }, [studentId, selectedExam]);

    const fetchProgressData = async () => {
        try {
            const data = await studentService.getStudentProgress(studentId, selectedExam);
            setProgressData(data);
        } catch (error) {
            console.error('Error fetching progress data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading progress report...</div>;
    if (!progressData) return <div>No progress data available</div>;

    const performanceTrendData = {
        labels: progressData.performanceTrend.labels,
        datasets: [
            {
                label: 'Performance',
                data: progressData.performanceTrend.values,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4
            }
        ]
    };

    const subjectWiseData = {
        labels: progressData.subjectWise.map(s => s.subject),
        datasets: [
            {
                label: 'Marks Obtained',
                data: progressData.subjectWise.map(s => s.marksObtained),
                backgroundColor: '#4CAF50'
            },
            {
                label: 'Class Average',
                data: progressData.subjectWise.map(s => s.classAverage),
                backgroundColor: '#FFC107'
            }
        ]
    };

    return (
        <div className="progress-report">
            <div className="report-header">
                <div className="performance-summary">
                    <div className="summary-card">
                        <span className="summary-label">Overall Grade</span>
                        <span className="summary-value grade">
                            {progressData.overallGrade}
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-label">Percentage</span>
                        <span className="summary-value">
                            {progressData.overallPercentage}%
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-label">Class Rank</span>
                        <span className="summary-value">
                            {progressData.classRank}/{progressData.totalStudents}
                        </span>
                    </div>
                </div>
                <div className="report-actions">
                    <select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                        className="exam-select"
                    >
                        <option value="all">All Exams</option>
                        {progressData.examTypes.map(exam => (
                            <option key={exam.id} value={exam.id}>
                                {exam.name}
                            </option>
                        ))}
                    </select>
                    <Button variant="primary" onClick={() => {}}>
                        Download Report
                    </Button>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3>Performance Trend</h3>
                    <Line
                        data={performanceTrendData}
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
                                    max: 100
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-container">
                    <h3>Subject-wise Performance</h3>
                    <Bar
                        data={subjectWiseData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }
                        }}
                    />
                </div>
            </div>

            <div className="exam-details">
                <h3>Exam Details</h3>
                <div className="exam-grid">
                    {progressData.examDetails.map((exam, index) => (
                        <div key={index} className="exam-card">
                            <div className="exam-header">
                                <h4>{exam.name}</h4>
                                <span className={`grade ${exam.grade.toLowerCase()}`}>
                                    {exam.grade}
                                </span>
                            </div>
                            <div className="exam-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Marks</span>
                                    <span className="stat-value">
                                        {exam.marksObtained}/{exam.totalMarks}
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Percentage</span>
                                    <span className="stat-value">
                                        {exam.percentage}%
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Rank</span>
                                    <span className="stat-value">
                                        {exam.rank}/{exam.totalStudents}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressReport; 