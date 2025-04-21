import React, { useEffect, useState } from 'react';
import { Button, Card, Space, Typography, message } from 'antd';
import { loginSystemAdmin, isSystemAdminLoggedIn, logoutSystemAdmin } from '../utils/loginUtils';
import SystemAdminService from '../services/systemAdminService';

const { Title, Text } = Typography;

const SystemAdminLogin: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check initial login status
        setIsLoggedIn(isSystemAdminLoggedIn());
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const success = await loginSystemAdmin();
            if (success) {
                setIsLoggedIn(true);
                message.success('Successfully logged in as system admin');
            } else {
                message.error('Failed to log in');
            }
        } catch (error) {
            message.error('Error during login');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutSystemAdmin();
            setIsLoggedIn(false);
            message.success('Successfully logged out');
        } catch (error) {
            message.error('Error during logout');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTestApi = async () => {
        const systemAdminService = SystemAdminService.getInstance();
        try {
            const response = await systemAdminService.mockApiCall('/users');
            message.success('API call successful');
            console.log('API Response:', response);
        } catch (error) {
            message.error('API call failed');
            console.error(error);
        }
    };

    return (
        <Card title="System Admin Login" style={{ maxWidth: 500, margin: '20px auto' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={4}>Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}</Title>
                
                {!isLoggedIn ? (
                    <Button 
                        type="primary" 
                        onClick={handleLogin}
                        loading={loading}
                        block
                    >
                        Login as System Admin
                    </Button>
                ) : (
                    <>
                        <Button 
                            type="primary" 
                            onClick={handleTestApi}
                            block
                        >
                            Test API Call
                        </Button>
                        <Button 
                            danger 
                            onClick={handleLogout}
                            loading={loading}
                            block
                        >
                            Logout
                        </Button>
                    </>
                )}

                <Text type="secondary">
                    Mock Credentials:
                    <br />
                    Username: admin
                    <br />
                    Password: admin123
                </Text>
            </Space>
        </Card>
    );
};

export default SystemAdminLogin; 