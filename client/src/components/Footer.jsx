import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function Footer() {
  const serviceLinks = services.map(s => ({ label: s.name, to: `/services/${s.slug}` }));

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ marginBottom: 0 }}>
              <span className="logo-text">ProspVenture</span>
            </Link>
            <p>
              Your trusted partner for comprehensive business solutions. 
              We deliver excellence across logistics, insurance, real estate, 
              taxation, finance, and content services.
            </p>
            <div className="footer-socials">
              {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                <a key={i} href="#" className="social-btn" id={`social-${i}`} aria-label={`Social link ${i}`}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              {quickLinks.map(link => (
                <Link key={link.to} to={link.to} className="footer-link">
                  <span style={{ color: 'var(--gold-400)', fontSize: '0.6rem' }}>▶</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Services</h4>
            <div className="footer-links">
              {serviceLinks.map(link => (
                <Link key={link.to} to={link.to} className="footer-link">
                  <span style={{ color: 'var(--gold-400)', fontSize: '0.6rem' }}>▶</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <p>123 Business Hub,<br />Mumbai, Maharashtra 400001</p>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📞</div>
              <p>+91 98765 43210<br />+91 81234 56789</p>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <p>hello@prospventure.in<br />support@prospventure.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ProspVenture. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link" id="footer-privacy">Privacy Policy</a>
          <a href="#" className="footer-bottom-link" id="footer-terms">Terms of Service</a>
          <a href="#" className="footer-bottom-link" id="footer-cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
