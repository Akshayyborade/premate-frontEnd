import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from '../logo.png';
import zIndex from '@mui/material/styles/zIndex';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // Function to navigate to the appropriate login route
    const handleLogin = (type) => {
        navigate(`/login/${type}`);
    };

    return (
       <div>
            <Navbar className="NavBar" light expand="md" style={{
                display: 'flex',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                backgroundColor: 'white',
                backdropFilter: 'blur(6px)',
                paddingTop: '3px', paddingBottom: '3px', zIndex:1
                
            }}>
                <NavbarBrand>
                    <img
                        src={logo}
                        className="Logo"
                        alt="logo"
                        style={{
                            height: 45,
                            width: 65
                        }}
                    />
                </NavbarBrand>

                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto ms-auto" navbar>
                        <NavItem>
                            <NavLink href="#" className="active">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Test</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Service</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Contact Us</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Login
                            </DropdownToggle>
                            <DropdownMenu right style={{zIndex:1}} >
                                {/* Call handleLogin with appropriate type */}
                                <DropdownItem onClick={() => handleLogin('teacher')}>Teacher</DropdownItem>
                                <DropdownItem onClick={() => handleLogin('student')}>Student</DropdownItem>
                                <DropdownItem onClick={() => handleLogin('admin')}>Admin</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                
            </Navbar>
       </div>
    );
}

export default NavBar;

