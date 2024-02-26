import React, { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

const RegistrationLinkForm = ({ sendRegistrationLink }) => {
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        whatsappNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the function to send the registration link with the provided details
        sendRegistrationLink(studentDetails);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input type="text" name="name" value={studentDetails.name} onChange={handleChange} placeholder="Enter name" required size="sm" />
            </FormGroup>
            <FormGroup>
                <Input type="text" name="whatsappNumber" value={studentDetails.whatsappNumber} onChange={handleChange} placeholder="Enter WhatsApp number" required size="sm" />
            </FormGroup>
            <Button type="submit" color="success" outline size="sm">Send Link</Button>
        </Form>
    );
};

export default RegistrationLinkForm;
