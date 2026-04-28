import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Users, LogOut, LayoutDashboard, Home, Menu } from 'lucide-react';
import '../../styles/Components.css';
import '../../styles/Pages.css';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['user', 'admin', 'superadmin'] },
    { name: 'Contact Submissions', path: '/dashboard/contacts', icon: <Mail size={20} />, roles: ['admin', 'superadmin'] },
    { name: 'User Management', path: '/dashboard/users', icon: <Users size={20} />, roles: ['superadmin'] },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      <div
        className={`dashboard-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ height: '80px', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid var(--border-color)' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            ProspVenture
          </Link>
        </div>

        <div style={{ padding: '24px', flex: 1 }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 8px' }}>
            Menu
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.filter(item => item.roles.includes(user?.role)).map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px',
                    background: active ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                    color: active ? 'var(--gold-400)' : 'var(--text-secondary)',
                    fontWeight: active ? 600 : 500,
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' } }}
                >
                  {item.icon} {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User Card */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-400), var(--teal-600))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', transition: '0.2s', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--rose-400)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="dashboard-mobile-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600 }}>
              {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <Link to="/" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Home size={16} /><span className="hide-on-mobile">Back to Home</span>
          </Link>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
