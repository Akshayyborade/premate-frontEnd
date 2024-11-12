import React from 'react';
import './Alert.css';

const Alert = ({
    type = 'info',
    message,
    onClose,
    className = '',
}) => {
    return (
        <div className={`alert alert-${type} ${className}`}>
            <div className="alert-content">{message}</div>
            {onClose && (
                <button 
                    className="alert-close"
                    onClick={onClose}
                    aria-label="Close alert"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Alert; 