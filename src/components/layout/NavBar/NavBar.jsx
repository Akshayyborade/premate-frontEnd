import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';
import logo from '../../../assets/images/logo.png';
import './NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogin = (type) => {
        navigate(`/login/${type}`);
    };

    const loginOptions = [
        { label: 'Teacher', onClick: () => handleLogin('teacher') },
        { label: 'Student', onClick: () => handleLogin('student') },
        { label: 'Admin', onClick: () => handleLogin('admin') }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Link>

                <button 
                    className="navbar-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggle-icon"></span>
                </button>

                <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">Home</Link>
                        <Link to="/test" className="navbar-item">Test</Link>
                        <Link to="/service" className="navbar-item">Service</Link>
                        <Link to="/about" className="navbar-item">About Us</Link>
                        <Link to="/contact" className="navbar-item">Contact Us</Link>
                    </div>

                    <div className="navbar-end">
                        <Dropdown
                            trigger={<Button variant="outline">Login</Button>}
                            items={loginOptions}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar; 