const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, optionalProtect } = require('../middleware/auth');

// POST /api/contact - Submit contact form
router.post('/', optionalProtect, async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    const contact = new Contact({ 
      user: req.user ? req.user._id : null,
      name, email, phone, service, message 
    });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you within 2 hours.',
      data: { id: contact._id },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/contact/my - Get user's own contacts
router.get('/my', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/contact - Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
