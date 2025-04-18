import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../../../hooks/useForm';
import { studentService } from '../../../../services/api/student.service';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import FileUpload from '../../../common/FileUpload/FileUpload';
import Select from '../../../common/Select/Select';
import Alert from '../../../common/Alert/Alert';
import LoadingSpinner from '../../../common/Spinner/Spinner';
import './StudentForm.css';
import { useAuth } from '../../../../context/AuthContext';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user } = useAuth();
    const adminId = user ? user.institutionId : null;

    const initialState = {
        studentName: { fname: '', mName: '', lname: '' },
        schoolName: '',
        mobNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dobDate: '',
        parents: { parentName: '', mobNo: '', parentEmail: '', location: '', relationWithStud: '' },
        grade: { gradeName: '' },
    };

    const validationSchema = {
        'studentName.fname': { required: true, minLength: 2 },
        'studentName.lname': { required: true, minLength: 2 },
        email: { required: true, email: true },
        mobNumber: { required: true, pattern: /^[0-9]{10}$/ },
        password: { required: !id, minLength: 8 },
        confirmPassword: { required: !id, match: 'password' },
        gender: { required: true },
        dobDate: { required: true },
        'parents.parentName': { required: true },
        'parents.mobNo': { required: true, pattern: /^[0-9]{10}$/ },
        'parents.parentEmail': { email: true },
    };

    const { values, errors, setValues, handleChange, handleSubmit } = useForm(initialState, validationSchema);

    useEffect(() => {
        if (id) {
            fetchStudentData();
        }
    }, [id]);

    const fetchStudentData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await studentService.getStudentById(id);
            setValues({
                studentName: {
                    fname: data.name.fname || '',
                    mName: data.name.mname || '',
                    lname: data.name.lname || '',
                },
                schoolName: data.schoolName || '',
                mobNumber: data.mobNumber || '',
                email: data.email || '',
                password: '',
                confirmPassword: '',
                gender: data.gender || '',
                dobDate: data.dobDate || '',
                parents: {
                    parentName: data.parents.parentName || '',
                    mobNo: data.parents.mobNo || '',
                    parentEmail: data.parents.email || '',
                    location: data.parents.location || '',
                    relationWithStud: data.parents.relationWithStud || '',
                },
                grade: { gradeName: data.grade.gradeName || '' },
            });
            if (data.photo) {
                setPhoto(data.photo);
            }
        } catch (error) {
            setError('Failed to fetch student data. Please try again.');
            console.error('Error fetching student:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (formData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            // Prepare the studentDto object
            const studentDto = {
                name: {
                    fname: formData.studentName.fname,
                    mname: formData.studentName.mName,
                    lname: formData.studentName.lname,
                },
                schoolName: formData.schoolName,
                mobNumber: formData.mobNumber,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                dobDate: formData.dobDate,
                parents: {
                    parentName: formData.parents.parentName,
                    mobNo: formData.parents.mobNo,
                    parentEmail: formData.parents.parentEmail,
                    location: formData.parents.location,
                    relationWithStud: formData.parents.relationWithStud,
                },
                grade: { gradeName: formData.grade.gradeName },
                photo: photo,
            };

            // Make API call to create or update student
            const studentData = { studentDto, adminId };
            if (id) {
                await studentService.updateStudent(id, studentData);
                setSuccess('Student updated successfully');
            } else {
                await studentService.createStudent(studentData);
                setSuccess('Student created successfully');
            }

            setTimeout(() => {
                navigate('/admin/dashboard/students');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to save student. Please try again.');
            console.error('Error saving student:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = (file) => {
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    if (loading && !values.studentName.fname) {
        return <LoadingSpinner />;
    }

    return (
        <div className="student-form-container">
            <div className="form-header">
                <h2>{id ? 'Edit Student' : 'Add New Student'}</h2>
            </div>

            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}

            <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="student-form">
                {/* Personal Information */}
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <FileUpload 
                            label="Student Photo" 
                            onChange={handlePhotoUpload} 
                            preview={photo} 
                            accept="image/*" 
                            error={errors.photo}
                        />
                        <Input 
                            label="First Name" 
                            name="studentName.fname" 
                            value={values.studentName.fname} 
                            onChange={handleChange} 
                            error={errors['studentName.fname']} 
                            required 
                        />
                        <Input 
                            label="Middle Name" 
                            name="studentName.mName" 
                            value={values.studentName.mName} 
                            onChange={handleChange} 
                        />
                        <Input 
                            label="Last Name" 
                            name="studentName.lname" 
                            value={values.studentName.lname} 
                            onChange={handleChange} 
                            error={errors['studentName.lname']} 
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
                            name="mobNumber" 
                            value={values.mobNumber} 
                            onChange={handleChange} 
                            error={errors.mobNumber} 
                            required 
                            placeholder="10-digit mobile number"
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
                        <Input 
                            label="Date of Birth" 
                            type="date" 
                            name="dobDate" 
                            value={values.dobDate} 
                            onChange={handleChange} 
                            error={errors.dobDate} 
                            required 
                        />
                        {!id && (
                            <>
                                <Input 
                                    label="Password" 
                                    type="password" 
                                    name="password" 
                                    value={values.password} 
                                    onChange={handleChange} 
                                    error={errors.password} 
                                    required 
                                    placeholder="Minimum 8 characters"
                                />
                                <Input 
                                    label="Confirm Password" 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={values.confirmPassword} 
                                    onChange={handleChange} 
                                    error={errors.confirmPassword} 
                                    required 
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="form-section">
                    <h3>Parent/Guardian Information</h3>
                    <div className="form-grid">
                        <Input 
                            label="Parent/Guardian Name" 
                            name="parents.parentName" 
                            value={values.parents.parentName} 
                            onChange={handleChange} 
                            error={errors['parents.parentName']} 
                            required 
                        />
                        <Input 
                            label="Parent/Guardian Mobile" 
                            name="parents.mobNo" 
                            value={values.parents.mobNo} 
                            onChange={handleChange} 
                            error={errors['parents.mobNo']} 
                            required 
                            placeholder="10-digit mobile number"
                        />
                        <Input 
                            label="Parent/Guardian Email" 
                            type="email" 
                            name="parents.parentEmail" 
                            value={values.parents.parentEmail} 
                            onChange={handleChange} 
                            error={errors['parents.parentEmail']}
                        />
                        <Input 
                            label="Location" 
                            name="parents.location" 
                            value={values.parents.location} 
                            onChange={handleChange} 
                        />
                        <Input 
                            label="Relation with Student" 
                            name="parents.relationWithStud" 
                            value={values.parents.relationWithStud} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="form-actions">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/admin/dashboard/students')}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        loading={loading}
                        disabled={loading}
                    >
                        {id ? 'Update' : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
