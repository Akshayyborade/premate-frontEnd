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
import { Col, Container, Form, Row } from 'reactstrap';
import { Link, Tab, TabList, TabPanel, Tabs, Typography, } from '@mui/joy';
import { ArrowRightAlt, PhotoCamera, Save } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {UploadIcon} from '../icon/UploadIcon';
import { capitalizeFirstLetter } from '../services/utility';



const AdminAccountGeneral=(adminData)=>{
    console.log(adminData.adminData)
    //set profile picture/////
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    }
    //profile image upload
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };




    //////////////////////////////////////////////////////
    return(
        <><Typography variant="h4" level='h4' gutterBottom>
            General Settings
        </Typography><Form>
                <Unstable_Grid2 container spacing={3}>

                    <Grid2 md={4}>
                        <Paper style={{ minHeight: '350px', display: 'flex', alignItems: 'center', padding: '15px', justifyContent: 'center' }}>

                            <Box display={'flex'} flexDirection={'column'}>

                                <Box component="span" className="component-image MuiBox-root css-fnjgej mx-auto" position="relative">
                                    <IconButton
                                        aria-label="upload picture"
                                        component="label"
                                        onMouseEnter={handleOpen}
                                        onMouseLeave={handleClose}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleFileSelect} />
                                        <Avatar
                                            alt="avatar"
                                            sx={{ width: 100, height: 100 }}
                                            src={selectedFile ? URL.createObjectURL(selectedFile) : 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'} />
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
                                            <Stack direction="column" alignItems="center" className='p-1'>
                                                <UploadIcon />
                                                <Typography color='white'>Update Photo</Typography>
                                            </Stack>
                                        </Backdrop>
                                    </IconButton>



                                </Box>
                                <Box display={'flex'} alignContent={'center'} maxWidth={250}>
                                    <Typography variant='caption' align='center'>
                                        Allowed *.jpeg, *.jpg, *.png, *.gif

                                        max size of 3 Mb
                                    </Typography>
                                </Box>

                            </Box>



                        </Paper>
                    </Grid2>


                    <Grid2 display={'flex'} alignItems={'center'} md={8}>
                        <Paper style={{ display: 'flex', gap: '20px', flexDirection: 'column', padding: '30px', width: '100%' }}>
                            <Row style={{ display: 'flex', }}>
                                <Col style={{ display: 'flex', flexDirection: 'column', gap: '27px' }}>
                                    <TextField
                                        required
                                        id="outlined-required"

                                        placeholder='Institution Name'
                                        size='small'
                                        value={capitalizeFirstLetter(adminData?.adminData?.institutionName || '')} />
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='Owner Name'
                                        size='small'
                                        value={adminData?.adminData?.owenerName || 'add owner name'} />
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='Email'
                                        size='small'
                                        value={adminData?.adminData?.email} />
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='Phone'
                                        size='small'
                                        value={adminData?.adminData?.phone || 'add phone'} />

                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='Area'
                                        size='small'
                                        value={adminData?.adminData?.address?.area || 'add area here'} />
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='City'
                                        size='small'
                                        value={adminData?.adminData?.address?.city || 'add your city here'} />

                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='State'
                                        size='small'
                                        value={adminData?.adminData?.address?.state || 'add state here'} />
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='Pincode'
                                        size='small'
                                        value={adminData?.adminData?.address?.zip || 'add pin code here'} />
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{ display: 'flex', gap: '25px', justifyContent: 'space-between' }}>
                                    <TextField
                                        required
                                        id="outlined-required"

                                        defaultValue=""
                                        placeholder='About'
                                        multiline
                                        maxRows={4}
                                        value={adminData?.adminData?.about || 'add about your organization'} />
                                    <Button variant='outlined' color='success' endIcon={<Save />} style={{ maxHeight: '50px' }}>
                                        Save Changes
                                    </Button>
                                </Col>

                            </Row>


                        </Paper>
                    </Grid2>




                </Unstable_Grid2>

            </Form></>
    )
}
export default AdminAccountGeneral;