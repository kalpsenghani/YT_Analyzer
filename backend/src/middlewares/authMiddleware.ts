import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    (req as any).user = user as { userId: number, role: string };
    next();
  });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const userReq = req as any;
  if (!userReq.user || userReq.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
} 