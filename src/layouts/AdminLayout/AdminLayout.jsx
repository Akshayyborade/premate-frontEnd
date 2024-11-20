import React from 'react';
import AdminSidebar from '../../components/layout/Sidebar/Sidebar';
import AdminHeader from '../../components/layout/Header/Header';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader />
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 