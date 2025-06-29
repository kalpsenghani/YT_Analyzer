import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { youtubeService } from '../services/youtubeService';

const prisma = new PrismaClient();

// Initialize YouTube service with environment variables
const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3000/youtube/callback';

// Initialize YouTube service
async function initializeYouTubeService() {
  if (YOUTUBE_CLIENT_ID && YOUTUBE_CLIENT_SECRET) {
    await youtubeService.initializeAuth(YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REDIRECT_URI);
  }
}

export async function getAuthUrl(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
      res.status(500).json({ error: 'YouTube API credentials not configured' });
      return;
    }

    // Initialize service if not already done
    await initializeYouTubeService();
    
    const authUrl = youtubeService.generateAuthUrl();
    res.json({ authUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleCallback(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    console.log('YouTube callback received');
    console.log('Request body:', req.body);
    console.log('Request query:', req.query);
    console.log('User:', userReq.user);

    if (!userReq.user) {
      console.log('No user found in request');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { code } = req.body || req.query;
    console.log('Authorization code:', code);

    if (!code || typeof code !== 'string') {
      console.log('No valid authorization code found');
      res.status(400).json({ error: 'Authorization code is required' });
      return;
    }

    console.log('Initializing YouTube service...');
    // Initialize service if not already done
    await initializeYouTubeService();

    // Exchange code for tokens
    const tokens = await youtubeService.exchangeCodeForTokens(code);
    
    // Set credentials for API calls
    await youtubeService.setCredentials(tokens.access_token, tokens.refresh_token);
    
    // Get user's channels
    const channels = await youtubeService.getMyChannels();
    
    if (channels.length === 0) {
      res.status(400).json({ error: 'No YouTube channels found for this account' });
      return;
    }

    // Store channel information in database
    const savedChannels = await Promise.all(
      channels.map(async (channel) => {
        return await prisma.youTubeChannel.upsert({
          where: { channelId: channel.channelId },
          update: {
            channelTitle: channel.channelTitle,
            channelDescription: channel.channelDescription,
            subscriberCount: channel.subscriberCount,
            viewCount: channel.viewCount,
            videoCount: channel.videoCount,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tokenExpiry: new Date(tokens.expiry_date),
            lastSyncAt: new Date(),
            isActive: true
          },
          create: {
            userId: userReq.user.userId,
            channelId: channel.channelId,
            channelTitle: channel.channelTitle,
            channelDescription: channel.channelDescription,
            subscriberCount: channel.subscriberCount,
            viewCount: channel.viewCount,
            videoCount: channel.videoCount,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tokenExpiry: new Date(tokens.expiry_date),
            lastSyncAt: new Date(),
            isActive: true
          }
        });
      })
    );

    // Return JSON response for frontend to handle
    res.json({ 
      success: true, 
      message: 'YouTube account connected successfully',
      channels: savedChannels 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getConnectedChannels(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const channels = await prisma.youTubeChannel.findMany({
      where: { 
        userId: userReq.user.userId,
        isActive: true 
      },
      include: {
        videos: {
          orderBy: { publishedAt: 'desc' },
          take: 10
        }
      }
    });

    res.json(channels);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function syncChannelData(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { channelId } = req.params;
    if (!channelId) {
      res.status(400).json({ error: 'Channel ID is required' });
      return;
    }

    // Get channel from database
    const channel = await prisma.youTubeChannel.findFirst({
      where: { 
        id: parseInt(channelId),
        userId: userReq.user.userId,
        isActive: true 
      }
    });

    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
      return;
    }

    // Check if token is expired and refresh if needed
    if (channel.tokenExpiry && youtubeService.isTokenExpired(channel.tokenExpiry.getTime())) {
      if (!channel.refreshToken) {
        res.status(400).json({ error: 'Token expired and no refresh token available' });
        return;
      }

      const newTokens = await youtubeService.refreshAccessToken(channel.refreshToken);
      
      // Update tokens in database
      await prisma.youTubeChannel.update({
        where: { id: channel.id },
        data: {
          accessToken: newTokens.access_token,
          tokenExpiry: new Date(newTokens.expiry_date)
        }
      });

      // Update channel object with new tokens
      channel.accessToken = newTokens.access_token;
      channel.tokenExpiry = new Date(newTokens.expiry_date);
    }

    // Set credentials for API calls
    await youtubeService.setCredentials(channel.accessToken!, channel.refreshToken ?? undefined);

    // Fetch videos from YouTube API
    const videos = await youtubeService.getChannelVideos(channel.channelId, 50);

    // Store videos in database
    const savedVideos = await Promise.all(
      videos.map(async (video) => {
        return await prisma.youTubeVideo.upsert({
          where: { videoId: video.videoId },
          update: {
            title: video.title,
            description: video.description,
            publishedAt: new Date(video.publishedAt),
            duration: video.duration,
            viewCount: video.viewCount,
            likeCount: video.likeCount,
            commentCount: video.commentCount,
            thumbnailUrl: video.thumbnailUrl,
            tags: video.tags,
            categoryId: video.categoryId,
            defaultLanguage: video.defaultLanguage,
            defaultAudioLanguage: video.defaultAudioLanguage,
            isShort: video.isShort,
            updatedAt: new Date()
          },
          create: {
            channelId: channel.id,
            videoId: video.videoId,
            title: video.title,
            description: video.description,
            publishedAt: new Date(video.publishedAt),
            duration: video.duration,
            viewCount: video.viewCount,
            likeCount: video.likeCount,
            commentCount: video.commentCount,
            thumbnailUrl: video.thumbnailUrl,
            tags: video.tags,
            categoryId: video.categoryId,
            defaultLanguage: video.defaultLanguage,
            defaultAudioLanguage: video.defaultAudioLanguage,
            isShort: video.isShort
          }
        });
      })
    );

    // Update channel's last sync time
    await prisma.youTubeChannel.update({
      where: { id: channel.id },
      data: { lastSyncAt: new Date() }
    });

    res.json({ 
      success: true, 
      message: 'Channel data synced successfully',
      videosCount: savedVideos.length,
      videos: savedVideos 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function disconnectChannel(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { channelId } = req.params;
    if (!channelId) {
      res.status(400).json({ error: 'Channel ID is required' });
      return;
    }

    // Deactivate channel
    await prisma.youTubeChannel.updateMany({
      where: { 
        id: parseInt(channelId),
        userId: userReq.user.userId 
      },
      data: { 
        isActive: false,
        accessToken: null,
        refreshToken: null,
        tokenExpiry: null
      }
    });

    res.json({ 
      success: true, 
      message: 'Channel disconnected successfully' 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getChannelAnalytics(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { channelId } = req.params;
    if (!channelId) {
      res.status(400).json({ error: 'Channel ID is required' });
      return;
    }

    // Get channel with videos
    const channel = await prisma.youTubeChannel.findFirst({
      where: { 
        id: parseInt(channelId),
        userId: userReq.user.userId,
        isActive: true 
      },
      include: {
        videos: {
          orderBy: { publishedAt: 'desc' }
        }
      }
    });

    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
      return;
    }

    // Calculate analytics
    const totalVideos = channel.videos.length;
    const totalViews = channel.videos.reduce((sum: number, video: any) => sum + video.viewCount, 0);
    const totalLikes = channel.videos.reduce((sum: number, video: any) => sum + video.likeCount, 0);
    const totalComments = channel.videos.reduce((sum: number, video: any) => sum + video.commentCount, 0);
    const shortsCount = channel.videos.filter((video: any) => video.isShort).length;
    const longFormCount = totalVideos - shortsCount;

    const avgViews = totalVideos > 0 ? Math.round(totalViews / totalVideos) : 0;
    const avgLikes = totalVideos > 0 ? Math.round(totalLikes / totalVideos) : 0;
    const avgComments = totalVideos > 0 ? Math.round(totalComments / totalVideos) : 0;

    // Get recent videos (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentVideos = channel.videos.filter((video: any) => 
      video.publishedAt >= thirtyDaysAgo
    );

    // Get top performing videos
    const topVideos = channel.videos
      .sort((a: any, b: any) => b.viewCount - a.viewCount)
      .slice(0, 10);

    res.json({
      channel: {
        id: channel.id,
        channelId: channel.channelId,
        channelTitle: channel.channelTitle,
        subscriberCount: channel.subscriberCount,
        viewCount: channel.viewCount,
        videoCount: channel.videoCount,
        lastSyncAt: channel.lastSyncAt
      },
      analytics: {
        totalVideos,
        totalViews,
        totalLikes,
        totalComments,
        shortsCount,
        longFormCount,
        avgViews,
        avgLikes,
        avgComments
      },
      recentVideos: recentVideos.length,
      topVideos: topVideos.map((video: any) => ({
        id: video.id,
        videoId: video.videoId,
        title: video.title,
        viewCount: video.viewCount,
        likeCount: video.likeCount,
        commentCount: video.commentCount,
        publishedAt: video.publishedAt,
        isShort: video.isShort,
        thumbnailUrl: video.thumbnailUrl
      }))
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
} 