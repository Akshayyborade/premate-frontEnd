import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';

// Component imports
import QuickActions from '../../../components/features/Dashboard/QuickActions/QuickActions';
import RecentActivities from '../../../components/features/Dashboard/RecentActivities/RecentActivities';
import TaskManagement from '../../../components/features/Dashboard/TaskManagement/TaskManagement';
import SystemAlerts from '../../../components/features/Dashboard/SystemAlerts/SystemAlerts';
import AnalyticsCharts from '../../../components/features/Dashboard/AnalyticsCharts/AnalyticsCharts';
import Calendar from '../../../components/features/Dashboard/Calendar/Calendar';
import DashboardSettings from '../../../components/features/Dashboard/DashboardSettings/DashboardSettings';
import ErrorBoundary from '../../../components/common/ErrorBoundary';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Timetable from '../../../components/features/Dashboard/Timetable/Timetable';
import './DashboardHome.css';

// PropTypes for data structures
const AnalyticsDataShape = {
    revenue: PropTypes.arrayOf(PropTypes.number).isRequired,
    enrollments: PropTypes.arrayOf(PropTypes.number).isRequired,
    attendance: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        values: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
};

const CalendarEventShape = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['meeting', 'deadline', 'training']).isRequired
};

const DashboardHome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock data for analytics
    const analyticsData = {
        revenue: [1500, 2300, 3200, 4100, 2800, 3500],
       
        attendance: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            values: [85, 90, 88, 92, 87]
        }
    };

    // Mock calendar events
    const calendarEvents = [
        {
            title: 'Team Meeting',
            date: '2024-03-15',
            type: 'meeting'
        },
        {
            title: 'Project Deadline',
            date: '2024-03-20',
            type: 'deadline'
        },
        {
            title: 'Training Session',
            date: '2024-03-25',
            type: 'training'
        }
    ];

    // Mock timetable data
    const timetableData = {
        grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
        batches: ['A', 'B', 'C'],
        schedule: [
            {
                id: 1,
                grade: 'Grade 9',
                batch: 'A',
                subject: 'Mathematics',
                teacher: 'John Doe',
                time: '09:00 - 10:30',
                date: '2024-03-15'
            },
            // Add more schedule items...
        ]
    };

    if (error) {
        return (
            <div className="dashboard-error">
                <h2>Something went wrong</h2>
                <p>{error.message}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
           

            <div className="dashboard-content">
                <main className="dashboard-main">
                    <section className="dashboard-middle">
                        <div className="analytics-section">
                            <ErrorBoundary>
                                <Suspense fallback={<LoadingSpinner />}>
                                    <AnalyticsCharts data={analyticsData} />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                        
                    </section>
                    <section className="dashboard-bottom">
                        <ErrorBoundary>
                            <Suspense fallback={<LoadingSpinner />}>
                                <Timetable data={timetableData} />
                            </Suspense>
                        </ErrorBoundary>
                    </section>
                </main>

                <aside className="dashboard-sidebar">
                <section className="dashboard-top">
                        <ErrorBoundary>
                            <Suspense fallback={<LoadingSpinner />}>
                                <QuickActions />
                            </Suspense>
                        </ErrorBoundary>
                    </section>
                    <div className="task-section">
                        <ErrorBoundary>
                            <Suspense fallback={<LoadingSpinner />}>
                                <TaskManagement />
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                    <div className="activities-section">
                        <ErrorBoundary>
                            <Suspense fallback={<LoadingSpinner />}>
                                <RecentActivities />
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                    <div className="calendar-section">
                            <ErrorBoundary>
                                <Suspense fallback={<LoadingSpinner />}>
                                    <Calendar events={calendarEvents} />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                </aside>
            </div>

           

            {isLoading && (
                <div className="dashboard-overlay">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
};

// PropTypes for the child components (assuming they accept these props)
AnalyticsCharts.propTypes = {
    data: PropTypes.shape(AnalyticsDataShape).isRequired
};

Calendar.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape(CalendarEventShape)).isRequired
};

export default DashboardHome; 