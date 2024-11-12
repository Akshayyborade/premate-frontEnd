import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './Notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Fetch notifications from API
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            // Replace with actual API call
            const response = await fetch('/api/notifications');
            const data = await response.json();
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            // Replace with actual API call
            await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
            setNotifications(notifications.map(n => 
                n.id === id ? { ...n, read: true } : n
            ));
            setUnreadCount(prev => prev - 1);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'payment': return '💰';
            case 'attendance': return '📋';
            case 'exam': return '📝';
            case 'announcement': return '📢';
            default: return '📌';
        }
    };

    return (
        <div className="notifications-panel">
            <div className="notifications-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                    <span className="unread-badge">{unreadCount}</span>
                )}
            </div>

            <div className="notifications-list">
                {notifications.length === 0 ? (
                    <div className="no-notifications">
                        No notifications
                    </div>
                ) : (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`notification-item ${!notification.read ? 'unread' : ''}`}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                        >
                            <div className="notification-icon">
                                {getNotificationIcon(notification.type)}
                            </div>
                            <div className="notification-content">
                                <p className="notification-message">
                                    {notification.message}
                                </p>
                                <span className="notification-time">
                                    {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                                </span>
                            </div>
                            {!notification.read && (
                                <div className="notification-dot" />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications; 