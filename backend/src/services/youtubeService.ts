import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// YouTube API configuration
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

const youtube = google.youtube('v3');

export interface YouTubeChannelData {
  channelId: string;
  channelTitle: string;
  channelDescription?: string;
  subscriberCount?: number;
  viewCount?: number;
  videoCount?: number;
}

export interface YouTubeVideoData {
  videoId: string;
  title: string;
  description?: string;
  publishedAt: string;
  duration?: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnailUrl?: string;
  tags?: string[];
  categoryId?: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
  isShort: boolean;
}

export class YouTubeService {
  private auth: any;

  constructor() {
    this.auth = null;
  }

  // Initialize OAuth2 client
  async initializeAuth(clientId: string, clientSecret: string, redirectUri: string) {
    this.auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  }

  // Generate authorization URL
  generateAuthUrl(): string {
    if (!this.auth) {
      throw new Error('YouTube service not initialized');
    }

    return this.auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(code: string): Promise<{
    access_token: string;
    refresh_token: string;
    expiry_date: number;
  }> {
    if (!this.auth) {
      throw new Error('YouTube service not initialized');
    }

    const { tokens } = await this.auth.getToken(code);
    return {
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token!,
      expiry_date: tokens.expiry_date!
    };
  }

  // Set credentials for API calls
  async setCredentials(accessToken: string, refreshToken?: string) {
    if (!this.auth) {
      throw new Error('YouTube service not initialized');
    }

    this.auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }

  // Get user's YouTube channels
  async getMyChannels(): Promise<YouTubeChannelData[]> {
    if (!this.auth) {
      throw new Error('YouTube service not initialized');
    }

    try {
      const response = await youtube.channels.list({
        auth: this.auth,
        part: ['snippet', 'statistics'],
        mine: true
      });

      return response.data.items?.map(item => ({
        channelId: item.id!,
        channelTitle: item.snippet!.title!,
        channelDescription: item.snippet!.description ?? undefined,
        subscriberCount: parseInt(item.statistics!.subscriberCount || '0'),
        viewCount: parseInt(item.statistics!.viewCount || '0'),
        videoCount: parseInt(item.statistics!.videoCount || '0')
      })) || [];
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw new Error('Failed to fetch YouTube channels');
    }
  }

  // Get videos from a channel
  async getChannelVideos(channelId: string, maxResults: number = 50): Promise<YouTubeVideoData[]> {
    if (!this.auth) {
      throw new Error('YouTube service not initialized');
    }

    try {
      // First, get the channel's uploads playlist
      const channelResponse = await youtube.channels.list({
        auth: this.auth,
        part: ['contentDetails'],
        id: [channelId]
      });

      const uploadsPlaylistId = channelResponse.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (!uploadsPlaylistId) {
        throw new Error('Could not find uploads playlist');
      }

      // Get videos from the uploads playlist
      const playlistResponse = await youtube.playlistItems.list({
        auth: this.auth,
        part: ['snippet', 'contentDetails'],
        playlistId: uploadsPlaylistId,
        maxResults
      });

      // Ensure videoIds is a string array
      const videoIds = (playlistResponse.data.items?.map(item => item.contentDetails?.videoId).filter((id): id is string => !!id)) || [];

      if (videoIds.length === 0) {
        return [];
      }

      // Get detailed video information (await the promise!)
      const videosResponse = await youtube.videos.list({
        auth: this.auth,
        part: ['snippet', 'statistics', 'contentDetails'],
        id: videoIds
      });

      return videosResponse.data.items?.map(video => {
        const duration = video.contentDetails?.duration;
        const isShort = this.isShortVideo(duration ?? undefined);
        
        return {
          videoId: video.id!,
          title: video.snippet!.title!,
          description: video.snippet!.description ?? undefined,
          publishedAt: video.snippet!.publishedAt!,
          duration: duration ?? undefined,
          viewCount: parseInt(video.statistics?.viewCount || '0'),
          likeCount: parseInt(video.statistics?.likeCount || '0'),
          commentCount: parseInt(video.statistics?.commentCount || '0'),
          thumbnailUrl: video.snippet?.thumbnails?.high?.url ?? undefined,
          tags: video.snippet?.tags || [],
          categoryId: video.snippet?.categoryId ?? undefined,
          defaultLanguage: video.snippet?.defaultLanguage ?? undefined,
          defaultAudioLanguage: video.snippet?.defaultAudioLanguage ?? undefined,
          isShort
        };
      }) || [];
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw new Error('Failed to fetch YouTube videos');
    }
  }

  // Check if video is a short (less than 60 seconds)
  private isShortVideo(duration?: string): boolean {
    if (!duration) return false;
    
    // Parse ISO 8601 duration format (PT1M30S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return false;

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds <= 60;
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    expiry_date: number;
  }> {
    if (!this.auth) {
      throw new Error('YouTube service not initialized');
    }

    this.auth.setCredentials({ refresh_token: refreshToken });
    
    try {
      const { credentials } = await this.auth.refreshAccessToken();
      return {
        access_token: credentials.access_token!,
        expiry_date: credentials.expiry_date!
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new Error('Failed to refresh access token');
    }
  }

  // Check if token is expired
  isTokenExpired(expiryDate: number): boolean {
    return Date.now() >= expiryDate;
  }
}

export const youtubeService = new YouTubeService(); 