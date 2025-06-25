import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getMe(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: userReq.user.userId }, select: { id: true, email: true, createdAt: true, role: true } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user || userReq.user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }
    
    const { page = '1', limit = '10', search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const where: any = {};
    if (search) {
      where.email = { contains: search as string, mode: 'insensitive' };
    }
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({ 
        where,
        select: { id: true, email: true, createdAt: true, role: true },
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);
    
    res.json({
      data: users,
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

export async function updateProfile(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    const { email, currentPassword, newPassword } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: userReq.user.userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const updateData: any = {};
    
    // Update email if provided
    if (email && email !== user.email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: 'Email already in use' });
        return;
      }
      updateData.email = email;
    }
    
    // Update password if provided
    if (currentPassword && newPassword) {
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        res.status(400).json({ error: 'Current password is incorrect' });
        return;
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }
    
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No changes provided' });
      return;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userReq.user.userId },
      data: updateData,
      select: { id: true, email: true, createdAt: true, role: true }
    });
    
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user || userReq.user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }
    
    const userId = parseInt(req.params.id);
    
    // Prevent admin from deleting themselves
    if (userId === userReq.user.userId) {
      res.status(400).json({ error: 'Cannot delete your own account' });
      return;
    }
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    // Delete user's analytics first
    await prisma.analytics.deleteMany({ where: { userId } });
    
    // Delete user
    await prisma.user.delete({ where: { id: userId } });
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function changeUserRole(req: Request, res: Response): Promise<void> {
  const userReq = req as any;
  try {
    if (!userReq.user || userReq.user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }
    
    const userId = parseInt(req.params.id);
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }
    
    // Prevent admin from changing their own role
    if (userId === userReq.user.userId) {
      res.status(400).json({ error: 'Cannot change your own role' });
      return;
    }
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, createdAt: true, role: true }
    });
    
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
} 