'use client';

import React from 'react';
import { PageDefinition, PageSection } from '@/core/content/schemas';
import { COMPONENT_REGISTRY } from './ComponentRegistry';

interface PageRendererProps {
  page: PageDefinition;
}

export default function PageRenderer({ page }: PageRendererProps) {
  return (
    <>
      {page.sections.map((section: PageSection) => {
        const Component = COMPONENT_REGISTRY[section.type];
        
        if (!Component) {
          console.warn(`No component found for section type: ${section.type}`);
          return null;
        }

        // Pass any specific content or props from the schema
        const props = {
          key: section.id,
          id: section.content.anchor || section.id,
          ...section.content
        };

        return <Component {...props} />;
      })}
    </>
  );
}
