import { MOCK_PAGES } from "../providers/mock/mock-data";
import { PageDefinition, PageSection, UserRole } from "../content/schemas";
import { authService } from "./auth.service";
import { auditService } from "./audit.service";
import { validationService } from "./validation.service";

let pagesState = MOCK_PAGES.map(p => ({ ...p, status: 'Published' as const }));

export const pageService = {
  getPageBySlug: async (slug: string): Promise<PageDefinition | null> => {
    const { role } = await authService.getCurrentUser();
    await new Promise(resolve => setTimeout(resolve, 150));

    const page = pagesState.find(p => p.slug === slug);
    if (!page) return null;

    return {
      ...page,
      sections: page.sections
        .filter(s => s.isActive && authService.hasAccess(s.roles, role))
        .sort((a, b) => a.order - b.order)
    };
  },

  getAllPages: async (): Promise<PageDefinition[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return pagesState;
  },

  updatePage: async (pageId: string, updates: Partial<PageDefinition>): Promise<void> => {
    const { role } = await authService.getCurrentUser();
    
    if (updates.slug) {
      const validation = await validationService.validateSlug(updates.slug, pageId);
      if (!validation.valid) throw new Error(validation.message);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    
    const previousPage = pagesState.find(p => p.id === pageId);
    pagesState = pagesState.map(p => p.id === pageId ? { ...p, ...updates } : p);
    
    await auditService.log({
      userRole: role,
      module: 'Pages',
      action: 'edit',
      entityId: pageId,
      previousState: previousPage,
      newState: updates
    });

    window.dispatchEvent(new CustomEvent('storage'));
  },

  updateSection: async (pageId: string, sectionId: string, updates: Partial<PageSection>): Promise<void> => {
    const { role } = await authService.getCurrentUser();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    pagesState = pagesState.map(p => {
      if (p.id !== pageId) return p;
      return {
        ...p,
        sections: p.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s)
      };
    });

    await auditService.log({
      userRole: role,
      module: 'Pages',
      action: 'edit',
      entityId: `${pageId}/${sectionId}`,
      newState: updates
    });

    window.dispatchEvent(new CustomEvent('storage'));
  }
};
