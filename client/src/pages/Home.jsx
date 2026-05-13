import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import '../styles/Hero.css';
import '../styles/Components.css';

const stats = [
  { number: '15K+', label: 'Happy Clients' },
  { number: '200+', label: 'Cities Covered' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '8+', label: 'Years of Excellence' },
];

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'CEO, TechVentures Pvt Ltd',
    initials: 'RS',
    text: 'Prosperventure transformed our supply chain completely. Their logistics team\'s expertise and real-time tracking system reduced our delivery costs by 28%. Absolutely outstanding service!',
    rating: 5,
    color: '#F59E0B',
  },
  {
    id: 2,
    name: 'Priya Menonon',
    role: 'Director, Sapphire Realty',
    initials: 'PM',
    text: 'The real estate team at Prosperventure helped us close 3 major commercial deals in just 2 months. Their market insights and legal expertise are unparalleled in the industry.',
    rating: 5,
    color: '#14B8A6',
  },
  {
    id: 3,
    name: 'Arjun Kapoor',
    role: 'Founder, GreenEarth Ventures',
    initials: 'AK',
    text: 'Their tax planning strategy saved our company over ₹8 lakhs last financial year. The team is proactive, knowledgeable, and always available when needed.',
    rating: 5,
    color: '#A855F7',
  },
];

const features = [
  {
    icon: '⚡',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    title: 'Lightning Fast Processing',
    desc: 'Our streamlined workflows ensure your requests are processed within hours, not days.',
  },
  {
    icon: '🔒',
    color: '#14B8A6',
    bg: 'rgba(20,184,166,0.1)',
    title: 'Bank-Grade Security',
    desc: '256-bit encryption and multi-factor authentication protect all your sensitive data.',
  },
  {
    icon: '🌐',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.1)',
    title: 'Pan-India Network',
    desc: 'Operations across 200+ cities with local experts who understand regional nuances.',
  },
  {
    icon: '📱',
    color: '#A855F7',
    bg: 'rgba(168,85,247,0.1)',
    title: 'Digital-First Approach',
    desc: 'Manage everything online with our intuitive platform and dedicated mobile app.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero animated-bg">
        <div className="hero-bg">
          <div className="hero-bg-image" />
          <div className="hero-bg-gradient" />
          <div className="hero-grid" />
        </div>

        {/* Orbs */}
        <div className="orb orb-gold" style={{ top: '-100px', left: '-150px', opacity: 0.15 }} />
        <div className="orb orb-teal" style={{ bottom: '-100px', right: '-100px', opacity: 0.12 }} />

        <div className="hero-container">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge badge-gold">
                🏆 India's #1 Multi-Service Platform
              </span>
            </div>

            <h1 className="hero-title">
              Your Complete<br />
              <span className="highlight">Business Solutions</span><br />
              Partner
            </h1>

            <p className="hero-description">
              From logistics to taxation, insurance to real estate — we provide comprehensive 
              professional services that accelerate your business growth and simplify your life.
            </p>

            <div className="hero-cta">
              <button className="btn-primary" onClick={scrollToServices} id="hero-explore-btn">
                Explore Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <Link to="/contact" className="btn-outline" id="hero-contact-btn">
                Talk to an Expert
              </Link>
            </div>

            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat">
                  <span className="number">{stat.number}</span>
                  <span className="label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual">
            <div className="hero-visual-card">
              <img src="/hero_banner.png" alt="Prosperventure Services Platform" className="hero-visual-img" />
              <div className="hero-visual-overlay">
                <h3 className="hero-visual-title">6 Services. One Platform.</h3>
                <div className="hero-services-mini">
                  {services.map(s => (
                    <span key={s.id} className="service-mini-badge">{s.icon} {s.name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="hero-floating-card hero-floating-card-1">
              <div className="hero-floating-icon" style={{ background: 'rgba(52,211,153,0.15)' }}>
                📈
              </div>
              <div className="hero-floating-info">
                <h4 style={{ color: '#34D399' }}>₹45K Avg Savings</h4>
                <p>Per client annually</p>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card-2">
              <div className="hero-floating-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>
                ⚡
              </div>
              <div className="hero-floating-info">
                <h4 style={{ color: 'var(--gold-400)' }}>48hr Turnaround</h4>
                <p>Most requests processed</p>
              </div>
            </div>
          </div>
        </div>

      </section>



      {/* ===== WHY US ===== */}
      <section className="section-padding animated-bg">
        <div className="container">
          <div className="features-grid">
            <div className="features-content">
              <span className="badge badge-teal">Why Choose Prosperventure</span>
              <h2>The Smart Choice for <span className="gradient-text">Modern Businesses</span></h2>
              <p>
                We combine deep industry expertise with cutting-edge technology 
                to deliver services that are faster, smarter, and more reliable. 
                Our integrated platform gives you a single point of contact for all your needs.
              </p>
              <div className="feature-list">
                {features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <div className="feature-item-icon" style={{ background: f.bg }}>
                      <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                    </div>
                    <div className="feature-item-content">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '36px' }}>
                <Link to="/about" className="btn-primary" id="home-about-btn">Learn About Us</Link>
              </div>
            </div>

            <div className="features-visual">
              <div className="features-main-card">
                <img src="/about_team.png" alt="Prosperventure Team" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.1), transparent)'
                }} />
              </div>
              <div className="features-mini-cards">
                <div className="features-mini-card">
                  <div className="mini-card-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>🏆</div>
                  <div className="mini-card-info">
                    <h5>Award Winning</h5>
                    <p>Best Service Provider 2024</p>
                  </div>
                </div>
                <div className="features-mini-card">
                  <div className="mini-card-icon" style={{ background: 'rgba(20,184,166,0.15)' }}>✅</div>
                  <div className="mini-card-info">
                    <h5>ISO Certified</h5>
                    <p>ISO 9001:2015 Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES CARDS ===== */}
      <section className="section-padding" ref={servicesRef} id="services-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Our Services</span>
            <h2>Everything Your Business <span className="gradient-text">Needs</span></h2>
            <div className="divider" style={{ margin: '20px auto' }} />
            <p>
              Six powerful service verticals under one roof, each delivered by 
              industry specialists with proven track records. Choose one or combine 
              multiple services for maximum value.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding testimonials-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal">Testimonials</span>
            <h2>What Our Clients <span className="gradient-text">Say</span></h2>
            <div className="divider" style={{ margin: '20px auto' }} />
            <p>Thousands of businesses trust Prosperventure to drive their success. Here's what some of them have to say.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.id} className="testimonial-card glass-card" id={`testimonial-${t.id}`}>
                <div className="testimonial-quote">"</div>
                <div className="testimonial-rating">
                  {Array(t.rating).fill(null).map((_, j) => (
                    <span key={j} className="star">★</span>
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: `${t.color}20`, color: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section-padding">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-bg" />
            <span className="badge badge-gold" style={{ marginBottom: '24px' }}>Ready to Get Started?</span>
            <h2>
              Transform Your Business with <span className="gradient-text">Prosperventure</span> Today
            </h2>
            <p>
              Join 15,000+ businesses that trust Prosperventure for their critical operations. 
              Get a free consultation with our experts and discover how we can help.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary" id="cta-contact-btn">
                Get Free Consultation
              </Link>
              <Link to="/services/logistics" className="btn-outline" id="cta-services-btn">
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
