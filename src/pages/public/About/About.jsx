import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../../components/layout/NavBar/NavBar';
import founder from "../../../assets/images/pngtree-akshay.png"
import './About.css';

const About = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const team = [
        {
            name: "Akshay Borade",
            role: "Founder & Director",
            image: founder,
            description: "4+ years in educational leadership"
        },
        {
            name: "Atish Tupe",
            role: "Co-Founder",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
            description: "Expert in Full Stack Java Development"
        },
        {
            name: "Emily Rodriguez",
            role: "Technology Director",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
            description: "EdTech innovation specialist"
        },
        {
            name: "David Wilson",
            role: "Student Success Manager",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
            description: "Dedicated to student achievement"
        }
    ];

    return (
        <>
            <NavBar />
            <div className="about-page">
                <motion.div 
                    className="about-container"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    {/* Hero Section */}
                    <div className="about-hero">
                        <h1>About DnyanDeep Tutorial</h1>
                        <p className="subtitle">Empowering Education Through Innovation</p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="mission-vision">
                        <motion.div 
                            className="mission"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h2>Our Mission</h2>
                            <p>To provide accessible, quality education through innovative technology and expert guidance, empowering students to achieve their full potential.</p>
                        </motion.div>
                        <motion.div 
                            className="vision"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h2>Our Vision</h2>
                            <p>To be the leading educational platform that transforms learning experiences and creates opportunities for students worldwide.</p>
                        </motion.div>
                    </div>

                    {/* Values Section */}
                    <div className="values-section">
                        <h2>Our Core Values</h2>
                        <div className="values-grid">
                            {[
                                {
                                    icon: "🎯",
                                    title: "Excellence",
                                    description: "Striving for the highest standards in education"
                                },
                                {
                                    icon: "🤝",
                                    title: "Integrity",
                                    description: "Maintaining honesty and transparency in all interactions"
                                },
                                {
                                    icon: "💡",
                                    title: "Innovation",
                                    description: "Embracing new technologies and teaching methods"
                                },
                                {
                                    icon: "🌱",
                                    title: "Growth",
                                    description: "Fostering continuous learning and development"
                                }
                            ].map((value, index) => (
                                <motion.div 
                                    key={index}
                                    className="value-card"
                                    whileHover={{ y: -5 }}
                                >
                                    <span className="value-icon">{value.icon}</span>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="team-section">
                        <h2>Our Leadership Team</h2>
                        <div className="team-grid">
                            {team.map((member, index) => (
                                <motion.div 
                                    key={index}
                                    className="team-card"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="member-image">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                    <h3>{member.name}</h3>
                                    <p className="role">{member.role}</p>
                                    <p className="description">{member.description}</p>
                                    <div className="social-links">
                                        <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                                        <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="stats-section">
                        <div className="stats-grid">
                            {[
                                { number: "10+", label: "Years Experience" },
                                { number: "5000+", label: "Students Taught" },
                                { number: "100+", label: "Expert Teachers" },
                                { number: "95%", label: "Success Rate" }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    className="stat-card"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <h3>{stat.number}</h3>
                                    <p>{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="about-cta">
                        <h2>Join Our Educational Journey</h2>
                        <p>Be part of our growing community of learners and educators</p>
                        <button className="cta-button">Get Started Today</button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default About; 