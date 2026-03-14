import React, { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useFirebase();
  const [settings, setSettings] = useState({
    siteName: 'AFS Admin',
    emailNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save to Firebase
    toast.success('Settings saved successfully');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>General Settings</h3>
          <div className="form-group">
            <label>Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-card">
          <h3>Notifications</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              Email Notifications
            </label>
            <label>
              <input
                type="checkbox"
                name="orderAlerts"
                checked={settings.orderAlerts}
                onChange={handleChange}
              />
              New Order Alerts
            </label>
            <label>
              <input
                type="checkbox"
                name="lowStockAlerts"
                checked={settings.lowStockAlerts}
                onChange={handleChange}
              />
              Low Stock Alerts
            </label>
          </div>
        </div>

        <div className="settings-card">
          <h3>Admin Profile</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Last Login:</strong> {user?.metadata?.lastSignInTime}</p>
        </div>
      </div>

      <button onClick={handleSave} className="save-settings-btn">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;