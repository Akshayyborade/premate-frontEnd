import React from 'react';
import { Container, Row, Col,  } from 'reactstrap';

const Footer = () => {
    return (
        <footer className="footer  mt-auto" style={{
           
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
            backgroundColor: 'rgba(244, 244, 244, 0.7)',
            backdropFilter: 'blur(6px)',
            
        }}>
            <Container>
                <Row>
                    {/* Contact Information */}
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                        <p>Address: 123 School St, City, Country</p>
                    </Col>
                    {/* Quick Links */}
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Courses</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </Col>
                    {/* Social Media Links */}
                    <Col md={4}>
                        <h5>Connect With Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            {/* Bottom Footer */}
            <div className="bottom-footer text-center py-3">
                <Container>
                    <p className="mb-0">&copy; {new Date().getFullYear()} School Management System. All rights reserved.</p>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
