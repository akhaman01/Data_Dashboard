import { useEffect, useState } from "react";
import type { RecordType } from "../types/dataTypes";

interface Props {
  records: RecordType[];
  setData: React.Dispatch<React.SetStateAction<RecordType[]>>;
  editRecord: RecordType | null;
  setEditRecord: React.Dispatch<React.SetStateAction<RecordType | null>>;
  onSuccess?: () => void;
}

const RecordForm: React.FC<Props> = ({ records, setData, editRecord, setEditRecord, onSuccess }) => {
  const [form, setForm] = useState<RecordType>({
    id: 0,
    name: "",
    username: "",
    email: "",
    status: "active",
    company: "",
    income: 0,
    city: "",
    phone: "",
    age: 0,
    address: "",
  });

  useEffect(() => {
    if (editRecord) {
      setForm(editRecord);
    }
  }, [editRecord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) return;

    if (editRecord) {
      const updated = records.map((rec) =>
        rec.id === editRecord.id ? { ...rec, ...form } : rec
      );
      setData(updated);
      setEditRecord(null);
    } else {
      const newRecord = { 
        ...form, 
        id: Date.now(),
        username: form.username || `user${Date.now()}`,
        company: form.company || `Company ${Date.now()}`,
        income: form.income || Math.floor(Math.random() * 100000) + 30000,
        city: form.city || 'New York',
        phone: form.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        age: form.age || 30,
        address: form.address || 'Address not provided'
      };
      setData([...records, newRecord]);
      onSuccess?.();
    }

    setForm({ id: 0, name: "", username: "", email: "", status: "active", company: "", income: 0, city: "", phone: "", age: 0, address: "" });
  };

  return (
    <div className={editRecord ? "form-section" : ""}>
      <div className="form-header">
        <div className="form-title">
          <div className={`form-icon ${editRecord ? 'edit' : 'add'}`}>
            {editRecord ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </div>
          <div>
            <div className="card-title">
              {editRecord ? 'Edit Record' : 'Add New Record'}
            </div>
            <div className="text-sm text-gray-500">
              {editRecord ? 'Update existing customer information' : 'Create a new customer record'}
            </div>
          </div>
        </div>
        
        {editRecord && (
          <button
            type="button"
            onClick={() => {
              setEditRecord(null);
              setForm({ id: 0, name: "", username: "", email: "", status: "active", company: "", income: 0, city: "", phone: "", age: 0, address: "" });
            }}
            style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s'}}
            title="Cancel editing"
            onMouseOver={(e) => {e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = '#f3f4f6';}}
            onMouseOut={(e) => {e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'none';}}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter customer's full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-modern"
              required
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username || ''}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="input-modern"
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="customer@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-modern"
              required
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Account Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive"})}
              className="select-modern"
            >
              <option value="active">✅ Active Account</option>
              <option value="inactive">❌ Inactive Account</option>
            </select>
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Company
            </label>
            <input
              type="text"
              name="company"
              placeholder="Company name"
              value={form.company || ''}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="input-modern"
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Annual Income
            </label>
            <input
              type="number"
              name="income"
              placeholder="Annual income"
              value={form.income || ''}
              onChange={(e) => setForm({ ...form, income: Number(e.target.value) })}
              className="input-modern"
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city || ''}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="input-modern"
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number (10 digits)"
              value={form.phone || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setForm({ ...form, phone: value });
                }
              }}
              className="input-modern"
              maxLength={10}
              pattern="[0-9]{10}"
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age || ''}
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
              className="input-modern"
              min="18"
              max="100"
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#9ca3af'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Full address"
              value={form.address || ''}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="input-modern"
            />
          </div>
        </div>
        
        <div className="form-footer">
          <div className="text-sm text-gray-500">
            {editRecord ? 'Updating existing record' : 'All fields are required'}
          </div>
          
          <div className="form-actions">
            {editRecord && (
              <button
                type="button"
                onClick={() => {
                  setEditRecord(null);
                  setForm({ id: 0, name: "", username: "", email: "", status: "active", company: "", income: 0, city: "", phone: "", age: 0, address: "" });
                }}
                className="btn btn-secondary"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {editRecord ? (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Update Record
                </>
              ) : (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Record
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;