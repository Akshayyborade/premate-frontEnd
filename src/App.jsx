import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/useAuth';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import LandingPage from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Dashboard/Dashboard';
import AdminRegister from './pages/Auth/Register';
import Admin from './layouts/AdminLayout/AdminLayout';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes - Place these first */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/admin-register" element={<AdminRegister />} />
                    <Route path="/login/:role" element={<Login />} />

                    {/* Protected Admin Routes - Place these last */}
                    <Route path="/admin" element={
                        <PrivateRoute role="admin">
                            <Admin />
                        </PrivateRoute>
                    }>
                        <Route path="dashboard/*" element={<AdminDashboard />} />
                    </Route>
                </Routes>

                <ToastContainer />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App; 