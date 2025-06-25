import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from './api';
import type { User, Analytics, AnalyticsSummary } from './api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AnalyticsState {
  analytics: Analytics[];
  summary: AnalyticsSummary | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

interface AppState extends AuthState, AnalyticsState {
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
  
  // Utility actions
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      analytics: [],
      summary: null,
      pagination: null,

      // Auth actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.login(email, password);
          await get().loadUser();
          set({ isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Login failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.register(email, password);
          set({ error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Registration failed' });
        } finally {
          set({ isLoading: false });
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
        set({ isLoading: true, error: null });
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
          set({ isLoading: false });
        }
      },

      fetchSummary: async () => {
        set({ isLoading: true, error: null });
        try {
          const summary = await apiClient.getAnalyticsSummary();
          set({ summary, error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch summary' });
        } finally {
          set({ isLoading: false });
        }
      },

      createAnalytics: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.createAnalytics(data);
          // Refresh analytics list
          await get().fetchAnalytics();
          await get().fetchSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to create analytics' });
        } finally {
          set({ isLoading: false });
        }
      },

      updateAnalytics: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.updateAnalytics(id, data);
          // Refresh analytics list
          await get().fetchAnalytics();
          await get().fetchSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update analytics' });
        } finally {
          set({ isLoading: false });
        }
      },

      deleteAnalytics: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.deleteAnalytics(id);
          // Refresh analytics list
          await get().fetchAnalytics();
          await get().fetchSummary();
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete analytics' });
        } finally {
          set({ isLoading: false });
        }
      },

      // Utility actions
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
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