import React, { useState } from "react";
import Autosuggest from 'react-autosuggest';
import './SectionForm.css'; // Import CSS for styling

const suggestions = {
  titles: ["Math Exam", "Science Exam", "History Exam", "Geography Exam"],
  schools: ["Greenwood High", "Sunrise Academy", "Riverdale School"],
  subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
  languages: ["English", "Hindi", "Spanish", "French"],
  instructions: [
    "Attempt all questions.",
    "Read the questions carefully.",
    "Use a blue or black pen.",
    "No electronic devices allowed.",
    "Write neatly and legibly.",
    "Check your work before submitting.",
    "Follow the marking scheme.",
    "Answer in the space provided."
  ],
};

const SectionForm = ({ onAddPaperFormat }) => {
  const [sections, setSections] = useState([]);
  const [paperDetails, setPaperDetails] = useState({
    title: "",
    schoolName: "",
    standard: "",
    language: "",
    timing: "",
    subject: "",
    watermark: "",
    instructions: "",
  });

  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [schoolSuggestions, setSchoolSuggestions] = useState([]);
  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  const [instructionSuggestions, setInstructionSuggestions] = useState([]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        instructions: "",
        subsections: [],
        layout: "Bullets", // Default layout
      },
    ]);
  };

  const updateSection = (index, key, value) => {
    const updatedSections = [...sections];
    updatedSections[index][key] = value;
    setSections(updatedSections);
  };

  const addSubsection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections.push({
      type: "MCQ",
      numQuestions: 1,
      marksPerQuestion: 1,
      questionGroup: "All",
      numberingStyle: "1.",
    });
    setSections(updatedSections);
  };

  const updateSubsection = (sectionIndex, subIndex, key, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections[subIndex][key] = value;
    setSections(updatedSections);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const removeSubsection = (sectionIndex, subIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections = updatedSections[sectionIndex].subsections.filter(
      (_, i) => i !== subIndex
    );
    setSections(updatedSections);
  };

  const handlePaperDetailChange = (key, value) => {
    setPaperDetails({ ...paperDetails, [key]: value });
  };

  const handleSuggestionsFetchRequested = ({ value, key }) => {
    let suggestionsList = [];
    if (key === "title") {
      suggestionsList = suggestions.titles.filter(title =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setTitleSuggestions(suggestionsList);
    } else if (key === "schoolName") {
      suggestionsList = suggestions.schools.filter(school =>
        school.toLowerCase().includes(value.toLowerCase())
      );
      setSchoolSuggestions(suggestionsList);
    } else if (key === "subject") {
      suggestionsList = suggestions.subjects.filter(subject =>
        subject.toLowerCase().includes(value.toLowerCase())
      );
      setSubjectSuggestions(suggestionsList);
    } else if (key === "instructions") {
      suggestionsList = suggestions.instructions.filter(instruction =>
        instruction.toLowerCase().includes(value.toLowerCase())
      );
      setInstructionSuggestions(suggestionsList);
    }
  };

  const handleSuggestionsClearRequested = (key) => {
    if (key === "title") {
      setTitleSuggestions([]);
    } else if (key === "schoolName") {
      setSchoolSuggestions([]);
    } else if (key === "subject") {
      setSubjectSuggestions([]);
    } else if (key === "instructions") {
      setInstructionSuggestions([]);
    }
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>{suggestion}</div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPaperFormat({ ...paperDetails, sections });
    setSections([]);
    setPaperDetails({
      title: "",
      schoolName: "",
      standard: "",
      language: "",
      timing: "",
      subject: "",
      watermark: "",
      instructions: "",
    });
  };

  const updateLayout = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index].layout = value;
    setSections(updatedSections);
  };

  return (
    <div className="section-form">
      <h2>Design Your Question Paper</h2>
      <div>
        <label>Paper Title:</label>
        <Autosuggest
          suggestions={titleSuggestions}
          onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested({ value, key: "title" })}
          onSuggestionsClearRequested={() => handleSuggestionsClearRequested("title")}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Type a title",
            value: paperDetails.title,
            onChange: (e, { newValue }) => handlePaperDetailChange("title", newValue),
          }}
        />
      </div>
      <div>
        <label>School Name:</label>
        <Autosuggest
          suggestions={schoolSuggestions}
          onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested({ value, key: "schoolName" })}
          onSuggestionsClearRequested={() => handleSuggestionsClearRequested("schoolName")}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Type a school name",
            value: paperDetails.schoolName,
            onChange: (e, { newValue }) => handlePaperDetailChange("schoolName", newValue),
          }}
        />
      </div>
      <div>
        <label>Standard:</label>
        <select
          value={paperDetails.standard}
          onChange={(e) => handlePaperDetailChange("standard", e.target.value)}
        >
          <option value="">Select Standard</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label>Language:</label>
        <select
          value={paperDetails.language}
          onChange={(e) => handlePaperDetailChange("language", e.target.value)}
        >
          <option value="">Select Language</option>
          {suggestions.languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Timing:</label>
        <input
          type="text"
          placeholder="e.g., 2 hours"
          value={paperDetails.timing}
          onChange={(e) => handlePaperDetailChange("timing", e.target.value)}
        />
      </div>
      <div>
        <label>Subject:</label>
        <Autosuggest
          suggestions={subjectSuggestions}
          onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested({ value, key: "subject" })}
          onSuggestionsClearRequested={() => handleSuggestionsClearRequested("subject")}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Type a subject",
            value: paperDetails.subject,
            onChange: (e, { newValue }) => handlePaperDetailChange("subject", newValue),
          }}
        />
      </div>
      <div>
        <label>Watermark:</label>
        <input
          type="text"
          value={paperDetails.watermark}
          onChange={(e) => handlePaperDetailChange("watermark", e.target.value)}
        />
      </div>
      <div>
        <label>Instructions:</label>
        <Autosuggest
          suggestions={instructionSuggestions}
          onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested({ value, key: "instructions" })}
          onSuggestionsClearRequested={() => handleSuggestionsClearRequested("instructions")}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Type instructions",
            value: paperDetails.instructions,
            onChange: (e, { newValue }) => handlePaperDetailChange("instructions", newValue),
          }}
        />
      </div>
      <button onClick={addSection}>Add Section</button>
      <form onSubmit={handleSubmit}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section">
            <h3>Section {sectionIndex + 1}</h3>
            <div>
              <label>Title:</label>
              <input
                type="text"
                placeholder="e.g., Section A: MCQs"
                value={section.title}
                onChange={(e) =>
                  updateSection(sectionIndex, "title", e.target.value)
                }
              />
            </div>
            <div>
              <label>Instructions:</label>
              <Autosuggest
                suggestions={instructionSuggestions}
                onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested({ value, key: "instructions" })}
                onSuggestionsClearRequested={() => handleSuggestionsClearRequested("instructions")}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  placeholder: "Type instructions",
                  value: section.instructions,
                  onChange: (e, { newValue }) => updateSection(sectionIndex, "instructions", newValue),
                }}
              />
            </div>
            <div>
              <label>Layout:</label>
              <select
                value={section.layout}
                onChange={(e) => updateLayout(sectionIndex, e.target.value)}
              >
                <option value="Bullets">Bullets</option>
                <option value="Table">Table</option>
                <option value="Paragraph">Paragraph</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => addSubsection(sectionIndex)}
            >
              Add Subsection
            </button>
            {section.subsections.map((subsection, subIndex) => (
              <div
                key={subIndex}
                style={{
                  border: "1px solid #ccc",
                  padding: "5px",
                  margin: "10px",
                }}
              >
                <h4>Subsection {subIndex + 1}</h4>
                <div>
                  <label>Type:</label>
                  <select
                    value={subsection.type}
                    onChange={(e) =>
                      updateSubsection(
                        sectionIndex,
                        subIndex,
                        "type",
                        e.target.value
                      )
                    }
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Short Answer">Short Answer</option>
                    <option value="Essay">Essay</option>
                    <option value="Fill in the Blanks">Fill in the Blanks</option>
                  </select>
                </div>
                <div>
                  <label>Number of Questions:</label>
                  <input
                    type="number"
                    value={subsection.numQuestions}
                    onChange={(e) =>
                      updateSubsection(
                        sectionIndex,
                        subIndex,
                        "numQuestions",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label>Marks Per Question:</label>
                  <input
                    type="number"
                    value={subsection.marksPerQuestion}
                    onChange={(e) =>
                      updateSubsection(
                        sectionIndex,
                        subIndex,
                        "marksPerQuestion",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label>Question Group:</label>
                  <select
                    value={subsection.questionGroup}
                    onChange={(e) =>
                      updateSubsection(
                        sectionIndex,
                        subIndex,
                        "questionGroup",
                        e.target.value
                      )
                    }
                  >
                    <option value="All">All</option>
                    <option value="Choose any">Choose any</option>
                  </select>
                </div>
                <div>
                  <label>Numbering Style:</label>
                  <select
                    value={subsection.numberingStyle}
                    onChange={(e) =>
                      updateSubsection(
                        sectionIndex,
                        subIndex,
                        "numberingStyle",
                        e.target.value
                      )
                    }
                  >
                    <option value="1.">1., 2., 3., ...</option>
                    <option value="a)">a), b), c), ...</option>
                    <option value="i)">i), ii), iii), ...</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeSubsection(sectionIndex, subIndex)}
                >
                  Remove Subsection
                </button>
              </div>
            ))}
            <button type="button" onClick={() => removeSection(sectionIndex)}>
              Remove Section
            </button>
          </div>
        ))}
        {sections.length > 0 && <button type="submit">Generate Format</button>}
      </form>
    </div>
  );
};

export default SectionForm;
