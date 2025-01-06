// PaperConfigContext.js
import React, { createContext, useContext, useReducer } from 'react';

const PaperConfigContext = createContext();

const initialState = {
    examDetails: {
        id: 0,
        institutionName: '',
        subject: '',
        board: '',
        instructions:[],
        academicYear: null,
        examType: null,
        totalMarks: 0,
        duration: 0,
        classLevel: '',
        term: null
    },
    sections: [],
    loading: false,
    error: null
};

function paperConfigReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_SECTIONS':
            return { ...state, sections: action.payload };
        case 'ADD_SECTION':
            return {
                ...state,
                sections: [...state.sections, action.payload]
            };
        case 'REMOVE_SECTION':
            return {
                ...state,
                sections: state.sections.filter(section => section.id !== action.payload)
            };
        case 'UPDATE_SECTION':
            return {
                ...state,
                sections: state.sections.map(section =>
                    section.id === action.payload.id ? action.payload : section
                )
            };
        case 'SET_EXAM_DETAILS':
            return { ...state, examDetails: action.payload };
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

export function PaperConfigProvider({ children }) {
    const [state, dispatch] = useReducer(paperConfigReducer, initialState);

    const value = {
        state,
        setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
        setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
        updateSections: (sections) => dispatch({ type: 'UPDATE_SECTIONS', payload: sections }),
        addSection: (section) => dispatch({ type: 'ADD_SECTION', payload: section }),
        removeSection: (sectionId) => dispatch({ type: 'REMOVE_SECTION', payload: sectionId }),
        updateSection: (section) => dispatch({ type: 'UPDATE_SECTION', payload: section }),
        setExamDetails: (examDetails) => dispatch({ type: 'SET_EXAM_DETAILS', payload: examDetails }),
        resetState: () => dispatch({ type: 'RESET_STATE' })
    };

    return (
        <PaperConfigContext.Provider value={value}>
            {children}
        </PaperConfigContext.Provider>
    );
}

export const usePaperConfig = () => {
    const context = useContext(PaperConfigContext);
    if (!context) {
        throw new Error('usePaperConfig must be used within a PaperConfigProvider');
    }
    return context;
};