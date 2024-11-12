import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { activityService } from '../../../../services/api/activity.service';
import './RecentActivities.css';

const RecentActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const data = await activityService.getRecentActivities();
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'student': return '👨‍🎓';
            case 'attendance': return '📋';
            case 'fee': return '💰';
            case 'exam': return '📝';
            case 'notice': return '📢';
            default: return '📌';
        }
    };

    if (loading) return <div className="activities-loading">Loading...</div>;

    return (
        <div className="recent-activities">
            <div className="section-header">
                <h2>Recent Activities</h2>
            </div>
            <div className="activities-list">
                {activities.length === 0 ? (
                    <div className="no-activities">
                        No recent activities
                    </div>
                ) : (
                    activities.map(activity => (
                        <div key={activity.id} className="activity-item">
                            <div className="activity-icon">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="activity-content">
                                <p className="activity-text">
                                    <span className="activity-user">
                                        {activity.user}
                                    </span>
                                    {activity.action}
                                </p>
                                <span className="activity-time">
                                    {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivities; 