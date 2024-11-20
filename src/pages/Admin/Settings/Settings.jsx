import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        general: {
            siteName: 'EduAdmin Dashboard',
            siteDescription: 'Educational Management System',
            timezone: 'UTC+0',
            language: 'en',
            maintenanceMode: false
        },
        notifications: {
            emailNotifications: true,
            pushNotifications: true,
            smsNotifications: false,
            newsletterUpdates: true
        },
        security: {
            twoFactorAuth: false,
            passwordExpiry: '90',
            sessionTimeout: '30',
            ipWhitelist: ''
        },
        appearance: {
            theme: 'light',
            sidebarColor: '#1a237e',
            fontSize: 'medium',
            showAnimations: true
        }
    });

    const handleSettingChange = (category, setting, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: value
            }
        }));
    };

    const handleSave = () => {
        // API call to save settings
        console.log('Saving settings:', settings);
    };

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>System Settings</h1>
                <button className="save-btn" onClick={handleSave}>
                    Save Changes
                </button>
            </div>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <div className="settings-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            Notifications
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            Security
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            Appearance
                        </button>
                    </div>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' && (
                        <div className="settings-section">
                            <h2>General Settings</h2>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Site Name</label>
                                    <input
                                        type="text"
                                        value={settings.general.siteName}
                                        onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Site Description</label>
                                    <textarea
                                        value={settings.general.siteDescription}
                                        onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Timezone</label>
                                    <select
                                        value={settings.general.timezone}
                                        onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                                    >
                                        <option value="UTC+0">UTC+0</option>
                                        <option value="UTC+1">UTC+1</option>
                                        <option value="UTC+2">UTC+2</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.general.maintenanceMode}
                                            onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                                        />
                                        Maintenance Mode
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h2>Notification Preferences</h2>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.notifications.emailNotifications}
                                            onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                                        />
                                        Email Notifications
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.notifications.pushNotifications}
                                            onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                                        />
                                        Push Notifications
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.notifications.smsNotifications}
                                            onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                                        />
                                        SMS Notifications
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <h2>Security Settings</h2>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.security.twoFactorAuth}
                                            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                                        />
                                        Two-Factor Authentication
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Password Expiry (days)</label>
                                    <input
                                        type="number"
                                        value={settings.security.passwordExpiry}
                                        onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Session Timeout (minutes)</label>
                                    <input
                                        type="number"
                                        value={settings.security.sessionTimeout}
                                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <h2>Appearance Settings</h2>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Theme</label>
                                    <select
                                        value={settings.appearance.theme}
                                        onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Font Size</label>
                                    <select
                                        value={settings.appearance.fontSize}
                                        onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                                    >
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.appearance.showAnimations}
                                            onChange={(e) => handleSettingChange('appearance', 'showAnimations', e.target.checked)}
                                        />
                                        Show Animations
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings; 