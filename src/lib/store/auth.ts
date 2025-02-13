import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      login: (userId: string) => set({ isAuthenticated: true, userId }),
      logout: () => set({ isAuthenticated: false, userId: null }),
    }),
    { name: "auth-storage" }
  )
);
