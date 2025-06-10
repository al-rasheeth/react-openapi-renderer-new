import { create } from 'zustand';
import type { AuthSlice } from './slices/authSlice';
import type { UISlice } from './slices/uiSlice';
import { createAuthSlice } from './slices/authSlice';
import { createUISlice } from './slices/uiSlice';

// Create separate stores for each slice
export const useAuthStore = create<AuthSlice>()(createAuthSlice);
export const useUIStore = create<UISlice>()(createUISlice);

// Optional: Create a hook to use multiple stores together
export const useStores = () => {
  const auth = useAuthStore();
  const ui = useUIStore();
  return { auth, ui };
}; 