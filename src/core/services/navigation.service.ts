import { MOCK_NAVIGATION } from "../providers/mock/mock-data";
import { authService } from "./auth.service";
import { NavigationItem, UserRole } from "../content/schemas";

// In-memory simulation of stateful navigation for the session
let navigationState = [...MOCK_NAVIGATION];

export const navigationService = {
  getNavigation: async (): Promise<NavigationItem[]> => {
    const { role } = await authService.getCurrentUser();
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

    return filterItems(navigationState);
  },

  getAllItems: async (): Promise<NavigationItem[]> => {
    // Admin version: returns everything unfiltered
    await new Promise(resolve => setTimeout(resolve, 100));
    return navigationState.sort((a, b) => a.order - b.order);
  },

  updateItem: async (itemId: string, updates: Partial<NavigationItem>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updateRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items.map(item => {
        if (item.id === itemId) return { ...item, ...updates };
        if (item.children) return { ...item, children: updateRecursive(item.children) };
        return item;
      });
    };

    navigationState = updateRecursive(navigationState);
    window.dispatchEvent(new Event('navigation-updated'));
  },

  addItem: async (parentPath: string | null, item: Omit<NavigationItem, 'id'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newItem = { ...item, id: `nav-${Math.random().toString(36).substr(2, 9)}` };
    
    if (!parentPath) {
      navigationState.push(newItem as NavigationItem);
    } else {
      const addRecursive = (items: NavigationItem[]): NavigationItem[] => {
        return items.map(node => {
          if (node.id === parentPath) {
            return { ...node, children: [...(node.children || []), newItem as NavigationItem] };
          }
          if (node.children) return { ...node, children: addRecursive(node.children) };
          return node;
        });
      };
      navigationState = addRecursive(navigationState);
    }
    window.dispatchEvent(new Event('navigation-updated'));
  },

  deleteItem: async (itemId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const deleteRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter(item => item.id !== itemId)
        .map(item => ({
          ...item,
          children: item.children ? deleteRecursive(item.children) : undefined
        }));
    };
    navigationState = deleteRecursive(navigationState);
    window.dispatchEvent(new Event('navigation-updated'));
  }
};
