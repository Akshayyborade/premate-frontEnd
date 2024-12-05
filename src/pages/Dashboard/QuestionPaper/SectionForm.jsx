import React, { useState } from "react";
import Autosuggest from 'react-autosuggest';
import './SectionForm.css'; // Import CSS for styling
import ExamPaperLayout from "./ExamPaperLayout";

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
    <div className="section-form-exam">
      <ExamPaperLayout></ExamPaperLayout>
    
    </div>
  );
};

export default SectionForm;
