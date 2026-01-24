const express = require('express');
const router = express.Router();
const { payWithWallet, getAdminStats } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth'); // Assuming these exist

// Student Route
router.post('/pay-with-wallet', protect, payWithWallet);

// Admin Route
router.get('/admin/stats', protect, authorize('admin'), getAdminStats);

module.exports = router;
