'use client';

import { PageDefinition, WorkflowStatus } from "../content/schemas";
import { pageRepository } from "../repositories/page.repository";
import { authService } from "./auth.service";
import { auditService } from "./audit.service";
import { ApiResponse } from "@/types/api.types";

export const pageService = {
  getPageBySlug: async (slug: string): Promise<ApiResponse<PageDefinition | null>> => {
    const { role } = await authService.getCurrentUser();
    const response = await pageRepository.findBySlug(slug);

    if (response.success && response.data) {
      const page = response.data;
      // Filter live sections based on role
      const filteredPage = {
        ...page,
        sections: page.sections
          .filter(s => s.isActive && authService.hasAccess(s.roles, role))
          .sort((a, b) => a.order - b.order)
      };
      return { ...response, data: filteredPage };
    }

    return response;
  },

  getAllPages: async (): Promise<ApiResponse<PageDefinition[]>> => {
    return pageRepository.findAll();
  },

  updatePage: async (pageId: string, updates: Partial<PageDefinition>): Promise<ApiResponse<PageDefinition>> => {
    const { role } = await authService.getCurrentUser();
    
    const response = await pageRepository.update(pageId, {
      ...updates,
      workflowStatus: 'Draft' as WorkflowStatus
    });

    if (response.success) {
      await auditService.log({
        userRole: role,
        module: 'Pages',
        action: 'edit',
        entityId: pageId,
        newState: updates
      });
      window.dispatchEvent(new CustomEvent('storage'));
    }

    return response;
  },

  approvePage: async (pageId: string): Promise<void> => {
    const { role } = await authService.getCurrentUser();
    const response = await pageRepository.findAll();
    const pages = response.data || [];
    const page = pages.find(p => p.id === pageId);
    
    if (!page) return;

    const updates = {
      workflowStatus: 'Published' as WorkflowStatus,
      status: 'Published' as 'Published',
      currentVersion: page.currentVersion + 1,
      versionHistory: [
        ...page.versionHistory,
        { version: page.currentVersion + 1, author: role, timestamp: new Date().toISOString() }
      ]
    };

    await pageRepository.update(pageId, updates);
    window.dispatchEvent(new CustomEvent('storage'));
  }
};
