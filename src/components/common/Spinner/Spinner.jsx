import React from 'react';
import './Spinner.css';

const Spinner = ({ 
    size = 'medium',
    fullScreen = false,
    className = '' 
}) => {
    if (fullScreen) {
        return (
            <div className="spinner-overlay">
                <div className={`spinner spinner-${size} ${className}`} />
            </div>
        );
    }

    return <div className={`spinner spinner-${size} ${className}`} />;
};

export default Spinner; 