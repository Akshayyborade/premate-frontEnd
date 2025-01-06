import React from 'react';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import TokenRefresher from './components/features/Auth/TokenRefresher/TokenRefresher';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import LandingPage from './pages/public/Landing/Landing';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import AdminRegister from './pages/Auth/Register';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import 'react-toastify/dist/ReactToastify.css';
import DashboardHome from './pages/Admin/Dashboard/DashboardHome';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Demo from './pages/public/Demo/Demo';
import Contact from './pages/public/Contact/Contact';
import About from './pages/public/About/About';
import Test from './pages/public/Test/Test';
import Service from './pages/public/Service/Service';
import Unauthorized from './pages/Auth/UnauthorizedPage'
// Import necessary routing components from react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/admin-register" element={<AdminRegister />} />
                    <Route path="/test" element={<Test/>} />
                    <Route path="/services" element={<Service />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/demo" element={<Demo/>}/>
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Protected Admin Routes */}
                    <Route
                        path="/admin/*"
                        element={
                            <PrivateRoute role="ADMIN" redirectTo="/login/admin">
                                <AdminLayout>
                                    <Dashboard />
                                </AdminLayout>
                            </PrivateRoute>
                        }
                    />

                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ToastContainer />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;