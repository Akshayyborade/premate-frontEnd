import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import MobileMenu from '../MobileMenu/MobileMenu';
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <Sidebar />
            <MobileMenu />
            <main className="main-content">
                <Breadcrumbs />
                {children}
            </main>
        </div>
    );
};

export default MainLayout; 