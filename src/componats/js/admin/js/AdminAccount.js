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

    styled,
    Container


} from '@mui/material';

import { useNavigate } from 'react-router-dom'; // For navigation after update

// Replace with your authentication service
import { updateAdminProfile, changeAdminPassword, doLogOut } from './services/AuthServices';
import { Col, Form, Row } from 'reactstrap';
import { Link, Tab, TabList, TabPanel, Tabs, Typography, } from '@mui/joy';
import { ArrowRightOutlined, CameraOutlined, SaveOutlined } from '@ant-design/icons';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { getAdminData } from './services/AdminServices';

import AdminAccountGeneral from './adminAccount/adminAccountGeneral';
import AdminAccountPrice from './adminAccount/adminAccountPrice';
import AdminAccountSecurity from './adminAccount/adminAccountSecurity';
import AdminAccountNotification from './adminAccount/adminAccountNotification';


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
    const [imageURL, setImageURL] = useState(null); // State for image URL

    const fetchAdminData = async () => {
        // Retrieve admin ID (adapt this based on your logic)
        const adminId = localStorage.getItem('adminId');
    
        try {
          const response = await getAdminData(adminId); // Replace with your API call
          console.log(response);
          setAdminData(response); // Update admin data state
    
          if (response.status === 401) {
            // Handle unauthorized case (e.g., logout)
          } else {
            // Retrieve profile picture using base64 encoding (adjust if needed)
            const base64Image = response.data.base64Image; // Assuming response includes base64Image
    
            if (base64Image) {
              const imageURL = `data:image/jpeg;base64,${base64Image}`;
              setImageURL(imageURL);
              
            } else {
              // Handle case where profile picture is not available
              console.warn('Profile picture not found in admin data');
            }
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
        }
      };
    
      useEffect(() => {
        fetchAdminData();
      }, []);
    console.log(adminData);

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
                {adminData && <AdminAccountGeneral adminData={adminData} />}

                </TabPanel>
                <TabPanel value='2' className='bg-white'>
                    <AdminAccountPrice/>
                </TabPanel>
                <TabPanel value='3' className='bg-white'>
                {adminData && <AdminAccountSecurity adminData={adminData} />}
                </TabPanel>
                <TabPanel value='4' className='bg-white'>
                    <AdminAccountNotification/>
                </TabPanel>
            </Tabs>
        </Container>
    );
};

export default AdminAccount;

