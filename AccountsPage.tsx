import React from 'react';
import type { RecordType } from '../types/dataTypes';

interface AccountsPageProps {
  records: RecordType[];
}

const AccountsPage: React.FC<AccountsPageProps> = ({ records }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👥 All Accounts</h1>
        <p>Manage all your customer accounts ({records.length} total)</p>
      </div>
      
      <div className="page-content">
        <div className="accounts-grid">
          {records.map((record) => (
            <div key={record.id} className="account-item-card">
              <div className="account-item-header">
                <div className="account-item-avatar">
                  {record.name.charAt(0).toUpperCase()}
                </div>
                <div className="account-item-info">
                  <h3>{record.name}</h3>
                  <p className="account-item-email">{record.email}</p>
                </div>
              </div>
              
              <div className="account-item-details">
                <div className="detail-row">
                  <span className="detail-label">Company:</span>
                  <span className="detail-value">{record.company}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Username:</span>
                  <span className="detail-value">@{record.username}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{record.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{record.address}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${record.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                    {record.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;