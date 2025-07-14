const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  channelId: {
    type: String,
    required: true
  },
  channelTitle: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    default: null
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  thumbnailUrl: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  categoryId: {
    type: String,
    default: null
  },
  defaultLanguage: {
    type: String,
    default: null
  },
  defaultAudioLanguage: {
    type: String,
    default: null
  },
  isShort: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
videoSchema.index({ videoId: 1 });
videoSchema.index({ channelId: 1 });
videoSchema.index({ userId: 1 });
videoSchema.index({ publishedAt: -1 });
videoSchema.index({ viewCount: -1 });
videoSchema.index({ isShort: 1 });

// Virtual for engagement rate
videoSchema.virtual('engagementRate').get(function() {
  if (this.viewCount === 0) return 0;
  return ((this.likeCount + this.commentCount) / this.viewCount * 100).toFixed(2);
});

// Virtual for video age in days
videoSchema.virtual('ageInDays').get(function() {
  const now = new Date();
  const published = new Date(this.publishedAt);
  return Math.floor((now - published) / (1000 * 60 * 60 * 24));
});

// Method to update video stats
videoSchema.methods.updateStats = function(stats) {
  this.viewCount = stats.viewCount || this.viewCount;
  this.likeCount = stats.likeCount || this.likeCount;
  this.commentCount = stats.commentCount || this.commentCount;
  this.lastUpdated = new Date();
  return this.save();
};

// Ensure virtuals are included in JSON output
videoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Video', videoSchema); 