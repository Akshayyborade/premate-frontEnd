import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import MainContent from './MainContent';
import { Container, Row, Col } from 'reactstrap';
import { AppBar, Box, Button, Drawer, Grid, IconButton, Menu, MenuItem, Popover, Toolbar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { doLogOut, getUserData, isLoggedIn } from './services/AuthServices';
import { capitalizeFirstLetter } from './services/utility';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import AdminSidebar2 from './AdminSlideBar2';
import '../css/admin-dashboard.css';
import { Dropdown } from '@mui/joy';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [login, setLogin] = useState(false);
    const [mainContentComponent, setMainContentComponent] = useState(null);

    ///handle profile section
    const componants=[
        {name: 'profile', component: 'AdminProfile'},
        { name: 'account', component: 'AdminAccount'}

        
    ]

    

    /////////////////////////////////////
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (component) => {
        setAnchorEl(null);
        setMainContentComponent(component);
    };


    ////////////////////////

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

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Container fluid className='dashboard-main-admin' style={{ display: 'flex', flexDirection: "column", gap: '0.5rem' }} >
                <Row className='mt-2 ' style={{ width: 'inherit', alignSelf: 'center' }}>
                    <Toolbar style={{ minHeight: '50px' }} sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', }} className='styled-element md-10'>
                        <Box display="flex" alignItems="center" >
                            {/* Your logo component here (or an image) */}
                            <Typography color='' variant="h6" noWrap component="div" sx={{ ml: 1 }}>
                                {admin && capitalizeFirstLetter(admin.institutionName)}
                            </Typography>
                        </Box>
                        <Grid item xs={1.3} container justify="flex-end">
                            <Dropdown>
                                <IconButton
                                    aria-label="profile"
                                    aria-controls="profile-menu"
                                    aria-haspopup="true"
                                    onMouseEnter={handleMenuOpen}
                                    onMouseLeave={handleMenuClose}
                                    
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Popover
                                     style={{left:"-95px", borderRadius:'inherit'}}
                                    sx={{ my: '28px' }}
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleMenuClose}
                                    onMouseEnter={handleMenuOpen}
                                    onMouseLeave={handleMenuClose}

                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',


                                    }}
                                // transformOrigin={{
                                //     vertical: 'top',
                                //     horizontal: 'center',
                                // }}
                                >
                                    <MenuItem onClick={()=>handleMenuClose('AdminProfile')}>Profile</MenuItem>
                                    <MenuItem onClick={()=>handleMenuClose('AdminAccount')}>My account</MenuItem>
                                    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                                </Popover>
                            </Dropdown>
                            <Button variant="text" color='success' component={Link} to="/" onClick={handleLogout}>
                                Log Out
                                <ExitToApp />
                            </Button>
                        </Grid>
                    </Toolbar>
                </Row>
                <Row>
                    <Grid container lg={12} sx={{ display: 'flex', gap: '0.5rem' }} className='my-auto'>
                        <Grid className='my-auto mt-auto styled-element' item xs={2} lg={2} sx={{ backgroundColor: 'white', maxHeight: "80vh", overflow: 'scroll', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AdminSidebar2 setMainContentComponent={setMainContentComponent} />
                        </Grid>
                        <Grid className='my-auto styled-element ' item xs={12} lg={9.9} sx={{backgroundColor: 'white', maxHeight: "80vh", overflow: 'scroll', minHeight: '80vh'}}>
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
