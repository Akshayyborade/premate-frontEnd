import React, { useState, useEffect } from 'react';
import { alertService } from '../../../../services/api/alert.service';
import './SystemAlerts.css';

const SystemAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 300000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, []);

    const fetchAlerts = async () => {
        try {
            const data = await alertService.getAlerts();
            setAlerts(data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        } finally {
            setLoading(false);
        }
    };

    const dismissAlert = async (alertId) => {
        try {
            await alertService.dismissAlert(alertId);
            setAlerts(alerts.filter(alert => alert.id !== alertId));
        } catch (error) {
            console.error('Error dismissing alert:', error);
        }
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'error': return '🚨';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            case 'success': return '✅';
            default: return '📌';
        }
    };

    if (loading) return <div className="alerts-loading">Loading...</div>;
    if (alerts.length === 0) return null;

    return (
        <div className="system-alerts">
            {alerts.map(alert => (
                <div 
                    key={alert.id} 
                    className={`alert-item ${alert.type}`}
                    role="alert"
                >
                    <div className="alert-icon">
                        {getAlertIcon(alert.type)}
                    </div>
                    <div className="alert-content">
                        <h4 className="alert-title">{alert.title}</h4>
                        <p className="alert-message">{alert.message}</p>
                        {alert.action && (
                            <a 
                                href={alert.action.url} 
                                className="alert-action"
                            >
                                {alert.action.label}
                            </a>
                        )}
                    </div>
                    <button
                        className="alert-dismiss"
                        onClick={() => dismissAlert(alert.id)}
                        aria-label="Dismiss alert"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SystemAlerts; 