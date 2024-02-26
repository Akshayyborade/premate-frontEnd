import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import heroimg from '../img/Project-Management-Office.png';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../css/landing.css';
//test 



const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <NavBar name="DnyanDeep Tutorial" />
      <div
        className={`landing-page ${isLoading ? 'loading' : 'loaded'}`}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
          backgroundColor: 'rgba(244, 244, 244, 0.7)',
          backdropFilter: 'blur(6px)',
          marginTop: '1rem',
        }}
      >
        {/* Hero Section */}
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <h1>Welcome to Our School Management Platform</h1>
              <p>
                Explore the comprehensive features of our platform tailored to
                streamline every aspect of school or institution management. From
                student enrollment to academic planning, we've got you covered.
                Start optimizing your school's operations today.
              </p>
              <Link to="/admin-register" style={{ textDecoration: 'none' }}>
                <Button style={{ width: '150px', backgroundColor: 'green' }}>
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col lg="6">
              <img src={heroimg} alt="Hero Image" style={{ maxWidth: '100%', height: 'auto' }} />
            </Col>
          </Row>
        </Container>

        {/* Features Section */}
        <section className="features-section">
          <Container>
            <Row>
              <Col md="4">
                <h2>Feature 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Col>
              <Col md="4">
                <h2>Feature 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Col>
              <Col md="4">
                <h2>Feature 3</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <Container>
            <Row>
              <Col>
                <h2>Ready to streamline your school's operations?</h2>
                <Button color="success" size="lg">
                  Sign Up Now
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
