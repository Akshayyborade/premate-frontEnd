import React from "react";
import Modal from "react-modal";

const renderSection = (section) => {
  switch (section.layout) {
    case "Bullets":
      return (
        <ul>
          {section.subsections.map((subsection, i) => (
            <li key={i}>
              {subsection.type} Question {i + 1} ({subsection.marksPerQuestion} marks)
            </li>
          ))}
        </ul>
      );
    case "Table":
      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {section.subsections.map((subsection, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{subsection.type} Question</td>
                <td>{subsection.marksPerQuestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "Paragraph":
      return (
        <div>
          {section.subsections.map((subsection, i) => (
            <p key={i}>
              {i + 1}. {subsection.type} Question ({subsection.marksPerQuestion} marks)
            </p>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const PreviewModal = ({ sections, paperDetails, onClose }) => {
  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>{paperDetails.title}</h2>
      <h3>{paperDetails.schoolName}</h3>
      <p>Standard: {paperDetails.standard}</p>
      <p>Language: {paperDetails.language}</p>
      <p>Timing: {paperDetails.timing}</p>
      <p>Subject: {paperDetails.subject}</p>
      <p><strong>Watermark:</strong> {paperDetails.watermark}</p>
      <p><strong>Instructions:</strong> {paperDetails.instructions}</p>
      {sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>Section {index + 1}: {section.title || "Untitled Section"}</h3>
          {section.instructions && <p><em>{section.instructions}</em></p>}
          {renderSection(section)}
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default PreviewModal;
