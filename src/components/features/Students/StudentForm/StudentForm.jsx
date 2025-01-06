import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  useForm from '../../../../hooks/useForm';
import { studentService } from '../../../../services/api/student.service';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import FileUpload from '../../../common/FileUpload/FileUpload';
import Select from '../../../common/Select/Select';
import './StudentForm.css';
import { useAuth } from '../../../../context/AuthContext';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const { user } = useAuth();
    const adminId = user ? user.institutionId : null;

    const initialState = {
        studentName: { fname: '', mName: '', lname: '' },
        schoolName: '',
        mobNumber: '',
        email: '',
        password: '',
        gender: '',
        dobDate: '',
        parents: { parentName: '', mobNo: '', parentEmail: '', location: '', relationWithStud: '' },
        grade: { gradeName: '' },
    };

    const validationSchema = {
        'studentName.fname': { required: true },
        'studentName.lname': { required: true },
        email: { required: true, email: true },
        mobNumber: { required: true },
        gender: { required: true },
        dobDate: { required: true },
        'parents.parentName': { required: true },
        'parents.mobNo': { required: true },
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
            console.error('Error fetching student:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (formData) => {
        try {
            setLoading(true);

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
                photo: photo,  // Attach photo if exists
            };

            // Make API call to create or update student
            const studentData = { studentDto, adminId };
            if (id) {
                await studentService.updateStudent(id, studentData);
            } else {
                await studentService.createStudent(studentData);
            }

            navigate('/admin/dashboard/students');
        } catch (error) {
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

    return (
        <div className="student-form-container">
            <div className="form-header">
                <h2>{id ? 'Edit Student' : 'Add New Student'}</h2>
            </div>

            <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="student-form">
                {/* Personal Information */}
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <FileUpload label="Student Photo" onChange={handlePhotoUpload} preview={photo} accept="image/*" />
                        <Input label="First Name" name="studentName.fname" value={values.studentName.fname} onChange={handleChange} error={errors['studentName.fname']} required />
                        <Input label="Middle Name" name="studentName.mName" value={values.studentName.mName} onChange={handleChange} />
                        <Input label="Last Name" name="studentName.lname" value={values.studentName.lname} onChange={handleChange} error={errors['studentName.lname']} required />
                        <Input label="Email" type="email" name="email" value={values.email} onChange={handleChange} error={errors.email} required />
                        <Input label="Phone" name="mobNumber" value={values.mobNumber} onChange={handleChange} error={errors.mobNumber} required />
                        <Select label="Gender" name="gender" value={values.gender} onChange={handleChange} error={errors.gender} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} required />
                        <Input label="Date of Birth" type="date" name="dobDate" value={values.dobDate} onChange={handleChange} error={errors.dobDate} required />
                    </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="form-section">
                    <h3>Parent/Guardian Information</h3>
                    <div className="form-grid">
                        <Input label="Parent/Guardian Name" name="parents.parentName" value={values.parents.parentName} onChange={handleChange} error={errors['parents.parentName']} required />
                        <Input label="Parent/Guardian Mobile" name="parents.mobNo" value={values.parents.mobNo} onChange={handleChange} error={errors['parents.mobNo']} required />
                        <Input label="Parent/Guardian Email" type="email" name="parents.parentEmail" value={values.parents.parentEmail} onChange={handleChange} />
                        <Input label="Location" name="parents.location" value={values.parents.location} onChange={handleChange} />
                        <Input label="Relation with Student" name="parents.relationWithStud" value={values.parents.relationWithStud} onChange={handleChange} />
                    </div>
                </div>

                {/* Actions */}
                <div className="form-actions">
                    <Button type="submit" loading={loading}>
                        {id ? 'Update' : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
