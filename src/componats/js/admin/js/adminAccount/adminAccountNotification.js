import { Typography } from "@mui/joy";
import { Button, Container, Divider, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";

const AdminAccountNotification=()=>{
    
    ///setting Notification//////////////////////////
    const [emailNotification, setEmailNotification] = useState(true);
    const [pushNotification, setPushNotification] = useState(false);
    const [smsNotification, setSmsNotification] = useState(true);

    const handleEmailNotificationChange = (event) => {
        setEmailNotification(event.target.checked);
    };

    const handlePushNotificationChange = (event) => {
        setPushNotification(event.target.checked);
    };

    const handleSmsNotificationChange = (event) => {
        setSmsNotification(event.target.checked);
    };

    const handleSaveSettings = () => {
        // Implement logic to save notification settings
        console.log('Saving notification settings...');
    };
    ///////////////////////////////////////////////////
    return(
        <Container maxWidth="lg" sx={{ mt: 4 }}>
                        <Typography variant="h4" level='h4' gutterBottom>
                            Notification Settings
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={emailNotification} onChange={handleEmailNotificationChange} color='success' />}
                                label="Email Notifications"
                            />
                            <FormControlLabel
                                control={<Switch checked={pushNotification} onChange={handlePushNotificationChange} color='success' />}
                                label="Push Notifications"
                            />
                            <FormControlLabel
                                control={<Switch checked={smsNotification} onChange={handleSmsNotificationChange} color='success' />}
                                label="SMS Notifications"
                            />
                        </FormGroup>
                        <Button onClick={handleSaveSettings} variant='outlined' color='success'>
                            Save Settings
                        </Button>
                    </Container>
    )
}
export default AdminAccountNotification;