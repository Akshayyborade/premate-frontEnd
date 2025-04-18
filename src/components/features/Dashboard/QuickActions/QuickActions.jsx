import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';
import Button from '../../../common/Button/Button';
import { 
    FaPlus, 
    FaCalendarAlt, 
    FaTasks, 
    FaUserPlus, 
    FaFileAlt, 
    FaChartLine 
} from 'react-icons/fa';

const QuickActions = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const actions = [
        {
            id: 'new-event',
            icon: <FaCalendarAlt />,
            label: 'New Event',
            description: 'Schedule a new event',
            color: '#4CAF50',
            onClick: () => navigate('/admin/events/new')
        },
        {
            id: 'new-task',
            icon: <FaTasks />,
            label: 'New Task',
            description: 'Create a new task',
            color: '#2196F3',
            onClick: () => navigate('/admin/tasks/new')
        },
        {
            id: 'new-user',
            icon: <FaUserPlus />,
            label: 'New User',
            description: 'Add a new user',
            color: '#9C27B0',
            onClick: () => navigate('/admin/users/new')
        },
        {
            id: 'new-report',
            icon: <FaFileAlt />,
            label: 'New Report',
            description: 'Generate a new report',
            color: '#FF9800',
            onClick: () => navigate('/admin/reports/new')
        },
        {
            id: 'analytics',
            icon: <FaChartLine />,
            label: 'Analytics',
            description: 'View analytics dashboard',
            color: '#E91E63',
            onClick: () => navigate('/admin/analytics')
        }
    ];

    const handleActionClick = (action) => {
        action.onClick();
        setIsExpanded(false);
    };

    return (
        <div className={`quick-actions ${isExpanded ? 'expanded' : ''}`}>
            <div className="quick-actions-header">
                <h3>Quick Actions</h3>
                <Button
                    variant="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="expand-button"
                >
                    <FaPlus className={isExpanded ? 'expanded' : ''} />
                </Button>
            </div>

            <div className="actions-grid">
                {actions.map(action => (
                    <div
                        key={action.id}
                        className="action-card"
                        onClick={() => handleActionClick(action)}
                        style={{ '--action-color': action.color }}
                    >
                        <div className="action-icon" style={{ backgroundColor: action.color }}>
                            {action.icon}
                        </div>
                        <div className="action-content">
                            <h4>{action.label}</h4>
                            <p>{action.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickActions; 