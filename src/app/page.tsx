'use client';

import { useEffect, useState } from 'react';
import { pageService } from '@/core/services/page.service';
import { PageDefinition } from '@/core/content/schemas';
import PageRenderer from '@/components/cms/PageRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [pageData, setPageData] = useState<PageDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true);
      const response = await pageService.getPageBySlug('/');
      
      if (response.success) {
        setPageData(response.data || null);
      } else {
        toast({
          variant: "destructive",
          title: "Network Error",
          description: response.error?.message || "Failed to load page content."
        });
      }
      setIsLoading(false);
    };

    loadPage();
    
    // Refresh if role changes or content updated
    window.addEventListener('storage', loadPage);
    window.addEventListener('workflow-updated', loadPage);
    
    return () => {
      window.removeEventListener('storage', loadPage);
      window.removeEventListener('workflow-updated', loadPage);
    };
  }, [toast]);

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

  if (!pageData) return (
    <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
      Page not found.
    </div>
  );

  return (
    <main className="flex-grow">
      <PageRenderer page={pageData} />
    </main>
  );
}
