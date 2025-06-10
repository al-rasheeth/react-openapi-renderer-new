import type { StateCreator } from 'zustand';
import type { UserPermissions, Permission, Role } from '../../../App/routes/types';

export interface AuthSlice extends UserPermissions {
  isAuthenticated: boolean;
  setAuth: (isAuthenticated: boolean) => void;
  setPermissions: (permissions: UserPermissions) => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  isAuthenticated: false,
  roles: [],
  permissions: [],
  setAuth: (isAuthenticated) => set({ isAuthenticated }),
  setPermissions: (permissions) => set(permissions),
  hasPermission: (permission) => get().permissions.includes(permission),
  hasRole: (role) => get().roles.includes(role),
  hasAnyPermission: (permissions) => 
    permissions.some((permission) => get().permissions.includes(permission)),
  hasAllPermissions: (permissions) => 
    permissions.every((permission) => get().permissions.includes(permission)),
}); 