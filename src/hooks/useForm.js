import { useState, useCallback } from 'react';

export const useForm = (initialState = {}, validationSchema = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.'); // Split 'studentName.fname' into ['studentName', 'fname']

        setValues((prev) => {
            const updatedValues = { ...prev };
            let currentLevel = updatedValues;

            // Traverse into the nested object until the second-to-last key
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                currentLevel[key] = { ...currentLevel[key] }; // Copy current level
                currentLevel = currentLevel[key];
            }

            // Update the final key with the new value
            currentLevel[keys[keys.length - 1]] = value;

            return updatedValues;
        });
    };

    const validate = useCallback(() => {
        const validationErrors = {};

        Object.keys(validationSchema).forEach((key) => {
            const keys = key.split('.'); // Split keys for nested validation
            let currentValue = values;

            // Traverse values to get the target value
            for (const subKey of keys) {
                currentValue = currentValue?.[subKey];
                if (currentValue === undefined) break;
            }

            const rules = validationSchema[key];

            if (rules.required && !currentValue) {
                validationErrors[key] = `${key} is required`;
            }

            if (rules.email && !/\S+@\S+\.\S+/.test(currentValue)) {
                validationErrors[key] = 'Invalid email format';
            }

            if (rules.minLength && currentValue?.length < rules.minLength) {
                validationErrors[key] = `Minimum length is ${rules.minLength}`;
            }
        });

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [values, validationSchema]);

    const handleSubmit = useCallback(async (e, onSubmit) => {
        e.preventDefault();
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
        setErrors,
    };
};
