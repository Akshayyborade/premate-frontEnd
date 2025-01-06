import React, { useRef } from 'react';
import { Modal, Table, Button, Divider } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const AnswerKey = ({ visible, onClose, sections, examDetails }) => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <style>
        @media print {
          .answer-key-print {
            padding: 20px;
          }
          .answer-table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
          }
          .answer-table th, .answer-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .answer-table th {
            background-color: #f5f5f5;
          }
          .section-header {
            background-color: #f0f0f0;
            padding: 8px;
            margin: 16px 0;
          }
          .question-header {
            margin: 16px 0;
            font-weight: bold;
          }
          .print-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .print-footer {
            margin-top: 20px;
            padding: 12px;
            background-color: #f9f9f9;
            font-style: italic;
          }
          @page {
            margin: 2cm;
          }
        }
      </style>
      ${printContent.innerHTML}
    `;

    window.print();
    document.body.innerHTML = originalContent;
  };

  const renderAnswer = (answer, questionType) => {
    // For MCQ questions, show the correct option letter and value
    if (questionType === 'MCQ' && answer.options) {
      const correctOptionIndex = answer.options.findIndex(opt => opt.value === answer.answer);
      return correctOptionIndex !== -1 
        ? `${String.fromCharCode(65 + correctOptionIndex)}) ${answer.answer}`
        : answer.answer;
    }
    
    // For other question types, show the answer with appropriate formatting
    return (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {answer}
      </div>
    );
  };

  const renderQuestionAnswers = (question, questionNumber) => {
    const columns = [
      {
        title: 'Q.No',
        dataIndex: 'questionNo',
        key: 'questionNo',
        width: '10%',
      },
      {
        title: 'Question',
        dataIndex: 'question',
        key: 'question',
        width: '45%',
      },
      {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
        width: '35%',
        render: (text, record) => renderAnswer(text, record.questionType),
      },
      {
        title: 'Marks',
        dataIndex: 'marks',
        key: 'marks',
        width: '10%',
      },
    ];

    const data = question.subQuestions.map((subQ, index) => ({
      key: index,
      questionNo: `${questionNumber}.${index + 1}`,
      question: subQ.question,
      answer: subQ.answer,
      marks: question.marks / question.subQuestions.length,
      questionType: question.questionType,
    }));

    return (
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false}
        size="small"
        bordered
        className="answer-table"
      />
    );
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Answer Key</span>
          <Button 
            icon={<PrinterOutlined />} 
            onClick={handlePrint}
          >
            Print Answer Key
          </Button>
        </div>
      }
      open={visible}
      onCancel={onClose}
      maskClosable={true}
      destroyOnClose={true}
      width={1200}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
    >
      <div ref={printRef} className="answer-key-print">
        <div className="print-header">
          <h2>{examDetails.title}</h2>
          <h3>{examDetails.subject} - Answer Key</h3>
          <h4>{examDetails.examName}</h4>
          <p>Total Marks: {examDetails.marks} | Time: {examDetails.time}</p>
          <Divider />
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="section-header">
              <h3>Section {section.value}</h3>
            </div>
            
            {section.questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <div className="question-header">
                  Main Question {questionIndex + 1}: {question.mainQuestion}
                  <span style={{ float: 'right' }}>Total Marks: {question.marks}</span>
                </div>
                {renderQuestionAnswers(question, questionIndex + 1)}
              </div>
            ))}
            <Divider />
          </div>
        ))}

        <div className="print-footer">
          <p>Important Notes for Examiners:</p>
          <ul>
            <li>Accept any valid alternative answers that demonstrate correct understanding of the concepts</li>
            <li>For numerical questions, consider valid steps in solution even if final answer differs slightly</li>
            <li>For descriptive answers, focus on key points and proper explanation</li>
            <li>Maintain consistency in marking across all answer sheets</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default AnswerKey;