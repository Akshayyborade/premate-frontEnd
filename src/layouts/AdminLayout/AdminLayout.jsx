import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/Sidebar/Sidebar';
import AdminHeader from '../../components/layout/Header/Header';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader />
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 