import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/layout/NavBar/NavBar';
import Button from '../../../components/common/Button/Button';
import './Demo.css';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const Demo = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isPlaying, setIsPlaying] = useState(false);

    const demoSections = {
        overview: {
            title: "Platform Overview",
            videoUrl: "https://www.youtube.com/embed/pdtXWL6ppk4",
            description: "Get a complete overview of our educational management platform. See how our system streamlines administration, enhances teaching, and improves the learning experience."
        },
        admin: {
            title: "Administrative Features",
            videoUrl: "https://www.youtube.com/embed/c8_w6n8vxWE",
            description: "Explore our comprehensive administrative dashboard. Learn how to manage student records, handle admissions, track attendance, and generate detailed reports."
        },
        teacher: {
            title: "Teacher Tools",
            videoUrl: "https://www.youtube.com/embed/ZFF2Rl4pKgU",
            description: "Discover our powerful tools for teachers. Manage classes, create assignments, track student progress, and communicate with parents effectively."
        },
        student: {
            title: "Student Portal",
            videoUrl: "https://www.youtube.com/embed/qHB4nLkvxNk",
            description: "Experience the student portal interface. Access course materials, view assignments, check grades, and interact with teachers through our user-friendly platform."
        }
    };

    const [isLoading, setIsLoading] = useState(true);

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            <NavBar name="DnyanDeep Tutorial" />
            <div className="demo-page">
                <motion.div 
                    className="demo-container"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    <div className="demo-header">
                        <h1>Platform Demo</h1>
                        <p>Experience the power of our educational management system</p>
                    </div>

                    <div className="demo-content">
                        <div className="demo-navigation">
                            {Object.keys(demoSections).map((section) => (
                                <button
                                    key={section}
                                    className={`demo-nav-button ${activeSection === section ? 'active' : ''}`}
                                    onClick={() => setActiveSection(section)}
                                >
                                    {demoSections[section].title}
                                </button>
                            ))}
                        </div>

                        <div className="demo-main">
                            <div className="video-container">
                                {isLoading && (
                                    <div className="video-loader">
                                        <div className="loader-spinner"></div>
                                        <p>Loading video...</p>
                                    </div>
                                )}
                                <iframe
                                    src={demoSections[activeSection].videoUrl}
                                    title={demoSections[activeSection].title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onLoad={handleVideoLoad}
                                ></iframe>
                            </div>

                            <div className="demo-description">
                                <h2>{demoSections[activeSection].title}</h2>
                                <p>{demoSections[activeSection].description}</p>
                            </div>

                            <div className="feature-highlights">
                                <h3>Key Features Demonstrated</h3>
                                <div className="features-grid">
                                    {[
                                        {
                                            icon: "📊",
                                            title: "Real-time Analytics",
                                            description: "Track performance metrics instantly"
                                        },
                                        {
                                            icon: "📱",
                                            title: "Mobile Responsive",
                                            description: "Access from any device"
                                        },
                                        {
                                            icon: "🔒",
                                            title: "Secure Access",
                                            description: "Role-based permissions"
                                        },
                                        {
                                            icon: "📈",
                                            title: "Progress Tracking",
                                            description: "Monitor student development"
                                        }
                                    ].map((feature, index) => (
                                        <motion.div 
                                            key={index}
                                            className="feature-card"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <span className="feature-icon">{feature.icon}</span>
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="demo-cta">
                        <h3>Ready to Get Started?</h3>
                        <p>Transform your educational institution today</p>
                        <div className="cta-buttons">
                            <Link to="/admin-register">
                                <Button className="button-start">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button className="button-outline">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Demo; 