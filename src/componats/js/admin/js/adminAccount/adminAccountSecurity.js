import { Typography } from "@mui/joy"
import { Button, Container, Divider, TextField } from "@mui/material"
import { useState } from "react";
import { resetPassword } from "../services/AdminServices";

const AdminAccountSecurity = (adminData) => {
    //// security panel  show or hide or function//////////////////
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        // Verify if the new password and confirm password fields match
        if (newPassword !== confirmPassword) {
            // If passwords do not match, show an error message or handle the error as needed
            console.error('New password and confirm password do not match');
           
        }

        // If passwords match, proceed to change the password
        try {
            // Call the resetPassword function to change the password
            const result = await resetPassword(adminData?.email, currentPassword, newPassword);
            // Password reset successful, handle success (e.g., show success message)
            console.log(result);
        } catch (error) {
            // Password reset failed, handle error (e.g., show error message)
            console.error('Error changing password:', error.message);
        }
    };

    const handleResetPassword = () => {
        // Implement logic to reset password
        console.log('Resetting password...');
    };

    //////////////////////////////////////////////////
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" level='h4' gutterBottom>
                Security
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Change Password Form */}
            <Typography variant="h6" gutterBottom>
                Change Password
            </Typography>
            <form onSubmit={handleChangePassword}>
                <TextField
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    size='small'
                />
                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    size='small'
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    size='small'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" variant='outlined' color='success'>
                    Change Password
                </Button>
            </form>
            <Divider sx={{ my: 2 }} />
            {/* Reset Password Form */}
            <Typography variant="h6" gutterBottom>
                Reset Password
            </Typography>
            <form onSubmit={handleResetPassword}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    size='small'
                />
                <Button type="submit" variant='outlined' color='success'>
                    Reset Password
                </Button>
            </form>
        </Container>
    )
}
export default AdminAccountSecurity;