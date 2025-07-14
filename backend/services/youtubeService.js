const { youtube, setCredentials } = require('../config/googleAuth');
const Video = require('../models/Video');

class YouTubeService {
  constructor() {
    this.youtube = youtube;
  }

  // Set credentials for API calls
  setCredentials(accessToken, refreshToken = null) {
    setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }

  // Get user's YouTube channels
  async getMyChannels() {
    try {
      const response = await this.youtube.channels.list({
        part: ['snippet', 'statistics'],
        mine: true
      });

      return response.data.items.map(channel => ({
        channelId: channel.id,
        channelTitle: channel.snippet.title,
        channelDescription: channel.snippet.description,
        subscriberCount: parseInt(channel.statistics.subscriberCount) || 0,
        viewCount: parseInt(channel.statistics.viewCount) || 0,
        videoCount: parseInt(channel.statistics.videoCount) || 0,
        thumbnailUrl: channel.snippet.thumbnails?.default?.url
      }));
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw new Error('Failed to fetch YouTube channels');
    }
  }

  // Get videos from a channel
  async getChannelVideos(channelId, maxResults = 50) {
    try {
      const response = await this.youtube.search.list({
        part: ['snippet'],
        channelId: channelId,
        order: 'date',
        type: 'video',
        maxResults: maxResults
      });

      const videoIds = response.data.items.map(item => item.id.videoId);
      
      if (videoIds.length === 0) {
        return [];
      }

      // Get detailed video information
      const videosResponse = await this.youtube.videos.list({
        part: ['snippet', 'statistics', 'contentDetails'],
        id: videoIds
      });

      return videosResponse.data.items.map(video => ({
        videoId: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails.duration,
        viewCount: parseInt(video.statistics.viewCount) || 0,
        likeCount: parseInt(video.statistics.likeCount) || 0,
        commentCount: parseInt(video.statistics.commentCount) || 0,
        thumbnailUrl: video.snippet.thumbnails?.high?.url,
        tags: video.snippet.tags || [],
        categoryId: video.snippet.categoryId,
        defaultLanguage: video.snippet.defaultLanguage,
        defaultAudioLanguage: video.snippet.defaultAudioLanguage,
        isShort: this.isShortVideo(video.contentDetails.duration)
      }));
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      throw new Error('Failed to fetch channel videos');
    }
  }

  // Check if video is a Short (less than 60 seconds)
  isShortVideo(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return false;
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds <= 60;
  }

  // Get video statistics
  async getVideoStats(videoId) {
    try {
      const response = await this.youtube.videos.list({
        part: ['statistics'],
        id: [videoId]
      });

      if (response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      const video = response.data.items[0];
      return {
        viewCount: parseInt(video.statistics.viewCount) || 0,
        likeCount: parseInt(video.statistics.likeCount) || 0,
        commentCount: parseInt(video.statistics.commentCount) || 0
      };
    } catch (error) {
      console.error('Error fetching video stats:', error);
      throw new Error('Failed to fetch video statistics');
    }
  }

  // Sync videos for a user
  async syncUserVideos(userId, channelId) {
    try {
      const videos = await this.getChannelVideos(channelId);
      
      const savedVideos = [];
      for (const video of videos) {
        const savedVideo = await Video.findOneAndUpdate(
          { videoId: video.videoId, userId },
          { ...video, userId },
          { upsert: true, new: true }
        );
        savedVideos.push(savedVideo);
      }

      return savedVideos;
    } catch (error) {
      console.error('Error syncing user videos:', error);
      throw error;
    }
  }

  // Get trending videos (optional feature)
  async getTrendingVideos(regionCode = 'US', maxResults = 20) {
    try {
      const response = await this.youtube.videos.list({
        part: ['snippet', 'statistics'],
        chart: 'mostPopular',
        regionCode: regionCode,
        maxResults: maxResults
      });

      return response.data.items.map(video => ({
        videoId: video.id,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        viewCount: parseInt(video.statistics.viewCount) || 0,
        likeCount: parseInt(video.statistics.likeCount) || 0,
        publishedAt: video.snippet.publishedAt,
        thumbnailUrl: video.snippet.thumbnails?.high?.url
      }));
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      throw new Error('Failed to fetch trending videos');
    }
  }
}

module.exports = new YouTubeService(); 