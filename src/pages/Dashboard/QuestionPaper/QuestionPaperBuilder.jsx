import React, { useState } from "react";
import SectionForm from "./SectionForm";
import PreviewModal from "./PreviewModal";

const QuestionPaperBuilder = () => {
  const [sections, setSections] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const addPaperFormat = (newPaperDetails) => {
    setPaperDetails(newPaperDetails);
    setSections(newPaperDetails.sections);
    setShowPreview(true);
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/generate-paper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sections }),
    });

    const result = await response.json();
    console.log("Generated Paper:", result);
  };

  return (
    <div>
      <SectionForm onAddPaperFormat={addPaperFormat} />
      <button onClick={handleSubmit}>Submit</button>
      {showPreview && (
        <PreviewModal
          sections={sections}
          paperDetails={paperDetails}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default QuestionPaperBuilder;
