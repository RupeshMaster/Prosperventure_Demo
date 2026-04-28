import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import '../styles/Pages.css';
import '../styles/Components.css';

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main>
      {/* Banner */}
      <section
        className="animated-bg"
        style={{ padding: '140px 0 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div className="orb orb-gold" style={{ top: '-100px', left: '-100px', opacity: 0.12 }} />
        <div className="orb orb-teal" style={{ bottom: '-80px', right: '-60px', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-gold">What We Offer</span>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700, margin: '20px 0 20px', lineHeight: 1.2
          }}>
            Comprehensive Services for <br />
            <span className="gradient-text">Every Business Need</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto' }}>
            Six powerful service verticals, hundreds of experts, and one unified platform 
            working together to drive your success.
          </p>
        </div>
      </section>

      {/* All Services Cards */}
      <section className="section-padding">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-bg" />
            <span className="badge badge-gold" style={{ marginBottom: '24px' }}>Not Sure Where to Start?</span>
            <h2>Let Our Experts <span className="gradient-text">Guide You</span></h2>
            <p>Schedule a free 30-minute consultation and we'll recommend the perfect service mix for your needs.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary" id="services-cta-btn">Book Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
