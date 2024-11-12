import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { settingsService } from '../../../../services/api/settings.service';
import Button from '../../../common/Button/Button';
import Switch from '../../../common/Switch/Switch';
import Modal from '../../../common/Modal/Modal';
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
            mobile: false
        },
        display: {
            theme: 'light',
            density: 'comfortable',
            language: 'en'
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="settings-trigger"
            >
                ⚙️ Dashboard Settings
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Dashboard Settings"
            >
                <div className="dashboard-settings">
                    <div className="settings-section">
                        <h3>Widget Visibility</h3>
                        <div className="settings-grid">
                            <Switch
                                label="Quick Actions"
                                checked={settings.widgets.quickActions}
                                onChange={(checked) => 
                                    updateSettings('widgets', 'quickActions', checked)
                                }
                            />
                            <Switch
                                label="Recent Activities"
                                checked={settings.widgets.recentActivities}
                                onChange={(checked) => 
                                    updateSettings('widgets', 'recentActivities', checked)
                                }
                            />
                            <Switch
                                label="Task Management"
                                checked={settings.widgets.taskManagement}
                                onChange={(checked) => 
                                    updateSettings('widgets', 'taskManagement', checked)
                                }
                            />
                            <Switch
                                label="System Alerts"
                                checked={settings.widgets.systemAlerts}
                                onChange={(checked) => 
                                    updateSettings('widgets', 'systemAlerts', checked)
                                }
                            />
                            <Switch
                                label="Analytics"
                                checked={settings.widgets.analytics}
                                onChange={(checked) => 
                                    updateSettings('widgets', 'analytics', checked)
                                }
                            />
                            <Switch
                                label="Calendar"
                                checked={settings.widgets.calendar}
                                onChange={(checked) => 
                                    updateSettings('widgets', 'calendar', checked)
                                }
                            />
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3>Notifications</h3>
                        <div className="settings-grid">
                            <Switch
                                label="Email Notifications"
                                checked={settings.notifications.email}
                                onChange={(checked) => 
                                    updateSettings('notifications', 'email', checked)
                                }
                            />
                            <Switch
                                label="Browser Notifications"
                                checked={settings.notifications.browser}
                                onChange={(checked) => 
                                    updateSettings('notifications', 'browser', checked)
                                }
                            />
                            <Switch
                                label="Mobile Notifications"
                                checked={settings.notifications.mobile}
                                onChange={(checked) => 
                                    updateSettings('notifications', 'mobile', checked)
                                }
                            />
                        </div>
                    </div>

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
                                <label>Language</label>
                                <select
                                    value={settings.display.language}
                                    onChange={(e) => 
                                        updateSettings('display', 'language', e.target.value)
                                    }
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="settings-actions">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            isLoading={saving}
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