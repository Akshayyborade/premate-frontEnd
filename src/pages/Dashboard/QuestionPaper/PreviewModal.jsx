import React, { useState, useRef, useCallback } from 'react';
import { BarChart2, FileQuestionIcon, Languages } from 'lucide-react';
import { Button, Tooltip, Modal, Progress, notification, Typography, Space, Card, Divider } from 'antd';
import { usePaperConfig } from './context/PaperConfigContext';
import { examPaperService } from '../../../services/api/examPaper.service';
import {
  SaveOutlined,
  CloseOutlined,
  PrinterOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import './ExamPaperStyles.css';
import './PrintStyles.css';
import DocxGenerator from './components/DocxGenerator';
import AnswerKey from './components/AnswerKey';

const { Title, Text } = Typography;

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

const PreviewModal = ({ visible, onClose, questionPaper }) => {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const printRef = useRef(null);
  const { paperConfig } = usePaperConfig();

  const handlePreview = useCallback(async () => {
    try {
      setLoading(true);
      const response = await examPaperService.generatePreview(paperConfig);
      setPreviewData(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to generate preview. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [paperConfig]);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Question Paper Preview</title>
            <link rel="stylesheet" href="/print-styles.css">
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

    return (
      <Modal
      title={
        <Space>
          <FileTextOutlined />
          Question Paper Preview
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="print"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
        >
          Print
        </Button>,
      ]}
      width={800}
    >
      <div ref={printRef}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>{questionPaper?.title}</Title>
            
            <Space>
              <ClockCircleOutlined />
              <Text>Duration: {questionPaper?.duration} minutes</Text>
            </Space>
            
            <Space>
              <UserOutlined />
              <Text>Total Marks: {questionPaper?.totalMarks}</Text>
            </Space>

            <Divider />

            {questionPaper?.sections?.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Title level={5}>
                  Section {sectionIndex + 1}: {section.title}
                </Title>
                
                {section.questions?.map((question, questionIndex) => (
                  <Card key={questionIndex} style={{ marginBottom: '16px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space>
                        <QuestionCircleOutlined />
                        <Text strong>Question {questionIndex + 1}:</Text>
                      </Space>
                      <Text>{question.text}</Text>
                      
                      {question.options && (
                        <Space direction="vertical">
                          {question.options.map((option, optionIndex) => (
                            <Space key={optionIndex}>
                              <CheckCircleOutlined />
                              <Text>{option}</Text>
                            </Space>
                          ))}
                        </Space>
                      )}
                    </Space>
                  </Card>
                ))}
        </div>
            ))}
          </Space>
        </Card>
      </div>
    </Modal>
  );
};

export default PreviewModal;