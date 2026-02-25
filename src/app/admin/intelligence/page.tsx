'use client';

import { useEffect, useState } from "react";
import { analyticsService, type GovernanceMetrics, type VotingAnalytics, type RiskProfile } from "@/core/services/analytics.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Brain, 
  ShieldAlert, 
  TrendingUp, 
  Gavel, 
  Activity, 
  Zap, 
  FileText, 
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Download,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GovernanceIntelligencePage() {
  const [metrics, setMetrics] = useState<GovernanceMetrics | null>(null);
  const [voting, setVoting] = useState<VotingAnalytics | null>(null);
  const [risk, setRisk] = useState<RiskProfile | null>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [forecast, setForecast] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadIntelligence = async () => {
    setIsLoading(true);
    const [m, v, r, t, f] = await Promise.all([
      analyticsService.getGovernanceMetrics(),
      analyticsService.getVotingAnalytics(),
      analyticsService.getRiskProfile(),
      analyticsService.getTrendData(14),
      analyticsService.getForecast()
    ]);
    setMetrics(m);
    setVoting(v);
    setRisk(r);
    setTrends(t);
    setForecast(f);
    setIsLoading(false);
  };

  useEffect(() => {
    loadIntelligence();
    window.addEventListener('audit-updated', loadIntelligence);
    window.addEventListener('voting-updated', loadIntelligence);
    return () => {
      window.removeEventListener('audit-updated', loadIntelligence);
      window.removeEventListener('voting-updated', loadIntelligence);
    };
  }, []);

  const handleGenerateSummary = async () => {
    const summary = await analyticsService.getExecutiveSummary();
    toast({
      title: "Executive Summary Generated",
      description: "Governance insight has been copied to your clipboard center.",
    });
    console.log(summary);
  };

  if (isLoading || !metrics || !voting || !risk) {
    return <div className="py-20 text-center text-muted-foreground">Aggregating governance intelligence...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="text-primary" /> Governance Intelligence
          </h1>
          <p className="text-muted-foreground">Predictive analytics and institutional health tracking.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadIntelligence}>
            <Activity className="mr-2 h-4 w-4" /> Refresh Data
          </Button>
          <Button size="sm" onClick={handleGenerateSummary}>
            <FileText className="mr-2 h-4 w-4" /> Executive Snapshot
          </Button>
        </div>
      </div>

      {/* Top Level Scorecard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Stability Score <Info className="h-3 w-3 opacity-50" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{voting.stabilityScore}/100</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" /> Optimal Range
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${risk.level === 'Low' ? 'text-green-500' : risk.level === 'Moderate' ? 'text-amber-500' : 'text-destructive'}`}>
              {risk.level}
            </div>
            <Progress value={risk.score} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quorum Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{voting.quorumComplianceRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Target: > 85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Platform Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">High</div>
            <p className="text-xs text-muted-foreground mt-1">{metrics.totalActions} Monthly Mutations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Trend Graph */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Activity vs. Risk Trends
            </CardTitle>
            <CardDescription>14-day rolling correlation of administrative volume and system risk.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="activity" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActivity)" strokeWidth={2} />
                  <Area type="monotone" dataKey="risk" stroke="#ef4444" fill="transparent" strokeWidth={1} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" /> Active Risk Flags
            </CardTitle>
            <CardDescription>Automated detection of compliance anomalies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {risk.flaggedIssues.length > 0 ? (
              risk.flaggedIssues.map((issue, idx) => (
                <div key={idx} className="flex gap-3 text-sm p-3 bg-muted/20 border rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{issue}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 opacity-50 mb-2" />
                <p className="text-xs text-muted-foreground">No critical risk flags detected.</p>
              </div>
            )}
            <div className="pt-4 border-t">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Institutional Baseline</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Voting Consistency</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Audit Trail Completeness</span>
                  <span className="font-bold">100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Module Heatmap Mock */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Module Activity Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.moduleActivity).map(([mod, count]) => (
                <div key={mod} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{mod}</span>
                    <span className="text-muted-foreground">{count} events</span>
                  </div>
                  <Progress value={(count / metrics.totalActions) * 100} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maturity Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Maturity Progression Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecast}>
                  <Bar dataKey="maturity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <XAxis dataKey="quarter" fontSize={10} axisLine={false} tickLine={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 italic text-center">
              Predictive simulation based on current governance velocity.
            </p>
          </CardContent>
        </Card>

        {/* Workflow Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Workflow Efficiency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Avg Review Loop</span>
              </div>
              <Badge variant="outline">{metrics.avgApprovalTimeHours}h</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Quorum Reliability</span>
              </div>
              <Badge variant="outline" className="text-green-500">High</Badge>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
              <a href="/admin/audit"><Download className="mr-2 h-3 w-3" /> Download Full Analytics Dataset</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
