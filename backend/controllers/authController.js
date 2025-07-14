const User = require('../models/User');
const { generateAuthUrl, getTokensFromCode, getUserInfo } = require('../config/googleAuth');
const { generateToken } = require('../utils/authMiddleware');

// Generate Google OAuth URL
const getAuthUrl = async (req, res) => {
  try {
    const authUrl = generateAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate authentication URL' });
  }
};

// Handle Google OAuth callback
const handleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange code for tokens
    const tokens = await getTokensFromCode(code);
    
    // Get user info from Google
    const userInfo = await getUserInfo(tokens.access_token);
    
    // Find or create user
    let user = await User.findOne({ googleId: userInfo.id });
    
    if (!user) {
      // Create new user
      user = new User({
        googleId: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry: new Date(tokens.expiry_date)
      });
    } else {
      // Update existing user's tokens
      await user.updateTokens(
        tokens.access_token,
        tokens.refresh_token,
        new Date(tokens.expiry_date)
      );
    }

    await user.save();

    // Generate JWT token
    const jwtToken = generateToken(user._id);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${jwtToken}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-accessToken -refreshToken');
    res.json(user);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      user.email = email;
    }

    await user.save();
    
    const updatedUser = await User.findById(user._id).select('-accessToken -refreshToken');
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    // In a real app, you might want to invalidate the token
    // For now, we'll just return success
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

// Check if user has valid YouTube tokens
const checkYouTubeAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.accessToken) {
      return res.json({ hasAuth: false });
    }

    if (user.isTokenExpired()) {
      return res.json({ hasAuth: false, expired: true });
    }

    res.json({ hasAuth: true });
  } catch (error) {
    console.error('Error checking YouTube auth:', error);
    res.status(500).json({ error: 'Failed to check authentication status' });
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
  getProfile,
  updateProfile,
  logout,
  checkYouTubeAuth
}; 