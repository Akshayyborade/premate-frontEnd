import React from 'react';
import QuickActions from '../../components/features/Dashboard/QuickActions/QuickActions';
import RecentActivities from '../../components/features/Dashboard/RecentActivities/RecentActivities';
import TaskManagement from '../../components/features/Dashboard/TaskManagement/TaskManagement';
import SystemAlerts from '../../components/features/Dashboard/SystemAlerts/SystemAlerts';
import AnalyticsCharts from '../../components/features/Dashboard/AnalyticsCharts/AnalyticsCharts';
import Calendar from '../../components/features/Dashboard/Calendar/Calendar';
import DashboardSettings from '../../components/features/Dashboard/DashboardSettings/DashboardSettings';
import './DashboardHome.css';

const DashboardHome = () => {
    return (
        <div className="dashboard-home">
            <SystemAlerts />
            
            <div className="dashboard-grid">
                <div className="dashboard-main">
                    <QuickActions />
                    <AnalyticsCharts />
                    <Calendar />
                </div>
                
                <div className="dashboard-sidebar">
                    <TaskManagement />
                    <RecentActivities />
                </div>
            </div>

            <DashboardSettings />
        </div>
    );
};

export default DashboardHome; 