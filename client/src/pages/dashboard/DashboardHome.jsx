import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHome() {
  const { user, deleteAccount } = useAuth();
  const [myContacts, setMyContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/contact/my`)
        .then(res => setMyContacts(res.data.data))
        .catch(err => console.error("Error fetching contacts", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div>
      <div className="contact-form-wrapper" style={{ padding: '32px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '16px' }}>Welcome, {user?.name}!</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          This is your ProspVenture {user?.role} dashboard. From here, you can manage your account and access platform features. 
          {user?.role === 'user' && " We are currently processing your recent inquiries. Our specialists will contact you shortly."}
          {user?.role === 'admin' && " You have access to view and manage all incoming contact submissions from clients."}
          {user?.role === 'superadmin' && " You have full system access, including user management and platform configuration."}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' }}>
        <div className="contact-info-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Profile Details</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}><strong>Name:</strong> {user?.name}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}><strong>Email:</strong> {user?.email}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}><strong>Role:</strong> <span className="badge badge-teal">{user?.role}</span></p>
          
          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  deleteAccount().catch(err => alert('Failed to delete account.'));
                }
              }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: '0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)' }}
            >
              Delete Account
            </button>
          </div>
        </div>
        
        {user?.role !== 'user' && (
          <div className="contact-info-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>System Status</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}><strong>API:</strong> Online</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}><strong>Database:</strong> Connected</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}><strong>Environment:</strong> Production ready</p>
          </div>
        )}
      </div>

      {user?.role === 'user' && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '16px' }}>My Service Requests</h3>
          <div className="contact-form-wrapper" style={{ padding: '0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Service</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message Snippet</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center' }}>Loading...</td></tr>
                ) : myContacts.length === 0 ? (
                  <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>You haven't submitted any service requests yet.</td></tr>
                ) : (
                  myContacts.map(c => (
                    <tr key={c._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{c.service || 'general'}</span>
                      </td>
                      <td style={{ padding: '16px 24px', maxWidth: '200px' }}>
                        <p style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{c.message}</p>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          fontSize: '0.8rem', fontWeight: 600, padding: '4px 8px', borderRadius: '4px',
                          background: c.status === 'resolved' ? 'rgba(52, 211, 153, 0.1)' : c.status === 'in-progress' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(56, 189, 248, 0.1)',
                          color: c.status === 'resolved' ? '#34D399' : c.status === 'in-progress' ? '#F59E0B' : '#38BDF8'
                        }}>
                          {c.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
