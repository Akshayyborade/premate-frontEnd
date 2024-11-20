import React from 'react';
import './Switch.css';

const Switch = ({ 
    label, 
    checked, 
    onChange, 
    disabled = false,
    size = 'medium',
    className = '' 
}) => {
    return (
        <label className={`switch-container ${className}`}>
            <div className="switch-label">{label}</div>
            <div className={`switch ${size} ${disabled ? 'disabled' : ''}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <span className="slider"></span>
            </div>
        </label>
    );
};

export default Switch; 