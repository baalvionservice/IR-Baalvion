"use client";

import { useState, useMemo, useEffect } from "react";
import { UserRole } from "@/core/content/schemas";
import { authService } from "@/core/services/auth.service";
import { MetricsSummaryGrid } from "@/components/performance/MetricsSummaryGrid";
import { PerformanceCharts } from "@/components/performance/PerformanceCharts";
import { SpvPerformanceTable } from "@/components/performance/SpvPerformanceTable";
import { DocumentFeed } from "@/components/performance/DocumentFeed";
import { ActivityLogPanel } from "@/components/dataroom/ActivityLogPanel";
import { CapitalCallGenerator } from "@/components/capital-ops/CapitalCallGenerator";
import { AllocationEngine } from "@/components/capital-ops/AllocationEngine";
import { InvestorPanel } from "@/components/capital-ops/InvestorPanel";
import { CapitalFlowVisualization } from "@/components/capital-ops/CapitalFlowVisualization";
import { 
  NAV_HISTORY, 
  PERFORMANCE_METRICS, 
  SPV_PERFORMANCE, 
  CAPITAL_TIMELINE,
  PERFORMANCE_DOCUMENTS 
} from "@/lib/performance/data";
import { INITIAL_INVESTORS } from "@/lib/capital-ops/data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TrendingUp, ShieldCheck, Download, Activity, RefreshCw, Layers, Wallet, Landmark, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locale, t } from "@/utils/i18n";

