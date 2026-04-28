import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="service-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`service-card-${service.slug}`}
      onClick={() => navigate(`/services/${service.slug}`)}
    >
      {/* Image */}
      <div className="service-card-image-wrapper">
        <img
          src={service.image}
          alt={service.name}
          className="service-card-image"
          loading="lazy"
        />
        <div className="service-card-image-overlay" />
        <div
          className="service-card-icon-badge"
          style={{ background: `${service.colorLight}`, boxShadow: `0 8px 20px ${service.color}20` }}
        >
          <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
        </div>
      </div>

      {/* Body */}
      <div className="service-card-body">
        <div className="service-card-tag" style={{ color: service.color }}>
          {service.tagline}
        </div>
        <h3 className="service-card-title">{service.name}</h3>
        <p className="service-card-desc">{service.shortDesc}</p>

        {/* Feature chips */}
        <div className="service-card-features">
          {service.features.map((f, i) => (
            <span
              key={i}
              className="feature-chip"
              style={{
                background: service.colorLight,
                border: `1px solid ${service.color}30`,
                color: service.color
              }}
            >
              ✓ {f}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="service-card-btn"
          style={{
            background: service.colorLight,
            border: `1px solid ${service.color}30`,
            color: service.color
          }}
          onClick={() => navigate(`/services/${service.slug}`)}
          id={`explore-${service.slug}-btn`}
        >
          Explore {service.name}
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
