const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: String,
  tagline: String,
  shortDesc: String,
  longDesc: String,
  features: [String],
  image: String,
  color: String,
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
