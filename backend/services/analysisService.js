const Video = require('../models/Video');

class AnalysisService {
  // Get overall analytics for a user
  async getUserAnalytics(userId, timeRange = '30d') {
    try {
      const dateFilter = this.getDateFilter(timeRange);
      
      const videos = await Video.find({
        userId,
        publishedAt: dateFilter
      }).sort({ publishedAt: -1 });

      return this.calculateAnalytics(videos);
    } catch (error) {
      console.error('Error getting user analytics:', error);
      throw error;
    }
  }

  // Compare Shorts vs Long-form performance
  async compareShortsVsLongForm(userId, timeRange = '30d') {
    try {
      const dateFilter = this.getDateFilter(timeRange);
      
      const videos = await Video.find({
        userId,
        publishedAt: dateFilter
      });

      const shorts = videos.filter(video => video.isShort);
      const longForm = videos.filter(video => !video.isShort);

      return {
        shorts: this.calculateAnalytics(shorts),
        longForm: this.calculateAnalytics(longForm),
        comparison: this.comparePerformance(shorts, longForm)
      };
    } catch (error) {
      console.error('Error comparing Shorts vs Long-form:', error);
      throw error;
    }
  }

  // Get performance trends over time
  async getPerformanceTrends(userId, timeRange = '90d') {
    try {
      const dateFilter = this.getDateFilter(timeRange);
      
      const videos = await Video.find({
        userId,
        publishedAt: dateFilter
      }).sort({ publishedAt: 1 });

      return this.calculateTrends(videos);
    } catch (error) {
      console.error('Error getting performance trends:', error);
      throw error;
    }
  }

  // Get top performing videos
  async getTopVideos(userId, limit = 10, type = 'all') {
    try {
      let query = { userId };
      
      if (type === 'shorts') {
        query.isShort = true;
      } else if (type === 'long-form') {
        query.isShort = false;
      }

      const videos = await Video.find(query)
        .sort({ viewCount: -1 })
        .limit(limit);

      return videos.map(video => ({
        id: video._id,
        videoId: video.videoId,
        title: video.title,
        viewCount: video.viewCount,
        likeCount: video.likeCount,
        commentCount: video.commentCount,
        engagementRate: video.engagementRate,
        isShort: video.isShort,
        publishedAt: video.publishedAt,
        thumbnailUrl: video.thumbnailUrl
      }));
    } catch (error) {
      console.error('Error getting top videos:', error);
      throw error;
    }
  }

  // Get engagement insights
  async getEngagementInsights(userId, timeRange = '30d') {
    try {
      const dateFilter = this.getDateFilter(timeRange);
      
      const videos = await Video.find({
        userId,
        publishedAt: dateFilter
      });

      const insights = {
        averageEngagementRate: this.calculateAverageEngagement(videos),
        bestPerformingTime: this.findBestPerformingTime(videos),
        contentRecommendations: this.generateContentRecommendations(videos),
        growthMetrics: this.calculateGrowthMetrics(videos)
      };

      return insights;
    } catch (error) {
      console.error('Error getting engagement insights:', error);
      throw error;
    }
  }

  // Calculate analytics from video array
  calculateAnalytics(videos) {
    if (videos.length === 0) {
      return {
        totalVideos: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        averageViews: 0,
        averageLikes: 0,
        averageComments: 0,
        averageEngagementRate: 0
      };
    }

    const totalViews = videos.reduce((sum, video) => sum + video.viewCount, 0);
    const totalLikes = videos.reduce((sum, video) => sum + video.likeCount, 0);
    const totalComments = videos.reduce((sum, video) => sum + video.commentCount, 0);
    const totalEngagement = totalLikes + totalComments;

    return {
      totalVideos: videos.length,
      totalViews,
      totalLikes,
      totalComments,
      averageViews: Math.round(totalViews / videos.length),
      averageLikes: Math.round(totalLikes / videos.length),
      averageComments: Math.round(totalComments / videos.length),
      averageEngagementRate: totalViews > 0 ? (totalEngagement / totalViews * 100).toFixed(2) : 0
    };
  }

  // Compare performance between two video arrays
  comparePerformance(shorts, longForm) {
    const shortsAnalytics = this.calculateAnalytics(shorts);
    const longFormAnalytics = this.calculateAnalytics(longForm);

    return {
      shortsCount: shorts.length,
      longFormCount: longForm.length,
      shortsPerformance: shortsAnalytics,
      longFormPerformance: longFormAnalytics,
      recommendations: this.generateComparisonRecommendations(shortsAnalytics, longFormAnalytics)
    };
  }

