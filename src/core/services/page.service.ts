import { MOCK_PAGES } from "../providers/mock/mock-data";
import { PageDefinition, PageSection, UserRole, WorkflowStatus } from "../content/schemas";
import { authService } from "./auth.service";
import { auditService } from "./audit.service";
import { validationService } from "./validation.service";
import { workflowService } from "./workflow.service";
import { notificationService } from "./notification.service";

let pagesState: PageDefinition[] = [...MOCK_PAGES];

export const pageService = {
  getPageBySlug: async (slug: string): Promise<PageDefinition | null> => {
    const { role } = await authService.getCurrentUser();
    await new Promise(resolve => setTimeout(resolve, 150));

    const page = pagesState.find(p => p.slug === slug);
    if (!page) return null;

    // Filter live sections based on role
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
    
    const pageIndex = pagesState.findIndex(p => p.id === pageId);
    if (pageIndex === -1) throw new Error("Page not found");

    if (updates.slug) {
      const validation = await validationService.validateSlug(updates.slug, pageId);
      if (!validation.valid) throw new Error(validation.message);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    
    const previousPage = { ...pagesState[pageIndex] };
    
    const newPage = { 
      ...previousPage, 
      ...updates,
      workflowStatus: 'Draft' as WorkflowStatus
    };

    pagesState[pageIndex] = newPage;
    
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

  updateWorkflowStatus: async (pageId: string, status: WorkflowStatus): Promise<void> => {
    const pageIndex = pagesState.findIndex(p => p.id === pageId);
    if (pageIndex === -1) return;

    const page = pagesState[pageIndex];

    if (status === 'Published') {
      page.sections = page.draftSections || page.sections;
      page.currentVersion += 1;
      page.versionHistory.push({
        version: page.currentVersion,
        timestamp: new Date().toISOString(),
        author: (await authService.getCurrentUser()).role,
        changesSummary: "Published from workflow"
      });

      // Trigger Notification Draft
      await notificationService.triggerAutoNotification(
        'Page', 
        pageId, 
        page.title, 
        ['P1Investor', 'P2Investor', 'P3Operator', 'BoardMember']
      );
    }

    page.workflowStatus = status;
    pagesState[pageIndex] = { ...page };
    window.dispatchEvent(new CustomEvent('storage'));
  },

  requestReview: async (pageId: string) => {
    const page = pagesState.find(p => p.id === pageId);
    if (!page) return;
    await workflowService.handleTransition(pageId, 'Pages', page.workflowStatus, 'InReview', (s) => pageService.updateWorkflowStatus(pageId, s));
  },

  approvePage: async (pageId: string) => {
    const page = pagesState.find(p => p.id === pageId);
    if (!page) return;
    await workflowService.handleTransition(pageId, 'Pages', page.workflowStatus, 'Approved', (s) => pageService.updateWorkflowStatus(pageId, s));
  },

  publishPage: async (pageId: string) => {
    const page = pagesState.find(p => p.id === pageId);
    if (!page) return;
    await workflowService.handleTransition(pageId, 'Pages', page.workflowStatus, 'Published', (s) => pageService.updateWorkflowStatus(pageId, s));
  }
};
