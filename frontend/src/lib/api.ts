const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Types
export interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
}

export interface Analytics {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface AnalyticsSummary {
  summary: {
    totalVideos: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    avgViews: number;
    avgLikes: number;
    avgComments: number;
  };
  recentAnalytics: Analytics[];
  topVideos: Analytics[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API Client
class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(email: string, password: string): Promise<{ id: number; email: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await this.request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return this.request('/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  // User endpoints
  async getMe(): Promise<User> {
    return this.request('/user/me');
  }

  async updateProfile(data: { email?: string; currentPassword?: string; newPassword?: string }): Promise<User> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllUsers(page = 1, limit = 10, search?: string): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return this.request(`/user/all?${params}`);
  }

  async deleteUser(userId: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/user/${userId}`, {
      method: 'DELETE',
    });
  }

  async changeUserRole(userId: number, role: 'user' | 'admin'): Promise<User> {
    return this.request(`/user/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  // Analytics endpoints
  async getAnalytics(
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    search?: string
  ): Promise<PaginatedResponse<Analytics>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(search && { search }),
    });
    return this.request(`/analytics?${params}`);
  }

  async getAnalyticsById(id: number): Promise<Analytics> {
    return this.request(`/analytics/${id}`);
  }

  async createAnalytics(data: { title: string; views: number; likes: number; comments: number }): Promise<Analytics> {
    return this.request('/analytics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAnalytics(
    id: number,
    data: { title?: string; views?: number; likes?: number; comments?: number }
  ): Promise<Analytics> {
    return this.request(`/analytics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAnalytics(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/analytics/${id}`, {
      method: 'DELETE',
    });
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    return this.request('/analytics/summary');
  }

  // YouTube endpoints
  async getYouTubeAuthUrl(): Promise<{ authUrl: string }> {
    return this.request('/youtube/auth-url');
  }

  async handleYouTubeCallback(code: string): Promise<{ success: boolean; message: string; channels: any[] }> {
    return this.request('/youtube/callback', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
  }

  async getConnectedChannels(): Promise<any[]> {
    return this.request('/youtube/channels');
  }

  async syncChannelData(channelId: number): Promise<{ success: boolean; message: string; videosCount: number; videos: any[] }> {
    return this.request(`/youtube/channels/${channelId}/sync`, {
      method: 'POST'
    });
  }

  async disconnectChannel(channelId: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/youtube/channels/${channelId}`, {
      method: 'DELETE'
    });
  }

  async getChannelAnalytics(channelId: number): Promise<any> {
    return this.request(`/youtube/channels/${channelId}/analytics`);
  }

  // Combined analytics endpoints
  async getCombinedAnalytics(
    page = 1,
    limit = 10,
    sortBy = 'publishedAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    search?: string,
    format?: string
  ): Promise<PaginatedResponse<any>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(search && { search }),
      ...(format && { format })
    });
    return this.request(`/analytics/combined?${params}`);
  }

  async getCombinedSummary(): Promise<any> {
    return this.request('/analytics/combined-summary');
  }
}

export const apiClient = new ApiClient(); 