'use client';

import { useEffect, useState, useMemo } from 'react';
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
    let mounted = true;

    const loadPage = async () => {
      // Delay initialization to avoid hydration mismatch with localStorage-based state
      const response = await pageService.getPageBySlug('/');
      
      if (!mounted) return;

      if (response.success && response.data) {
        setPageData(response.data);
      } else if (!response.success) {
        toast({
          variant: "destructive",
          title: "System Error",
          description: response.error?.message || "Internal connectivity issue."
        });
      }
      setIsLoading(false);
    };

    loadPage();
    
    window.addEventListener('storage', loadPage);
    window.addEventListener('workflow-updated', loadPage);
    
    return () => {
      mounted = false;
      window.removeEventListener('storage', loadPage);
      window.removeEventListener('workflow-updated', loadPage);
    };
  }, [toast]);

  // Prevent flash of unitialized content while maintaining SSR shell
  const renderedContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-12 py-20 px-4 container mx-auto">
          <Skeleton className="h-[500px] w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-80 rounded-xl" />
            <Skeleton className="h-80 rounded-xl" />
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      );
    }

    if (!pageData) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4 px-4">
          <h1 className="text-2xl font-bold tracking-tight">Access Restricted</h1>
          <p className="text-muted-foreground max-w-md">Your role does not have the necessary permissions to view the primary index. Please contact compliance.</p>
        </div>
      );
    }

    return <PageRenderer page={pageData} />;
  }, [isLoading, pageData]);

  return (
    <main className="flex-grow">
      {renderedContent}
    </main>
  );
}
