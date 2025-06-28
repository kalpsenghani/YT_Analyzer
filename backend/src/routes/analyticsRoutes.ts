import { Router } from 'express';
import { 
  createAnalytics, 
  getAnalytics, 
  updateAnalytics, 
  deleteAnalytics, 
  getAnalyticsSummary, 
  getAnalyticsById,
  getCombinedAnalytics,
  getCombinedSummary
} from '../controllers/analyticsController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createAnalytics);
router.get('/', authenticateToken, getAnalytics);
router.get('/summary', authenticateToken, getAnalyticsSummary);
router.get('/:id', authenticateToken, getAnalyticsById);
router.put('/:id', authenticateToken, updateAnalytics);
router.delete('/:id', authenticateToken, deleteAnalytics);

// Combined analytics endpoints (includes YouTube data)
router.get('/combined', authenticateToken, getCombinedAnalytics);
router.get('/combined-summary', authenticateToken, getCombinedSummary);

export default router; 