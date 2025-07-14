const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: String,
    default: null
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  accessToken: {
    type: String,
    default: null
  },
  refreshToken: {
    type: String,
    default: null
  },
  tokenExpiry: {
    type: Date,
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

// Method to check if token is expired
userSchema.methods.isTokenExpired = function() {
  if (!this.tokenExpiry) return true;
  return new Date() > this.tokenExpiry;
};

// Method to update tokens
userSchema.methods.updateTokens = function(accessToken, refreshToken, expiryDate) {
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
  this.tokenExpiry = expiryDate;
  this.lastLogin = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 