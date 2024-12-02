import axios from 'axios';
import { API_BASE_URL } from '../config';

const studentService = {
    async createStudent(studentData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/student/register`, studentData);
            return response.data;
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    },

    async getStudentById(studentId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/student/getStudent/${studentId}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error fetching student:', error);
            throw error;
        }
    },

    async getAllStudents() {
        try {
            const response = await axios.get(`${API_BASE_URL}/student/getAllStudent`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all students:', error);
            throw error;
        }
    },

    async updateStudent(studentId, studentData) {
        try {
            const response = await axios.put(`${API_BASE_URL}/student/updateStudent/${studentId}`, studentData);
            return response.data;
        } catch (error) {
            console.error('Error updating student:', error);
            throw error;
        }
    },

    async deleteStudent(studentId) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/student/deleteStudent/${studentId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting student:', error);
            throw error;
        }
    }
};

export { studentService }; 