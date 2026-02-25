import { MOCK_PAGES } from "../providers/mock/mock-data";
import { PageDefinition, UserRole } from "../content/schemas";
import { authService } from "./auth.service";

export const pageService = {
  getPageBySlug: async (slug: string): Promise<PageDefinition | null> => {
    const { role } = await authService.getCurrentUser();
    
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 150));

    const page = MOCK_PAGES.find(p => p.slug === slug);
    if (!page) return null;

    return {
      ...page,
      sections: page.sections
        .filter(s => s.isActive && authService.hasAccess(s.roles, role))
        .sort((a, b) => a.order - b.order)
    };
  }
};
