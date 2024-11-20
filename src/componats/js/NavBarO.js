import logo from '../logo.png';
import '../css/NavBar.css';
import React, { useState } from 'react';
import Login from './Login';

function NavBar(SchoolName) {
    const [loginType, setLoginType] = useState(null);

    const openLoginModal = (type) => {
        setLoginType(type);
    };

    const closeLoginModal = () => {
        setLoginType(null);
    };
    return (
        <div className="NavBar">
            <nav>
                <div class="logo">
                    <img src={logo} className="Logo" alt="logo" />
                </div>
                <div class="nav">
                    <ul class="nav-list">
                        <li><a class="active" href="#">Home</a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Service</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li>
                            <div className="dropdown">
                                <button className="dropbtn">Login
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className="dropdown-content">
                                    <a href="#" onClick={() => openLoginModal('teacher')}>Teacher</a>
                                    <a href="#" onClick={() => openLoginModal('student')}>Student</a>
                                    <a href="#" onClick={() => openLoginModal('admin')}>Admin</a>
                                </div>
                            </div>
                        </li>

                    </ul>


                </div>
            </nav>
            {loginType && <Login loginType={loginType} onClose={closeLoginModal} />}
        </div>
    );
}

export default NavBar;
