import React from 'react';
import './Button.css';

// Green-based color theme
const greenTheme = {
  primary: {
    base: '#28a745',     // Vibrant green
    hover: '#218838',    // Darker green
    text: '#ffffff'      // White text
  },
  secondary: {
    base: '#6c757d',     // Neutral gray (for contrast)
    hover: '#545b62',    // Darker gray
    text: '#ffffff'      
  },
  outline: {
    base: 'transparent',
    hover: 'rgba(40, 167, 69, 0.1)',  // Light green transparent hover
    border: '#28a745',   // Green border
    text: '#28a745'      // Green text
  },
  success: {
    base: '#40c057',     // Slightly brighter green
    hover: '#2b9348',    // Darker green
    text: '#ffffff'
  },
  danger: {
    base: '#ff6b6b',     // Soft red for contrast
    hover: '#f03e3e',    // Darker red
    text: '#ffffff'
  }
};

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  theme = greenTheme,
  customStyle = {},
  ...props
}) => {
  // Allow complete customization of button styles
  const variantStyles = theme[variant] || theme.primary;
  
  const buttonStyle = {
    '--button-bg': variantStyles.base,
    '--button-hover-bg': variantStyles.hover,
    '--button-text': variantStyles.text,
    '--button-border': variantStyles.border || variantStyles.base,
    ...customStyle
  };

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
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;