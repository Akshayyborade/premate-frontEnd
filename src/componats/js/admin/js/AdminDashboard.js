import React, { useEffect, useState } from 'react';
import MainContent from './MainContent';
import { Container, Row } from 'reactstrap';
import { Box, Button, Grid,Avatar, IconButton, MenuItem, Popover, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { doLogOut, getUserData, isLoggedIn } from './services/AuthServices';
import { capitalizeFirstLetter } from './services/utility';
import { ExitToApp } from '@mui/icons-material';
import AdminSidebar2 from './AdminSlideBar2';
import '../css/admin-dashboard.css';
import {  Dropdown } from '@mui/joy';
import { getAdminPicture } from './services/AdminServices';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [login, setLogin] = useState(false);
    const [mainContentComponent, setMainContentComponent] = useState(null);

    /////////////////handle popover for avatar////////////////////
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (component) => {
        setAnchorEl(null);
        setMainContentComponent(component);
    };


    /////////////////////////////////////////////

    useEffect(() => {
        const fetchData = async () => {
            const loggedIn = isLoggedIn();
            setLogin(loggedIn);
            if (loggedIn) {
                const userData = getUserData();
                setAdmin(userData);
            } else {
                navigate('/');
            }
        };

        fetchData();
    }, [login]);

    const handleLogout = () => {
        doLogOut(() => {
            console.log('Logged out successfully');
            setLogin(false);
            navigate('/');
        });
    };
    const [open, setOpen] = useState(false); // State for managing sidebar visibility
  ///////////////fetch admin profile image//////////////////////
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
      const fetchProfilePicture = async () => {
          try { 
              const response = await getAdminPicture(admin?.institutionId); // Assuming adminId is available
              console.log(response.data.byteData); 
              if (response.status === 200) { // Check for successful response
                  setImageURL(response.data.byteData); // Set imageURL with the base64 string
              } else {
                  console.error('Error fetching profile picture:', response.statusText);
              }
          } catch (error) {
              console.error('Error fetching profile picture:', error);
          }
      };

      fetchProfilePicture();
  }, []);
  /////////////////////////////////////////////////////////

    return (
        <div>
            <Container fluid className='dashboard-main-admin' style={{ display: 'flex', flexDirection: "column", gap: '2rem' }} >
                <Row className='mt-2 ' style={{ width: 'inherit', alignSelf: 'center' }}>
                    <Toolbar style={{ minHeight: '50px' }} sx={{  display: 'flex', justifyContent: 'space-between', }} className='styled-element md-10 background-color'>
                        <Box display="flex" alignItems="center" >
                            {/* Your logo component here (or an image) */}
                            <Typography color='white' variant="h6" noWrap component="div" sx={{ ml: 1 }}>
                                {admin && capitalizeFirstLetter(admin.institutionName)}
                            </Typography>
                        </Box>
                        <Grid item xs={1.3} container justify="flex-end">
                            <Dropdown>
                                <IconButton
                                    aria-label="profile"
                                    aria-controls="profile-menu"
                                    aria-haspopup="true"
                                    onClick={handleMenuOpen} // Use onClick for avatar click functionality
                                >
                                    <Avatar sizes='5' sx={{ width: 27, height: 27 }} src={`data:image/jpeg;base64,${imageURL}`}/>
                                </IconButton>
                                <Popover
                                    style={{ borderRadius: 'inherit', top:'24px', left:'-38px' }}
                                    sx={{ my: '28px' }}
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleMenuClose}
                                // Remove unnecessary onMouseEnter/onMouseLeave on Popover (handled by IconButton)
                                >
                                    <MenuItem onClick={() => handleMenuClose('AdminProfile')}>Profile</MenuItem>
                                    <MenuItem onClick={() => handleMenuClose('AdminAccount')}>My account</MenuItem>
                                    <MenuItem onClick={handleMenuClose} >Logout</MenuItem>
                                </Popover>
                            </Dropdown>

                            <Button variant="text" className='linearGradient' component={Link} to="/" onClick={handleLogout}>
                                Log Out
                                <ExitToApp  />
                            </Button>
                        </Grid>
                    </Toolbar>
                </Row>
                <Row>
                    <Grid container lg={12} sx={{ display: 'flex', gap: '2rem' }} className='my-auto'>
                        <Grid className='my-auto mt-auto styled-element background-color' item xs={2} lg={2} sx={{  maxHeight: "80vh", overflow: 'scroll', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AdminSidebar2 setMainContentComponent={setMainContentComponent} />
                        </Grid>
                        <Grid className=' styled-element ' item xs={12} lg={9.7} sx={{ backgroundColor: '#f2f2f2', maxHeight: "80vh", overflow: 'scroll', minHeight: '80vh' }}>
                            {/* Your logo and name component here */}
                            <MainContent component={mainContentComponent} setMainContentComponent={setMainContentComponent} />
                        </Grid>
                    </Grid>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
