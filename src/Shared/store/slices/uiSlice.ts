import type { StateCreator } from 'zustand';

export interface UISlice {
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  // Layout
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  // Loading states
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Theme
  isDarkMode: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Layout
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Notifications
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [...state.notifications, notification] 
    })),
  removeNotification: (id) => 
    set((state) => ({ 
      notifications: state.notifications.filter((n) => n.id !== id) 
    })),
}); 