  // Calculate trends over time
  calculateTrends(videos) {
    const weeklyData = {};
    
    videos.forEach(video => {
      const week = this.getWeekNumber(video.publishedAt);
      if (!weeklyData[week]) {
        weeklyData[week] = {
          views: 0,
          likes: 0,
          comments: 0,
          videos: 0
        };
      }
      
      weeklyData[week].views += video.viewCount;
      weeklyData[week].likes += video.likeCount;
      weeklyData[week].comments += video.commentCount;
      weeklyData[week].videos += 1;
    });

    return Object.entries(weeklyData).map(([week, data]) => ({
      week,
      ...data,
      averageViews: Math.round(data.views / data.videos),
      averageEngagement: data.views > 0 ? ((data.likes + data.comments) / data.views * 100).toFixed(2) : 0
    }));
  }

  // Generate content recommendations
  generateContentRecommendations(videos) {
    const recommendations = [];
    
    if (videos.length === 0) {
      return ['Start creating content to get insights'];
    }

    const avgViews = videos.reduce((sum, v) => sum + v.viewCount, 0) / videos.length;
    const avgEngagement = videos.reduce((sum, v) => sum + parseFloat(v.engagementRate), 0) / videos.length;

    if (avgViews < 1000) {
      recommendations.push('Focus on improving video titles and thumbnails to increase views');
    }

    if (avgEngagement < 2) {
      recommendations.push('Try to increase viewer engagement by asking questions in your videos');
    }

    const shortsCount = videos.filter(v => v.isShort).length;
    const longFormCount = videos.filter(v => !v.isShort).length;

    if (shortsCount > longFormCount * 2) {
      recommendations.push('Consider creating more long-form content for deeper audience engagement');
    } else if (longFormCount > shortsCount * 2) {
      recommendations.push('Try creating more Shorts to reach a wider audience');
    }

    return recommendations;
  }

  // Generate comparison recommendations
  generateComparisonRecommendations(shortsAnalytics, longFormAnalytics) {
    const recommendations = [];

    if (shortsAnalytics.averageViews > longFormAnalytics.averageViews * 1.5) {
      recommendations.push('Your Shorts are performing significantly better than long-form videos');
    } else if (longFormAnalytics.averageViews > shortsAnalytics.averageViews * 1.5) {
      recommendations.push('Your long-form videos are performing significantly better than Shorts');
    }

    if (shortsAnalytics.averageEngagementRate > longFormAnalytics.averageEngagementRate) {
      recommendations.push('Shorts have higher engagement - consider optimizing long-form content');
    } else {
      recommendations.push('Long-form videos have higher engagement - focus on quality over quantity');
    }

    return recommendations;
  }

  // Helper methods
  getDateFilter(timeRange) {
    const now = new Date();
    const days = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '180d': 180,
      '365d': 365
    };
    
    const daysBack = days[timeRange] || 30;
    return { $gte: new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000) };
  }

  getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d.toISOString().split('T')[0];
  }

  calculateAverageEngagement(videos) {
    if (videos.length === 0) return 0;
    const totalEngagement = videos.reduce((sum, v) => sum + parseFloat(v.engagementRate), 0);
    return (totalEngagement / videos.length).toFixed(2);
  }

  findBestPerformingTime(videos) {
    if (videos.length === 0) return 'No data available';
    
    const hourlyPerformance = {};
    videos.forEach(video => {
      const hour = new Date(video.publishedAt).getHours();
      if (!hourlyPerformance[hour]) {
        hourlyPerformance[hour] = { totalViews: 0, count: 0 };
      }
      hourlyPerformance[hour].totalViews += video.viewCount;
      hourlyPerformance[hour].count += 1;
    });

    let bestHour = 0;
    let bestAvgViews = 0;

    Object.entries(hourlyPerformance).forEach(([hour, data]) => {
      const avgViews = data.totalViews / data.count;
      if (avgViews > bestAvgViews) {
        bestAvgViews = avgViews;
        bestHour = parseInt(hour);
      }
    });

    return `${bestHour}:00 - ${bestHour + 1}:00`;
  }

  calculateGrowthMetrics(videos) {
    if (videos.length < 2) return { growthRate: 0, trend: 'stable' };

    const sortedVideos = videos.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    const midPoint = Math.floor(sortedVideos.length / 2);
    
    const earlyVideos = sortedVideos.slice(0, midPoint);
    const recentVideos = sortedVideos.slice(midPoint);

    const earlyAvgViews = earlyVideos.reduce((sum, v) => sum + v.viewCount, 0) / earlyVideos.length;
    const recentAvgViews = recentVideos.reduce((sum, v) => sum + v.viewCount, 0) / recentVideos.length;

    const growthRate = earlyAvgViews > 0 ? ((recentAvgViews - earlyAvgViews) / earlyAvgViews * 100).toFixed(2) : 0;
    
    return {
      growthRate: parseFloat(growthRate),
      trend: growthRate > 0 ? 'growing' : growthRate < 0 ? 'declining' : 'stable'
    };
  }
}

module.exports = new AnalysisService(); 