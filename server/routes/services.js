const express = require('express');
const router = express.Router();

// Inline services data (mirrors client data)
const services = [
  { id: 1, slug: 'logistics', name: 'Logistics', icon: '🚚', tagline: 'End-to-End Supply Chain Excellence', features: ['Real-time Tracking', 'Warehousing', 'Last-mile Delivery', 'Freight Management'] },
  { id: 2, slug: 'insurance', name: 'Insurance', icon: '🛡️', tagline: 'Comprehensive Protection for Every Need', features: ['Health Insurance', 'Life Insurance', 'Property Coverage', 'Commercial Insurance'] },
  { id: 3, slug: 'real-estate', name: 'Real Estate', icon: '🏢', tagline: 'Finding Your Perfect Property', features: ['Property Search', 'Legal Due Diligence', 'Investment Advisory', 'Property Management'] },
  { id: 4, slug: 'taxation', name: 'Taxation', icon: '📊', tagline: 'Smart Tax Planning & Compliance', features: ['Income Tax Filing', 'GST Compliance', 'Tax Planning', 'Audit Support'] },
  { id: 5, slug: 'loan-finance', name: 'Loan & Finance', icon: '💰', tagline: 'Funding Your Dreams, Fueling Growth', features: ['Home Loans', 'Business Loans', 'Personal Loans', 'Investment Planning'] },
  { id: 6, slug: 'content-services', name: 'Content & Services', icon: '✍️', tagline: 'Content That Converts & Captivates', features: ['Content Writing', 'SEO Optimization', 'Social Media', 'Video Production'] },
];

// GET /api/services - All services
router.get('/', (req, res) => {
  res.json({ success: true, count: services.length, data: services });
});

// GET /api/services/:slug - Single service
router.get('/:slug', (req, res) => {
  const service = services.find(s => s.slug === req.params.slug);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found.' });
  }
  res.json({ success: true, data: service });
});

module.exports = router;
