import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import TokenRefresher from './components/features/Auth/TokenRefresher/TokenRefresher';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import LandingPage from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import AdminRegister from './pages/Auth/Register';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import 'react-toastify/dist/ReactToastify.css';
import DashboardHome from './pages/Admin/Dashboard/DashboardHome';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Demo from './pages/Demo/Demo';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Test from './pages/Test/Test';
import Service from './pages/Service/Service';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/admin-register" element={<AdminRegister />} />
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path='/test' element={<Test/>}/>
                    <Route path='/services' element={<Service/>}/>
                    {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
                    {/* <Route path="/terms-of-service" element={<TermsOfService />} /> */}
                    {/* Protected Admin Routes */}
                    <Route 
                        path="/admin/*" 
                        element={
                            <PrivateRoute 
                                role="ADMIN"
                                redirectTo="/login/admin"
                            >
                                <AdminLayout>
                                   
                                    <Dashboard></Dashboard>
                                </AdminLayout>
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ToastContainer />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App; 