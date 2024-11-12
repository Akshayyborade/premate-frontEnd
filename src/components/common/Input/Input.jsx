import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    placeholder,
    required = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    const inputId = `input-${name}`;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="input-label"
                >
                    {label}
                    {required && <span className="required-mark">*</span>}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`input-field ${error ? 'input-error' : ''}`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...props}
            />
            {error && (
                <span 
                    className="error-message" 
                    id={`${inputId}-error`}
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input; 