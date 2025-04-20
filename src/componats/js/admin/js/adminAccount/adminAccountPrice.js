import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography } from "@mui/joy";
import { Box, Button, Container, Grid, Paper, SvgIcon } from "@mui/material";

const AdminAccountPrice =()=>{
    return(
        <Container maxWidth="lg" sx={{ mt: 4 }}>
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
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>2 team members</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>1000+ components</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>1 month free updates</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
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
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>2 team members</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>1000+ components</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>1 month free updates</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
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
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>2 team members</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>1000+ components</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
                                                <Typography>1 month free updates</Typography>
                                            </Box>
                                        </li>
                                        <li>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SvgIcon component={ArrowRightOutlined} sx={{ mr: 1 }} />
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
    )
}
export default AdminAccountPrice;