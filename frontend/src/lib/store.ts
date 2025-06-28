import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from './api';
import type { User, Analytics, AnalyticsSummary } from './api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isAnalyticsLoading: boolean;
  isSummaryLoading: boolean;
}

interface AnalyticsState {
  analytics: Analytics[];
  summary: AnalyticsSummary | null;
  isAnalyticsLoading: boolean;
  isSummaryLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

interface YouTubeState {
  connectedChannels: any[];
  isYouTubeLoading: boolean;
  isSyncing: boolean;
  combinedAnalytics: any[];
  combinedSummary: any | null;
  isCombinedLoading: boolean;
}

interface AppState extends AuthState, AnalyticsState, YouTubeState {
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  
  // Analytics actions
  fetchAnalytics: (page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc', search?: string) => Promise<void>;
  fetchSummary: () => Promise<void>;
  createAnalytics: (data: { title: string; views: number; likes: number; comments: number }) => Promise<void>;
  updateAnalytics: (id: number, data: Partial<Analytics>) => Promise<void>;
  deleteAnalytics: (id: number) => Promise<void>;
  
  // YouTube actions
  getYouTubeAuthUrl: () => Promise<string>;
  handleYouTubeCallback: (code: string) => Promise<void>;
  fetchConnectedChannels: () => Promise<void>;
  syncChannelData: (channelId: number) => Promise<void>;
  disconnectChannel: (channelId: number) => Promise<void>;
  fetchCombinedAnalytics: (page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc', search?: string, format?: string) => Promise<void>;
  fetchCombinedSummary: () => Promise<void>;
  
  // Utility actions
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isAnalyticsLoading: false,
      isSummaryLoading: false,
      error: null,
      analytics: [],
      summary: null,
      pagination: null,
      connectedChannels: [],
      isYouTubeLoading: false,
      isSyncing: false,
      combinedAnalytics: [],
      combinedSummary: null,
      isCombinedLoading: false,

      // Auth actions
      login: async (email: string, password: string) => {
        set({ error: null });
        try {
          await apiClient.login(email, password);
          await get().loadUser();
          set({ isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Login failed' });
        }
      },

      register: async (email: string, password: string) => {
        set({ error: null });
        try {
          await apiClient.register(email, password);
          set({ error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Registration failed' });
        }
      },

      logout: () => {
        apiClient.clearToken();
        set({
          user: null,
          isAuthenticated: false,
          analytics: [],
          summary: null,
          pagination: null,
          connectedChannels: [],
          combinedAnalytics: [],
          combinedSummary: null,
          error: null,
        });
      },

      loadUser: async () => {
        try {
          const user = await apiClient.getMe();
          set({ user, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
          apiClient.clearToken();
        }
      },

      // Analytics actions
      fetchAnalytics: async (page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search?: string) => {
        set({ isAnalyticsLoading: true, error: null });
        try {
          const response = await apiClient.getAnalytics(page, limit, sortBy, sortOrder, search);
          set({
            analytics: response.data,
            pagination: response.pagination,
            error: null,
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch analytics' });
        } finally {
          set({ isAnalyticsLoading: false });
        }
      },

      fetchSummary: async () => {
        set({ isSummaryLoading: true, error: null });
        try {
          const summary = await apiClient.getAnalyticsSummary();
          set({ summary, error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch summary' });
        } finally {
          set({ isSummaryLoading: false });
        }
      },

      createAnalytics: async (data) => {
        set({ error: null });
        try {
          await apiClient.createAnalytics(data);
          // Refresh analytics list
          await get().fetchAnalytics();
          await get().fetchSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to create analytics' });
        }
      },

      updateAnalytics: async (id, data) => {
        set({ error: null });
        try {
          await apiClient.updateAnalytics(id, data);
          // Refresh analytics list
          await get().fetchAnalytics();
          await get().fetchSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update analytics' });
        }
      },

      deleteAnalytics: async (id) => {
        set({ error: null });
        try {
          await apiClient.deleteAnalytics(id);
          // Refresh analytics list
          await get().fetchAnalytics();
          await get().fetchSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete analytics' });
        }
      },

      // YouTube actions
      getYouTubeAuthUrl: async () => {
        try {
          const response = await apiClient.getYouTubeAuthUrl();
          return response.authUrl;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to get YouTube auth URL' });
          throw error;
        }
      },

      handleYouTubeCallback: async (code: string) => {
        set({ error: null });
        try {
          const response = await apiClient.handleYouTubeCallback(code);
          if (response.success) {
            await get().fetchConnectedChannels();
            await get().fetchCombinedSummary();
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to connect YouTube account' });
        }
      },

      fetchConnectedChannels: async () => {
        set({ isYouTubeLoading: true, error: null });
        try {
          const channels = await apiClient.getConnectedChannels();
          set({ connectedChannels: channels, error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch connected channels' });
        } finally {
          set({ isYouTubeLoading: false });
        }
      },

      syncChannelData: async (channelId: number) => {
        set({ isSyncing: true, error: null });
        try {
          await apiClient.syncChannelData(channelId);
          await get().fetchConnectedChannels();
          await get().fetchCombinedSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to sync channel data' });
        } finally {
          set({ isSyncing: false });
        }
      },

      disconnectChannel: async (channelId: number) => {
        set({ error: null });
        try {
          await apiClient.disconnectChannel(channelId);
          await get().fetchConnectedChannels();
          await get().fetchCombinedSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to disconnect channel' });
        }
      },

      fetchCombinedAnalytics: async (page = 1, limit = 10, sortBy = 'publishedAt', sortOrder = 'desc', search?: string, format?: string) => {
        set({ isCombinedLoading: true, error: null });
        try {
          const response = await apiClient.getCombinedAnalytics(page, limit, sortBy, sortOrder, search, format);
          set({
            combinedAnalytics: response.data,
            pagination: response.pagination,
            error: null,
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch combined analytics' });
        } finally {
          set({ isCombinedLoading: false });
        }
      },

      fetchCombinedSummary: async () => {
        set({ isCombinedLoading: true, error: null });
        try {
          const summary = await apiClient.getCombinedSummary();
          set({ combinedSummary: summary, error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch combined summary' });
        } finally {
          set({ isCombinedLoading: false });
        }
      },

      // Utility actions
      clearError: () => set({ error: null }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 