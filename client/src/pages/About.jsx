import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/Components.css';

const values = [
  { icon: '🎯', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', title: 'Customer First', desc: 'Every decision we make starts with our customer\'s best interest. We listen, understand, and deliver solutions that truly matter.' },
  { icon: '💎', color: '#14B8A6', bg: 'rgba(20,184,166,0.12)', title: 'Excellence', desc: 'We hold ourselves to the highest standards in every service we deliver, ensuring consistent quality and measurable results.' },
  { icon: '🤝', color: '#A855F7', bg: 'rgba(168,85,247,0.12)', title: 'Trust & Integrity', desc: 'Transparency and honesty form the foundation of every relationship we build with our clients and partners.' },
  { icon: '🚀', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)', title: 'Innovation', desc: 'We continuously invest in technology and processes to stay ahead of the curve and deliver cutting-edge solutions.' },
  { icon: '🌱', color: '#34D399', bg: 'rgba(52,211,153,0.12)', title: 'Sustainability', desc: 'We\'re committed to sustainable business practices that create long-term value for clients, communities, and the environment.' },
  { icon: '🔗', color: '#FB7185', bg: 'rgba(251,113,133,0.12)', title: 'Collaboration', desc: 'Working together — with clients, partners, and each other — is how we achieve extraordinary outcomes.' },
];

const team = [
  { name: 'Vikram Malhotra', role: 'CEO & Founder', initials: 'VM', color: '#F59E0B' },
  { name: 'Neha Gupta', role: 'COO', initials: 'NG', color: '#14B8A6' },
  { name: 'Ravi Patel', role: 'Head of Logistics', initials: 'RP', color: '#38BDF8' },
  { name: 'Ananya Singh', role: 'Finance Director', initials: 'AS', color: '#A855F7' },
];

const milestones = [
  { year: '2016', title: 'Founded', desc: 'Started with a vision to simplify business services in India.' },
  { year: '2018', title: 'Expansion', desc: 'Launched logistics and insurance verticals, serving 50+ cities.' },
  { year: '2020', title: 'Digital Pivot', desc: 'Launched our digital platform, serving clients 100% online.' },
  { year: '2022', title: 'Scale-up', desc: 'Crossed 10,000 clients and expanded to 200+ cities nationwide.' },
  { year: '2024', title: 'Award', desc: 'Recognized as Best Multi-Service Platform by Business India.' },
];

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main>
      {/* Banner */}
      <section className="about-hero animated-bg" style={{ position: 'relative', textAlign: 'center', padding: '140px 0 80px', overflow: 'hidden' }}>
        <div className="orb orb-gold" style={{ top: '-80px', right: '10%', opacity: 0.12 }} />
        <div className="orb orb-teal" style={{ bottom: '-60px', left: '5%', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-gold">Our Story</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, margin: '20px 0 20px', lineHeight: 1.2 }}>
            Driven by Purpose,<br />
            <span className="gradient-text">Defined by Excellence</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Since 2016, Prosperventure has been India's most trusted partner for comprehensive business services, 
            helping thousands of clients achieve more with less complexity.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container">
          <div className="about-content-grid">
            <div className="about-img-wrapper">
              <img src="/about_team.png" alt="Prosperventure Team" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(245,158,11,0.08), transparent)' }} />
              <div className="about-img-badge">
                <h3>8+ Years</h3>
                <p>of trusted service excellence</p>
              </div>
            </div>

            <div className="about-text">
              <span className="badge badge-gold">Who We Are</span>
              <h2>More Than Just a <span className="gradient-text">Service Provider</span></h2>
              <div className="divider divider-left" />
              <p>
                Prosperventure was born out of a simple frustration: businesses were wasting time and money 
                managing multiple service providers for their fundamental operational needs. Our founders, 
                seasoned professionals from logistics, finance, and technology, came together to build 
                something different.
              </p>
              <p>
                Today, we're India's fastest-growing multi-service platform, offering six critical 
                business services under one roof. Our team of 500+ specialists, backed by technology 
                and data, delivers results that consistently exceed expectations.
              </p>
              <p>
                From a Mumbai startup to a pan-India powerhouse — our journey has been defined by 
                relentless commitment to our clients' success.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary" id="about-cta-btn">Get In Touch</Link>
                <Link to="/services/logistics" className="btn-outline" id="about-services-btn">Our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal">Our Journey</span>
            <h2>Milestones That <span className="gradient-text">Define Us</span></h2>
            <div className="divider" style={{ margin: '20px auto' }} />
          </div>
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute', left: '50%', top: '50px', bottom: '50px',
              width: '2px', background: 'linear-gradient(180deg, var(--gold-400), var(--teal-400))',
              transform: 'translateX(-50%)', opacity: 0.3,
              display: 'block',
            }} className="timeline-line" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {milestones.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                    position: 'relative',
                  }}
                  id={`milestone-${m.year}`}
                >
                  <div style={{ width: 'calc(50% - 40px)', display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                    <div className="glass-card" style={{ padding: '20px', maxWidth: '320px', width: '100%', textAlign: 'left' }}>
                      <h4 style={{ color: 'var(--gold-400)', fontWeight: 700, marginBottom: '8px' }}>{m.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.desc}</p>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px', height: '60px', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(20,184,166,0.2)), var(--navy-900)',
                    border: '2px solid rgba(245,158,11,0.4)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.8rem', color: 'var(--gold-400)',
                    zIndex: 1, flexDirection: 'column',
                  }}>
                    {m.year}
                  </div>
                  <div style={{ width: 'calc(50% - 40px)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding animated-bg">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Our Values</span>
            <h2>Principles That <span className="gradient-text">Guide Everything</span></h2>
            <div className="divider" style={{ margin: '20px auto' }} />
            <p>These core values are not just words — they're the foundation of how we work, grow, and serve.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card" id={`value-${i}`}>
                <div className="value-icon" style={{ background: v.bg, fontSize: '1.6rem' }}>
                  {v.icon}
                </div>
                <h3 style={{ color: v.color }}>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal">Our Team</span>
            <h2>Leadership That <span className="gradient-text">Leads by Example</span></h2>
            <div className="divider" style={{ margin: '20px auto' }} />
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card" id={`team-${i}`}>
                <div className="team-card-placeholder" style={{ color: member.color }}>
                  {member.initials}
                </div>
                <div className="team-card-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-bg" />
            <span className="badge badge-gold" style={{ marginBottom: '24px' }}>Join Our Family</span>
            <h2>Ready to Experience the <span className="gradient-text">Prosperventure Difference?</span></h2>
            <p>Let our experts show you how we can simplify and supercharge your business operations.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary" id="about-final-cta">Get Started Today</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
