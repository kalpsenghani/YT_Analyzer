import { Router } from 'express';
import { 
  getAuthUrl, 
  handleCallback, 
  getConnectedChannels, 
  syncChannelData, 
  disconnectChannel, 
  getChannelAnalytics 
} from '../controllers/youtubeController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// YouTube authentication routes
router.get('/auth-url', authenticateToken, getAuthUrl);
router.post('/callback', authenticateToken, handleCallback);

// YouTube channel management routes
router.get('/channels', authenticateToken, getConnectedChannels);
router.post('/channels/:channelId/sync', authenticateToken, syncChannelData);
router.delete('/channels/:channelId', authenticateToken, disconnectChannel);
router.get('/channels/:channelId/analytics', authenticateToken, getChannelAnalytics);

export default router; 