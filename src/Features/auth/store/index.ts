import { create } from 'zustand';
import type { AuthSlice } from './authSlice';
import { createAuthSlice } from './authSlice';

export const useAuthStore = create<AuthSlice>()(createAuthSlice); 