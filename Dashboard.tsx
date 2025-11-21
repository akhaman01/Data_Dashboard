import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";
import DataTable from "./DataTable";
import type { RecordType, ColumnConfig } from "../types/dataTypes";
import RecordForm from "./RecordForm";
import Modal from "./Modal";
import ColumnManager from "./ColumnManager";
import UserDetailsModal from "./UserDetailsModal";
import ToastContainer from "./ToastContainer";
import ConfirmModal from "./ConfirmModal";
import Sidebar from "./Sidebar";
import HomePage from "./HomePage";
import AccountsPage from "./AccountsPage";
import SettingsPage from "./SettingsPage";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [data, setData] = useState<RecordType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState<string>("");

  const [statusFilter, setStatusfilter] = useState<string>("All");

  const [editRecord, setEditRecord] = useState<RecordType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isColumnManagerOpen, setIsColumnManagerOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<RecordType | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState<boolean>(false);
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [toasts, setToasts] = useState<Array<{id: string, type: 'success' | 'error' | 'warning' | 'info', message: string}>>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [columns, setColumns] = useState<ColumnConfig[]>(() => {
    const savedColumns = localStorage.getItem('columnConfig');
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return [
      { key: 'name', label: 'Name', visible: true, sortable: true },
      { key: 'username', label: 'Username', visible: false, sortable: true },
      { key: 'email', label: 'Email', visible: true, sortable: true },
      { key: 'status', label: 'Status', visible: true, sortable: true },
      { key: 'company', label: 'Company', visible: false, sortable: true },
      { key: 'income', label: 'Income', visible: false, sortable: true },
      { key: 'city', label: 'City', visible: false, sortable: true },
      { key: 'phone', label: 'Phone', visible: false, sortable: false },
      { key: 'age', label: 'Age', visible: false, sortable: true },
      { key: 'address', label: 'Address', visible: false, sortable: false },
    ];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.getItem('loanDashboardData');
        if (savedData) {
          setData(JSON.parse(savedData));
          setLoading(false);
          return;
        }

        const res = await axios.get<RecordType[]>(
          "https://jsonplaceholder.typicode.com/users"
        );

        const mappedData: RecordType[] = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          username: item.username,
          email: item.email,
          status: item.id % 2 === 0 ? "active" : "inactive",
          company: item.company?.name || `Company ${item.id}`,
          income: Math.floor(Math.random() * 100000) + 30000,
          city: item.address?.city || 'Unknown',
          phone: item.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
          age: Math.floor(Math.random() * 40) + 25,
          address: `${item.address?.street || ''} ${item.address?.suite || ''}, ${item.address?.city || ''} ${item.address?.zipcode || ''}`.trim(),
        }));

        setData(mappedData);
        localStorage.setItem('loanDashboardData', JSON.stringify(mappedData));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('loanDashboardData', JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('columnConfig', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showToast('success', `Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`);
  };

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleColumnToggle = (key: keyof RecordType) => {
    setColumns(prev => prev.map(col => 
      col.key === key ? { ...col, visible: !col.visible } : col
    ));
  };



  const handleUserClick = (user: RecordType) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  const handleSelectRecord = (id: number) => {
    setSelectedRecords(prev => 
      prev.includes(id) ? prev.filter(recordId => recordId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRecords(selectedRecords.length === filteredData.length ? [] : filteredData.map(r => r.id));
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      setData(prev => prev.filter(record => !selectedRecords.includes(record.id)));
      showToast('success', `${selectedRecords.length} records deleted successfully`);
    } else if (bulkAction === 'activate') {
      setData(prev => prev.map(record => 
        selectedRecords.includes(record.id) ? {...record, status: 'active'} : record
      ));
      showToast('success', `${selectedRecords.length} records activated`);
    } else if (bulkAction === 'deactivate') {
      setData(prev => prev.map(record => 
        selectedRecords.includes(record.id) ? {...record, status: 'inactive'} : record
      ));
      showToast('success', `${selectedRecords.length} records deactivated`);
    }
    setSelectedRecords([]);
    setBulkAction('');
  };

  const exportSelectedData = () => {
    const selectedData = data.filter(record => selectedRecords.includes(record.id));
    const headers = ["ID", "Name", "Email", "Status", "Company", "Income"];
    const rows = selectedData.map((item) => [
      item.id, item.name, item.email, item.status, item.company, item.income
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8" + 
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "selected-records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', `${selectedRecords.length} records exported successfully`);
  };

  if (loading) {
    return <Loader />;
  }

  const filteredData = data.filter((item) => {
    const searchItem =
      item.name.includes(search) || item.email.includes(search);
    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    return searchItem && matchStatus;
  });

  const exportCsvData = () => {
    const headers = ["ID", "Name", "Email", "Status"];
    const rows = data.map((item) => [
      item.id,
      item.name,
      item.email,
      item.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8" +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'All records exported successfully');
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Sidebar activeSection={currentPage} onSectionChange={setCurrentPage} />
      <div className="main-with-sidebar">
      {currentPage === 'dashboard' && (
        <>
          {/* Header */}
          <div className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">
              💼 Data Dashboard
            </h1>
            <p className="header-subtitle">Manage and analyze your loan records with modern interface</p>
          </div>
          <div className="stats">
            <div className="stat-item">
              <p className="stat-label">Total Records</p>
              <p className="stat-value">{data.length}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Active</p>
              <p className="stat-value active">
                {data.filter(r => r.status === 'active').length}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isDarkMode ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"} />
              </svg>
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="btn btn-secondary"
              style={{marginLeft: '12px'}}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Add New Record Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-record-btn"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Record
        </button>

        {/* Controls Section */}
        <div className="modern-card">
          <div className="card-content">
            <div className="card-header">
              <h2 className="card-title">🔧 Controls & Filters</h2>
              <div className="flex items-center gap-2">
                {selectedRecords.length > 0 && (
                  <>
                    <select
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                      className="select-modern"
                      style={{minWidth: '150px'}}
                    >
                      <option value="">Bulk Actions ({selectedRecords.length})</option>
                      <option value="delete">🗑️ Delete Selected</option>
                      <option value="activate">✅ Activate Selected</option>
                      <option value="deactivate">❌ Deactivate Selected</option>
                    </select>
                    <button
                      onClick={handleBulkAction}
                      disabled={!bulkAction}
                      className="btn btn-warning"
                    >
                      Apply
                    </button>
                    <button
                      onClick={exportSelectedData}
                      className="btn btn-info"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export Selected
                    </button>
                  </>
                )}
                <button
                  onClick={exportCsvData}
                  className="btn btn-success"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>
                
                <div className="menu-button" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="dots-btn"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="dropdown-menu">
                      <button
                        onClick={() => {
                          setIsColumnManagerOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="dropdown-item"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2z" />
                        </svg>
                        Manage Columns
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="controls-grid">
              {/* Search Input */}
              <div className="search-container">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="search-input"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="clear-btn"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusfilter(e.target.value)}
                className="select-modern"
              >
                <option value="All">🔍 All Status</option>
                <option value="active">✅ Active Only</option>
                <option value="inactive">❌ Inactive Only</option>
              </select>
            </div>

            {/* Edit Form - Only show when editing */}
            {editRecord && (
              <RecordForm
                records={data}
                setData={setData}
                editRecord={editRecord}
                setEditRecord={setEditRecord}
              />
            )}
          </div>
        </div>

          {/* Data Table */}
          <div className="modern-card overflow-hidden">
            <div className="card-header" style={{background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', padding: '24px 32px', borderBottom: '1px solid #e5e7eb'}}>
              <div className="flex items-center justify-between">
                <h2 className="card-title flex items-center gap-2">
                  📊 Records Overview ({filteredData.length})
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  {search && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Filtered by: "{search}"
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DataTable
              records={filteredData}
              columns={columns}
              onEdit={(id) => {
                const rec = data.find((r) => r.id === id);
                if (rec) setEditRecord(rec); 
              }}
              onDelete={(id) => {
                setData(data.filter((r) => r.id !== id));
                showToast('success', 'Record deleted successfully');
              }}
              onUserClick={handleUserClick}
              selectedRecords={selectedRecords}
              onSelectRecord={handleSelectRecord}
              onSelectAll={handleSelectAll}
            />
          </div>
        </div>
        </>
      )}
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'accounts' && <AccountsPage records={filteredData} />}
      {currentPage === 'settings' && <SettingsPage />}

      {/* Add Record Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="➕ Add New Record"
      >
        <RecordForm
          records={data}
          setData={setData}
          editRecord={null}
          setEditRecord={setEditRecord}
          onSuccess={() => {
            setIsModalOpen(false);
            showToast('success', 'Record added successfully');
          }}
        />
      </Modal>

      {/* Column Manager */}
      <ColumnManager
        isOpen={isColumnManagerOpen}
        onClose={() => setIsColumnManagerOpen(false)}
        columns={columns}
        onColumnToggle={handleColumnToggle}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={isUserDetailsOpen}
        onClose={() => setIsUserDetailsOpen(false)}
        user={selectedUser}
      />

        {/* Toast Container */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        
        {/* Logout Confirmation */}
        <ConfirmModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            logout();
            setShowLogoutConfirm(false);
          }}
          title="Confirm Logout"
          message="Are you sure you want to logout?"
        />
      </div>
    </div>
  );
};

export default Dashboard;
