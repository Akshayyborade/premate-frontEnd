import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../../components/layout/NavBar/NavBar';
import './Test.css';

const Test = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <NavBar />
            <div className="test-page">
                <motion.div 
                    className="test-container"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    <h1>Practice Tests & Assessments</h1>
                    
                    <div className="test-categories">
                        {[
                            {
                                title: "Mock Tests",
                                icon: "📝",
                                description: "Practice with full-length mock exams",
                                subjects: ["Mathematics", "Science", "English", "History"]
                            },
                            {
                                title: "Quick Quizzes",
                                icon: "⚡",
                                description: "Short topic-based assessments",
                                subjects: ["Vocabulary", "Mental Math", "General Knowledge"]
                            },
                            {
                                title: "Subject Tests",
                                icon: "📚",
                                description: "Comprehensive subject-wise tests",
                                subjects: ["Physics", "Chemistry", "Biology", "Computer Science"]
                            }
                        ].map((category, index) => (
                            <motion.div 
                                key={index}
                                className="test-card"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <h2>{category.title}</h2>
                                <p>{category.description}</p>
                                <div className="subject-list">
                                    {category.subjects.map((subject, idx) => (
                                        <span key={idx} className="subject-tag">{subject}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="test-features">
                        <h2>Why Choose Our Tests?</h2>
                        <div className="features-grid">
                            {[
                                {
                                    icon: "🎯",
                                    title: "Adaptive Learning",
                                    description: "Tests adjust to your skill level"
                                },
                                {
                                    icon: "📊",
                                    title: "Detailed Analytics",
                                    description: "Get comprehensive performance reports"
                                },
                                {
                                    icon: "🔄",
                                    title: "Regular Updates",
                                    description: "New questions added frequently"
                                },
                                {
                                    icon: "📱",
                                    title: "Mobile Friendly",
                                    description: "Practice anywhere, anytime"
                                }
                            ].map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="feature-card"
                                    whileHover={{ y: -5 }}
                                >
                                    <span className="feature-icon">{feature.icon}</span>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Test; 