export const EXAM_TYPES = [
    { value: 'Final', label: 'Final Exam' },
    { value: 'Midterm', label: 'Mid Term' },
    { value: 'Unit', label: 'Unit Test' },
    { value: 'Practice', label: 'Practice Test' },
    {value:'Preliminary', label:'Preliminary Exam'}
];

export const BOARD_OPTIONS = [
    { value: 'CBSE', label: 'CBSE' },
    { value: 'ICSE', label: 'ICSE' },
    { value: 'Maharashtra State', label: 'MH State Board' },
    { value: 'IB', label: 'International Baccalaureate' }
];

export const CLASS_OPTIONS = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

export const QUESTION_TYPES = {
    MCQ: 'Multiple Choice',
    SHORT_ANSWER: 'Short Answer',
    LONG_ANSWER: 'Long Answer',
    VERY_SHORT_ANSWER: 'Very Short Answer',
    PRACTICAL: 'Practical',
    CASE_STUDY: 'Case Study'
};

export const DIFFICULTY_LEVELS = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard'
};

export const MARKING_SCHEMES = {
    POSITIVE_ONLY: 'Positive Only',
    NEGATIVE_MARKING: 'Negative Marking'
};

export const DEFAULT_CONFIG = {
    subject: '',
    board: '',
    class: '',
    examType: 'Final',
    totalMarks: 100,
    duration: 180, // 3 hours in minutes
    academicYear: null,
    term: '1'
}; 