'use client';

import { useEffect, useState } from 'react';
import { pageService } from '@/core/services/page.service';
import { PageDefinition } from '@/core/content/schemas';
import PageRenderer from '@/components/cms/PageRenderer';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [pageData, setPageData] = useState<PageDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const data = await pageService.getPageBySlug('/');
      setPageData(data);
      setIsLoading(false);
    };
    loadPage();
    
    // Refresh if role changes
    window.addEventListener('storage', loadPage);
    return () => window.removeEventListener('storage', loadPage);
  }, []);

  if (isLoading) {
    return (
      <main className="flex-grow space-y-12 py-20 px-4">
        <Skeleton className="h-[400px] w-full max-w-7xl mx-auto rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </main>
    );
  }

  if (!pageData) return null;

  return (
    <main className="flex-grow">
      <PageRenderer page={pageData} />
    </main>
  );
}
