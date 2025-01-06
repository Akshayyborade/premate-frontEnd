import { useState, useCallback } from 'react';

export const useFormValidation = () => {
    const [errors, setErrors] = useState([]);

    const validateField = useCallback((field, value) => {
        let error = null;

        switch (field) {
            case 'subject':
                if (!value?.trim()) {
                    error = 'Subject is required';
                }
                break;

            case 'board':
                if (!value) {
                    error = 'Board is required';
                }
                break;

            case 'class':
                if (!value) {
                    error = 'Class is required';
                }
                break;

            case 'totalMarks':
                if (!value || value <= 0) {
                    error = 'Total marks must be greater than 0';
                }
                break;

            case 'duration':
                if (!value || value <= 0) {
                    error = 'Duration must be greater than 0';
                }
                break;

            default:
                break;
        }

        if (error) {
            setErrors(prev => [...prev, field]);
        } else {
            setErrors(prev => prev.filter(e => e !== field));
        }

        return error;
    }, []);

    const validateForm = useCallback((values) => {
        const allErrors = [];
        
        Object.entries(values).forEach(([field, value]) => {
            const error = validateField(field, value);
            if (error) {
                allErrors.push(error);
            }
        });

        setErrors(allErrors);
        return allErrors.length === 0;
    }, [validateField]);

    return {
        validateField,
        validateForm,
        errors,
        clearErrors: () => setErrors([])
    };
};

export default useFormValidation; 