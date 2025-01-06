import { useState, useCallback } from 'react';

export const useQuestionValidation = () => {
    const [errors, setErrors] = useState([]);

    const validateQuestion = useCallback((question) => {
        const newErrors = [];

        // Validate main question content
        if (!question.mainQuestion?.content?.trim()) {
            newErrors.push('content');
        }

        // Validate marks
        if (!question.mainQuestion?.marks || question.mainQuestion.marks <= 0) {
            newErrors.push('marks');
        }

        // Validate content type
        if (!question.mainQuestion?.contentType) {
            newErrors.push('contentType');
        }

        // Validate sub-questions if they exist
        if (question.subQuestions?.length > 0) {
            question.subQuestions.forEach((subQ, index) => {
                if (!subQ.content?.trim()) {
                    newErrors.push(`subQuestion_${index}_content`);
                }
                if (!subQ.marks || subQ.marks <= 0) {
                    newErrors.push(`subQuestion_${index}_marks`);
                }
            });
        }

        // Update error state
        setErrors(newErrors);

        return {
            hasError: newErrors.length > 0,
            errors: newErrors
        };
    }, []);

    return {
        validateQuestion,
        errors,
        hasErrors: errors.length > 0,
        clearErrors: () => setErrors([])
    };
};

export default useQuestionValidation;
