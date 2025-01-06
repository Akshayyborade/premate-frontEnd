import apiClient from '../config';
const logError = (error) => {
    console.error(`[${new Date().toISOString()}] API Error:`, error.response?.data || error.message);
};






// Create and export a single instance

const examPaperService = {
    /**
     * Translate text using the API
     * @param {Object} translationData
     * @returns {Promise}
     */
    async translateText(translationData) {
        try {
            const response = await apiClient.post('/question-paper/translate', {
                text: translationData.text,
                sourceLanguage: translationData.sourceLanguage||"en",
                targetLanguage: translationData.targetLanguage,
                tone: translationData.tone || 'formal',
                context: translationData.context || 'general'
            });
            
            return response.data?.translatedText;
        } catch (error) {
            logError(error);
            throw error;
        }
    },
    
    async createExamPaper(examPaperData) {
        try {
            const response = await apiClient.post('/question-paper/create', examPaperData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            logError(error);
            throw error;
        }
    },

    async getExamPaperById(examPaperId) {
        try {
            const response = await apiClient.get(`/exam-paper/${examPaperId}`);
            return response.data;
        } catch (error) {
            logError(error);
            throw error;
        }
    },

    async getAllExamPapers() {
        try {
            const response = await apiClient.get('/exam-paper');
            return response.data;
        } catch (error) {
            logError(error);
            throw error;
        }
    },

    async updateExamPaper(examPaperId, examPaperData) {
        try {
            const response = await apiClient.put(`/exam-paper/update/${examPaperId}`, examPaperData);
            return response.data;
        } catch (error) {
            logError(error);
            throw error;
        }
    },

    async deleteExamPaper(examPaperId) {
        try {
            const response = await apiClient.delete(`/exam-paper/delete/${examPaperId}`);
            return response.data;
        } catch (error) {
            logError(error);
            throw error;
        }
    },

    /**
     * Translate multiple texts using the API
     * @param {Object} translationData
     * @returns {Promise}
     */
    async translateTexts(translationData) {
        try {
            const response = await apiClient.post('/question-paper/batch-translate', {
                texts: translationData.texts,
                targetLanguage: translationData.targetLanguage
            });
            return response.data?.translatedTexts; // Adjust based on your API response structure
        } catch (error) {
            logError(error);
            throw error;
        }
    },
};

export { examPaperService };
