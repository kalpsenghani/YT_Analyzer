const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-accessToken -refreshToken');

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid or inactive user' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

// Middleware to check if user has valid YouTube tokens
const requireYouTubeAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await User.findById(req.user._id);
    
    if (!user.accessToken) {
      return res.status(403).json({ 
        error: 'YouTube authentication required',
        needsAuth: true 
      });
    }

    // Check if token is expired
    if (user.isTokenExpired()) {
      if (!user.refreshToken) {
        return res.status(403).json({ 
          error: 'YouTube token expired. Please re-authenticate.',
          needsAuth: true 
        });
      }

      // Try to refresh the token
      try {
        const { refreshAccessToken } = require('../config/googleAuth');
        const newTokens = await refreshAccessToken(user.refreshToken);
        await user.updateTokens(
          newTokens.access_token,
          user.refreshToken,
          new Date(newTokens.expiry_date)
        );
        req.user = user;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return res.status(403).json({ 
          error: 'YouTube token refresh failed. Please re-authenticate.',
          needsAuth: true 
        });
      }
    }

    next();
  } catch (error) {
    console.error('YouTube auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = {
  authenticateToken,
  requireYouTubeAuth,
  requireAdmin,
  generateToken
}; 