const analysisService = require('../services/analysisService');

// Get overall user analytics
const getUserAnalytics = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    const analytics = await analysisService.getUserAnalytics(req.user._id, timeRange);
    res.json(analytics);
  } catch (error) {
    console.error('Error getting user analytics:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
};

// Compare Shorts vs Long-form performance
const compareShortsVsLongForm = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    const comparison = await analysisService.compareShortsVsLongForm(req.user._id, timeRange);
    res.json(comparison);
  } catch (error) {
    console.error('Error comparing Shorts vs Long-form:', error);
    res.status(500).json({ error: 'Failed to compare performance' });
  }
};

// Get performance trends over time
const getPerformanceTrends = async (req, res) => {
  try {
    const { timeRange = '90d' } = req.query;
    const trends = await analysisService.getPerformanceTrends(req.user._id, timeRange);
    res.json(trends);
  } catch (error) {
    console.error('Error getting performance trends:', error);
    res.status(500).json({ error: 'Failed to get trends' });
  }
};

// Get top performing videos
const getTopVideos = async (req, res) => {
  try {
    const { limit = 10, type = 'all' } = req.query;
    const videos = await analysisService.getTopVideos(req.user._id, parseInt(limit), type);
    res.json(videos);
  } catch (error) {
    console.error('Error getting top videos:', error);
    res.status(500).json({ error: 'Failed to get top videos' });
  }
};

// Get engagement insights
const getEngagementInsights = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    const insights = await analysisService.getEngagementInsights(req.user._id, timeRange);
    res.json(insights);
  } catch (error) {
    console.error('Error getting engagement insights:', error);
    res.status(500).json({ error: 'Failed to get insights' });
  }
};

// Get analytics dashboard data
const getDashboardData = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    // Get all analytics data in parallel
    const [analytics, comparison, topVideos, insights] = await Promise.all([
      analysisService.getUserAnalytics(req.user._id, timeRange),
      analysisService.compareShortsVsLongForm(req.user._id, timeRange),
      analysisService.getTopVideos(req.user._id, 5, 'all'),
      analysisService.getEngagementInsights(req.user._id, timeRange)
    ]);

    res.json({
      analytics,
      comparison,
      topVideos,
      insights,
      timeRange
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
};

// Get content recommendations
const getContentRecommendations = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    const insights = await analysisService.getEngagementInsights(req.user._id, timeRange);
    
    res.json({
      recommendations: insights.contentRecommendations,
      bestPerformingTime: insights.bestPerformingTime,
      growthMetrics: insights.growthMetrics
    });
  } catch (error) {
    console.error('Error getting content recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
};

// Get performance summary
const getPerformanceSummary = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    const [analytics, comparison] = await Promise.all([
      analysisService.getUserAnalytics(req.user._id, timeRange),
      analysisService.compareShortsVsLongForm(req.user._id, timeRange)
    ]);

    const summary = {
      totalVideos: analytics.totalVideos,
      totalViews: analytics.totalViews,
      averageViews: analytics.averageViews,
      averageEngagementRate: analytics.averageEngagementRate,
      shortsCount: comparison.comparison.shortsCount,
      longFormCount: comparison.comparison.longFormCount,
      shortsPerformance: comparison.shorts,
      longFormPerformance: comparison.longForm,
      recommendations: comparison.comparison.recommendations
    };

    res.json(summary);
  } catch (error) {
    console.error('Error getting performance summary:', error);
    res.status(500).json({ error: 'Failed to get performance summary' });
  }
};

module.exports = {
  getUserAnalytics,
  compareShortsVsLongForm,
  getPerformanceTrends,
  getTopVideos,
  getEngagementInsights,
  getDashboardData,
  getContentRecommendations,
  getPerformanceSummary
}; 