const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');
const { authenticateToken, requireYouTubeAuth } = require('../utils/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

// Channel routes
router.get('/channels', requireYouTubeAuth, youtubeController.getMyChannels);
router.post('/channels/:channelId/sync', requireYouTubeAuth, youtubeController.syncChannelVideos);

// Video routes
router.get('/videos', youtubeController.getUserVideos);
router.get('/videos/:videoId', youtubeController.getVideoDetails);
router.put('/videos/:videoId/stats', requireYouTubeAuth, youtubeController.updateVideoStats);
router.delete('/videos/:videoId', youtubeController.deleteUserVideos);
router.delete('/videos', youtubeController.clearAllVideos);

// Trending videos (optional feature)
router.get('/trending', youtubeController.getTrendingVideos);

module.exports = router; 