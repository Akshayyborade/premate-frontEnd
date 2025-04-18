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
  const LANGUAGE_SUBJECTS = ['Marathi', 'Hindi', 'Urdu'];
  console.log(state.examDetails.medium);
  const isLanguageSubject =
    LANGUAGE_SUBJECTS.includes(state.examDetails?.subject?.trim()) || LANGUAGE_SUBJECTS.includes(state.examDetails?.medium?.trim())
   ;
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


  // Updated numbering pattern helper functions
const getRomanNumeral = (num) => {
  const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
  return romanNumerals[num] || num.toString();
};

const getQuestionNumber = (pattern, mainIndex, subIndex, optionIndex, questionType) => {
  switch (pattern) {
    case 'pattern1': // Q.1 (A) i) ii) with (a) (b) for MCQ options
      if (optionIndex !== undefined) {
        // For MCQ options, return (a), (b), etc.
        return `(${String.fromCharCode(97 + optionIndex)})`;
      }
      if (subIndex !== undefined) {
        // For subquestions, return roman numerals
        return `${getRomanNumeral(subIndex)})`;
      }
      // For main questions, return Q.1 (A), Q.2 (B), etc.
      return `Q.${mainIndex + 1} (${String.fromCharCode(65 + mainIndex)})`;

    case 'pattern2': // Q.1 a) b) c)
      if (subIndex !== undefined) {
        return `${String.fromCharCode(97 + subIndex)})`;
      }
      return `Q.${mainIndex + 1}`;

    case 'pattern3': // 1. (i) (ii) (iii)
      if (subIndex !== undefined) {
        return `(${getRomanNumeral(subIndex)})`;
      }
      return `${mainIndex + 1}.`;

    default:
      return `${mainIndex + 1}.`;
  }
};

