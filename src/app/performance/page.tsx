
"use client";

import { useState, useMemo } from "react";
import { UserRole } from "@/core/content/schemas";
import { authService } from "@/core/services/auth.service";
import { MetricsSummaryGrid } from "@/components/performance/MetricsSummaryGrid";
import { PerformanceCharts } from "@/components/performance/PerformanceCharts";
import { SpvPerformanceTable } from "@/components/performance/SpvPerformanceTable";
import { DocumentFeed } from "@/components/performance/DocumentFeed";
import { ActivityLogPanel } from "@/components/dataroom/ActivityLogPanel";
import { 
  NAV_HISTORY, 
  PERFORMANCE_METRICS, 
  SPV_PERFORMANCE, 
  CAPITAL_TIMELINE,
  PERFORMANCE_DOCUMENTS 
} from "@/lib/performance/data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TrendingUp, ShieldCheck, Download, Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function PerformanceDashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const { toast } = useToast();

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    authService.setRole(role);
  };

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Institutional performance dataset is being compiled into a secure PDF snapshot.",
    });
  };

  const currentNav = NAV_HISTORY[NAV_HISTORY.length - 1].nav;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col md:flex-row overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Header Section */}
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Asset Intelligence</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter">Institutional Performance</h1>
                <p className="text-sm text-muted-foreground mt-1">Real-time NAV attribution and portfolio performance benchmarks.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1.5 min-w-[180px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Contextual Role</span>
                  <Select value={activeRole} onValueChange={(val) => handleRoleChange(val as UserRole)}>
                    <SelectTrigger className="h-10 bg-card border-border/50">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Super Admin</SelectItem>
                      <SelectItem value="p1_institutional">Lead Investor (P1)</SelectItem>
                      <SelectItem value="compliance">Compliance Officer</SelectItem>
                      <SelectItem value="public">Guest Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="icon" variant="outline" className="h-10 w-10 mt-5">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <MetricsSummaryGrid metrics={PERFORMANCE_METRICS} currentNav={currentNav} />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="container mx-auto max-w-7xl space-y-8 pb-20">
            
            <PerformanceCharts navData={NAV_HISTORY} timelineData={CAPITAL_TIMELINE} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <SpvPerformanceTable data={SPV_PERFORMANCE} />
              </div>
              <div className="space-y-8">
                <DocumentFeed documents={PERFORMANCE_DOCUMENTS} currentRole={activeRole} />
                
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Regulatory Snapshot</h3>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-6">
                    All performance data is generated from audited SPV ledger entries. This dashboard represents a non-binding simulation of current platform liquidity.
                  </p>
                  <Button onClick={handleExport} className="w-full text-xs font-bold uppercase tracking-widest h-11">
                    <Download className="mr-2 h-4 w-4" /> Export Performance PDF
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Compliance Ledger Sidebar (Desktop Only) */}
      <aside className="hidden lg:block w-80 shrink-0 border-l border-border/50">
        <ActivityLogPanel logs={[]} />
      </aside>
    </div>
  );
}
