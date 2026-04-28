import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import AdminContacts from './pages/dashboard/AdminContacts';
import SuperAdminUsers from './pages/dashboard/SuperAdminUsers';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Shared Layout for main website pages (Navbar + Footer)
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <ScrollToTop />
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main Website Flow */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
          <Route path="/services/:slug" element={<MainLayout><ServiceDetail /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          
          {/* Auth Flow */}
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

          {/* Secure Dashboard Flow */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
                <Route path="contacts" element={<AdminContacts />} />
              </Route>
              
              {/* Super Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
                <Route path="users" element={<SuperAdminUsers />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={
            <MainLayout>
              <div style={{
                minHeight: '80vh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'column', gap: '24px',
                paddingTop: '80px', textAlign: 'center', padding: '80px 24px 24px',
              }}>
                <span style={{ fontSize: '4rem' }}>🔍</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700 }}>
                  Page Not Found
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                  The page you're looking for doesn't exist. Let's get you back on track.
                </p>
                <a href="/" className="btn-primary">Go Back Home</a>
              </div>
            </MainLayout>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
