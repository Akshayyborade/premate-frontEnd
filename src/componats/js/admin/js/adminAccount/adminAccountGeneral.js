import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { UploadIcon } from '../icon/UploadIcon';
import { capitalizeFirstLetter } from '../services/utility';
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import { Save } from '@mui/icons-material';
import { getAdminPicture, setAdmin } from '../services/AdminServices';

const AdminAccountGeneral = ({ adminData }) => {
    // State for profile picture
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [imageURL, setImageURL] = useState(null);
    // State for selected image
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // State for updated admin data
    const [updatedAdmin, setUpdatedAdmin] = useState(adminData.data || {
        profilePicture: null,
        address: {}});
   
    ///fetch Admin profile picture
    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
              const response = await getAdminPicture(updatedAdmin?.institutionId); // Assuming adminId is available
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
      
        
     


    // Log selectedFile whenever it changes
    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);

    // Function to handle form field changes
    const handleFieldChange = (event) => {
        const { id, value } = event.target;
        setUpdatedAdmin((prevAdminData) => ({
            ...prevAdminData,
            [id]: value,
        }));
    };

    const handleAddressChange = (event) => {
        const { id, value } = event.target;
        const updatedAddress = { ...updatedAdmin.address, [id]: value };
        setUpdatedAdmin((prevState) => ({
            ...prevState,
            address: updatedAddress,
        }));
    };
    console.log(updatedAdmin);
    // Function to update admin data
    const handleUpdateAdmin = async () => {
        const formData = new FormData();

        // Add updated admin data to formData
        for (const key in updatedAdmin) {
            if (key !== 'profilePicture') {
                formData.append(key,updatedAdmin[key]);
              

            }
          }
        // Add selected image if available
       
        console.log(formData);

        try {
            if(selectedFile!==null){
            formData.append('profilePicture', selectedFile);
            // Perform API call to update admin data
            const response = await setAdmin(updatedAdmin?.institutionId, formData);
            
            if (response.ok) {
                const updatedData = await response.json();
                setUpdatedAdmin(updatedData);
                toast.success('Admin profile updated successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                });
            } else {
                console.error('Error updating admin:', response.statusText);
                toast.error('Error updating admin profile!', {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        }
        } catch (error) {
            console.error('Error updating admin:', error);
            toast.error('Error updating admin profile!', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" level="h4" gutterBottom>
                General Settings
            </Typography>
            <form>
                <Row>
                    <Col md={4}>
                        <Paper sx={{ minHeight: '350px', display: 'flex', alignItems: 'center', padding: '15px', justifyContent: 'center' }}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box component="span" className="component-image MuiBox-root css-fnjgej mx-auto" position="relative">
                                    <IconButton
                                        aria-label="upload picture"
                                        component="label"
                                        onMouseEnter={handleOpen}
                                        onMouseLeave={handleClose}
                                    >
                                        <input
                                            name='profilePicture'
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleFileSelect}
                                        />
                                        <Avatar
                                            alt="avatar"
                                            sx={{ width: 100, height: 100 }}
                                            // src={
                                                
                                            // }
                                            src={
                                                selectedFile // Prioritize selected image if available
                                                  ? URL.createObjectURL(selectedFile)
                                                  : `data:image/jpeg;base64,${imageURL}` // Otherwise, use the fetched profile picture
                                              }
                                        />
                                        <Backdrop
                                            sx={{
                                                zIndex: (theme) => theme.zIndex.modal + 2,
                                                position: 'absolute',
                                                top: '8px',
                                                left: '9px',
                                                width: '100px',
                                                height: '100px',
                                                color: '#fff',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '100%',
                                            }}
                                            open={open}
                                            onClose={handleClose}
                                            onMouseEnter={handleOpen}
                                            onMouseLeave={handleClose}
                                        >
                                            <Stack direction="column" alignItems="center" className="p-1">
                                                <UploadIcon />
                                                <Typography color="white">Update Photo</Typography>
                                            </Stack>
                                        </Backdrop>
                                    </IconButton>
                                </Box>
                                <Box display={'flex'} alignContent={'center'} maxWidth={250}>
                                    <Typography variant="caption" align="center">
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        max size of 3 Mb
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Col>
                    <Col md={8}>
                        <Paper sx={{ display: 'flex', gap: '20px', flexDirection: 'column', padding: '30px', width: '100%' }}>
                            <Row>
                                <Col style={{ display: 'flex', flexDirection: 'column', gap: '27px' }}>
                                    <TextField
                                        required
                                        id="institutionName"
                                        placeholder="Institution Name"
                                        size="small"
                                        value={capitalizeFirstLetter(updatedAdmin?.institutionName || '')}
                                        onChange={handleFieldChange}
                                    />
                                    <TextField
                                        required
                                        id="ownerName"
                                        placeholder="Owner Name"
                                        size="small"
                                        value={updatedAdmin?.ownerName || ''}
                                        onChange={handleFieldChange}
                                    />
                                    <TextField
                                        required
                                        id="email"
                                        placeholder="Email"
                                        size="small"
                                        value={updatedAdmin?.email || ''}
                                        onChange={handleFieldChange}
                                    />
                                    <TextField
                                        required
                                        id="phone"
                                        placeholder="Phone"
                                        size="small"
                                        value={updatedAdmin?.phone || ''}
                                        onChange={handleFieldChange}
                                    />
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                    <TextField
                                        required
                                        id="area"
                                        placeholder="Area"
                                        size="small"
                                        value={updatedAdmin?.address?.area || ''}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        required
                                        id="city"
                                        placeholder="City"
                                        size="small"
                                        value={updatedAdmin?.address?.city || ''}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        required
                                        id="state"
                                        placeholder="State"
                                        size="small"
                                        value={updatedAdmin?.address?.state || ''}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        required
                                        id="zip"
                                        placeholder="Pincode"
                                        size="small"
                                        value={updatedAdmin?.address?.zip || ''}
                                        onChange={handleAddressChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ display: 'flex', gap: '25px', justifyContent: 'space-between' }}>
                                    <TextField
                                        required
                                        id="about"
                                        placeholder="About"
                                        multiline
                                        maxRows={4}
                                        value={updatedAdmin?.about || ''}
                                        onChange={handleFieldChange}
                                    />
                                    <Button variant="outlined" color="success" endIcon={<Save />} style={{ maxHeight: '50px' }} onClick={handleUpdateAdmin}>
                                        Save Changes
                                    </Button>
                                </Col>
                            </Row>
                        </Paper>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default AdminAccountGeneral;
