import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import youtubeRoutes from './routes/youtubeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API is running!' });
});

app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/youtube', youtubeRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 