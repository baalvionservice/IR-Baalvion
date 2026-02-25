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
  }
};
