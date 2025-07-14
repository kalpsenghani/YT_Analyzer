const User = require('../models/User');
const Video = require('../models/Video');
const youtubeService = require('../services/youtubeService');

// Get user's YouTube channels
const getMyChannels = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.accessToken) {
      return res.status(403).json({ 
        error: 'YouTube authentication required',
        needsAuth: true 
      });
    }

    // Set credentials for API calls
    youtubeService.setCredentials(user.accessToken, user.refreshToken);
    
    const channels = await youtubeService.getMyChannels();
    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube channels' });
  }
};

// Sync videos from a channel
const syncChannelVideos = async (req, res) => {
  try {
    const { channelId } = req.params;
    const user = await User.findById(req.user._id);
    
    if (!user.accessToken) {
      return res.status(403).json({ 
        error: 'YouTube authentication required',
        needsAuth: true 
      });
    }

    // Set credentials for API calls
    youtubeService.setCredentials(user.accessToken, user.refreshToken);
    
    const videos = await youtubeService.syncUserVideos(user._id, channelId);
    
    res.json({
      message: 'Videos synced successfully',
      count: videos.length,
      videos: videos.slice(0, 10) // Return first 10 for preview
    });
  } catch (error) {
    console.error('Error syncing videos:', error);
    res.status(500).json({ error: 'Failed to sync videos' });
  }
};

// Get user's videos with pagination
const getUserVideos = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, sortBy = 'publishedAt', sortOrder = 'desc' } = req.query;
    
    const query = { userId: req.user._id };
    
    if (type === 'shorts') {
      query.isShort = true;
    } else if (type === 'long-form') {
      query.isShort = false;
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const videos = await Video.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Video.countDocuments(query);

    res.json({
      videos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// Get video details
const getVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const video = await Video.findOne({
      videoId,
      userId: req.user._id
    });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ error: 'Failed to fetch video details' });
  }
};

// Update video statistics from YouTube API
const updateVideoStats = async (req, res) => {
  try {
    const { videoId } = req.params;
    const user = await User.findById(req.user._id);
    
    if (!user.accessToken) {
      return res.status(403).json({ 
        error: 'YouTube authentication required',
        needsAuth: true 
      });
    }

    // Set credentials for API calls
    youtubeService.setCredentials(user.accessToken, user.refreshToken);
    
    const stats = await youtubeService.getVideoStats(videoId);
    
    const video = await Video.findOneAndUpdate(
      { videoId, userId: req.user._id },
      { 
        viewCount: stats.viewCount,
        likeCount: stats.likeCount,
        commentCount: stats.commentCount,
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    console.error('Error updating video stats:', error);
    res.status(500).json({ error: 'Failed to update video statistics' });
  }
};

// Get trending videos (optional feature)
const getTrendingVideos = async (req, res) => {
  try {
    const { regionCode = 'US', maxResults = 20 } = req.query;
    
    const videos = await youtubeService.getTrendingVideos(regionCode, parseInt(maxResults));
    res.json(videos);
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    res.status(500).json({ error: 'Failed to fetch trending videos' });
  }
};

// Delete user's video data
const deleteUserVideos = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const result = await Video.deleteOne({
      videoId,
      userId: req.user._id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
};

// Clear all user's video data
const clearAllVideos = async (req, res) => {
  try {
    const result = await Video.deleteMany({ userId: req.user._id });
    
    res.json({ 
      message: 'All videos cleared successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing videos:', error);
    res.status(500).json({ error: 'Failed to clear videos' });
  }
};

module.exports = {
  getMyChannels,
  syncChannelVideos,
  getUserVideos,
  getVideoDetails,
  updateVideoStats,
  getTrendingVideos,
  deleteUserVideos,
  clearAllVideos
}; 