import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import MainContent from './MainContent';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { doLogOut, getUserData, isLoggedIn } from './services/AuthServices';
import { capitalizeFirstLetter } from './services/utility';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [login , setLogin] = useState(false);
    const [mainContentComponent, setMainContentComponent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const loggedIn = isLoggedIn();
            setLogin(loggedIn);
            if (loggedIn) {
                const userData = getUserData();
                setAdmin(userData);
            } else {
                navigate('/');
            }
        };

        fetchData();
    }, [login]);

    const handleLogout = () => {
        doLogOut(() => {
            console.log('Logged out successfully');
            setLogin(false);
            navigate('/');
        });
    };
    
    return (
        <div>
            <Container fluid className='dashboard-main-admin md-12'>
                <Row md="10">
                    <Container className='head-admin background-overlay drop-shadow border-radius px-5'>
                        <Col className='logo-name-admin' md='3'>
                            <div className='logo-admin'></div>
                            <div className='name-admin'>
                                <span>{admin && capitalizeFirstLetter(admin.institutionName)}</span>  
                            </div>
                        </Col>
                        <Col className='account-admin'>
                            <div className='profile-admin'>
                                <Link><FontAwesomeIcon icon={faUser} /></Link>
                            </div>
                            <Link onClick={handleLogout}>
                                <div className='logout-admin'>
                                    Log Out <FontAwesomeIcon icon={faRightFromBracket} />
                                </div>
                            </Link>
                        </Col>
                    </Container>
                </Row>
                <Row md={10}>
                    <Container className='dashboard-admin'>
                        <Col md="3" className=' sidebar'>
                            <AdminSidebar setMainContentComponent={setMainContentComponent} />
                        </Col>
                        <Col md="9">
                            <MainContent component={mainContentComponent} setMainContentComponent={setMainContentComponent}/>
                        </Col>
                    </Container>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