export default function PerformanceDashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [locale, setLocale] = useState<Locale>('en');
  const [investors, setInvestors] = useState(INITIAL_INVESTORS);
  const [spvs, setSpvs] = useState(SPV_PERFORMANCE);
  const [logs, setLogs] = useState<any[]>([]);
  
  // Advanced Filter State
  const [assetFilter, setAssetFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  
  const { toast } = useToast();

  useEffect(() => {
    const savedLocale = localStorage.getItem('baalvion_locale') as Locale;
    if (savedLocale) setLocale(savedLocale);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    authService.setRole(role);
  };

  // --- OPS LOGIC ---
  const addLog = (message: string, role: string = activeRole) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [{ id: Math.random().toString(36).substr(2, 9), timestamp, role, message, action: 'Simulation', documentName: message }, ...prev].slice(0, 30));
  };

  const handleGenerateCall = (pct: number) => {
    setInvestors(prev => prev.map(inv => ({
      ...inv,
      pendingCallAmount: (inv.commitmentAmount * pct) / 100,
      wireStatus: 'Not Initiated'
    })));
    addLog(`System issued ${pct}% Capital Call across registry.`);
    toast({ title: "Capital Call Issued", description: `Broadcasting ${pct}% drawdown notice to all investors.` });
  };

  const handleInitiateWire = (id: string) => {
    setInvestors(prev => prev.map(inv => inv.id === id ? { ...inv, wireStatus: 'Initiated' } : inv));
    addLog(`Investor ${id} initiated wire transfer.`, 'Investor');
  };

  const handleConfirmWire = (id: string) => {
    setInvestors(prev => prev.map(inv => inv.id === id ? { ...inv, wireStatus: 'Confirmed' } : inv));
    addLog(`Admin confirmed receipt of funds for ${id}.`);
  };

  const handleExecuteAllocation = () => {
    const totalToAllocate = investors.reduce((sum, i) => i.wireStatus === 'Confirmed' ? sum + i.pendingCallAmount : sum, 0);
    if (totalToAllocate === 0) return;

    setSpvs(prev => prev.map(s => ({
      ...s,
      deployed: s.deployed + (totalToAllocate * 0.2), 
      currentValue: s.currentValue + (totalToAllocate * 0.2)
    })));

    setInvestors(prev => prev.map(inv => inv.wireStatus === 'Confirmed' ? {
      ...inv,
      calledToDate: inv.calledToDate + inv.pendingCallAmount,
      remainingCommitment: inv.remainingCommitment - inv.pendingCallAmount,
      pendingCallAmount: 0,
      wireStatus: 'Not Initiated'
    } : inv));

    addLog(`Strategic Allocation Executed: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalToAllocate)} deployed.`);
    toast({ title: "Allocation Successful", description: "Capital has been deployed to underlying strategic assets." });
  };

  // --- FILTERED DATA ---
  const filteredSpvs = useMemo(() => {
    if (assetFilter === 'all') return spvs;
    return spvs.filter(s => s.id === assetFilter);
  }, [spvs, assetFilter]);

  const filteredTimeline = useMemo(() => {
    if (periodFilter === 'all') return CAPITAL_TIMELINE;
    return CAPITAL_TIMELINE.filter(t => t.period.includes(periodFilter));
  }, [periodFilter]);

  const currentNav = NAV_HISTORY[NAV_HISTORY.length - 1].nav;
  const totalDeployed = spvs.reduce((sum, s) => sum + s.deployed, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Institutional Hub</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter">{t("dashboard.title", locale)}</h1>
                <p className="text-sm text-muted-foreground mt-1">{t("dashboard.subtitle", locale)}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1.5 min-w-[180px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Active Persona</span>
                  <Select value={activeRole} onValueChange={(val) => handleRoleChange(val as UserRole)}>
                    <SelectTrigger className="h-10 bg-card border-border/50">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t("roles.admin", locale)}</SelectItem>
                      <SelectItem value="p1_institutional">{t("roles.investor", locale)}</SelectItem>
                      <SelectItem value="compliance">{t("roles.compliance", locale)}</SelectItem>
                      <SelectItem value="public">{t("roles.public", locale)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="icon" variant="outline" className="h-10 w-10 mt-5">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-8 p-4 bg-card/30 border border-border/50 rounded-xl flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Portfolio Filters:</span>
              </div>
              
              <Select value={assetFilter} onValueChange={setAssetFilter}>
                <SelectTrigger className="w-[200px] h-9 bg-background">
                  <SelectValue placeholder="Filter by SPV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Consolidated View</SelectItem>
                  {spvs.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[160px] h-9 bg-background">
                  <SelectValue placeholder="Fiscal Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Full History</SelectItem>
                  <SelectItem value="2024">FY 2024</SelectItem>
                  <SelectItem value="2025">FY 2025</SelectItem>
                </SelectContent>
              </Select>

              {(assetFilter !== 'all' || periodFilter !== 'all') && (
                <Button variant="ghost" size="sm" className="h-9 text-[10px] font-bold uppercase" onClick={() => { setAssetFilter('all'); setPeriodFilter('all'); }}>
                  Reset Filters
                </Button>
              )}
            </div>

            <MetricsSummaryGrid metrics={PERFORMANCE_METRICS} currentNav={currentNav} />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-20">
          <div className="container mx-auto max-w-7xl space-y-12">
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="bg-card border border-border/50 mb-8">
                <TabsTrigger value="performance" className="px-8 font-bold text-xs uppercase tracking-widest">Performance Analytics</TabsTrigger>
                <TabsTrigger value="operations" className="px-8 font-bold text-xs uppercase tracking-widest">Capital Operations</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-8 animate-in fade-in duration-500">
                <PerformanceCharts navData={NAV_HISTORY} timelineData={filteredTimeline} />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <SpvPerformanceTable data={filteredSpvs as any} />
                  </div>
                  <div className="space-y-8">
                    <DocumentFeed documents={PERFORMANCE_DOCUMENTS} currentRole={activeRole} />
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
                      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-primary" /> Regulatory Snapshot
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 italic">
                        "Institutional data represents audited ledger entries as of the last quarterly close. Performance is non-binding and subject to final audit."
                      </p>
                      <Button className="w-full text-xs font-bold uppercase tracking-widest h-11" variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Ledger PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <CapitalCallGenerator 
                      onGenerate={handleGenerateCall} 
                      disabled={activeRole !== 'admin'} 
                    />
                    <AllocationEngine 
                      spvs={spvs as any} 
                      onExecute={handleExecuteAllocation} 
                      canExecute={investors.some(i => i.wireStatus === 'Confirmed')}
                      disabled={activeRole !== 'admin'}
                    />
                  </div>
                  <div className="space-y-8">
                    <CapitalFlowVisualization 
                      totalCommitted={investors.reduce((s, i) => s + i.commitmentAmount, 0)}
                      totalCalled={investors.reduce((s, i) => s + i.calledToDate, 0)}
                      totalDeployed={totalDeployed}
                    />
                    <InvestorPanel 
                      investors={investors} 
                      role={activeRole === 'admin' ? 'Admin' : 'Investor'}
                      onInitiateWire={handleInitiateWire}
                      onConfirmWire={handleConfirmWire}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <aside className="hidden lg:block w-80 shrink-0 border-l border-border/50">
        <ActivityLogPanel logs={logs} />
      </aside>
    </div>
  );
}
