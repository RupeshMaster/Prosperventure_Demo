import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceBySlug, services } from '../data/services';
import '../styles/Pages.css';
import '../styles/Components.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', paddingTop: '80px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>Service Not Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>The service you're looking for doesn't exist.</p>
        <Link to="/services" className="btn-primary">View All Services</Link>
      </div>
    );
  }

  const otherServices = services.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section
        className="service-detail-hero animated-bg"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${service.color}10 0%, transparent 60%), var(--navy-900)`,
        }}
      >
        <div className="orb" style={{
          background: service.color, width: '400px', height: '400px',
          top: '-150px', right: '-100px', opacity: 0.06, borderRadius: '50%',
          filter: 'blur(80px)', position: 'absolute', animation: 'float 10s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="service-detail-grid">
            <div className="service-detail-content">
              <span className="badge" style={{ background: service.colorLight, color: service.color, border: `1px solid ${service.color}30`, marginBottom: '20px' }}>
                {service.icon} {service.tagline}
              </span>
              <h1>{service.name} <span style={{ backgroundImage: `linear-gradient(135deg, ${service.color}, var(--teal-400))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Services</span></h1>
              <p>{service.longDesc}</p>

              <div className="service-benefits-list">
                {service.benefits.map((b, i) => (
                  <div key={i} className="benefit-item" id={`benefit-${i}`}>
                    <div className="benefit-check" style={{ background: `${service.color}15`, borderColor: `${service.color}40`, color: service.color }}>✓</div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                <Link to="/contact" state={{ service: slug }} className="btn-primary" id={`${slug}-consult-btn`}
                  style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`, boxShadow: `0 4px 24px ${service.color}30` }}>
                  Free Consultation
                </Link>
              </div>
            </div>

            <div className="service-detail-img">
              <img src={service.image} alt={service.name} />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${service.color}10, transparent, rgba(5,10,28,0.3))`,
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-strip-grid stats-grid-3">
            {service.stats.map((stat, i) => (
              <div key={i} className="stat-item" id={`service-stat-${i}`}>
                <div className="stat-number" style={{
                  backgroundImage: `linear-gradient(135deg, ${service.color}, var(--teal-400))`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding animated-bg">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ background: service.colorLight, color: service.color, border: `1px solid ${service.color}30` }}>
              How It Works
            </span>
            <h2>Our Simple <span className="gradient-text">4-Step Process</span></h2>
            <div className="divider" style={{ margin: '20px auto' }} />
          </div>
          <div className="process-grid">
            {service.process.map((step, i) => (
              <div key={i} className="process-step" id={`process-step-${i}`}>
                <div className="process-num" style={{
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
                  border: `2px solid ${service.color}40`,
                  color: service.color,
                }}>
                  {step.step}
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Chips */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>
              What's Included in Our <span className="gradient-text">{service.name} Package</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Comprehensive coverage across all key areas of {service.name.toLowerCase()}
            </p>
            <div className="features-badge-container">
              {service.features.map((f, i) => (
                <span
                  key={i}
                  className="features-badge"
                  style={{
                    background: service.colorLight,
                    border: `1px solid ${service.color}30`,
                    color: service.color,
                  }}
                >
                  ✓ {f}
                </span>
              ))}
              <span 
                className="features-badge features-badge-more"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                + And much more...
              </span>
            </div>
            <div style={{ marginTop: '36px', position: 'relative', zIndex: 2 }}>
              <Link to="/contact" state={{ service: slug }} className="btn-primary" id={`${slug}-package-cta`}
                style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`, boxShadow: `0 4px 24px ${service.color}30` }}>
                Get This Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>
              Explore Our <span className="gradient-text">Other Services</span>
            </h2>
          </div>
          <div className="services-grid">
            {otherServices.map((s, i) => (
              <div
                key={s.id}
                className="glass-card"
                style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                onClick={() => navigate(`/services/${s.slug}`)}
                id={`other-service-${s.slug}`}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${s.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                <div style={{ width: '56px', height: '56px', minWidth: '56px', background: s.colorLight, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  {s.icon}
                </div>
                <div>
                  <h4 style={{ color: s.color, marginBottom: '4px' }}>{s.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.tagline}</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
