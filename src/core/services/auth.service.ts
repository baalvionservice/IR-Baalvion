import { UserRole } from "../content/schemas";

export const authService = {
  getCurrentUser: async () => {
    // Mock latency
    await new Promise(resolve => setTimeout(resolve, 50));
    
    if (typeof window === 'undefined') return { role: 'public' as UserRole };
    
    const role = localStorage.getItem('baalvion_user_role') as UserRole || 'public';
    return { role };
  },

  setRole: async (role: UserRole) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('baalvion_user_role', role);
      // Compatibility with existing simulation logic
      if (role === 'phase1') localStorage.setItem('hasPhase1Applied', 'true');
      if (role === 'phase2') localStorage.setItem('hasPhase2Applied', 'true');
      if (role === 'phase3') localStorage.setItem('hasPhase3Applied', 'true');
      
      window.dispatchEvent(new Event('storage'));
    }
  },

  hasAccess: (resourceRoles: UserRole[], userRole: UserRole): boolean => {
    if (resourceRoles.length === 0) return true;
    return resourceRoles.includes(userRole);
  }
};
