import { UserRole } from "../content/schemas";
import { ApiResponse } from "@/types/api.types";

export const authService = {
  getCurrentUser: async (): Promise<{ role: UserRole }> => {
    if (typeof window === 'undefined') return { role: 'public' as UserRole };
    const role = localStorage.getItem('baalvion_user_role') as UserRole || 'public';
    return { role };
  },

  setRole: async (role: UserRole): Promise<ApiResponse<boolean>> => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('baalvion_user_role', role);
      if (role === 'phase1') localStorage.setItem('hasPhase1Applied', 'true');
      if (role === 'phase2') localStorage.setItem('hasPhase2Applied', 'true');
      if (role === 'phase3') localStorage.setItem('hasPhase3Applied', 'true');
      
      window.dispatchEvent(new Event('storage'));
    }
    return {
      success: true,
      data: true,
      meta: { timestamp: Date.now(), requestId: 'auth-001', environment: 'mock' }
    };
  },

  hasAccess: (resourceRoles: UserRole[], userRole: UserRole): boolean => {
    if (resourceRoles.length === 0) return true;
    return resourceRoles.includes(userRole);
  }
};
