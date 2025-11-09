import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, AppSettings } from '@/types';
import { getUserProfile, createUserProfile, updateUserProfile, getUserSettings, saveUserSettings } from '@/lib/firebase/firestore';

interface UserState {
  profile: UserProfile | null;
  settings: AppSettings | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProfile: (profile: UserProfile) => void;
  loadProfile: (userId: string) => Promise<void>;
  createProfile: (profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;

  loadSettings: (userId: string) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;

  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      settings: null,
      isLoading: false,
      error: null,

      setProfile: (profile) => set({ profile }),

      loadProfile: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const profile = await getUserProfile(userId);
          set({ profile, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      createProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const profile = await createUserProfile(profileData);
          set({ profile, isLoading: false });

          // Create default settings
          const settings: AppSettings = {
            userId: profile.id,
            theme: 'auto',
            voiceGuidance: false,
            notificationsEnabled: true,
            workoutReminders: true,
            updatedAt: new Date()
          };
          await saveUserSettings(settings);
          set({ settings });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      updateProfile: async (updates) => {
        const { profile } = get();
        if (!profile) return;

        set({ isLoading: true, error: null });
        try {
          await updateUserProfile(profile.id, updates);
          set({ profile: { ...profile, ...updates }, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      loadSettings: async (userId: string) => {
        try {
          const settings = await getUserSettings(userId);
          set({ settings });
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      },

      updateSettings: async (updates) => {
        const { settings } = get();
        if (!settings) return;

        try {
          const newSettings = { ...settings, ...updates, updatedAt: new Date() };
          await saveUserSettings(newSettings);
          set({ settings: newSettings });
        } catch (error) {
          console.error('Error updating settings:', error);
        }
      },

      clearUser: () => set({ profile: null, settings: null, error: null })
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ profile: state.profile, settings: state.settings })
    }
  )
);
