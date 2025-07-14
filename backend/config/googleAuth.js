const { google } = require('googleapis');

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});

// Generate OAuth URL
const generateAuthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
};

// Exchange code for tokens
const getTokensFromCode = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw error;
  }
};

// Set credentials
const setCredentials = (tokens) => {
  oauth2Client.setCredentials(tokens);
};

// Refresh access token
const refreshAccessToken = async (refreshToken) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });
    
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// Get user info from Google
const getUserInfo = async (accessToken) => {
  try {
    const oauth2 = google.oauth2({
      version: 'v2',
      auth: oauth2Client
    });
    
    oauth2Client.setCredentials({ access_token: accessToken });
    const { data } = await oauth2.userinfo.get();
    return data;
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
};

module.exports = {
  oauth2Client,
  youtube,
  generateAuthUrl,
  getTokensFromCode,
  setCredentials,
  refreshAccessToken,
  getUserInfo
}; 