import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import z from 'zod';

const router = Router();
const prisma = new PrismaClient();

const analyticsSchema = z.object({
  title: z.string(),
  views: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
  comments: z.number().int().nonnegative(),
});

// Create analytics
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const data = analyticsSchema.parse(req.body);
    const analytics = await prisma.analytics.create({
      data: { ...data, userId: req.user.userId },
    });
    res.status(201).json(analytics);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get all analytics for user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const analytics = await prisma.analytics.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(analytics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update analytics
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = parseInt(req.params.id);
    const data = analyticsSchema.partial().parse(req.body);
    const analytics = await prisma.analytics.update({
      where: { id, userId: req.user.userId },
      data,
    });
    res.json(analytics);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete analytics
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = parseInt(req.params.id);
    await prisma.analytics.delete({ where: { id, userId: req.user.userId } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 