import React from 'react';
import type { ColumnConfig, RecordType } from '../types/dataTypes';

interface ColumnManagerProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  onColumnToggle: (key: keyof RecordType) => void;
}

const ColumnManager: React.FC<ColumnManagerProps> = ({ isOpen, onClose, columns, onColumnToggle }) => {

  if (!isOpen) return null;



  return (
    <div className="column-manager-overlay" onClick={onClose}>
      <div className="column-manager-content" onClick={(e) => e.stopPropagation()}>
        <div className="column-manager-header">
          <h3 className="column-manager-title">Manage Columns</h3>
          <button className="column-manager-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="column-manager-body">
          <p className="column-manager-desc">Select which columns to display in the table:</p>

          <div className="column-list">
            {columns.map((column) => (
              <label key={column.key} className="column-item">
                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => onColumnToggle(column.key)}
                  className="column-checkbox"
                />
                <span className="column-label">{column.label}</span>
              </label>
            ))}
          </div>
          <div className="column-manager-footer">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={onClose} className="btn btn-primary">
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnManager;