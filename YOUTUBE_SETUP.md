# YouTube API Integration Setup Guide

## Prerequisites

1. **Google Cloud Console Account**: You need a Google account to access the Google Cloud Console
2. **YouTube Channel**: You need a YouTube channel to connect and analyze

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized redirect URIs:
   - `http://localhost:3000/youtube/callback` (for development)
   - `https://yourdomain.com/youtube/callback` (for production)
5. Note down your Client ID and Client Secret

## Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yt_analyzer"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# YouTube API Configuration
YOUTUBE_CLIENT_ID="your-youtube-client-id"
YOUTUBE_CLIENT_SECRET="your-youtube-client-secret"
YOUTUBE_REDIRECT_URI="http://localhost:3000/youtube/callback"

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Step 4: Run Database Migrations

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

## Step 5: Start the Application

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

## Step 6: Connect Your YouTube Account

1. Navigate to the Analytics page
2. Click "Connect YouTube" button
3. Authorize the application to access your YouTube data
4. Your channels will be automatically imported

## Features

### ✅ Implemented Features

- **YouTube OAuth2 Authentication**: Secure connection to YouTube accounts
- **Channel Management**: View and manage connected YouTube channels
- **Video Data Sync**: Fetch real video data from YouTube API
- **Combined Analytics**: View both manual and YouTube data together
- **Real-time Metrics**: Views, likes, comments, engagement rates
- **Shorts Detection**: Automatic detection of YouTube Shorts
- **Data Persistence**: Store YouTube data in PostgreSQL database
- **Token Refresh**: Automatic token refresh for continuous access

### 🔄 Data Synchronization

- **Manual Sync**: Click sync button to refresh channel data
- **Video Details**: Title, description, views, likes, comments
- **Performance Metrics**: Engagement rates, view counts, etc.
- **Format Classification**: Automatic shorts vs long-form detection

### 📊 Analytics Dashboard

- **Combined View**: See all your content in one place
- **Performance Trends**: Track metrics over time
- **Engagement Analysis**: Views vs engagement rate scatter plots
- **Filtering**: Filter by format (shorts/long-form), date, etc.
- **Search**: Search through your video titles

## API Endpoints

### YouTube Endpoints
- `GET /api/youtube/auth-url` - Get YouTube authorization URL
- `GET /api/youtube/callback` - Handle OAuth callback
- `GET /api/youtube/channels` - Get connected channels
- `POST /api/youtube/channels/:id/sync` - Sync channel data
- `DELETE /api/youtube/channels/:id` - Disconnect channel
- `GET /api/youtube/channels/:id/analytics` - Get channel analytics

### Combined Analytics Endpoints
- `GET /api/analytics/combined` - Get combined analytics (manual + YouTube)
- `GET /api/analytics/combined-summary` - Get combined summary

## Troubleshooting

### Common Issues

1. **"YouTube API credentials not configured"**
   - Make sure you've set `YOUTUBE_CLIENT_ID` and `YOUTUBE_CLIENT_SECRET` in your `.env` file

2. **"No YouTube channels found"**
   - Ensure you have a YouTube channel associated with your Google account
   - Make sure you've granted the necessary permissions during OAuth

3. **"Token expired"**
   - The system automatically refreshes tokens, but if it fails, try reconnecting your account

4. **"Failed to fetch videos"**
   - Check your internet connection
   - Verify that your YouTube channel has public videos
   - Ensure the YouTube Data API v3 is enabled in Google Cloud Console

### Rate Limits

The YouTube Data API has rate limits:
- 10,000 units per day (free tier)
- Each API call costs different units
- Monitor your usage in Google Cloud Console

## Security Notes

- Never commit your `.env` file to version control
- Keep your Client Secret secure
- Use HTTPS in production
- Regularly rotate your JWT secret

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend logs for API errors
3. Verify your Google Cloud Console configuration
4. Ensure all environment variables are set correctly 