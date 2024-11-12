import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import './QuickActions.css';

const QuickActions = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const actions = [
        {
            id: 'add-student',
            title: 'Add Student',
            icon: '👨‍🎓',
            path: '/dashboard/students/add',
            permission: 'student.create'
        },
        {
            id: 'mark-attendance',
            title: 'Mark Attendance',
            icon: '📋',
            path: '/dashboard/attendance',
            permission: 'attendance.manage'
        },
        {
            id: 'collect-fee',
            title: 'Collect Fee',
            icon: '💰',
            path: '/dashboard/fees/collect',
            permission: 'fee.collect'
        },
        {
            id: 'add-exam',
            title: 'Schedule Exam',
            icon: '📝',
            path: '/dashboard/exams/schedule',
            permission: 'exam.create'
        },
        {
            id: 'send-notice',
            title: 'Send Notice',
            icon: '📢',
            path: '/dashboard/communications/new',
            permission: 'notice.create'
        },
        {
            id: 'generate-report',
            title: 'Generate Report',
            icon: '📊',
            path: '/dashboard/reports',
            permission: 'report.generate'
        }
    ];

    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false;
    };

    return (
        <div className="quick-actions">
            <div className="section-header">
                <h2>Quick Actions</h2>
            </div>
            <div className="actions-grid">
                {actions.map(action => (
                    hasPermission(action.permission) && (
                        <button
                            key={action.id}
                            className="action-card"
                            onClick={() => navigate(action.path)}
                        >
                            <span className="action-icon">{action.icon}</span>
                            <span className="action-title">{action.title}</span>
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

export default QuickActions; 