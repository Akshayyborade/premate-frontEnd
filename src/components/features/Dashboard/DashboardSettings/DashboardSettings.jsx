import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { settingsService } from '../../../../services/api/settings.service';
import Button from '../../../common/Button/Button';
import Switch from '../../../common/Switch/Switch';
import Modal from '../../../common/Modal/Modal';
import { FaCog, FaBell, FaPalette, FaEye, FaEyeSlash, FaSave, FaTimes } from 'react-icons/fa';
import './DashboardSettings.css';

const DashboardSettings = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        widgets: {
            quickActions: true,
            recentActivities: true,
            taskManagement: true,
            systemAlerts: true,
            analytics: true,
            calendar: true
        },
        notifications: {
            email: true,
            browser: true,
            mobile: false,
            sound: true,
            desktop: true
        },
        display: {
            theme: 'light',
            density: 'comfortable',
            language: 'en',
            fontSize: 'medium',
            showAvatars: true,
            showStatusIndicators: true
        },
        layout: {
            sidebarPosition: 'left',
            compactMode: false,
            showGridLines: true,
            showWidgetTitles: true
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('widgets');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await settingsService.getDashboardSettings();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await settingsService.updateDashboardSettings(settings);
            setIsOpen(false);
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setSaving(false);
        }
    };

    const updateSettings = (category, key, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    if (loading) return null;

    const tabs = [
        { id: 'widgets', label: 'Widgets', icon: <FaEye /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
        { id: 'display', label: 'Display', icon: <FaPalette /> },
        { id: 'layout', label: 'Layout', icon: <FaCog /> }
    ];

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="settings-trigger"
                icon={<FaCog />}
            >
                Dashboard Settings
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Dashboard Settings"
                className="dashboard-settings-modal"
            >
                <div className="dashboard-settings">
                    <div className="settings-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="settings-content">
                        {activeTab === 'widgets' && (
                            <div className="settings-section">
                                <h3>Widget Visibility</h3>
                                <div className="settings-grid">
                                    {Object.entries(settings.widgets).map(([key, value]) => (
                                        <div key={key} className="setting-item">
                                            <Switch
                                                label={key.split(/(?=[A-Z])/).join(' ')}
                                                checked={value}
                                                onChange={(checked) => 
                                                    updateSettings('widgets', key, checked)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="settings-section">
                                <h3>Notification Preferences</h3>
                                <div className="settings-grid">
                                    {Object.entries(settings.notifications).map(([key, value]) => (
                                        <div key={key} className="setting-item">
                                            <Switch
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                checked={value}
                                                onChange={(checked) => 
                                                    updateSettings('notifications', key, checked)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'display' && (
                            <div className="settings-section">
                                <h3>Display Settings</h3>
                                <div className="settings-grid">
                                    <div className="setting-item">
                                        <label>Theme</label>
                                        <select
                                            value={settings.display.theme}
                                            onChange={(e) => 
                                                updateSettings('display', 'theme', e.target.value)
                                            }
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="system">System</option>
                                        </select>
                                    </div>
                                    <div className="setting-item">
                                        <label>Density</label>
                                        <select
                                            value={settings.display.density}
                                            onChange={(e) => 
                                                updateSettings('display', 'density', e.target.value)
                                            }
                                        >
                                            <option value="comfortable">Comfortable</option>
                                            <option value="compact">Compact</option>
                                        </select>
                                    </div>
                                    <div className="setting-item">
                                        <label>Font Size</label>
                                        <select
                                            value={settings.display.fontSize}
                                            onChange={(e) => 
                                                updateSettings('display', 'fontSize', e.target.value)
                                            }
                                        >
                                            <option value="small">Small</option>
                                            <option value="medium">Medium</option>
                                            <option value="large">Large</option>
                                        </select>
                                    </div>
                                    <div className="setting-item">
                                        <Switch
                                            label="Show Avatars"
                                            checked={settings.display.showAvatars}
                                            onChange={(checked) => 
                                                updateSettings('display', 'showAvatars', checked)
                                            }
                                        />
                                    </div>
                                    <div className="setting-item">
                                        <Switch
                                            label="Show Status Indicators"
                                            checked={settings.display.showStatusIndicators}
                                            onChange={(checked) => 
                                                updateSettings('display', 'showStatusIndicators', checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'layout' && (
                            <div className="settings-section">
                                <h3>Layout Settings</h3>
                                <div className="settings-grid">
                                    <div className="setting-item">
                                        <label>Sidebar Position</label>
                                        <select
                                            value={settings.layout.sidebarPosition}
                                            onChange={(e) => 
                                                updateSettings('layout', 'sidebarPosition', e.target.value)
                                            }
                                        >
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                    <div className="setting-item">
                                        <Switch
                                            label="Compact Mode"
                                            checked={settings.layout.compactMode}
                                            onChange={(checked) => 
                                                updateSettings('layout', 'compactMode', checked)
                                            }
                                        />
                                    </div>
                                    <div className="setting-item">
                                        <Switch
                                            label="Show Grid Lines"
                                            checked={settings.layout.showGridLines}
                                            onChange={(checked) => 
                                                updateSettings('layout', 'showGridLines', checked)
                                            }
                                        />
                                    </div>
                                    <div className="setting-item">
                                        <Switch
                                            label="Show Widget Titles"
                                            checked={settings.layout.showWidgetTitles}
                                            onChange={(checked) => 
                                                updateSettings('layout', 'showWidgetTitles', checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="settings-actions">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            icon={<FaTimes />}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            isLoading={saving}
                            icon={<FaSave />}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DashboardSettings; 