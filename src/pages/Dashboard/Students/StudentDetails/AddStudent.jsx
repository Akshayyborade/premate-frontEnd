import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../../../services/api/student.service';
import Button from '../../../../components/common/Button/Button';
import Input from '../../../../components/common/Input/Input';
import Select from '../../../../components/common/Select/Select';
import './AddStudent.css'; // Optional: Add styles for the component

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: {
            fname: '',
            lname: '',
            mname: '',
        },
        schoolName: '',
        mobNumber: '',
        email: '',
        password: '',
        gender: 'Male', // Default gender
        dobDate: '',
        parents: {
            parentName: '',
            mobNo: '',
            email: '',
            location: '',
            relationWithStud: 'son', // Default relation
        },
        grade: {
            gradeName: '',
            // Add other fields if necessary
        },
        address: {
            area: '',
            city: '',
            state: '',
            zip: '',
        },
        isactive: true, // Default active status
        dateOfAddmission: '', // Date of admission
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested state updates
        if (name.startsWith('name.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                name: {
                    ...prev.name,
                    [field]: value,
                },
            }));
        } else if (name.startsWith('parents.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                parents: {
                    ...prev.parents,
                    [field]: value,
                },
            }));
        } else if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [field]: value,
                },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await studentService.addStudent(formData);
            navigate('/dashboard/students'); // Redirect to the student list after adding
        } catch (error) {
            console.error('Error adding student:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-student-container">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="First Name"
                    name="name.fname"
                    value={formData.name.fname}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Last Name"
                    name="name.lname"
                    value={formData.name.lname}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Middle Name"
                    name="name.mname"
                    value={formData.name.mname}
                    onChange={handleChange}
                />
                <Input
                    label="School Name"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Mobile Number"
                    name="mobNumber"
                    value={formData.mobNumber}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />
                <Input
                    label="Date of Birth"
                    name="dobDate"
                    type="date"
                    value={formData.dobDate}
                    onChange={handleChange}
                    required
                />
                <h3>Parent Details</h3>
                <Input
                    label="Parent Name"
                    name="parents.parentName"
                    value={formData.parents.parentName}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Parent Mobile Number"
                    name="parents.mobNo"
                    value={formData.parents.mobNo}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Parent Email"
                    name="parents.email"
                    type="email"
                    value={formData.parents.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Location"
                    name="parents.location"
                    value={formData.parents.location}
                    onChange={handleChange}
                />
                <Input
                    label="Relation with Student"
                    name="parents.relationWithStud"
                    value={formData.parents.relationWithStud}
                    onChange={handleChange}
                    required
                />
                <h3>Address Details</h3>
                <Input
                    label="Area"
                    name="address.area"
                    value={formData.address.area}
                    onChange={handleChange}
                />
                <Input
                    label="City"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="State"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="ZIP Code"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Date of Admission"
                    name="dateOfAddmission"
                    type="date"
                    value={formData.dateOfAddmission}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Student'}
                </Button>
            </form>
        </div>
    );
};

export default AddStudent; 