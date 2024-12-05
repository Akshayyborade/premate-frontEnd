import React, { useState, useEffect, useCallback } from "react";
import SectionForm from "./SectionForm";
import PreviewModal from "./PreviewModal";

/**
 * QuestionPaperBuilder Component
 * 
 * Handles the creation and management of question paper formats.
 * Features:
 * - Section management
 * - Paper details configuration
 * - Preview functionality
 * - API integration for paper generation
 */
const QuestionPaperBuilder = ({ onAddPaperFormat }) => {
    // -----------------------------
    // State Management
    // -----------------------------
    const [sections, setSections] = useState([]);
    const [paperDetails, setPaperDetails] = useState({});
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // -----------------------------
    // Effects
    // -----------------------------
    useEffect(() => {
        // Update sections when paper details change
        if (paperDetails.sections) {
            setSections(paperDetails.sections);
        }
    }, [paperDetails]);

    // -----------------------------
    // Callback Functions
    // -----------------------------
    
    // Handle adding new paper format
    const addPaperFormat = useCallback((newPaperDetails) => {
        setPaperDetails(newPaperDetails);
        onAddPaperFormat(newPaperDetails);
        setIsPreviewOpen(true);
    }, [onAddPaperFormat]);

    // Handle form submission and API integration
    const handleSubmit = useCallback(async () => {
        try {
            const response = await fetch("/api/generate-paper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sections }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log("Generated Paper:", result);
            
        } catch (error) {
            console.error("Error generating paper:", error);
            // TODO: Add error handling UI feedback
        }
    }, [sections]);

    // Handle preview modal close
    const closePreview = useCallback(() => {
        setIsPreviewOpen(false);
    }, []);

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <div className="question-paper-builder">
            {/* Section Form Component */}
            <SectionForm onAddPaperFormat={addPaperFormat} />

            {/* Submit Button */}
            <button 
                className="submit-button"
                onClick={handleSubmit}
            >
                Generate Paper
            </button>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <PreviewModal
                    sections={sections}
                    paperDetails={paperDetails}
                    onClose={closePreview}
                />
            )}
        </div>
    );
};

export default QuestionPaperBuilder;
