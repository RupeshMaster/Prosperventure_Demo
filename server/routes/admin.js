const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const { protect, requireAdmin, requireSuperAdmin } = require('../middleware/auth');

// @desc    Get all contact submissions
// @route   GET /api/admin/contacts
// @access  Private/Admin
router.get('/contacts', protect, requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update a contact's status
// @route   PUT /api/admin/contacts/:id/status
// @access  Private/Admin
router.put('/contacts/:id/status', protect, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/SuperAdmin
router.get('/users', protect, requireSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/SuperAdmin
router.put('/users/:id/role', protect, requireSuperAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    // Validate role
    if (!['user', 'admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    // Prevent demoting the last superadmin
    if (role !== 'superadmin') {
      const superAdminCount = await User.countDocuments({ role: 'superadmin' });
      const targetUser = await User.findById(req.params.id);
      
      if (targetUser && targetUser.role === 'superadmin' && superAdminCount <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot demote the last super admin' });
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
