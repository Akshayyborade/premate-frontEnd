import React, { useState } from 'react';
import { Breadcrumbs, Grid, Divider, Stack, Box, Card, Avatar, Icon, IconButton, TextField, CardContent, CardMedia, FormControlLabel, Switch, Button } from '@mui/material';
import Link from '@mui/joy/Link';
import { capitalizeFirstLetter } from './services/utility';
import { Col, Container, Row } from 'reactstrap';
import { Typography } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faMailBulk, faMapLocation, faNavicon, faSitemap, faUmbrella } from '@fortawesome/free-solid-svg-icons';
import { flexbox } from '@mui/system';
import { SocialIcon } from 'react-social-icons';
import { AddCircleOutlineOutlined, Delete, EditOutlined } from '@mui/icons-material';
import image from '../img/blogImage.jpeg'
import ImageIcon from './icon/ImageIcon';


const AdminProfile = ({ title, content, onEdit, onDelete }) => {
    //find Admin
    const admin = JSON.parse(localStorage.getItem('data'));
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [isItalic, setIsItalic] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(image);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        onEdit(editedContent, isItalic, uploadedImage); // Pass edited content, italic state, and uploaded image URL to parent component
        setEditMode(false);
      };

    const handleDeleteClick = () => {
        onDelete(); // Pass delete request to parent component
    };
    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        const storageRef = ''; // Replace with your Firebase Storage reference
        const uploadTask = storageRef.child(`blog-images/${file.name}`).put(file);
        
       const  useUpload=(uploadTask, (snapshot) => {
          // Progress handling (optional)
        }, (error) => {
          console.error(error);
        }, (downloadURL) => {
          setUploadedImage(downloadURL);
        });
      };
    

    return (
        <>
            <Container className='p-5' style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <Typography level='h3'>Profile</Typography>
                <Breadcrumbs aria-label="breadcrumbs" separator='>'>
                    {['DashBoard', 'Profile'].map((item) => (
                        <Link key={item} color="neutral" href="#basics">
                            {item}
                        </Link>
                    ))}
                    <Typography>{capitalizeFirstLetter(admin?.institutionName)}</Typography>
                </Breadcrumbs>
                <Grid container alignItems="center">
                    <Stack spacing={2} direction="row" >
                        <Stack justifyContent={'space-between'} sx={{ fontSize: 'sm', color: 'text.tertiary' }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}  >
                            <Card className='p-3 m-auto styled-element' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '100%' }}>

                                <Avatar className='mx-auto' sizes='10'></Avatar>
                                <Typography level="h3" e>{capitalizeFirstLetter(admin?.institutionName)}</Typography>
                                <Typography level='h5'>Total Students</Typography>
                                <Typography level='h4'>21</Typography>

                            </Card>
                            <Card className='p-3 styled-element' style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>



                                <Stack spacing={2} style={{ width: '100%' }}>
                                    <Typography level='h3'>About</Typography>
                                    <Grid item>
                                        <Divider style={{ backgroundColor: 'darkgray', width: '100%' }} />
                                    </Grid>
                                    <Box>{admin?.about || 'About yours organization add here'}</Box>
                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FontAwesomeIcon icon={faMapLocation} /><Box><Typography  sx={{mx:'10px'}}>{admin?.address || 'Your location'}</Typography></Box></Stack>
                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FontAwesomeIcon icon={faEnvelope} /><Box><Typography  sx={{mx:'10px'}}>{admin?.email}</Typography></Box></Stack>
                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FontAwesomeIcon icon={faGlobe} /><Box><Typography  sx={{mx:'10px'}}>{admin?.website}</Typography></Box></Stack>
                                </Stack>


                                <Stack spacing={2} style={{ width: '100%' }}>
                                    <Typography level='h3'>Social</Typography>
                                    <Grid item>
                                        <Divider style={{ backgroundColor: 'darkgray', width: '100%' }} />
                                    </Grid>
                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <Box whiteSpace={10} ><SocialIcon style={{ width: '20px' }} url="https://whatsaap.com" /></Box><Box><Typography sx={{mx:'10px'}}>{admin?.whatsaap || 'whats app number'}</Typography></Box></Stack>
                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Box whiteSpace={10}><SocialIcon style={{ width: '20px' }} url="https://facebook.com" /></Box><Box><Typography  sx={{mx:'10px'}}>{admin?.facebook || 'facebook link'}</Typography></Box></Stack>
                                    <Stack style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Box><SocialIcon style={{ width: '20px' }} url="https://instagram.com" /></Box><Box><Typography  sx={{mx:'10px'}}>{admin?.instagram || 'instagram id'}</Typography></Box></Stack>
                                </Stack>

                            </Card>
                        </Stack>
                        <Grid item>
                            <Divider orientation="vertical" flexItem style={{ height: '100%', backgroundColor: 'darkgray', width: '2px' }} />
                        </Grid>
                        <Box sx={{ fontSize: 'sm', color: 'text.tertiary', minWidth: '100%' }}>
                            <Card sx={{ mb: 3, width: '100%' }} style={{ width: '100%', minWidth: '560px' }}>
                                <CardMedia
                                    component="img"
                                    image={image}
                                    alt="Blog post image"
                                    sx={{ height: '200px' }}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {title}
                                    </Typography>
                                    {editMode ? (
                                        <TextField
                                            label="Share what you are thinking here...."
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                        />
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            {content}
                                        </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        {editMode ? (
                                            <>
                                                
                                                <IconButton onClick={handleEditClick} aria-label="cancel">
                                                    <AddCircleOutlineOutlined />
                                                </IconButton>
                                               
                                                <Button variant="contained" component="label" sx={{ mt: 1 }}>
                                                    
                                                    <ImageIcon ></ImageIcon>
                                                    Upload Image
                                                    <input type="file" hidden onChange={handleChangeImage} />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton onClick={handleEditClick} aria-label="edit">
                                                    <EditOutlined></EditOutlined>
                                                </IconButton> <Typography level={'h3'}>Post Your blog here</Typography>
                                                <IconButton onClick={handleDeleteClick} aria-label="delete">
                                                    <Delete /> {/* Replace with DeleteIcon from @mui/icons-material */}
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Stack>
                </Grid>
            </Container>
        </>
    );
}

export default AdminProfile;
