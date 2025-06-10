import { create } from 'zustand';
import type { UISlice } from './slices/uiSlice';
import { createUISlice } from './slices/uiSlice';

export const useUIStore = create<UISlice>()(createUISlice); 