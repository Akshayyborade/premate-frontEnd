import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { authService } from '../../../../services/api/auth.service';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import PasswordStrength from '../../../common/PasswordStrength/PasswordStrength';
import './RegisterForm.css';

const RegisterForm = ({ onSuccess }) => {
    const [serverError, setServerError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const validationSchema = {
        institutionName: { required: true, minLength: 3 },
        email: { required: true, email: true },
        password: { required: true, minLength: 8 },
        confirmPassword: { required: true, match: 'password' },
        website: { required: true, url: true },
        foundingDate: { required: true },
        slogan: { required: true }
    };

    const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
        {
            institutionName: '',
            email: '',
            password: '',
            confirmPassword: '',
            website: '',
            foundingDate: '',
            slogan: ''
        },
        validationSchema
    );

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        handleChange(e);
        checkPasswordStrength(e.target.value);
    };

    const onSubmit = async (formData) => {
        try {
            await authService.register(formData);
            onSuccess();
        } catch (error) {
            setServerError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form className="register-form" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
        }}>
            {serverError && (
                <div className="error-message">{serverError}</div>
            )}

            <Input
                label="Institution Name"
                name="institutionName"
                value={values.institutionName}
                onChange={handleChange}
                error={errors.institutionName}
                placeholder="Enter institution name"
                required
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Enter email address"
                required
            />

            <Input
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handlePasswordChange}
                error={errors.password}
                placeholder="Create password"
                required
            />

            {values.password && (
                <PasswordStrength strength={passwordStrength} />
            )}

            <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm password"
                required
            />

            <Input
                label="Website"
                type="url"
                name="website"
                value={values.website}
                onChange={handleChange}
                error={errors.website}
                placeholder="Enter website URL"
                required
            />

            <Input
                label="Founding Date"
                type="date"
                name="foundingDate"
                value={values.foundingDate}
                onChange={handleChange}
                error={errors.foundingDate}
                required
            />

            <Input
                label="Mission Statement"
                name="slogan"
                value={values.slogan}
                onChange={handleChange}
                error={errors.slogan}
                placeholder="Enter your institution's mission statement"
                required
            />

            <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
            >
                Register Institution
            </Button>

            <div className="auth-links">
                Already have an account?{' '}
                <Link to="/login">Login here</Link>
            </div>
        </form>
    );
};

export default RegisterForm; 