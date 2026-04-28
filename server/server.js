const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// ===== Routes =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/services', require('./routes/services'));
app.use('/api/contact', require('./routes/contact'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'ProspVenture API is running',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ===== Database + Start =====
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prospventure';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas Connected Successfully');
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`📋 API Endpoints:`);
      console.log(`   GET  /api/health`);
      console.log(`   GET  /api/services`);
      console.log(`   GET  /api/services/:slug`);
      console.log(`   POST /api/contact`);
      console.log(`   GET  /api/contact`);
    });
  })
  .catch((err) => {
    console.warn('⚠️  MongoDB connection failed:', err.message);
    console.log('🔄 Starting server without database (contact form will not persist)');
    app.listen(PORT, () => {
      console.log(`🚀 ProspVenture API server running on http://localhost:${PORT} (no DB)`);
    });
  });
