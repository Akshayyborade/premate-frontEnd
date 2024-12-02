import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../../components/layout/NavBar/NavBar';
import Button from '../../components/common/Button/Button';
import heroimg from '../../assets/images/Project-Management-Office.png';

import './Landing.css';
import { useAuth } from '../../hooks/useAuth';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Landing = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     if (isAuthenticated()) {
    //         navigate('/admin/dashboard');
    //     }
    //     setIsLoading(false);
    // }, [isAuthenticated, navigate]);

    return (
        <>
            <NavBar name="DnyanDeep Tutorial" />
            <div className="landing-page loaded">
                <div className="container">
                    {/* Hero Section */}
                    <motion.section 
                        className="hero"
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                    >
                        <div className="hero-content">
                            <motion.h1 
                                className="hero-title"
                                variants={fadeInUp}
                            >
                                Transform Your Educational Institution with Smart Management
                            </motion.h1>
                            <motion.p 
                                className="hero-description"
                                variants={fadeInUp}
                            >
                                Experience a revolutionary approach to educational management with our all-in-one platform. 
                                We combine powerful tools for administrators, educators, and students to create a seamless 
                                learning environment.
                            </motion.p>
                            <motion.div 
                                className="hero-buttons"
                                variants={fadeInUp}
                            >   
                                <Link to="/admin-register">
                                    <Button className="button-start">
                                        Get Started
                                    </Button>
                                </Link>
                                
                                <Link to="/demo">
                                    <Button className="button-demo">
                                        Watch Demo
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div 
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={heroimg} alt="Hero" />
                        </motion.div>
                    </motion.section>

                    {/* Features Section */}
                    <motion.section 
                        className="features"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp}>Why Choose Our Platform?</motion.h2>
                        <div className="features-grid">
                            {[
                                {
                                    icon: "fas fa-graduation-cap",
                                    title: "Academic Excellence",
                                    description: "Comprehensive tools for curriculum planning, assessment tracking, and performance analytics."
                                },
                                {
                                    icon: "fas fa-users",
                                    title: "Streamlined Administration",
                                    description: "Efficient management of admissions, attendance, schedules, and resources."
                                },
                                {
                                    icon: "fas fa-chart-line",
                                    title: "Data-Driven Insights",
                                    description: "Advanced analytics and reporting tools to make informed decisions."
                                },
                                {
                                    icon: "fas fa-shield-alt",
                                    title: "Secure & Compliant",
                                    description: "Enterprise-grade security and compliance with educational standards."
                                }
                            ].map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="feature-card"
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <i className={feature.icon}></i>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* How It Works Section */}
                    <motion.section 
                        className="how-it-works"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp}>How It Works</motion.h2>
                        <div className="timeline">
                            {[
                                {
                                    step: 1,
                                    title: "Register Your Institution",
                                    description: "Simple onboarding process with guided setup"
                                },
                                {
                                    step: 2,
                                    title: "Customize Your Platform",
                                    description: "Configure settings to match your needs"
                                },
                                {
                                    step: 3,
                                    title: "Start Managing",
                                    description: "Begin using powerful tools and features"
                                }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="timeline-item"
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="timeline-number">{item.step}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Stats Section */}
                    <motion.section 
                        className="stats"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <div className="stats-grid">
                            {[
                                { number: "1000+", label: "Schools" },
                                { number: "50,000+", label: "Students" },
                                { number: "95%", label: "Satisfaction Rate" },
                                { number: "24/7", label: "Support" }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    className="stat-item"
                                    variants={fadeInUp}
                                >
                                    <motion.h3
                                        initial={{ scale: 0.5 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        {stat.number}
                                    </motion.h3>
                                    <p>{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Testimonials Section */}
                    <motion.section 
                        className="testimonials"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp}>What Our Users Say</motion.h2>
                        <div className="testimonials-grid">
                            {[
                                {
                                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300",
                                    quote: "This platform has revolutionized how we manage our institution.",
                                    name: "Sarah Johnson",
                                    role: "Principal, ABC School"
                                },
                                {
                                    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300",
                                    quote: "The analytics tools have helped us make data-driven decisions.",
                                    name: "Michael Chen",
                                    role: "Administrator, XYZ Academy"
                                },
                                {
                                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&h=300",
                                    quote: "Outstanding support team and regular feature updates.",
                                    name: "Emily Rodriguez",
                                    role: "Director, Future Institute"
                                }
                            ].map((testimonial, index) => (
                                <motion.div 
                                    key={index}
                                    className="testimonial-card"
                                    variants={fadeInUp}
                                    whileHover={{ y: -10 }}
                                >
                                    <img src={testimonial.image} alt={testimonial.name} />
                                    <p>"{testimonial.quote}"</p>
                                    <h4>{testimonial.name}</h4>
                                    <p className="designation">{testimonial.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Integration Partners Section */}
                    <motion.section 
                        className="integrations"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp}>Trusted By Leading Institutions</motion.h2>
                        <div className="partners-grid">
                            {[
                                "https://via.placeholder.com/150x50/ffffff/000000?text=Partner+1",
                                "https://via.placeholder.com/150x50/ffffff/000000?text=Partner+2",
                                "https://via.placeholder.com/150x50/ffffff/000000?text=Partner+3",
                                "https://via.placeholder.com/150x50/ffffff/000000?text=Partner+4"
                            ].map((logo, index) => (
                                <motion.img 
                                    key={index}
                                    src={logo}
                                    alt={`Partner ${index + 1}`}
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.1 }}
                                />
                            ))}
                        </div>
                    </motion.section>

                    {/* Enhanced CTA Section */}
                    <motion.section 
                        className="cta"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="cta-content">
                            <h2>Ready to Transform Your Institution?</h2>
                            <p>Join the growing community of forward-thinking educational institutions.</p>
                            <div className="cta-buttons">
                                <Button className="button-start">Start Free Trial</Button>
                                <Button className="button-outline">Contact Sales</Button>
                            </div>
                            <div className="trust-badges">
                                <span>🔒 Secure & Compliant</span>
                                <span>⭐ 4.9/5 Rating</span>
                                <span>🏆 Award-winning Support</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* Copyright Section */}
                    <div className="copyright">
                        <p>© {new Date().getFullYear()} Premate.io. Developed by Akshay Borade. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;