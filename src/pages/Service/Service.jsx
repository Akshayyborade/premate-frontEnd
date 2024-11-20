import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../components/layout/NavBar/NavBar';
import './Service.css';

const Service = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const services = [
        {
            icon: "🎓",
            title: "Academic Programs",
            description: "Comprehensive educational programs tailored to different learning levels",
            features: ["Personalized Learning", "Expert Teachers", "Interactive Content"]
        },
        {
            icon: "📚",
            title: "Digital Library",
            description: "Access to vast educational resources and study materials",
            features: ["E-books", "Research Papers", "Educational Videos"]
        },
        {
            icon: "💻",
            title: "Online Learning",
            description: "Virtual classrooms and e-learning platforms for remote education",
            features: ["Live Classes", "Recorded Sessions", "Virtual Labs"]
        },
        {
            icon: "📊",
            title: "Progress Tracking",
            description: "Detailed analytics and performance monitoring systems",
            features: ["Regular Assessments", "Performance Reports", "Growth Analytics"]
        }
    ];

    return (
        <>
            <NavBar />
            <div className="service-page">
                <motion.div 
                    className="service-container"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    <div className="service-header">
                        <h1>Our Services</h1>
                        <p>Comprehensive educational solutions for modern learning needs</p>
                    </div>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index}
                                className="service-card"
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="service-icon">{service.icon}</span>
                                <h2>{service.title}</h2>
                                <p>{service.description}</p>
                                <ul className="feature-list">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                                <button className="learn-more-btn">Learn More</button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="why-choose-us">
                        <h2>Why Choose Our Services?</h2>
                        <div className="benefits-grid">
                            {[
                                {
                                    icon: "🌟",
                                    title: "Quality Education",
                                    description: "Expert-designed curriculum and learning materials"
                                },
                                {
                                    icon: "🔄",
                                    title: "Continuous Support",
                                    description: "24/7 assistance for students and educators"
                                },
                                {
                                    icon: "📱",
                                    title: "Flexible Learning",
                                    description: "Access education anytime, anywhere"
                                },
                                {
                                    icon: "💡",
                                    title: "Innovation",
                                    description: "Latest educational technology and methods"
                                }
                            ].map((benefit, index) => (
                                <motion.div 
                                    key={index}
                                    className="benefit-card"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="benefit-icon">{benefit.icon}</span>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="service-cta">
                        <h2>Ready to Get Started?</h2>
                        <p>Join thousands of students already learning with us</p>
                        <button className="cta-button">Contact Us Today</button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Service; 