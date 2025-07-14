const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../utils/authMiddleware');

// Public routes
router.get('/google/url', authController.getAuthUrl);
router.get('/google/callback', authController.handleCallback);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.post('/logout', authenticateToken, authController.logout);
router.get('/youtube/status', authenticateToken, authController.checkYouTubeAuth);

module.exports = router; 