const translateExamPaper = async () => {
  try {
    notification.open({
      message: 'Translating Content',
      description: 'Please wait while we translate the exam paper...',
      duration: 0,
      key: 'translation-loading'
    });

    // Static labels to translate
    const staticLabels = [
      examDetails.title,
      examDetails.subject,
      examDetails.examName,
      examDetails.marks,
      "Subject:",
      "Time:",
      "Marks:",
      "SECTION:",
      "General Instructions:",
      "Believe in yourself and Rock your Exams!",
      `${state.examDetails.duration} minutes`
    ];

    // Gather all translatable content
    const collectContent = (sections) => {
      const content = {
        mainQuestions: [],
        subQuestions: [],
        options: [],
        answers: []
      };

      sections.forEach(section => {
        section.questions.forEach(question => {
          // Add main question
          content.mainQuestions.push(question.mainQuestion);

          // Process subquestions and their options
          if (question.subQuestions) {
            question.subQuestions.forEach(subQ => {
              content.subQuestions.push(subQ.question);
              if (subQ.answer) {
                content.answers.push(subQ.answer);
              }
              // Handle MCQ options
              if (subQ.options && Array.isArray(subQ.options)) {
                subQ.options.forEach(option => {
                  content.options.push(option.value);
                });
              }
            });
          }
        });
      });

      return content;
    };

    const content = collectContent(state.sections);

    // Translate all content in parallel
    const translations = await Promise.all([
      examPaperService.translateTexts({
        texts: staticLabels,
        targetLanguage: 'Marathi'
      }),
      examPaperService.translateTexts({
        texts: examDetails.instructions,
        targetLanguage: 'Marathi'
      }),
      examPaperService.translateTexts({
        texts: state.sections.map(section => section.value),
        targetLanguage: 'Marathi'
      }),
      examPaperService.translateTexts({
        texts: content.mainQuestions,
        targetLanguage: 'Marathi'
      }),
      examPaperService.translateTexts({
        texts: content.subQuestions,
        targetLanguage: 'Marathi'
      }),
      examPaperService.translateTexts({
        texts: content.options,
        targetLanguage: 'Marathi'
      }),
      examPaperService.translateTexts({
        texts: content.answers,
        targetLanguage: 'Marathi'
      })
    ]);

    const [
      translatedStaticLabels,
      translatedInstructions,
      translatedSectionTitles,
      translatedMainQuestions,
      translatedSubQuestions,
      translatedOptionsList,  // Renamed from translatedOptions to avoid conflict
      translatedAnswers
    ] = translations;

    // Structure translated exam details
    const translatedDetails = {
      title: translatedStaticLabels[0],
      subject: translatedStaticLabels[1],
      examName: translatedStaticLabels[2],
      time: translatedStaticLabels[10],
      marks: translatedStaticLabels[3],
      year: examDetails.year,
      instructions: translatedInstructions,
    };

    // Initialize counters before rebuilding sections
    let mainQuestionIndex = 0;
    let subQuestionIndex = 0;
    let optionIndex = 0;
    let answerIndex = 0;

    // Rebuild sections with translated content
    const translatedSections = state.sections.map((section, sectionIndex) => {
      const translatedQuestions = section.questions.map(question => {
        const currentMainQuestion = translatedMainQuestions[mainQuestionIndex++];
        
        const translatedSubQs = question.subQuestions?.map(subQ => {
          const currentSubQuestion = translatedSubQuestions[subQuestionIndex++];
          const currentAnswer = subQ.answer ? translatedAnswers[answerIndex++] : null;
          
          let subQuestionOptions = [];
          if (subQ.options && Array.isArray(subQ.options)) {
            subQuestionOptions = subQ.options.map(option => {
              const translatedOption = translatedOptionsList[optionIndex++];
              return {
                id: option.id,
                value: translatedOption
              };
            });
          }

          return {
            question: currentSubQuestion,
            answer: currentAnswer,
            ...(subQuestionOptions.length > 0 && { options: subQuestionOptions })
          };
        }) || [];

        return {
          ...question,
          mainQuestion: currentMainQuestion,
          subQuestions: translatedSubQs
        };
      });

      return {
        ...section,
        value: translatedSectionTitles[sectionIndex],
        questions: translatedQuestions
      };
    });

    setTranslatedContent({
      examDetails: translatedDetails,
      sections: translatedSections,
      translatedLabels: {
        subject: translatedStaticLabels[4],
        time: translatedStaticLabels[5],
        marks: translatedStaticLabels[6],
        generalInstructions: translatedStaticLabels[8],
        Section: translatedStaticLabels[7],
        footer: translatedStaticLabels[9],
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
  const numberToWords = (num) => {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return units[num] || num.toString();
  };
  const calculatePaperAnalytics = () => {
    const analytics = PerformanceAnalytics.calculateDifficulty(state.questions);
    setAnalyticsData(analytics);
  };
  const handleAnswerKeyClick = () => {
    setIsAnswerKeyVisible(true);
  };
  const handleAnswerKeyClose = () => {
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

  const renderShortAnswerQuestions = (questions, pattern) => {
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
           {getQuestionNumber(pattern, index)} {q.mainQuestion}
          </h4>
          {!(q.noOfOptions === 0) && (
            <span className='question-instruction' style={{ fontWeight: 800 }}>
              ( Solve Any {numberToWords(q.noOfSubQuestion - q.noOfOptions)} )
            </span>
          )}
          <span className='question-marks' style={{ fontWeight: 800 }}>[ {q.marks} ]</span>
        </div>

        {q.subQuestions.map((subQ, subIndex) => (
          <p key={subIndex} className='sub-question'>
            {getQuestionNumber(pattern, index, subIndex)} {subQ.question}
          </p>
        ))}
      </div>
    ));
  };

  const renderMCQQuestions = (questions, pattern) => {
    if (!questions || !Array.isArray(questions)) {
      return null;
    }
  
    return questions.map((q, index) => (
      <div key={index} className="mcq-question">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>{getQuestionNumber(pattern, index)} {q.mainQuestion}</h4>
          {!(q.noOfOptions === 0) && (
            <span className='question-instruction' style={{ fontWeight: 800 }}>
              ( Solve Any {numberToWords(q.noOfSubQuestion - q.noOfOptions)} )
            </span>
          )}
          <span className='question-marks' style={{ fontWeight: 800 }}>[ {q.marks} ]</span>
        </div>
  
        {q.subQuestions.map((subQ, subIndex) => (
          <div key={subIndex} className="mcq-sub-question">
            <p>{getQuestionNumber(pattern, index, subIndex)} {subQ.question}</p>
            <div className="mcq-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {subQ.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mcq-option">
                  <label>
                    {getQuestionNumber(pattern, index, subIndex, optionIndex)} {option.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ));
  };
  
  const renderMultipleQuestions = (questions, pattern) => {
    if (!questions || !Array.isArray(questions)) {
      return null;
    }
  
    return questions.map((q, index) => (
      <div key={index} className="multiple-question">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>{getQuestionNumber(pattern, index)} {q.mainQuestion}</h4>
          {!(q.noOfOptions === 0) && (
            <span className='question-instruction' style={{ fontWeight: 800 }}>
              ( Solve Any {numberToWords(q.noOfSubQuestion - q.noOfOptions)} )
            </span>
          )}
          <span className='question-marks' style={{ fontWeight: 800 }}>[ {q.marks} ]</span>
        </div>
        {q.subQuestions.map((subQ, subIndex) => (
          <p key={subIndex}>
            {getQuestionNumber(pattern, index, subIndex)} {subQ.question}
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
              return renderShortAnswerQuestions([question],'pattern1');
            case 'MCQ':
              return renderMCQQuestions([question],'pattern1');
            case 'Long':
              return renderShortAnswerQuestions([question],'pattern1');
            case 'Short Ans':
              return renderShortAnswerQuestions([question],'pattern1');
            case 'Multiple Question':
              return renderMultipleQuestions([question],'pattern1');
            default:
              return null;
          }
        })}
      </section>
    ));
  };

  const renderTranslationToggle = () => {


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
          
            <p style={{ color: 'gray', textAlign: 'center' }}> Premate.co.in</p>
          </footer>

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