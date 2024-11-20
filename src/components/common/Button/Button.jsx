import React from 'react';
import './Button.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                button 
                button-${variant} 
                button-${size} 
                ${fullWidth ? 'button-full' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 