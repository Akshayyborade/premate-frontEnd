import React, { useState, useEffect, useCallback } from "react";
import SectionForm from "./SectionForm";
import PreviewModal from "./PreviewModal";

const QuestionPaperBuilder = ({ onAddPaperFormat }) => {
  const [sections, setSections] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (paperDetails.sections) {
      setSections(paperDetails.sections);
    }
  }, [paperDetails]);

  const addPaperFormat = useCallback((newPaperDetails) => {
    setPaperDetails(newPaperDetails);
    onAddPaperFormat(newPaperDetails);
    setIsPreviewOpen(true);
  }, [onAddPaperFormat]);

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
    }
  }, [sections]);

  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  return (
    <div>
      <SectionForm onAddPaperFormat={addPaperFormat} />
      <button onClick={handleSubmit}>Submit</button>

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
