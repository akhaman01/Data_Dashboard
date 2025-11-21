import React from 'react';
import type { RecordType } from '../types/dataTypes';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: RecordType | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="column-manager-overlay" onClick={onClose}>
      <div className="column-manager-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '600px'}}>
        <div className="column-manager-header">
          <h3 className="column-manager-title">👤 User Details</h3>
          <button className="column-manager-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="column-manager-body">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Name
              </label>
              <div className="text-sm font-medium">{user.name}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Username
              </label>
              <div className="text-sm font-medium">@{user.username}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </label>
              <div className="text-sm font-medium">{user.email}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Status
              </label>
              <span className={user.status === 'active' ? 'status-active' : 'status-inactive'}>
                {user.status === 'active' ? '✅ Active' : '❌ Inactive'}
              </span>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company
              </label>
              <div className="text-sm font-medium">{user.company}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Income
              </label>
              <div className="text-sm font-medium">${user.income?.toLocaleString()}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                City
              </label>
              <div className="text-sm font-medium">{user.city}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </label>
              <div className="text-sm font-medium">{user.phone}</div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Age
              </label>
              <div className="text-sm font-medium">{user.age} years</div>
            </div>
            
            <div className="form-field" style={{gridColumn: '1 / -1'}}>
              <label className="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Address
              </label>
              <div className="text-sm font-medium">{user.address}</div>
            </div>
          </div>
          
          <div className="column-manager-footer">
            <button onClick={onClose} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;