import React from 'react';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  TabStopType,
  ShadingType,
  HeightRule
} from 'docx';
import { Button } from 'antd';
import { FileDown } from 'lucide-react';

const DocxGenerator = ({ content, examName, year }) => {
  // Styles matching the CSS exactly
  const docStyles = {
    document: {
      font: 'Arial',
      size: 24, // 12pt
      color: '434343'
    },
    header: {
      title: {
        size: 48, // 24px in CSS
        bold: true,
        color: '000000'
      },
      subtitle: {
        size: 36, // 18px in CSS
        color: '333333'
      },
      examName: {
        size: 32, // 16px in CSS
        color: '666666'
      }
    },
    section: {
      title: {
        size: 32,
        bold: true,
        alignment: AlignmentType.CENTER,
        spacing: {
          before: 400,
          after: 400
        }
      }
    },
    question: {
      main: {
        size: 28,
        spacing: {
          before: 200,
          after: 200
        },
        background: 'F9F9F9'
      },
      sub: {
        size: 24,
        indent: {
          left: 720 // 10px margin-left in CSS
        }
      },
      mcq: {
        option: {
          size: 24,
          indent: {
            left: 1440 // 20px margin-left in CSS for options
          }
        }
      }
    },
    instructions: {
      container: {
        background: 'F0F0F0',
        padding: {
          top: 280,
          bottom: 280,
          left: 280,
          right: 280
        }
      },
      title: {
        size: 28,
        bold: true
      },
      item: {
        size: 24,
        indent: {
          left: 720
        }
      }
    }
  };

  const createTextRun = (text, options = {}) => {
    return new TextRun({
      text: text?.toString() || '',
      font: docStyles.document.font,
      size: docStyles.document.size,
      ...options
    });
  };

  const createParagraph = (children, options = {}) => {
    return new Paragraph({
      children: Array.isArray(children) ? children : [children],
      ...options
    });
  };

  const parseHeader = (headerElement) => {
    if (!headerElement) return [];

    const title = headerElement.querySelector('h1')?.textContent;
    const subject = headerElement.querySelector('h2')?.textContent;
    const examName = headerElement.querySelector('h3')?.textContent;
    const metadata = headerElement.querySelector('.exam-metadata');
    const time = metadata?.querySelector('p:first-child')?.textContent;
    const marks = metadata?.querySelector('p:last-child')?.textContent;

    return [
      // Title
      createParagraph(
        createTextRun(title, docStyles.header.title),
        { alignment: AlignmentType.CENTER }
      ),
      // Subject
      createParagraph(
        createTextRun(subject, docStyles.header.subtitle),

        { alignment: AlignmentType.CENTER }
      ),
      // Exam Name
      createParagraph(
        createTextRun(examName, docStyles.header.examName),
        { alignment: AlignmentType.CENTER }
      ),
      // Metadata
      createParagraph([
        createTextRun(time),
        createTextRun('                                                                                                       '),
        createTextRun(marks)
      ], {
        spacing: { before: 280, after: 280 }
      }),
      // Border after header
      createParagraph(createTextRun(''), {
        border: {
          bottom: {
            color: '000000',
            size: 1,
            style: BorderStyle.SINGLE
          }
        }
      })
    ];
  };

  const parseInstructions = (instructionsElement) => {
    if (!instructionsElement) return [];

    const instructions = Array.from(instructionsElement.querySelectorAll('li'))
      .map(li => li.textContent);

    return [
      createParagraph(
        createTextRun('General Instructions:', docStyles.instructions.title)
      ),
      ...instructions.map((instruction, index) =>
        createParagraph(
          createTextRun(`${index + 1}. ${instruction}`),
          {
            ...docStyles.instructions.item,
            spacing: { before: 80, after: 80 }
          }
        )
      ),
      // Border after header
      createParagraph(createTextRun(''), {
        border: {
          bottom: {
            color: '000000',
            size: 1,
            style: BorderStyle.SINGLE
          }
        }
      })
    ];
  };

  const parseMCQQuestion = (questionElement) => {
    const paragraphs = [];
    const questionHeader = questionElement.querySelector('h4')?.parentElement;
    const mainText = questionHeader?.textContent || '';

    // Main question
    paragraphs.push(
      createParagraph(
        createTextRun(mainText, { bold: true }),
        docStyles.question.main
      )
    );

    // Sub-questions and options
    const subQuestions = questionElement.querySelectorAll('.mcq-sub-question');
    subQuestions.forEach(subQ => {
      // Sub-question text
      const subQText = subQ.querySelector('p')?.textContent || '';
      paragraphs.push(
        createParagraph(
          createTextRun(subQText),
          docStyles.question.sub
        )
      );

      // MCQ options
      const options = Array.from(subQ.querySelectorAll('.mcq-option label'));
      console.log(options);
      // Process options in pairs
      // Process options adaptively
      for (let i = 0; i < options.length; i += 2) {
        const rowOptions = options.slice(i, i + 2);
        const firstOptionText = rowOptions[0]?.textContent?.trim() || '';
        const secondOptionText = rowOptions[1]?.textContent?.trim() || '';

        // Check if either option is too long (e.g., more than 50 characters)
        const MAX_OPTION_LENGTH = 50;
        const shouldSplitToRows = firstOptionText.length > MAX_OPTION_LENGTH ||
          secondOptionText.length > MAX_OPTION_LENGTH;

        if (shouldSplitToRows) {
          // Create separate paragraphs for long options
          if (firstOptionText) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: firstOptionText,
                    ...docStyles.question.mcq.option
                  })
                ],
                indent: {
                  left: convertInchesToTwip(0.5)
                },
                spacing: {
                  before: 120,
                  after: 120
                }
              })
            );
          }

          if (secondOptionText) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: secondOptionText,
                    ...docStyles.question.mcq.option
                  })
                ],
                indent: {
                  left: convertInchesToTwip(0.5)
                },
                spacing: {
                  before: 120,
                  after: 120
                }
              })
            );
          }
        } else {
          // Create single paragraph with tabbed columns for short options
          const optionParagraph = new Paragraph({
            children: [
              // First option - Left aligned
              new TextRun({
                text: firstOptionText,
                ...docStyles.question.mcq.option
              }),
              // Tab to move to right column
              new TextRun({
                text: '\t',
                ...docStyles.question.mcq.option
              }),
              // Second option - Right aligned
              secondOptionText ? new TextRun({
                text: secondOptionText,
                ...docStyles.question.mcq.option
              }) : new TextRun('')
            ],
            indent: {
              left: convertInchesToTwip(0.5)
            },
            tabStops: [
              {
                type: TabStopType.LEFT,
                position: convertInchesToTwip(3.5),
              }
            ],
            spacing: {
              before: 120,
              after: 120
            }
          });

          paragraphs.push(optionParagraph);
        }
      }



    });
    console.log(paragraphs);
    return paragraphs;
  };

  const parseShortAnswerQuestion = (questionElement) => {
    const paragraphs = [];
    const questionHeader = questionElement.querySelector('h4')?.parentElement;
    console.log(questionHeader);
    const mainText = questionHeader.querySelector('h4')?.textContent;
    const questionInstruction = questionHeader.querySelector('.question-instruction')?.textContent;
    const questionMarks = questionHeader.querySelector('.question-marks')?.textContent;
    console.log(mainText);
    console.log(questionInstruction);
    console.log(questionMarks);

    // Main question
    paragraphs.push(
      createParagraph([
        createTextRun(mainText, { bold: true }),
        createTextRun("        "),
        createTextRun(questionInstruction, { bold: true }),
        createTextRun("        "),
        createTextRun(questionMarks,{ bold: true }),],
        docStyles.question.main
      )
    );

    // Sub-questions
    const subQuestions = questionElement.querySelectorAll('.sub-question');
    subQuestions.forEach(subQ => {
      paragraphs.push(
        createParagraph(
          createTextRun(subQ.textContent),
          docStyles.question.sub
        )
      );
    });

    return paragraphs;
  };

  const parseMultipleQuestion = (questionElement) => {
    const paragraphs = [];
    const questionHeader = questionElement.querySelector('h4')?.parentElement;
    const mainText = questionHeader?.textContent || '';

    // Main question
    paragraphs.push(
      createParagraph(
        createTextRun(mainText, { bold: true }),
        docStyles.question.main
      )
    );

    // Sub-questions
    const subQuestions = Array.from(questionElement.querySelectorAll('p')).slice(1);
    subQuestions.forEach(subQ => {
      paragraphs.push(
        createParagraph(
          createTextRun(subQ.textContent),
          docStyles.question.sub
        )
      );
    });

    return paragraphs;
  };

  const parseSection = (sectionElement) => {
    if (!sectionElement) return [];
    const paragraphs = [];

    // Section heading
    const heading = sectionElement.querySelector('h3')?.textContent;
    if (heading) {
      paragraphs.push(
        createParagraph(
          createTextRun(heading, { bold: true }),
          docStyles.section.title
        )
      );
    }

    // Questions by type
    const mcqQuestions = sectionElement.querySelectorAll('.mcq-question');
    const shortAnswerQuestions = sectionElement.querySelectorAll('.short-answer-question');
    const multipleQuestions = sectionElement.querySelectorAll('.multiple-question');

    mcqQuestions.forEach(q => paragraphs.push(...parseMCQQuestion(q)));
    shortAnswerQuestions.forEach(q => paragraphs.push(...parseShortAnswerQuestion(q)));
    multipleQuestions.forEach(q => paragraphs.push(...parseMultipleQuestion(q)));

    return paragraphs;
  };

  const generateDocx = async () => {
    const htmlContent = content.current;
    if (!htmlContent) {
      console.error('No content to generate DOCX');
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent.innerHTML, 'text/html');

    const docxDocument = new Document({
      background: {
        color: 'FFFFFF'
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1000,    // 1 inch
              right: 1000,
              bottom: 1000,
              left: 1000
            },

          }
        },
        children: [
          ...parseHeader(doc.querySelector('.header')),
          ...parseInstructions(doc.querySelector('.instructions')),
          ...Array.from(doc.querySelectorAll('section[class^="section-"]'))
            .flatMap(section => parseSection(section)),
          // Footer
          createParagraph(
            createTextRun('Premate.co.in', {
              color: '666666',
              size: 20
            }),
            {
              alignment: AlignmentType.CENTER,
              spacing: { before: 400 }
            }
          )
        ]
      }]
    });

    try {
      const blob = await Packer.toBlob(docxDocument);
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
      className="flex items-center gap-2"
    >
      <FileDown className="h-4 w-4" />
      Download DOCX
    </Button>
  );
};

export default DocxGenerator;