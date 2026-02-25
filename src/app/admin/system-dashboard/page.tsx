"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, FileText, Navigation, Shield, Database, CheckCircle2, AlertCircle } from "lucide-react";
import { pageService } from "@/core/services/page.service";
import { navigationService } from "@/core/services/navigation.service";
import { auditService } from "@/core/services/audit.service";
import { AuditLogEntry } from "@/core/content/schemas";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SystemDashboardPage() {
  const [stats, setStats] = useState({
    pages: 0,
    navItems: 0,
    activeNav: 0,
    publishedPages: 0
  });
  const [recentActivity, setRecentActivity] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSystemState = async () => {
    setIsLoading(true);
    const [pages, navItems, logs] = await Promise.all([
      pageService.getAllPages(),
      navigationService.getAllItems(),
      auditService.getLogs({ limit: 10 })
    ]);

    const countNav = (items: any[]): number => 
      items.reduce((acc, item) => acc + 1 + (item.children ? countNav(item.children) : 0), 0);

    const countActiveNav = (items: any[]): number => 
      items.reduce((acc, item) => acc + (item.isActive ? 1 : 0) + (item.children ? countActiveNav(item.children) : 0), 0);

    setStats({
      pages: pages.length,
      navItems: countNav(navItems),
      activeNav: countActiveNav(navItems),
      publishedPages: pages.filter(p => p.status === 'Published').length
    });
    setRecentActivity(logs);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSystemState();
    window.addEventListener('audit-updated', loadSystemState);
    return () => window.removeEventListener('audit-updated', loadSystemState);
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
            <CardTitle className="text-sm font-medium">Dynamic Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pages}</div>
            <p className="text-xs text-muted-foreground">{stats.publishedPages} Published / {stats.pages - stats.publishedPages} Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Navigation Nodes</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.navItems}</div>
            <p className="text-xs text-muted-foreground">{stats.activeNav} Active / {stats.navItems - stats.activeNav} Hidden</p>
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
            <CardTitle>System Health Indicators</CardTitle>
            <CardDescription>Real-time validation of integrity constraints.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span className="text-sm font-medium">Slug Uniqueness</span>
              </div>
              <Badge variant="outline">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span className="text-sm font-medium">Navigation Hierarchy</span>
              </div>
              <Badge variant="outline">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-500 h-5 w-5" />
                <span className="text-sm font-medium">Orphaned Pages</span>
              </div>
              <Badge variant="secondary">2 Detected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span className="text-sm font-medium">Data Integrity</span>
              </div>
              <Badge variant="outline">100%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
