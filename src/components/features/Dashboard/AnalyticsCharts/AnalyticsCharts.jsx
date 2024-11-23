import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './AnalyticsCharts.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsCharts = ({ data }) => {
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue',
            data: data.revenue,
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
            tension: 0.4
        }]
    };

    const enrollmentData = {
        labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
        datasets: [{
            label: 'Enrollments',
            data: data.enrollments,
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FFC107',
                '#E91E63',
                '#9C27B0'
            ]
        }]
    };

    const attendanceData = {
        labels: data.attendance.labels,
        datasets: [{
            label: 'Attendance Rate',
            data: data.attendance.values,
            backgroundColor: 'rgba(33, 150, 243, 0.8)'
        }]
    };

    return (
        <div className="analytics-charts">
            <div className="chart-container">
                <h3>Revenue Trend</h3>
                <Line
                    data={revenueData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>

            <div className="charts-grid">
               {data.enrollments &&
               <div className="chart-container">
               <h3>Course Enrollments</h3>
               <Doughnut
                   data={enrollmentData}
                   options={{
                       responsive: true,
                       plugins: {
                           legend: {
                               position: 'right'
                           }
                       }
                   }}
               />
           </div>} 

                <div className="chart-container">
                    <h3>Attendance Rate</h3>
                    <Bar
                        data={attendanceData}
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
            </div>
        </div>
    );
};

export default AnalyticsCharts; 