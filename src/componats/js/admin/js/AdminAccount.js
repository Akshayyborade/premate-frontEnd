import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Backdrop,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,

    Icon,

    IconButton,

    Input,

    Paper,

    Stack,

    SvgIcon,

    Switch,

    TextField,
    Unstable_Grid2,

    styled


} from '@mui/material';

import { useNavigate } from 'react-router-dom'; // For navigation after update

// Replace with your authentication service
import { updateAdminProfile, changeAdminPassword, doLogOut } from './services/AuthServices';
import { Col, Container, Form, Row } from 'reactstrap';
import { Link, Tab, TabList, TabPanel, Tabs, Typography, } from '@mui/joy';
import { ArrowRightAlt, PhotoCamera, Save } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { getAdminData } from './services/AdminServices';

import AdminAccountGeneral from './adminAccount/adminAccountGeneral';


const AdminAccount = () => {
    // navigation
    const navigate = useNavigate();

    ///tabs /////
    const [activeTab, setActiveTab] = useState('1');
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

  

    // Fetch initial admin data (replace with your data fetching logic)
    const [adminData, setAdminData] = useState();
    const fetchAdminData = async () => {
        //retrieve admin id
        const adminId = localStorage.getItem('adminId');

        try {
            const response = await getAdminData(adminId);

            setAdminData(response.data);
            if (response.status === 401) {
                doLogOut(() => {
                    navigate('/')
                })
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchAdminData()
    }, [])
    console.log(adminData);
    //// security panel  show or hide or function//////////////////
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Implement logic to change password
        console.log('Changing password...');
    };

    const handleResetPassword = () => {
        // Implement logic to reset password
        console.log('Resetting password...');
    };

    //////////////////////////////////////////////////
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
    return (
        <Container className='p-5' style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Typography level='h3'>Account</Typography><Breadcrumbs aria-label="breadcrumbs" separator='>'>
                {['DashBoard', 'Profile', 'Account'].map((item) => (
                    <Link key={item} color="neutral" href="#basics">
                        {item}
                    </Link>
                ))}

            </Breadcrumbs>
            {/* tablist */}
            <Tabs value={activeTab} onChange={handleChange} >
                <TabList className='bg-white' variant='soft' disableUnderline={true}>
                    <Tab value='1' color='success'>General</Tab>
                    <Tab value='2' color='success'>Subscription</Tab>
                    <Tab value='3' color='success'>Security</Tab>
                    <Tab value='4' color='success'>Notification</Tab>
                </TabList>
                <TabPanel value='1' color='neutral' variant='plain' className='bg-white'>
                    <AdminAccountGeneral adminData={adminData}/>
                </TabPanel>
                <TabPanel value='2' className='bg-white'>
                    <Container maxWidth="md" sx={{ mt: 4 }}>
                        <Typography variant="h4" level='h4' gutterBottom>
                            Pricing
                        </Typography>
                        <Grid container spacing={4}>
                            {/* Starter Plan */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3 }}>
                                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                                        <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', color: 'primary.main' }}>
                                            Starter
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                            <Typography variant="h3" sx={{ mr: 1, fontWeight: 'bold' }}>$</Typography>
                                            <Typography variant="h2" component="span">27</Typography>
                                            <Typography variant="subtitle1" sx={{ ml: 1 }}>/mo</Typography>
                                        </Box>
                                    </Box>
                                    <ul>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>2 team members</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>1000+ components</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>1 month free updates</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>Life time technical support</Typography>
                                            </Box>
                                        </li>
                                    </ul>
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Button variant='outlined' color='success'>
                                            Buy Now
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Pro Plan */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3 }}>
                                    {/* Pro Plan Content */}
                                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                                        <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', color: 'primary.main' }}>
                                            Pro
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                            <Typography variant="h3" sx={{ mr: 1, fontWeight: 'bold' }}>$</Typography>
                                            <Typography variant="h2" component="span">27</Typography>
                                            <Typography variant="subtitle1" sx={{ ml: 1 }}>/mo</Typography>
                                        </Box>
                                    </Box>
                                    <ul>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>2 team members</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>1000+ components</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>1 month free updates</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>Life time technical support</Typography>
                                            </Box>
                                        </li>
                                    </ul>
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Button variant='outlined' color='success'>
                                            Buy Now
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Advance Plan */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3 }}>
                                    {/* Advance Plan Content */}
                                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                                        <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', color: 'primary.main' }}>
                                            Advance
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                                            <Typography variant="h3" sx={{ mr: 1, fontWeight: 'bold' }}>$</Typography>
                                            <Typography variant="h2" component="span">27</Typography>
                                            <Typography variant="subtitle1" sx={{ ml: 1 }}>/mo</Typography>
                                        </Box>
                                    </Box>
                                    <ul>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>2 team members</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>1000+ components</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>1 month free updates</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightAlt} sx={{ mr: 1 }} />
                                                <Typography>Life time technical support</Typography>
                                            </Box>
                                        </li>
                                    </ul>
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Button variant='outlined' color='success'>
                                            Buy Now
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </TabPanel>
                <TabPanel value='3' className='bg-white'>
                    <Container maxWidth="md" sx={{ mt: 4 }}>
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
                </TabPanel>
                <TabPanel value='4' className='bg-white'>
                    <Container maxWidth="md" sx={{ mt: 4 }}>
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
                </TabPanel>
            </Tabs>
        </Container>
    );
};

export default AdminAccount;

