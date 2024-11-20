import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    success,
    helper,
    placeholder,
    required = false,
    disabled = false,
    size = 'medium',
    iconLeft,
    iconRight,
    onIconRightClick,
    className = '',
    ...props
}, ref) => {
    const inputId = `input-${name}`;

    // Combine class names for input field
    const inputClassNames = [
        'common-input-field',
        size,
        error ? 'error' : '',
        success ? 'success' : '',
        iconLeft ? 'with-icon-left' : '',
        iconRight ? 'with-icon-right' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="common-input-wrapper">
            {/* Label */}
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="common-input-label"
                >
                    {label}
                    {required && <span className="common-input-required">*</span>}
                </label>
            )}

            {/* Input Container with Icons */}
            <div className="common-input-icon-wrapper">
                {/* Left Icon */}
                {iconLeft && (
                    <span className="common-input-icon-left">
                        {iconLeft}
                    </span>
                )}

                {/* Input Field */}
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
                    className={inputClassNames}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={
                        error ? `${inputId}-error` : 
                        helper ? `${inputId}-helper` : 
                        undefined
                    }
                    {...props}
                />

                {/* Right Icon */}
                {iconRight && (
                    <span 
                        className="common-input-icon-right"
                        onClick={onIconRightClick}
                        role={onIconRightClick ? "button" : undefined}
                        tabIndex={onIconRightClick ? 0 : undefined}
                    >
                        {iconRight}
                    </span>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <span 
                    className="common-input-error" 
                    id={`${inputId}-error`}
                    role="alert"
                >
                    {error}
                </span>
            )}

            {/* Helper Text */}
            {helper && !error && (
                <span 
                    className="common-input-helper"
                    id={`${inputId}-helper`}
                >
                    {helper}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input; 