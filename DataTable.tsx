import React, { useState } from 'react'
import type { RecordType, ColumnConfig } from '../types/dataTypes';
import Pagination from './Pagination';

interface DataTableProps {
    records: RecordType[];
    columns: ColumnConfig[];
    onEdit: (id: number) => void;
   onDelete: (id: number) => void;
   onUserClick: (user: RecordType) => void;
   selectedRecords: number[];
   onSelectRecord: (id: number) => void;
   onSelectAll: () => void;
}
type sortKey = keyof RecordType;
const DataTable : React.FC<DataTableProps> =  ({records, columns, onEdit, onDelete, onUserClick, selectedRecords, onSelectRecord, onSelectAll}) => {
    const [sortKey, setSortKey] = useState<sortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);

    const handleSort = (key: sortKey) => {
        if(sortKey === key){
            if(sortOrder === "asc") setSortOrder("desc")
                else if(sortOrder === "desc") {
            setSortKey(null);
             setSortOrder(null);
            } else setSortOrder("asc");
        } else {
    setSortKey(key);
    setSortOrder("asc")
    }
    };

    const sortedRecords = [...records].sort((a, b) => {
      if(!sortKey || !sortOrder) return 0;

      const valA = a[sortKey];
      const valB = b[sortKey];

      if(typeof valA === "string" && typeof valB === "string"){
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if(typeof valA === "number" && typeof valB === "number"){
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(records.length / recordsPerPage);

    const handlePageSizeChange = (newPageSize: number) => {
      setRecordsPerPage(newPageSize);
      setCurrentPage(1); // Reset to first page when changing page size
    };

    
  return (
    <div>
      {currentRecords.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">No records found</h3>
          <p className="empty-text">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-container">
            <table className='table-modern'>
              <thead>
                  <tr className='table-header'>
                      <th className='table-header-cell' style={{width: '50px'}}>
                        <input
                          type="checkbox"
                          checked={selectedRecords.length === records.length && records.length > 0}
                          onChange={onSelectAll}
                          style={{cursor: 'pointer'}}
                        />
                      </th>
                      {columns.filter(col => col.visible).map(column => (
                        <th key={column.key} className='table-header-cell'
                        onClick={column.sortable ? () => handleSort(column.key) : undefined}
                        style={{cursor: column.sortable ? 'pointer' : 'default'}}
                        >
                          <div className="flex items-center gap-2">
                            {column.key === 'name' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                            {column.key === 'username' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            {column.key === 'email' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            {column.key === 'status' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            {column.key === 'company' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                            {column.key === 'income' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
                            {column.key === 'city' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                            {column.key === 'phone' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                            {column.key === 'age' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                            {column.key === 'address' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                            {!['name', 'username', 'email', 'status', 'company', 'income', 'city', 'phone', 'age', 'address'].includes(column.key) && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            {column.label}
                            {column.sortable && sortKey === column.key && (
                              <span style={{color: '#3b82f6', fontWeight: 'bold'}}>
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className='table-header-cell'>
                        <div className="flex items-center gap-2">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                          Actions
                        </div>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {currentRecords.map((rec, index) => 
                  <tr key={rec.id} className='table-row'>
                      <td className='table-cell' onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRecords.includes(rec.id)}
                          onChange={() => onSelectRecord(rec.id)}
                          style={{cursor: 'pointer'}}
                        />
                      </td>
                      {columns.filter(col => col.visible).map(column => (
                        <td key={column.key} className='table-cell' onClick={() => onUserClick(rec)} style={{cursor: 'pointer'}}>
                          {column.key === 'name' && (
                            <div className="flex items-center gap-2">
                              <div style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #a855f7, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600'}}>
                                {rec.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-medium">{rec.name}</div>
                                <div className="text-xs text-gray-500">Customer</div>
                              </div>
                            </div>
                          )}
                          {column.key === 'email' && (
                            <div>
                              <div className="text-sm">{rec.email}</div>
                              <div className="text-xs text-gray-500">Primary contact</div>
                            </div>
                          )}
                          {column.key === 'status' && (
                            <span className={rec.status === 'active' ? 'status-active' : 'status-inactive'}>
                              {rec.status === 'active' ? (
                                <>
                                  <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  Active
                                </>
                              ) : (
                                <>
                                  <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                  Inactive
                                </>
                              )}
                            </span>
                          )}
                          {column.key === 'company' && (
                            <div>
                              <div className="text-sm font-medium">{rec.company}</div>
                              <div className="text-xs text-gray-500">Organization</div>
                            </div>
                          )}
                          {column.key === 'income' && (
                            <div>
                              <div className="text-sm font-medium">${rec.income?.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">Annual</div>
                            </div>
                          )}
                          {column.key === 'city' && (
                            <div>
                              <div className="text-sm font-medium">{rec.city}</div>
                              <div className="text-xs text-gray-500">Location</div>
                            </div>
                          )}
                          {column.key === 'phone' && (
                            <div>
                              <div className="text-sm font-medium">{rec.phone}</div>
                              <div className="text-xs text-gray-500">Contact</div>
                            </div>
                          )}
                          {column.key === 'age' && (
                            <div>
                              <div className="text-sm font-medium">{rec.age} years</div>
                              <div className="text-xs text-gray-500">Age</div>
                            </div>
                          )}
                          {column.key === 'username' && (
                            <div>
                              <div className="text-sm font-medium">@{rec.username}</div>
                              <div className="text-xs text-gray-500">Username</div>
                            </div>
                          )}
                          {column.key === 'address' && (
                            <div>
                              <div className="text-sm font-medium">{rec.address}</div>
                              <div className="text-xs text-gray-500">Full Address</div>
                            </div>
                          )}
                          {!['name', 'email', 'status', 'company', 'income', 'city', 'phone', 'age', 'username', 'address'].includes(column.key) && (
                            <div>
                              <div className="text-sm font-medium">{rec[column.key] || 'N/A'}</div>
                              <div className="text-xs text-gray-500">Custom Field</div>
                            </div>
                          )}
                        </td>
                      ))}
                     <td className='table-cell'>
                       <div className="table-actions">
                         <button 
                           onClick={(e) => {e.stopPropagation(); onEdit(rec.id);}}
                           className="btn btn-warning"
                           title="Edit record"
                         >
                           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                           </svg>
                         </button>
                         <button 
                           onClick={(e) => {e.stopPropagation(); onDelete(rec.id);}}
                           className="btn btn-danger"
                           title="Delete record"
                         >
                           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           </svg>
                         </button>
                       </div>
                     </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalRecords={records.length}
            recordsPerPage={recordsPerPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  )
}

export default DataTable
