import React, { useEffect, useState } from 'react';
import MainContent from './MainContent';
import { Link, useNavigate } from 'react-router-dom';
import { doLogOut, getUserData, isLoggedIn } from './services/AuthServices';
import { capitalizeFirstLetter } from './services/utility';
import AdminSidebar2 from './AdminSlideBar2';
import { getAdminPicture } from './services/AdminServices';
import { Avatar, Button, IconButton, MenuItem, Popover, Typography } from '@mui/material';
import '../css/admin-dashboard.css';  // This imports the external CSS you just defined

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [login, setLogin] = useState(false);
    const [mainContentComponent, setMainContentComponent] = useState(null);

    // Handle popover for avatar
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = (component) => {
        setAnchorEl(null);
        setMainContentComponent(component);
    };

    // Fetching admin profile image
    const [imageURL, setImageURL] = useState(null);
    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await getAdminPicture(admin?.institutionId);
                if (response.status === 200) {
                    setImageURL(response.data.byteData); // Assuming byteData is the base64 encoded string
                } else {
                    console.error('Error fetching profile picture:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, [admin]);

    // Logout functionality
    const handleLogout = () => {
        doLogOut(() => {
            console.log('Logged out successfully');
            setLogin(false);
            navigate('/');
        });
    };

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

    return (
        <div className="dashboard-main-admin">
            <div className="toolbar-container">
                <div className="styled-element background-overlay drop-shadow">
                    <div className="flex-container" style={{ display: 'flex', justifyContent: 'space-between', minHeight: '50px' }}>
                        <Typography color='white' variant="h6" noWrap component="div">
                            {admin && capitalizeFirstLetter(admin.institutionName)}
                        </Typography>
                        <div>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar className="avatar-button" src={`data:image/jpeg;base64,${imageURL}`} />
                            </IconButton>
                            <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleMenuClose('AdminProfile')}>Profile</MenuItem>
                                <MenuItem onClick={() => handleMenuClose('AdminAccount')}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Popover>
                            <Button className="linearGradient" component={Link} to="/" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid-layout">
                <div className="sidebar-container styled-element">
                    <AdminSidebar2 setMainContentComponent={setMainContentComponent} />
                </div>
                <div className="main-content-container">
                    <MainContent component={mainContentComponent} setMainContentComponent={setMainContentComponent} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
