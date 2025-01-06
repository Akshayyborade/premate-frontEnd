import React, { useState, useRef, useCallback } from 'react';
import { BarChart2, FileQuestionIcon, Languages } from 'lucide-react';
import { Button, Tooltip, Modal, Progress, notification } from 'antd';
import { usePaperConfig } from './context/PaperConfigContext';
import { examPaperService } from '../../../services/api/examPaper.service';

import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import './ExamPaperStyles.css';
import './PrintStyles.css';
import DocxGenerator from './components/DocxGenerator';
import { Description, QuestionAnswer } from '@mui/icons-material';
import AnswerKey from './components/AnswerKey';

const PerformanceAnalytics = {
  calculateDifficulty: (questions) => {
    return {
      overallDifficulty: 'Medium',
      questionDistribution: {
        easy: 40,
        medium: 40,
        hard: 20
      }
    };
  }
};

const templates = [
  { id: 1, name: 'Template 1', preview: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Template 2', preview: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Template 3', preview: 'https://via.placeholder.com/150' },
];

const PreviewModal = () => {
  const { state, updateQuestion } = usePaperConfig();
  const [isEditMode, setIsEditMode] = useState(false);
  const [changes, setChanges] = useState({});
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('marathi');
  const [isTranslated, setIsTranslated] = useState(false);
  const isLanguageSubject = ['Marathi', 'Hindi', 'Urdu'].includes(state.examDetails.subject);
  const [isAnswerKeyVisible, setIsAnswerKeyVisible] = useState(false);

  const [examDetails, setExamDetails] = useState({
    title: state.examDetails.institutionName || 'DNYANDEEP TUTORIALS',
    subject: state.examDetails.subject || 'Biology',
    examName: `${state.examDetails.examType || 'Preliminary'} Examination ${new Date(state.examDetails.academicYear || "2020").getFullYear()}`,
    time: `${state.examDetails.duration} minutes`,
    marks: state.examDetails.totalMarks?.toString() || '70',
    year: state.examDetails.academicYear || "2020",
    instructions: state.examDetails.instructions || [
      'The question paper is divided into four sections.',
      'Use of log table is allowed. Use of calculator is not allowed.',
      'Figures to the right indicate full marks.',
      'For each multiple-choice type of question, it is mandatory to write the correct answer along with its alphabet.',
      'No marks shall be given if ONLY the correct answer or the alphabet of the correct answer is written.',
      'Only the first attempt will be considered for evaluation.',
    ],
  });

  const translateExamPaper = async () => {
    if (!isLanguageSubject) return;

    try {
      // Show loading notification
      notification.open({
        message: 'Translating Content',
        description: 'Please wait while we translate the exam paper...',
        duration: 0,
        key: 'translation-loading'
      });

      const textsToTranslate = [
        examDetails.title,
        examDetails.subject,
        examDetails.examName,
        examDetails.marks,
        `${state.examDetails.duration} minutes`,
        ...examDetails.instructions,
        ...state.sections.map(section => section.value),
        ...state.sections.flatMap(section =>
          section.questions.map(question => question.mainQuestion)
        ),
        "Subject:",
        "Time:",
        "Marks:",
        "SECTION:",
        "General Instructions:",
        "Believe in yourself and Rock your Exams!"
      ];

      const translatedTexts = await examPaperService.translateTexts({
        texts: textsToTranslate,
        targetLanguage: selectedLanguage
      });

      const translatedDetails = {
        title: translatedTexts[0],
        subject: translatedTexts[1],
        examName: translatedTexts[2],
        time: translatedTexts[4],
        marks: translatedTexts[3],
        year: examDetails.year,
        instructions: translatedTexts.slice(5, 5 + examDetails.instructions.length),
      };

      const translatedSections = state.sections.map((section, index) => ({
        ...section,
        value: translatedTexts[5 + examDetails.instructions.length + index],
        questions: section.questions.map((question, questionIndex) => ({
          ...question,
          mainQuestion: translatedTexts[5 + examDetails.instructions.length + state.sections.length + questionIndex],
        }))
      }));

      setTranslatedContent({
        examDetails: translatedDetails,
        sections: translatedSections,
        translatedLabels: {
          subject: translatedTexts[translatedTexts.length - 6],
          time: translatedTexts[translatedTexts.length - 5],
          marks: translatedTexts[translatedTexts.length - 4],
          generalInstructions: translatedTexts[translatedTexts.length - 2],
          Section: translatedTexts[translatedTexts.length - 3],
          footer: translatedTexts[translatedTexts.length - 1],
        }
      });

      notification.destroy('translation-loading');
      notification.success({
        message: 'Translation Complete',
        description: 'The exam paper has been translated successfully.',
        duration: 3
      });
    } catch (error) {
      console.error("Translation error:", error);
      notification.destroy('translation-loading');
      notification.error({
        message: 'Translation Error',
        description: 'There was an error translating the exam paper. Please try again.',
      });
    }
  };

  const handleTranslationToggle = async () => {
    if (!isTranslated) {
      await translateExamPaper();
    } else {
      setTranslatedContent(null);
    }
    setIsTranslated(!isTranslated);
  };

  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const calculatePaperAnalytics = () => {
    const analytics = PerformanceAnalytics.calculateDifficulty(state.questions);
    setAnalyticsData(analytics);
  };
  const handleAnswerKeyClick = () => {
    setIsAnswerKeyVisible(true);
  };
  const handleAnswerKeyClose =()=>{
    setIsAnswerKeyVisible(false);
  }


  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const trackChange = useCallback((path, newValue) => {
    setChanges(prev => ({
      ...prev,
      [path]: newValue
    }));
  }, []);

  const handleEdit = (setter, path) => (e) => {
    const newValue = e.target.textContent;
    trackChange(path, newValue);

    if (path.startsWith('examDetails')) {
      const key = path.split('.')[1];
      setter(prev => ({
        ...prev,
        [key]: newValue
      }));
    } else if (path.startsWith('questions')) {
      const [_, questionIndex, field] = path.split('.');
      const updatedQuestion = {
        ...state.questions[questionIndex],
        [field]: newValue
      };
      updateQuestion(updatedQuestion);
    }
  };

  const handleSave = () => {
    console.log('Saved changes:', changes);
    setIsEditMode(false);
    setChanges({});
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setChanges({});
  };

  const renderTemplates = () => {
    return templates.map((template) => (
      <div
        key={template.id}
        className={`template-item ${selectedTemplate.id === template.id ? 'selected' : ''}`}
        onClick={() => handleTemplateSelect(template)}
      >
        <img src={template.preview} alt={template.name} />
        <p>{template.name}</p>
      </div>
    ));
  };

  const renderAnalyticsModal = () => {
    return (
      <Modal
        title="Exam Paper Analytics"
        visible={!!analyticsData}
        onCancel={() => setAnalyticsData(null)}
        footer={null}
      >
        {analyticsData && (
          <div>
            <h3>Difficulty Distribution</h3>
            <Progress
              percent={analyticsData.questionDistribution.easy}
              strokeColor="green"
              format={() => `Easy: ${analyticsData.questionDistribution.easy}%`}
            />
            <Progress
              percent={analyticsData.questionDistribution.medium}
              strokeColor="yellow"
              format={() => `Medium: ${analyticsData.questionDistribution.medium}%`}
            />
            <Progress
              percent={analyticsData.questionDistribution.hard}
              strokeColor="red"
              format={() => `Hard: ${analyticsData.questionDistribution.hard}%`}
            />
            <p>Overall Difficulty: {analyticsData.overallDifficulty}</p>
          </div>
        )}
      </Modal>
    );
  };

  const renderShortAnswerQuestions = (questions) => {
    if (!questions || !Array.isArray(questions)) {
      return null;
    }

    return questions.map((q, index) => (
      <div key={index} className="short-answer-question">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={isEditMode ? handleEdit(updateQuestion, `questions.${index}.question`) : undefined}
            style={{
              cursor: isEditMode ? 'text' : 'default',
              outline: isEditMode ? '1px dashed blue' : 'none'
            }}
          >
            {index + 1}. {q.mainQuestion}
          </h4>
          <span style={{ fontWeight: 800 }}>[ {q.marks} ]</span>
        </div>

        {q.subQuestions.map((subQ, subIndex) => (
          <p key={subIndex} className='sub-question'>
            {subIndex + 1}. {subQ.question}
          </p>
        ))}
      </div>
    ));
  };

  const renderMCQQuestions = (questions) => {
    if (!questions || !Array.isArray(questions)) {
      return null;
    }

    return questions.map((q, index) => (
      <div key={index} className="mcq-question">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>{index + 1}. {q.mainQuestion}</h4>
          <span style={{ fontWeight: 800 }}>[ {q.marks} ]</span>
        </div>

        {q.subQuestions.map((subQ, subIndex) => (
          <div key={subIndex} className="mcq-sub-question">
            <p>{subIndex + 1}. {subQ.question}</p>
            <div className="mcq-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {subQ.options.map((option, optionIndex) => {
                const optionLabel = String.fromCharCode(65 + optionIndex);
                return (
                  <div key={optionIndex} className="mcq-option">
                    <label>
                      {optionLabel}. {option.value}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const renderMultipleQuestions = (questions) => {
    if (!questions || !Array.isArray(questions)) {
      return null;
    }

    return questions.map((q, index) => (
      <div key={index} className="multiple-question">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>{index + 1}. {q.mainQuestion}</h4>
          <span style={{ fontWeight: 800 }}>[ {q.marks} ]</span>
        </div>
        {q.subQuestions.map((subQ, subIndex) => (
          <p key={subIndex}>
            {subIndex + 1}. {subQ.question}
          </p>
        ))}
      </div>
    ));
  };

  const renderSections = () => {
    const content = (isTranslated && translatedContent) || { examDetails, sections: state.sections };
    const labels = content.translatedLabels || {
      subject: "Subject:",
      time: "Time:",
      marks: "Marks:",
      generalInstructions: "General Instructions:",
      Section: "SECTION",
      footer: "Believe in yourself and Rock your Exams!"
    };

    return content.sections.map((section, sectionIndex) => (
      <section key={sectionIndex} className={`section-${section.value.toLowerCase()}`}>
        <h3 style={{ textAlign: 'center' }}>
          {labels.Section} - {section.value}
        </h3>
        {section.questions.map((question) => {
          switch (question.questionType) {
            case 'One line':
              return renderShortAnswerQuestions([question]);
            case 'MCQ':
              return renderMCQQuestions([question]);
            case 'Long':
              return renderShortAnswerQuestions([question]);
            case 'Short Ans':
              return renderShortAnswerQuestions([question]);
            case 'Multiple Question':
              return renderMultipleQuestions([question]);
            default:
              return null;
          }
        })}
      </section>
    ));
  };

  const renderTranslationToggle = () => {
    if (!isLanguageSubject) return null;

    return (
      <Tooltip title={isTranslated ? "Show Original" : "Translate Content"}>
        <Button
          icon={<Languages />}
          onClick={handleTranslationToggle}
          className={isTranslated ? 'translation-active' : ''}
        >
          {isTranslated ? 'Show Original' : 'Translate'}
        </Button>
      </Tooltip>
    );
  };

  const displayContent = (isTranslated && translatedContent) || { examDetails, sections: state.sections };
  const translatedLabels = displayContent.translatedLabels || {
    subject: "Subject:",
    time: "Time:",
    marks: "Marks:",
    generalInstructions: "General Instructions:",
    Section: "SECTION",
    footer: "Believe in yourself and Rock your Exams!"
  };

  return (
    <div className="exam-paper-container">
      <div className='sidebar'>
        <h4>Select Template</h4>
        {renderTemplates()}
      </div>

      <div className="exam-paper">
        <div className="exam-papers-buttons">
          {renderTranslationToggle()}
          <Tooltip title="Answer Sheet">
            <Button icon={<Description />} onClick={handleAnswerKeyClick}>
              Answer Sheet
            </Button>
          </Tooltip>
          <Tooltip title="Performance Analytics">
            <Button icon={<BarChart2 />} onClick={calculatePaperAnalytics}>
              Analytics
            </Button>
          </Tooltip>
          {!isEditMode ? (
            <Tooltip title="Edit Paper">
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditMode(true)}
              >
                Edit Paper
              </Button>
            </Tooltip>
          ) : (
            <>
              <Button
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </>
          )}
        </div>

        <div ref={printRef} className="exam-paper-content">
         
          <header className="header">
            <h1
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={isEditMode ? handleEdit(setExamDetails, 'examDetails.title') : undefined}
              style={{
                cursor: isEditMode ? 'text' : 'default',
                outline: isEditMode ? '1px dashed blue' : 'none'
              }}
            >
              {displayContent.examDetails.title}
            </h1>
            <h2>
              {translatedLabels.subject}
              <span
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={isEditMode ? handleEdit(setExamDetails, 'examDetails.subject') : undefined}
                style={{ cursor: isEditMode ? 'text' : 'default' }}
              >
                {displayContent.examDetails.subject}
              </span>
            </h2>
            <h3
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={isEditMode ? handleEdit(setExamDetails, 'examDetails.examName') : undefined}
              style={{ cursor: isEditMode ? 'text' : 'default' }}
            >
              {displayContent.examDetails.examName}
            </h3>
            <div className="exam-metadata">
              <p>
                {translatedLabels.time}
                <span
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={isEditMode ? handleEdit(setExamDetails, 'examDetails.time') : undefined}
                  style={{ cursor: isEditMode ? 'text' : 'default' }}
                >
                  {displayContent.examDetails.time}
                </span>
              </p>
              <p>
                {translatedLabels.marks}
                <span
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={isEditMode ? handleEdit(setExamDetails, 'examDetails.marks') : undefined}
                  style={{ cursor: isEditMode ? 'text' : 'default' }}
                >
                  {displayContent.examDetails.marks}
                </span>
              </p>
            </div>
          </header>

          <section className="instructions">
            <h4>{translatedLabels.generalInstructions}</h4>
            <ul>
              {displayContent.examDetails.instructions.map((instruction, index) => (
                <li
                  key={index}
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={isEditMode ? (e) => {
                    const newInstructions = [...examDetails.instructions];
                    newInstructions[index] = e.target.textContent;
                    setExamDetails(prev => ({
                      ...prev,
                      instructions: newInstructions
                    }));
                  } : undefined}
                  style={{ cursor: isEditMode ? 'text' : 'default' }}
                >
                  {instruction}
                </li>
              ))}
            </ul>
          </section>

          {renderSections()}

          <footer className="footer">
            <p
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={isEditMode ? handleEdit(setExamDetails, 'examDetails.footer') : undefined}
              style={{ cursor: isEditMode ? 'text' : 'default' }}
            >
              {translatedLabels.footer}
            </p>
          </footer>
          <p style={{color:'gray' , textAlign:'left'}}> Premate.co.in</p>
        </div>

        <div className="print-button-container">
          <Button
            type="default"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
          >
            Print Exam Paper
          </Button>

          <DocxGenerator content={printRef} examName={examDetails.examName} year={examDetails.year} />
        </div>

        {renderAnalyticsModal()}
        
        <AnswerKey
          visible={isAnswerKeyVisible}
          onClose={handleAnswerKeyClose}
          sections={state.sections}
          examDetails={examDetails}
        />
      </div>
    </div>
  );
};

export default PreviewModal;