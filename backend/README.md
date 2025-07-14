# YouTube Analyzer Backend

A Node.js/Express backend for analyzing YouTube video performance, comparing Shorts vs Long-form content, and providing insights for content creators.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 📊 **YouTube Data API Integration** - Fetch channel and video data
- 📈 **Analytics Dashboard** - Performance metrics and insights
- 🎯 **Shorts vs Long-form Comparison** - Detailed performance analysis
- 📱 **RESTful API** - Clean, documented endpoints
- 🗄️ **MongoDB Database** - Scalable data storage
- 🔒 **JWT Authentication** - Secure API access

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth 2.0 + JWT
- **API**: YouTube Data API v3
- **Development**: Nodemon for hot reloading

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Cloud Console project with YouTube Data API enabled

### Installation

1. **Clone and install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/youtube-analyzer
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   YOUTUBE_API_KEY=your-youtube-api-key
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `GET /api/auth/google/url` - Get Google OAuth URL
- `GET /api/auth/google/callback` - Handle OAuth callback
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/youtube/status` - Check YouTube auth status

### YouTube Data
- `GET /api/youtube/channels` - Get user's YouTube channels
- `POST /api/youtube/channels/:channelId/sync` - Sync channel videos
- `GET /api/youtube/videos` - Get user's videos
- `GET /api/youtube/videos/:videoId` - Get video details
- `PUT /api/youtube/videos/:videoId/stats` - Update video stats
- `DELETE /api/youtube/videos/:videoId` - Delete video
- `DELETE /api/youtube/videos` - Clear all videos
- `GET /api/youtube/trending` - Get trending videos

### Analytics
- `GET /api/analysis/analytics` - Get user analytics
- `GET /api/analysis/comparison` - Compare Shorts vs Long-form
- `GET /api/analysis/trends` - Get performance trends
- `GET /api/analysis/top-videos` - Get top performing videos
- `GET /api/analysis/insights` - Get engagement insights
- `GET /api/analysis/recommendations` - Get content recommendations
- `GET /api/analysis/summary` - Get performance summary
- `GET /api/analysis/dashboard` - Get dashboard data

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - Your production domain (production)
6. Copy Client ID and Client Secret to `.env`

## Database Schema

### User Model
- Google OAuth integration
- YouTube access tokens
- Profile information
- Role-based access

### Video Model
- YouTube video metadata
- Performance statistics
- Engagement metrics
- Shorts vs Long-form classification

## Development

```bash
# Start development server
npm run dev

# Start production server
npm start

# Health check
curl http://localhost:5000/health
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GOOGLE_REDIRECT_URI` | OAuth redirect URI | Yes |
| `YOUTUBE_API_KEY` | YouTube Data API key | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional details (optional)"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- JWT token authentication
- CORS protection
- Input validation
- Error sanitization
- Secure token storage
- OAuth 2.0 flow

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 