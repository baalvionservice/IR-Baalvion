import { MOCK_NAVIGATION } from "../providers/mock/mock-data";
import { authService } from "./auth.service";
import { NavigationItem, UserRole } from "../content/schemas";

export const navigationService = {
  getNavigation: async (type: 'public' | 'authenticated' = 'public'): Promise<NavigationItem[]> => {
    const { role } = await authService.getCurrentUser();
    
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 100));

    const filterItems = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter(item => item.isActive && authService.hasAccess(item.roles, role))
        .map(item => ({
          ...item,
          children: item.children ? filterItems(item.children) : undefined
        }))
        .sort((a, b) => a.order - b.order);
    };

    return filterItems(MOCK_NAVIGATION);
  }
};
