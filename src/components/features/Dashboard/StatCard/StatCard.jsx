import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, trend }) => {
    const trendIsPositive = trend.startsWith('+');

    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <h3 className="stat-title">{title}</h3>
                <div className="stat-value">{value}</div>
                <div className={`stat-trend ${trendIsPositive ? 'positive' : 'negative'}`}>
                    {trend}
                </div>
            </div>
        </div>
    );
};

export default StatCard; 