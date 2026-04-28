import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`);
      setUsers(res.data.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update role');
      fetchUsers(); // reset select visually if it failed
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="contact-form-wrapper" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>User Management</h2>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Joined</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>User Details</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Current Role</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {u.name} {u._id === currentUser._id && <span className="badge badge-gold" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>YOU</span>}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span className={`badge ${u.role === 'superadmin' ? 'badge-gold' : u.role === 'admin' ? 'badge-teal' : ''}`} style={{ fontSize: '0.75rem' }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <select 
                    value={u.role} 
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    disabled={u._id === currentUser._id}
                    title={u._id === currentUser._id ? "You cannot change your own role" : "Change user role"}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.85rem', cursor: u._id === currentUser._id ? 'not-allowed' : 'pointer' }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
