import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '400px'}}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          <p style={{marginBottom: '24px', color: '#6b7280'}}>{message}</p>
          <div className="flex gap-2 justify-end">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={onConfirm} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;