import { Router } from 'express';
import { createAnalytics, getAnalytics, updateAnalytics, deleteAnalytics, getAnalyticsSummary, getAnalyticsById } from '../controllers/analyticsController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createAnalytics);
router.get('/', authenticateToken, getAnalytics);
router.get('/summary', authenticateToken, getAnalyticsSummary);
router.get('/:id', authenticateToken, getAnalyticsById);
router.put('/:id', authenticateToken, updateAnalytics);
router.delete('/:id', authenticateToken, deleteAnalytics);

export default router; 