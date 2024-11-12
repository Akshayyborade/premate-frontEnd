import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import { studentService } from '../../../../services/api/student.service';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import FileUpload from '../../../common/FileUpload';
import Select from '../../../common/Select';
import './StudentForm.css';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        course: '',
        batch: '',
        parentName: '',
        parentPhone: '',
        emergencyContact: '',
        bloodGroup: '',
        previousSchool: '',
        admissionDate: new Date().toISOString().split('T')[0]
    };

    const validationSchema = {
        firstName: { required: true },
        lastName: { required: true },
        email: { required: true, email: true },
        phone: { required: true, pattern: /^\d{10}$/ },
        dateOfBirth: { required: true },
        gender: { required: true },
        course: { required: true },
        batch: { required: true },
        parentName: { required: true },
        parentPhone: { required: true, pattern: /^\d{10}$/ }
    };

    const { values, errors, setValues, handleChange, handleSubmit } = useForm(
        initialState,
        validationSchema
    );

    useEffect(() => {
        if (id) {
            fetchStudentData();
        }
    }, [id]);

    const fetchStudentData = async () => {
        try {
            setLoading(true);
            const data = await studentService.getStudentById(id);
            setValues(data);
            if (data.photo) {
                setPhoto(data.photo);
            }
        } catch (error) {
            console.error('Error fetching student:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = (file) => {
        setPhoto(file);
    };

    const onSubmit = async (formData) => {
        try {
            setLoading(true);
            const studentData = {
                ...formData,
                photo
            };

            if (id) {
                await studentService.updateStudent(id, studentData);
            } else {
                await studentService.createStudent(studentData);
            }

            navigate('/dashboard/students');
        } catch (error) {
            console.error('Error saving student:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-form-container">
            <div className="form-header">
                <h2>{id ? 'Edit Student' : 'Add New Student'}</h2>
            </div>

            <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="student-form">
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <FileUpload
                            label="Student Photo"
                            onChange={handlePhotoUpload}
                            preview={photo}
                            accept="image/*"
                        />
                        
                        <Input
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            required
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            required
                        />

                        <Input
                            label="Date of Birth"
                            type="date"
                            name="dateOfBirth"
                            value={values.dateOfBirth}
                            onChange={handleChange}
                            error={errors.dateOfBirth}
                            required
                        />

                        <Select
                            label="Gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            error={errors.gender}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' }
                            ]}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Academic Information</h3>
                    <div className="form-grid">
                        <Select
                            label="Course"
                            name="course"
                            value={values.course}
                            onChange={handleChange}
                            error={errors.course}
                            options={[
                                { value: 'mathematics', label: 'Mathematics' },
                                { value: 'physics', label: 'Physics' },
                                { value: 'chemistry', label: 'Chemistry' }
                            ]}
                            required
                        />

                        <Select
                            label="Batch"
                            name="batch"
                            value={values.batch}
                            onChange={handleChange}
                            error={errors.batch}
                            options={[
                                { value: 'morning', label: 'Morning' },
                                { value: 'afternoon', label: 'Afternoon' },
                                { value: 'evening', label: 'Evening' }
                            ]}
                            required
                        />

                        <Input
                            label="Previous School"
                            name="previousSchool"
                            value={values.previousSchool}
                            onChange={handleChange}
                        />

                        <Input
                            label="Admission Date"
                            type="date"
                            name="admissionDate"
                            value={values.admissionDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Parent/Guardian Information</h3>
                    <div className="form-grid">
                        <Input
                            label="Parent/Guardian Name"
                            name="parentName"
                            value={values.parentName}
                            onChange={handleChange}
                            error={errors.parentName}
                            required
                        />

                        <Input
                            label="Parent/Guardian Phone"
                            name="parentPhone"
                            value={values.parentPhone}
                            onChange={handleChange}
                            error={errors.parentPhone}
                            required
                        />

                        <Input
                            label="Emergency Contact"
                            name="emergencyContact"
                            value={values.emergencyContact}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/dashboard/students')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={loading}
                    >
                        {id ? 'Update Student' : 'Add Student'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm; 