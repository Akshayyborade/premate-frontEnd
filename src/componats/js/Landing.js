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
    }, 200);
  }, []);

  return (
    <>
      <NavBar name="DnyanDeep Tutorial" />
      <div
        className={`landing-page ${isLoading ? 'loading' : 'loaded'}`}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
          backgroundColor:'white',
          marginTop: '1rem',
        }}
      >
        {/* Hero Section - Updated content */}
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <h1 className="hero-title">Transform Your Educational Institution with Smart Management</h1>
              <p className="hero-description">
                Experience a revolutionary approach to educational management with our all-in-one platform. 
                We combine powerful tools for administrators, educators, and students to create a seamless 
                learning environment. Join hundreds of institutions already benefiting from our solution.
              </p>
              <div className="hero-buttons">
                <Link to="/admin-register" style={{ textDecoration: 'none', marginRight: '15px' }}>
                  <Button style={{ width: '150px', backgroundColor: 'green' }}>
                    Get Started
                  </Button>
                </Link>
                <Link to="/demo" style={{ textDecoration: 'none' }}>
                  <Button style={{ width: '150px' }} color="secondary">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg="6">
              <img src={heroimg} alt="Hero Image" style={{ maxWidth: '100%', height: 'auto' }} />
            </Col>
          </Row>
        </Container>

        {/* Features Section - Updated content */}
        <section className="features-section py-5">
          <Container>
            <h2 className="text-center mb-5">Why Choose Our Platform?</h2>
            <Row>
              <Col md="4">
                <div className="feature-card">
                  <i className="fas fa-graduation-cap mb-3"></i>
                  <h3>Academic Excellence</h3>
                  <p>Comprehensive tools for curriculum planning, assessment tracking, and performance analytics to drive student success.</p>
                </div>
              </Col>
              <Col md="4">
                <div className="feature-card">
                  <i className="fas fa-users mb-3"></i>
                  <h3>Streamlined Administration</h3>
                  <p>Efficient management of admissions, attendance, schedules, and resources all in one integrated platform.</p>
                </div>
              </Col>
              <Col md="4">
                <div className="feature-card">
                  <i className="fas fa-chart-line mb-3"></i>
                  <h3>Data-Driven Insights</h3>
                  <p>Advanced analytics and reporting tools to make informed decisions and track institutional progress.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Stats Section - New Addition */}
        <section className="stats-section py-5 bg-light">
          <Container>
            <Row>
              <Col md="3" className="text-center">
                <h3>1000+</h3>
                <p>Schools</p>
              </Col>
              <Col md="3" className="text-center">
                <h3>50,000+</h3>
                <p>Students</p>
              </Col>
              <Col md="3" className="text-center">
                <h3>95%</h3>
                <p>Satisfaction Rate</p>
              </Col>
              <Col md="3" className="text-center">
                <h3>24/7</h3>
                <p>Support</p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Call to Action Section - Updated */}
        <section className="cta-section py-5">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md="8">
                <h2>Ready to Transform Your Institution?</h2>
                <p className="mb-4">Join the growing community of forward-thinking educational institutions.</p>
                <Button color="success" size="lg" className="me-3">
                  Start Free Trial
                </Button>
                <Button color="outline-success" size="lg">
                  Contact Sales
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
