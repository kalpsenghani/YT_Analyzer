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
    
    const analytics = await prisma.analytics.findFirst({
      where: { id, userId: userReq.user.userId }
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