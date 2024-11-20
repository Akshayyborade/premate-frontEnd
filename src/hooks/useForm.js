import { useState, useCallback } from 'react';

export const useForm = (initialState = {}, validationSchema = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [errors]);

    const validate = useCallback(() => {
        const validationErrors = {};
        Object.keys(validationSchema).forEach(key => {
            const value = values[key];
            const rules = validationSchema[key];

            if (rules.required && !value) {
                validationErrors[key] = `${key} is required`;
            }

            if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
                validationErrors[key] = 'Invalid email format';
            }

            if (rules.minLength && value.length < rules.minLength) {
                validationErrors[key] = `Minimum length is ${rules.minLength}`;
            }
        });

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [values, validationSchema]);

    const handleSubmit = useCallback(async (onSubmit) => {
        setIsSubmitting(true);
        if (validate()) {
            try {
                await onSubmit(values);
            } catch (error) {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        }
        setIsSubmitting(false);
    }, [values, validate]);

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
        setErrors
    };
}; 