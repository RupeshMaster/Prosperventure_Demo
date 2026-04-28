import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { services } from '../data/services';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close mobile nav and dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [location]);

  // click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-services')) {
        setDesktopServicesOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">ProspVenture</span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-nav">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Services Dropdown */}
            <div className={`nav-services ${desktopServicesOpen ? 'open' : ''}`}>
              <button
                className={`nav-services-btn ${isServicesActive ? 'active' : ''}`}
                id="services-dropdown-btn"
                aria-haspopup="true"
                aria-expanded={desktopServicesOpen}
                onClick={() => setDesktopServicesOpen(!desktopServicesOpen)}
              >
                Services
                <svg className="chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div className="services-dropdown" id="services-dropdown" role="menu">
                <div className="dropdown-arrow" aria-hidden="true" />
                <div className="dropdown-header">
                  <span>Our Services</span>
                </div>
                {services.map(service => (
                  <div
                    key={service.id}
                    className="dropdown-item"
                    role="menuitem"
                    onClick={() => navigate(`/services/${service.slug}`)}
                    id={`dropdown-${service.slug}`}
                  >
                    <div
                      className="dropdown-item-icon"
                      style={{ background: service.colorLight, color: service.color }}
                    >
                      {service.icon}
                    </div>
                    <div className="dropdown-item-info">
                      <h4>{service.name}</h4>
                      <p>{service.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="navbar-cta">
            {user ? (
              <Link to="/dashboard" className="btn-primary" id="navbar-dashboard-btn">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="nav-link" style={{ fontWeight: 600 }} id="navbar-login-btn">
                  Login
                </Link>
                <Link to="/contact" className="btn-primary" id="navbar-cta-btn">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggle"
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobile-nav">
        <div className="mobile-nav-links">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Services */}
          <div>
            <button
              className={`mobile-nav-link ${isServicesActive ? 'active' : ''}`}
              style={{ width: '100%', textAlign: 'left', background: 'none', fontFamily: 'inherit', fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer' }}
              onClick={() => setServicesOpen(!servicesOpen)}
              id="mobile-services-toggle"
            >
              Services
              <svg
                style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div className={`mobile-services-accordion ${servicesOpen ? 'open' : ''}`}>
              <div className="mobile-services-list">
                {services.map(service => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="mobile-service-item"
                    id={`mobile-${service.slug}`}
                  >
                    <span>{service.icon}</span>
                    <span>{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {user ? (
              <Link to="/dashboard" className="btn-primary" style={{ display: 'flex', justifyContent: 'center' }} id="mobile-dashboard-btn">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-outline" style={{ display: 'flex', justifyContent: 'center' }} id="mobile-login-btn">
                  Login
                </Link>
                <Link to="/contact" className="btn-primary" style={{ display: 'flex', justifyContent: 'center' }} id="mobile-cta-btn">
                  Get Started Free
                </Link>
              </>
            )}
        </div>
      </div>
    </>
  );
}
