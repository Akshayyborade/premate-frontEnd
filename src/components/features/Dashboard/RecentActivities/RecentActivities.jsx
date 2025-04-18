import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaClock, FaUser, FaCalendarAlt, FaBell, FaFileAlt } from 'react-icons/fa';
import './RecentActivities.css';

const RecentActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            // Simulated API call - replace with actual API call
            const mockActivities = [
                {
                    id: 1,
                    type: 'user',
                    title: 'New User Registration',
                    description: 'John Doe registered as a new user',
                    timestamp: new Date(),
                    icon: <FaUser />
                },
                {
                    id: 2,
                    type: 'event',
                    title: 'Meeting Scheduled',
                    description: 'Team meeting scheduled for tomorrow',
                    timestamp: new Date(),
                    icon: <FaCalendarAlt />
                },
                {
                    id: 3,
                    type: 'notification',
                    title: 'System Update',
                    description: 'System maintenance scheduled for next week',
                    timestamp: new Date(),
                    icon: <FaBell />
                },
                {
                    id: 4,
                    type: 'document',
                    title: 'New Document Uploaded',
                    description: 'Project proposal document uploaded',
                    timestamp: new Date(),
                    icon: <FaFileAlt />
                }
            ];
            setActivities(mockActivities);
        } catch (err) {
            setError('Failed to fetch activities');
            console.error('Error fetching activities:', err);
        } finally {
            setLoading(false);
        }
    };

    const getActivityTypeClass = (type) => {
        const typeClasses = {
            user: 'user-activity',
            event: 'event-activity',
            notification: 'notification-activity',
            document: 'document-activity'
        };
        return typeClasses[type] || '';
    };

    const filteredActivities = activities.filter(activity => 
        filter === 'all' || activity.type === filter
    );

    if (loading) {
        return (
            <div className="recent-activities">
                <div className="activities-loading">Loading activities...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="recent-activities">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="recent-activities">
            <div className="activities-header">
                <h2>Recent Activities</h2>
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="activity-filter"
                >
                    <option value="all">All Activities</option>
                    <option value="user">User Activities</option>
                    <option value="event">Events</option>
                    <option value="notification">Notifications</option>
                    <option value="document">Documents</option>
                </select>
            </div>

            <div className="activities-list">
                {filteredActivities.length === 0 ? (
                    <div className="no-activities">
                        No activities found
                    </div>
                ) : (
                    filteredActivities.map(activity => (
                        <div 
                            key={activity.id} 
                            className={`activity-item ${getActivityTypeClass(activity.type)}`}
                        >
                            <div className="activity-icon">
                                {activity.icon}
                            </div>
                            <div className="activity-content">
                                <h3 className="activity-title">{activity.title}</h3>
                                <p className="activity-description">{activity.description}</p>
                                <div className="activity-meta">
                                    <span className="activity-time">
                                        <FaClock /> {format(activity.timestamp, 'MMM d, h:mm a')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivities; 