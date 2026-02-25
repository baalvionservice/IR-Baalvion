"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AuditLogEntry } from "@/core/content/schemas";
import { auditService } from "@/core/services/audit.service";
import { Search, Shield, Clock } from "lucide-react";

export function AuditLogPanel() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [search, setSearch] = useState("");

  const loadLogs = async () => {
    const data = await auditService.getLogs();
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
    window.addEventListener('audit-updated', loadLogs);
    return () => window.removeEventListener('audit-updated', loadLogs);
  }, []);

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.module.toLowerCase().includes(search.toLowerCase()) ||
    l.userRole.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Filter by action, module, or role..." 
            className="pl-10 bg-card border-border/50 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-card/30 border-border/50">
        <CardHeader className="border-b border-border/50 bg-background/50">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Immutable System Ledger
          </CardTitle>
          <CardDescription>Comprehensive record of all administrative and governance tranches.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest pl-6">Timestamp</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Role</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Module</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Action</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right pr-6">Target ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-border/50 group hover:bg-primary/5 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-tighter border-primary/20 bg-primary/5 text-primary">
                      {log.userRole}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{log.module}</TableCell>
                  <TableCell>
                    <span className="text-xs font-bold capitalize text-foreground/80">{log.action}</span>
                  </TableCell>
                  <TableCell className="text-right pr-6 text-[10px] font-mono text-muted-foreground">
                    {log.entityId}
                  </TableCell>
                </TableRow>
              ))}
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center text-muted-foreground text-xs italic">
                    No matching ledger entries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
