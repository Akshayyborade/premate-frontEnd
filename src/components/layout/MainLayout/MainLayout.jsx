import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import MobileMenu from '../MobileMenu/MobileMenu';
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleSidebarToggle = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className={`main-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Header onMenuClick={handleSidebarToggle} />
            
            {isMobile ? (
                <MobileMenu 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                />
            ) : (
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}
            
            <main className="main-content">
                <Breadcrumbs />
                <div className="content-wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default MainLayout; 