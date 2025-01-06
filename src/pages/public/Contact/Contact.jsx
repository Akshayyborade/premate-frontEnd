import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../../components/layout/NavBar/NavBar';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        setSubmitStatus('success');
        // Reset form after submission
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <NavBar />
            <div className="edu-contact-page">
                <motion.div 
                    className="edu-contact-container"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    <div className="edu-contact-header">
                        <h1>Contact Us</h1>
                        <p>Get in touch with us for any questions or inquiries</p>
                    </div>

                    <div className="edu-contact-content">
                        {/* Contact Information */}
                        <div className="edu-contact-info">
                            <div className="edu-info-card">
                                <i className="fas fa-map-marker-alt"></i>
                                <h3>Visit Us</h3>
                                <p>Premate.Edu Pvt Ltd</p>
                                <p>manjarli, badlapur</p>
                                <p>thane, Maharashtra 411001</p>
                            </div>
                            <div className="edu-info-card">
                                <i className="fas fa-phone"></i>
                                <h3>Call Us</h3>
                                <p>+91 7722055914</p>
                                <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
                            </div>
                            <div className="edu-info-card">
                                <i className="fas fa-envelope"></i>
                                <h3>Email Us</h3>
                                <p>info@premate.com</p>
                                <p>support@premate.com</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="edu-contact-form-container">
                            <form onSubmit={handleSubmit} className="edu-contact-form">
                                <div className="edu-form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="edu-form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="edu-form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="edu-form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                    ></textarea>
                                </div>
                                <button type="submit" className="edu-submit-btn">Send Message</button>
                                {submitStatus === 'success' && (
                                    <div className="edu-success-message">
                                        Message sent successfully!
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="edu-map-section">
                        <h2>Find Us</h2>
                        <div className="edu-map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60299.45038988569!2d73.20247179952595!3d19.163920306828196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ed5c9bc71bbd%3A0x87d539b0621850f3!2sBadlapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1734325656077!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    {/* FAQ Section */}
                    <div className="edu-faq-section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="edu-faq-grid">
                            {[
                                {
                                    question: "What are your operating hours?",
                                    answer: "We are open Monday through Saturday, 9:00 AM to 6:00 PM."
                                },
                                {
                                    question: "How can I enroll in a course?",
                                    answer: "You can enroll through our website or visit our center during operating hours."
                                },
                                {
                                    question: "Do you offer online classes?",
                                    answer: "Yes, we offer both online and offline classes to suit your needs."
                                },
                                {
                                    question: "What payment methods do you accept?",
                                    answer: "We accept all major credit cards, UPI, and bank transfers."
                                }
                            ].map((faq, index) => (
                                <motion.div 
                                    key={index}
                                    className="edu-faq-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h3>{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="edu-social-section">
                        <h2>Connect With Us</h2>
                        <div className="edu-social-links">
                            <a href="#" className="edu-social-link"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="edu-social-link"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="edu-social-link"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="edu-social-link"><i className="fab fa-linkedin"></i></a>
                            <a href="#" className="edu-social-link"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Contact; 