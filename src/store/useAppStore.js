import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // UI State
  isSidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  // Theme
  theme: 'light',
  setTheme: (theme) => set({ theme }),

  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),

  // Loading State
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // Current Upload
  currentUploadId: null,
  setCurrentUploadId: (id) => set({ currentUploadId: id }),

  // User Preferences
  preferences: {
    emailNotifications: true,
    darkMode: false,
  },
  setPreferences: (preferences) => set({ preferences }),
}))
