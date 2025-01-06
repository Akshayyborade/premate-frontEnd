import React, { useRef } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Button } from 'antd';
import { FileDown } from 'lucide-react';

const DocxGenerator = ({ content, examName, year }) => {
  const contentRef = useRef(null);

  const docxStyles = {
    header: {
      alignment: 'center',
      spacing: { after: 300 },
    },
    title: {
      size: 32,
      bold: true,
    },
    subtitle: {
      size: 24,
    },
    metadata: {
      size: 20,
      spacing: { after: 200 }
    },
    instructions: {
      indent: { left: 720 },
      spacing: { before: 200, after: 200 }
    },
    sectionHeading: {
      alignment: 'center',
      size: 24,
      bold: true,
      spacing: { before: 400, after: 200 }
    },
    question: {
      spacing: { before: 200, after: 200 }
    },
    subQuestion: {
      indent: { left: 360 },
      spacing: { before: 100, after: 100 }
    },
    mcqOption: {
      indent: { left: 720 },
      spacing: { before: 50, after: 50 }
    }
  };

  const createTextRun = (text, style = {}) => {
    return new TextRun({
      text: text.trim(),
      ...style
    });
  };

  const createParagraph = (text, style = {}) => {
    return new Paragraph({
      children: [createTextRun(text, style)],
      ...style
    });
  };

  const parseMCQQuestion = (questionNode, questionNumber) => {
    const paragraphs = [];
    
    // Main question
    const mainQuestion = questionNode.querySelector('p strong')?.textContent;
    if (mainQuestion) {
      paragraphs.push(createParagraph(mainQuestion, {
        ...docxStyles.question,
        bold: true
      }));
    }

    // Sub-questions with options
    const subQuestions = questionNode.querySelectorAll('.mcq-sub-question');
    subQuestions.forEach((subQ, subIndex) => {
      const subQText = subQ.querySelector('p')?.textContent;
      if (subQText) {
        paragraphs.push(createParagraph(subQText, docxStyles.subQuestion));
      }

      // MCQ options
      const options = subQ.querySelectorAll('.mcq-option label');
      options.forEach((option) => {
        paragraphs.push(createParagraph(option.textContent, docxStyles.mcqOption));
      });
    });

    return paragraphs;
  };

  const parseShortAnswerQuestion = (questionNode, questionNumber) => {
    const paragraphs = [];
    
    // Main question
    const mainQuestion = questionNode.querySelector('h4')?.textContent;
    if (mainQuestion) {
      paragraphs.push(createParagraph(mainQuestion, {
        ...docxStyles.question,
        bold: true
      }));
    }

    // Sub-questions
    const subQuestions = questionNode.querySelectorAll('.sub-question');
    subQuestions.forEach((subQ) => {
      paragraphs.push(createParagraph(subQ.textContent, docxStyles.subQuestion));
    });

    return paragraphs;
  };

  const parseMultipleQuestion = (questionNode, questionNumber) => {
    const paragraphs = [];
    
    // Main question
    const mainQuestion = questionNode.querySelector('p strong')?.textContent;
    if (mainQuestion) {
      paragraphs.push(createParagraph(mainQuestion, {
        ...docxStyles.question,
        bold: true
      }));
    }

    // Sub-questions
    const subQuestions = Array.from(questionNode.querySelectorAll('p')).slice(1); // Skip main question
    subQuestions.forEach((subQ) => {
      paragraphs.push(createParagraph(subQ.textContent, docxStyles.subQuestion));
    });

    return paragraphs;
  };

  const parseHtmlToDocx = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const paragraphs = [];

    // Parse header
    const header = doc.querySelector('.header');
    if (header) {
      paragraphs.push(new Paragraph({
        children: [
          createTextRun(header.querySelector('h1')?.textContent || '', docxStyles.title),
          createTextRun('\n', { break: true }),
          createTextRun(header.querySelector('h2')?.textContent || '', docxStyles.subtitle),
          createTextRun('\n', { break: true }),
          createTextRun(header.querySelector('h3')?.textContent || '', docxStyles.metadata),
          createTextRun('\n', { break: true }),
          createTextRun(header.querySelector('.exam-metadata')?.textContent || '', docxStyles.metadata)
        ],
        ...docxStyles.header
      }));
    }

    // Parse instructions
    const instructions = doc.querySelector('.instructions');
    if (instructions) {
      paragraphs.push(createParagraph('General Instructions:', { bold: true }));
      const instructionItems = instructions.querySelectorAll('li');
      instructionItems.forEach((item, index) => {
        paragraphs.push(createParagraph(`${index + 1}. ${item.textContent}`, docxStyles.instructions));
      });
    }

    // Parse sections
    const sections = doc.querySelectorAll('section[class^="section-"]');
    sections.forEach((section) => {
      // Section heading
      const sectionHeading = section.querySelector('h3')?.textContent;
      if (sectionHeading) {
        paragraphs.push(createParagraph(sectionHeading, docxStyles.sectionHeading));
      }

      // Process questions based on their type
      const mcqQuestions = section.querySelectorAll('.mcq-question');
      const shortAnswerQuestions = section.querySelectorAll('.short-answer-question');
      const multipleQuestions = section.querySelectorAll('.multiple-question');

      mcqQuestions.forEach((q, i) => paragraphs.push(...parseMCQQuestion(q, i + 1)));
      shortAnswerQuestions.forEach((q, i) => paragraphs.push(...parseShortAnswerQuestion(q, i + 1)));
      multipleQuestions.forEach((q, i) => paragraphs.push(...parseMultipleQuestion(q, i + 1)));
    });

    // Parse footer
    const footer = doc.querySelector('.footer');
    if (footer) {
      paragraphs.push(createParagraph(footer.textContent, {
        alignment: 'center',
        spacing: { before: 400 }
      }));
    }

    return paragraphs;
  };

  const generateDocx = async () => {
    const htmlContent = content.current ? content.current.innerHTML : '';
    console.log('HTML Content:', htmlContent);

    if (!htmlContent) {
      console.error('No content to generate DOCX');
      return;
    }

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            size: {
              width: 11906,  // A4 width in twips
              height: 16838  // A4 height in twips
            },
            margin: {
              top: 1440,    // 1 inch in twips
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: parseHtmlToDocx(htmlContent)
      }]
    });

    try {
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${examName.replace(/\s+/g, '_')}_${year}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

  return (
    <Button 
      onClick={generateDocx}
      variant="outline"
    >
      <FileDown className="mr-2 h-4 w-4" />
      Download DOCX
     
    </Button>
    
  );
};

export default DocxGenerator;