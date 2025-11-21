import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👋 Welcome, {user?.name}!</h1>
        <p>Here's your profile information</p>
      </div>
      
      <div className="page-content">
        <div className="user-profile-section">
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
              <span className="profile-badge">Active User</span>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat-card">
              <h3>Account Status</h3>
              <p>Active</p>
            </div>
            <div className="stat-card">
              <h3>Member Since</h3>
              <p>Today</p>
            </div>
            <div className="stat-card">
              <h3>Last Login</h3>
              <p>Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;