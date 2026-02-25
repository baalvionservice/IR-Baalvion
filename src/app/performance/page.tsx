
"use client";

import { useState, useMemo } from "react";
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
import { TrendingUp, ShieldCheck, Download, Activity, RefreshCw, Layers, Wallet, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PerformanceDashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [investors, setInvestors] = useState(INITIAL_INVESTORS);
  const [spvs, setSpvs] = useState(SPV_PERFORMANCE);
  const [logs, setLogs] = useState<any[]>([]);
  const { toast } = useToast();

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

    // Simulate simple SPV balance update
    setSpvs(prev => prev.map(s => ({
      ...s,
      deployed: s.deployed + (totalToAllocate * 0.2), // Mock split
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

  // --- DERIVED METRICS ---
  const currentNav = NAV_HISTORY[NAV_HISTORY.length - 1].nav;
  const totalDeployed = spvs.reduce((sum, s) => sum + s.deployed, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Unified Header */}
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Institutional Hub</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter">Unified Portfolio Command</h1>
                <p className="text-sm text-muted-foreground mt-1">Consolidated capital lifecycle management and performance analytics.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1.5 min-w-[180px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Active Persona</span>
                  <Select value={activeRole} onValueChange={(val) => handleRoleChange(val as UserRole)}>
                    <SelectTrigger className="h-10 bg-card border-border/50">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Super Admin (GP)</SelectItem>
                      <SelectItem value="p1_institutional">Lead Investor (LP)</SelectItem>
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
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-20">
          <div className="container mx-auto max-w-7xl space-y-12">
            
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="bg-card border border-border/50 mb-8">
                <TabsTrigger value="performance" className="px-8 font-bold text-xs uppercase tracking-widest">Performance Analytics</TabsTrigger>
                <TabsTrigger value="operations" className="px-8 font-bold text-xs uppercase tracking-widest">Capital Operations</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-8 animate-in fade-in duration-500">
                <PerformanceCharts navData={NAV_HISTORY} timelineData={CAPITAL_TIMELINE} />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <SpvPerformanceTable data={spvs as any} />
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

      {/* Shared Compliance Ledger */}
      <aside className="hidden lg:block w-80 shrink-0 border-l border-border/50">
        <ActivityLogPanel logs={logs} />
      </aside>
    </div>
  );
}
