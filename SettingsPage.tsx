import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const renderProfileSettings = () => (
    <div className="settings-section">
      <h3>Profile Information</h3>
      <div className="settings-form">
        <div className="form-field">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            defaultValue={user?.name}
            className="input-modern"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            defaultValue={user?.email}
            className="input-modern"
            placeholder="Enter your email"
          />
        </div>
        <button className="btn btn-primary">Update Profile</button>
      </div>
    </div>
  );

  const renderPasswordSettings = () => (
    <div className="settings-section">
      <h3>Change Password</h3>
      <div className="settings-form">
        <div className="form-field">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="input-modern"
            placeholder="Enter current password"
          />
        </div>
        <div className="form-field">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="input-modern"
            placeholder="Enter new password"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="input-modern"
            placeholder="Confirm new password"
          />
        </div>
        <button className="btn btn-primary">Change Password</button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      
      <div className="page-content">
        <div className="settings-tabs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
          >
            Profile Settings
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`settings-tab ${activeTab === 'password' ? 'active' : ''}`}
          >
            Change Password
          </button>
        </div>
        
        <div className="settings-content">
          {activeTab === 'profile' ? renderProfileSettings() : renderPasswordSettings()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;