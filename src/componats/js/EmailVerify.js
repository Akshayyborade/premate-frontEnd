import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminEmailVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            if (!token) {
                setError('Invalid verification token');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:9095/api/auth/verify-email?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Email verification failed');
                }

                // Email verified successfully
                navigate('/login');
            } catch (error) {
                setError('Email verification failed');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [location.search, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Email verified successfully. You can now login.</div>;
};

export default AdminEmailVerification;
