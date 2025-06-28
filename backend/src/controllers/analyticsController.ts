import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAnalytics(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const { title, views, likes, comments } = req.body;
    
    // Validation
    if (!title || typeof views !== 'number' || typeof likes !== 'number' || typeof comments !== 'number') {
      res.status(400).json({ error: 'Invalid data provided' });
      return;
    }
    
    const analytics = await prisma.analytics.create({
      data: { title, views, likes, comments, userId: userReq.user.userId },
    });
    res.status(201).json(analytics);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAnalytics(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    // Query parameters for filtering and pagination
    const { page = '1', limit = '10', sortBy = 'createdAt', sortOrder = 'desc', search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    // Build where clause
    const where: any = { userId: userReq.user.userId };
    if (search) {
      where.title = { contains: search as string, mode: 'insensitive' };
    }
    
    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy as string] = sortOrder as string;
    
    const [analytics, total] = await Promise.all([
      prisma.analytics.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.analytics.count({ where })
    ]);
    
    res.json({
      data: analytics,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateAnalytics(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const id = parseInt(req.params.id);
    const { title, views, likes, comments } = req.body;
    
    // Check if analytics exists and belongs to user
    const existing = await prisma.analytics.findFirst({
      where: { id, userId: userReq.user.userId }
    });
    
    if (!existing) {
      res.status(404).json({ error: 'Analytics not found' });
      return;
    }
    
    const analytics = await prisma.analytics.update({
      where: { id },
      data: { title, views, likes, comments },
    });
    res.json(analytics);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAnalytics(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const id = parseInt(req.params.id);
    
    // Check if analytics exists and belongs to user
    const existing = await prisma.analytics.findFirst({
      where: { id, userId: userReq.user.userId }
    });
    
    if (!existing) {
      res.status(404).json({ error: 'Analytics not found' });
      return;
    }
    
    await prisma.analytics.delete({ where: { id } });
    res.json({ success: true, message: 'Analytics deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAnalyticsSummary(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    const [summary, recentAnalytics, topVideos] = await Promise.all([
      // Overall summary
      prisma.analytics.aggregate({
        where: { userId: userReq.user.userId },
        _sum: { views: true, likes: true, comments: true },
        _count: { id: true },
        _avg: { views: true, likes: true, comments: true }
      }),
      
      // Recent analytics (last 7 days)
      prisma.analytics.findMany({
        where: { 
          userId: userReq.user.userId,
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      
      // Top performing videos
      prisma.analytics.findMany({
        where: { userId: userReq.user.userId },
        orderBy: { views: 'desc' },
        take: 5
      })
    ]);
    
    res.json({
      summary: {
        totalVideos: summary._count.id,
        totalViews: summary._sum.views || 0,
        totalLikes: summary._sum.likes || 0,
        totalComments: summary._sum.comments || 0,
        avgViews: Math.round(summary._avg.views || 0),
        avgLikes: Math.round(summary._avg.likes || 0),
        avgComments: Math.round(summary._avg.comments || 0)
      },
      recentAnalytics,
      topVideos
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAnalyticsById(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID parameter' });
      return;
    }
    
    const analytics = await prisma.analytics.findFirst({
      where: { 
        id: id, 
        userId: userReq.user.userId 
      }
    });
    
    if (!analytics) {
      res.status(404).json({ error: 'Analytics not found' });
      return;
    }
    
    res.json(analytics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCombinedAnalytics(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    // Query parameters for filtering and pagination
    const { page = '1', limit = '10', sortBy = 'publishedAt', sortOrder = 'desc', search, format } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    // Get manual analytics
    const manualWhere: any = { userId: userReq.user.userId };
    if (search) {
      manualWhere.title = { contains: search as string, mode: 'insensitive' };
    }
    
    const manualAnalytics = await prisma.analytics.findMany({
      where: manualWhere,
      select: {
        id: true,
        title: true,
        views: true,
        likes: true,
        comments: true,
        createdAt: true
      }
    });

    // Get YouTube videos
    const youtubeWhere: any = {
      channel: {
        userId: userReq.user.userId,
        isActive: true
      }
    };
    
    if (search) {
      youtubeWhere.title = { contains: search as string, mode: 'insensitive' };
    }
    
    if (format === 'shorts') {
      youtubeWhere.isShort = true;
    } else if (format === 'long-form') {
      youtubeWhere.isShort = false;
    }

    const youTubeVideos = await prisma.youTubeVideo.findMany({
      where: youtubeWhere,
      select: {
        id: true,
        title: true,
        viewCount: true,
        likeCount: true,
        commentCount: true,
        publishedAt: true,
        isShort: true,
        thumbnailUrl: true
      }
    });

    // Combine and transform data
    const combinedData = [
      ...manualAnalytics.map((item: any) => ({
        id: `manual-${item.id}`,
        title: item.title,
        views: item.views,
        likes: item.likes,
        comments: item.comments,
        publishedAt: item.createdAt,
        isShort: false,
        thumbnailUrl: null,
        source: 'manual'
      })),
      ...youTubeVideos.map((item: any) => ({
        id: `youtube-${item.id}`,
        title: item.title,
        views: item.viewCount,
        likes: item.likeCount,
        comments: item.commentCount,
        publishedAt: item.publishedAt,
        isShort: item.isShort,
        thumbnailUrl: item.thumbnailUrl,
        source: 'youtube'
      }))
    ];

    // Sort combined data
    combinedData.sort((a: any, b: any) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const total = combinedData.length;
    const paginatedData = combinedData.slice(skip, skip + limitNum);

    res.json({
      data: paginatedData,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCombinedSummary(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    // Get manual analytics summary
    const manualSummary = await prisma.analytics.aggregate({
      where: { userId: userReq.user.userId },
      _sum: { views: true, likes: true, comments: true },
      _count: { id: true },
      _avg: { views: true, likes: true, comments: true }
    });

    // Get YouTube videos summary
    const youTubeVideos = await prisma.youTubeVideo.findMany({
      where: {
        channel: {
          userId: userReq.user.userId,
          isActive: true
        }
      },
      select: {
        viewCount: true,
        likeCount: true,
        commentCount: true,
        isShort: true,
        publishedAt: true
      }
    });

    // Calculate YouTube summary
    const youTubeTotalVideos = youTubeVideos.length;
    const youTubeTotalViews = youTubeVideos.reduce((sum: number, video: any) => sum + video.viewCount, 0);
    const youTubeTotalLikes = youTubeVideos.reduce((sum: number, video: any) => sum + video.likeCount, 0);
    const youTubeTotalComments = youTubeVideos.reduce((sum: number, video: any) => sum + video.commentCount, 0);
    const youTubeShortsCount = youTubeVideos.filter((video: any) => video.isShort).length;
    const youTubeLongFormCount = youTubeTotalVideos - youTubeShortsCount;

    const youTubeAvgViews = youTubeTotalVideos > 0 ? Math.round(youTubeTotalViews / youTubeTotalVideos) : 0;
    const youTubeAvgLikes = youTubeTotalVideos > 0 ? Math.round(youTubeTotalLikes / youTubeTotalVideos) : 0;
    const youTubeAvgComments = youTubeTotalVideos > 0 ? Math.round(youTubeTotalComments / youTubeTotalVideos) : 0;

    // Get recent videos (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentManualAnalytics = await prisma.analytics.findMany({
      where: { 
        userId: userReq.user.userId,
        createdAt: { gte: thirtyDaysAgo }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const recentYoutubeVideos = youTubeVideos
      .filter((video: any) => video.publishedAt >= thirtyDaysAgo)
      .sort((a: any, b: any) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 5);

    // Get top performing videos
    const topManualVideos = await prisma.analytics.findMany({
      where: { userId: userReq.user.userId },
      orderBy: { views: 'desc' },
      take: 5
    });

    const topYoutubeVideos = youTubeVideos
      .sort((a: any, b: any) => b.viewCount - a.viewCount)
      .slice(0, 5);

    // Combine top videos
    const combinedTopVideos = [
      ...topManualVideos.map((video: any) => ({
        id: `manual-${video.id}`,
        title: video.title,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        source: 'manual'
      })),
      ...topYoutubeVideos.map((video: any) => ({
        id: `youtube-${video.id}`,
        title: video.title,
        views: video.viewCount,
        likes: video.likeCount,
        comments: video.commentCount,
        source: 'youtube'
      }))
    ].sort((a: any, b: any) => b.views - a.views).slice(0, 10);

    res.json({
      summary: {
        totalVideos: manualSummary._count.id + youTubeTotalVideos,
        totalViews: (manualSummary._sum.views || 0) + youTubeTotalViews,
        totalLikes: (manualSummary._sum.likes || 0) + youTubeTotalLikes,
        totalComments: (manualSummary._sum.comments || 0) + youTubeTotalComments,
        avgViews: Math.round(((manualSummary._avg.views || 0) + youTubeAvgViews) / 2),
        avgLikes: Math.round(((manualSummary._avg.likes || 0) + youTubeAvgLikes) / 2),
        avgComments: Math.round(((manualSummary._avg.comments || 0) + youTubeAvgComments) / 2),
        shortsCount: youTubeShortsCount,
        longFormCount: manualSummary._count.id + youTubeLongFormCount
      },
      youtubeStats: {
        totalVideos: youTubeTotalVideos,
        totalViews: youTubeTotalViews,
        totalLikes: youTubeTotalLikes,
        totalComments: youTubeTotalComments,
        shortsCount: youTubeShortsCount,
        longFormCount: youTubeLongFormCount
      },
      recentAnalytics: recentManualAnalytics.length + recentYoutubeVideos.length,
      topVideos: combinedTopVideos
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
} 