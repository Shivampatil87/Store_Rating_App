import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '../lib/types';
import { mockApi } from '../lib/mock-data';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  signup: (userData: Partial<User>) => Promise<User>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const user = await mockApi.login(email, password);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true });
        try {
          const user = await mockApi.signup(userData);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user) => {
        set({
          user,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;