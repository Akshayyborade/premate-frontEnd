import React, { forwardRef } from 'react';
import './Select.css';

const Select = forwardRef(({
    label,
    name,
    value,
    onChange,
    options = [],
    error,
    helper,
    required = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    const selectId = `select-${name}`;

    // Combine class names for select field
    const selectClassNames = [
        'common-select-field',
        error ? 'error' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="common-select-wrapper">
            {/* Label */}
            {label && (
                <label 
                    htmlFor={selectId} 
                    className="common-select-label"
                >
                    {label}
                    {required && <span className="common-select-required">*</span>}
                </label>
            )}

            {/* Select Field */}
            <select
                ref={ref}
                id={selectId}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={selectClassNames}
                aria-invalid={error ? 'true' : 'false'}
                {...props}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Error Message */}
            {error && (
                <span 
                    className="common-select-error" 
                    id={`${selectId}-error`}
                    role="alert"
                >
                    {error}
                </span>
            )}

            {/* Helper Text */}
            {helper && !error && (
                <span 
                    className="common-select-helper"
                    id={`${selectId}-helper`}
                >
                    {helper}
                </span>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select; 