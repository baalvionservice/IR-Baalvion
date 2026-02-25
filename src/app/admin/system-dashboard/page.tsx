"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, FileText, Navigation, Shield, Database, CheckCircle2, AlertCircle, GitPullRequest, Gavel, Briefcase } from "lucide-react";
import { pageService } from "@/core/services/page.service";
import { navigationService } from "@/core/services/navigation.service";
import { auditService } from "@/core/services/audit.service";
import { votingService } from "@/core/services/voting.service";
import { boardMaterialsService } from "@/core/services/board-materials.service";
import { AuditLogEntry, PageDefinition } from "@/core/content/schemas";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SystemDashboardPage() {
  const [stats, setStats] = useState({
    pages: 0,
    navItems: 0,
    activeNav: 0,
    publishedPages: 0,
    inReview: 0,
    drafts: 0,
    activeVotes: 0,
    boardMaterials: 0
  });
  const [recentActivity, setRecentActivity] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSystemState = async () => {
    setIsLoading(true);
    const [pages, navItems, logs, votes, materials] = await Promise.all([
      pageService.getAllPages(),
      navigationService.getAllItems(),
      auditService.getLogs({ limit: 10 }),
      votingService.getVotes(),
      boardMaterialsService.getMaterials()
    ]);

    const countNav = (items: any[]): number => 
      items.reduce((acc, item) => acc + 1 + (item.children ? countNav(item.children) : 0), 0);

    const countActiveNav = (items: any[]): number => 
      items.reduce((acc, item) => acc + (item.isActive ? 1 : 0) + (item.children ? countActiveNav(item.children) : 0), 0);

    setStats({
      pages: pages.length,
      navItems: countNav(navItems),
      activeNav: countActiveNav(navItems),
      publishedPages: pages.filter(p => p.workflowStatus === 'Published').length,
      inReview: pages.filter(p => p.workflowStatus === 'InReview').length,
      drafts: pages.filter(p => p.workflowStatus === 'Draft').length,
      activeVotes: votes.filter(v => v.status === 'Open').length,
      boardMaterials: materials.length
    });
    setRecentActivity(logs);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSystemState();
    window.addEventListener('storage', loadSystemState);
    window.addEventListener('audit-updated', loadSystemState);
    window.addEventListener('voting-updated', loadSystemState);
    return () => {
      window.removeEventListener('storage', loadSystemState);
      window.removeEventListener('audit-updated', loadSystemState);
      window.removeEventListener('voting-updated', loadSystemState);
    };
  }, []);

  if (isLoading) return <div className="py-20 text-center text-muted-foreground">Synchronizing system state...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Health & Governance</h1>
        <p className="text-muted-foreground">Institutional monitoring of platform infrastructure and activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Infrastructure</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Stable</div>
            <p className="text-xs text-muted-foreground">Mock Data Provider: Online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Governance Engine</CardTitle>
            <Gavel className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVotes} Active Votes</div>
            <p className="text-xs text-muted-foreground">Ballot Ledger: Ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board Materials</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.boardMaterials} Bundles</div>
            <p className="text-xs text-muted-foreground">Confidential Delivery: Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Active</div>
            <p className="text-xs text-muted-foreground">Compliance Ledger: Operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Administrative Activity</CardTitle>
            <CardDescription>Live feed of system mutations and role-based actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-4 text-sm border-b pb-3 last:border-0">
                  <div className="mt-1">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold">{log.action}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.module} / {log.userRole}</p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && <p className="text-center py-4 text-muted-foreground">No recent activity detected.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Lifecycle Indicators</CardTitle>
            <CardDescription>Visual summary of the content management funnel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Published Coverage</span>
              </div>
              <Badge variant="outline">{((stats.publishedPages / stats.pages) * 100).toFixed(0)}%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium">Approval Bottlenecks</span>
              </div>
              <Badge variant="secondary">{stats.inReview} Entities</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <Activity className="text-blue-500 h-4 w-4" />
                <span className="text-sm font-medium">Avg. Approval Time</span>
              </div>
              <Badge variant="outline">1.2 Hours</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
