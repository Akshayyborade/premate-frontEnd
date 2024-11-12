import React from 'react';
import './PasswordStrength.css';

const PasswordStrength = ({ password }) => {
    const calculateStrength = (pwd) => {
        let strength = 0;
        
        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;

        return strength;
    };

    const getStrengthLabel = (strength) => {
        switch (strength) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            case 5: return 'Very Strong';
            default: return '';
        }
    };

    const strength = calculateStrength(password);
    const strengthLabel = getStrengthLabel(strength);
    const strengthPercentage = (strength / 5) * 100;

    return (
        <div className="password-strength">
            <div className="strength-bar">
                <div 
                    className={`strength-indicator strength-${strengthLabel.toLowerCase().replace(' ', '-')}`}
                    style={{ width: `${strengthPercentage}%` }}
                />
            </div>
            <span className="strength-label">{strengthLabel}</span>
        </div>
    );
};

export default PasswordStrength; 