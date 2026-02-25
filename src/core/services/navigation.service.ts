import { NavigationItem, UserRole } from "../content/schemas";
import { authService } from "./auth.service";
import { auditService } from "./audit.service";
import { navigationRepository } from "../repositories/navigation.repository";
import { ApiResponse } from "@/types/api.types";

export const navigationService = {
  getNavigation: async (): Promise<ApiResponse<NavigationItem[]>> => {
    const { role } = await authService.getCurrentUser();
    const response = await navigationRepository.findAll();

    if (!response.success) return response;

    const filterItems = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter(item => item.isActive && authService.hasAccess(item.roles, role))
        .map(item => ({
          ...item,
          children: item.children ? filterItems(item.children) : undefined
        }))
        .sort((a, b) => a.order - b.order);
    };

    return {
      ...response,
      data: filterItems(response.data || [])
    };
  },

  getAllItems: async (): Promise<NavigationItem[]> => {
    const response = await navigationRepository.findAll();
    return (response.data || []).sort((a, b) => a.order - b.order);
  },

  updateItem: async (itemId: string, updates: Partial<NavigationItem>): Promise<void> => {
    const { role } = await authService.getCurrentUser();
    const response = await navigationRepository.findAll();
    let data = response.data || [];
    
    let previousState: any = null;
    const updateRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items.map(item => {
        if (item.id === itemId) {
          previousState = { ...item };
          return { ...item, ...updates };
        }
        if (item.children) return { ...item, children: updateRecursive(item.children) };
        return item;
      });
    };

    data = updateRecursive(data);
    await navigationRepository.saveAll(data);
    
    await auditService.log({
      userRole: role,
      module: 'Navigation',
      action: 'edit',
      entityId: itemId,
      previousState,
      newState: updates
    });

    window.dispatchEvent(new Event('navigation-updated'));
  },

  addItem: async (parentPath: string | null, item: Omit<NavigationItem, 'id'>): Promise<void> => {
    const { role } = await authService.getCurrentUser();
    const response = await navigationRepository.findAll();
    let data = response.data || [];

    const newItem = { ...item, id: `nav-${Math.random().toString(36).substr(2, 9)}` };
    
    if (!parentPath) {
      data.push(newItem as NavigationItem);
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
      data = addRecursive(data);
    }

    await navigationRepository.saveAll(data);

    await auditService.log({
      userRole: role,
      module: 'Navigation',
      action: 'create',
      entityId: newItem.id,
      newState: newItem
    });

    window.dispatchEvent(new Event('navigation-updated'));
  },

  deleteItem: async (itemId: string): Promise<void> => {
    const { role } = await authService.getCurrentUser();
    const response = await navigationRepository.findAll();
    let data = response.data || [];
    
    const deleteRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter(item => item.id !== itemId)
        .map(item => ({
          ...item,
          children: item.children ? deleteRecursive(item.children) : undefined
        }));
    };
    data = deleteRecursive(data);
    await navigationRepository.saveAll(data);

    await auditService.log({
      userRole: role,
      module: 'Navigation',
      action: 'delete',
      entityId: itemId
    });

    window.dispatchEvent(new Event('navigation-updated'));
  }
};
