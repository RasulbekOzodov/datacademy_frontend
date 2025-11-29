import { create } from 'zustand';
import { authAPI } from '../api/auth';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      await authAPI.login(email, password);
      const user = await authAPI.getMe();
      set({ user, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  register: async (email, password) => {
    set({ loading: true });
    try {
      await authAPI.register(email, password);
      set({ loading: false });
      return true;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    authAPI.logout();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const user = await authAPI.getMe();
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      authAPI.logout();
    }
  }
}));
