import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/contacts`);
      setContacts(res.data.data);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}/status`, { status });
      fetchContacts();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="contact-form-wrapper" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>Contact Submissions</h2>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Date</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Name & Email</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Service</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: 500 }}>{contact.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{contact.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{contact.phone}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>{contact.service || 'general'}</span>
                </td>
                <td style={{ padding: '16px 24px', maxWidth: '300px' }}>
                  <p style={{ fontSize: '0.9rem', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={contact.message}>
                    {contact.message}
                  </p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <select 
                    value={contact.status} 
                    onChange={(e) => updateStatus(contact._id, e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No submissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
