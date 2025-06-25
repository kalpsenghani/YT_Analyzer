import { Router } from 'express';
import { getMe, getAllUsers, updateProfile, deleteUser, changeUserRole } from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', authenticateToken, getMe);
router.put('/profile', authenticateToken, updateProfile);

// Admin routes
router.get('/all', authenticateToken, requireAdmin, getAllUsers);
router.delete('/:id', authenticateToken, requireAdmin, deleteUser);
router.put('/:id/role', authenticateToken, requireAdmin, changeUserRole);

export default router; 