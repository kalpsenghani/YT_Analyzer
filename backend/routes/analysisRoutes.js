const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { authenticateToken } = require('../utils/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

// Analytics routes
router.get('/analytics', analysisController.getUserAnalytics);
router.get('/comparison', analysisController.compareShortsVsLongForm);
router.get('/trends', analysisController.getPerformanceTrends);
router.get('/top-videos', analysisController.getTopVideos);
router.get('/insights', analysisController.getEngagementInsights);
router.get('/recommendations', analysisController.getContentRecommendations);
router.get('/summary', analysisController.getPerformanceSummary);

// Dashboard route (combines multiple analytics)
router.get('/dashboard', analysisController.getDashboardData);

module.exports = router; 