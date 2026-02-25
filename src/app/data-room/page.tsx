
"use client";

import { useState, useMemo } from "react";
import { UserRole } from "@/core/content/schemas";
import { INSTITUTIONAL_DOCUMENTS } from "@/lib/dataroom/data";
import { DataRoomCategory, ActivityLogEntry, DocumentItem } from "@/lib/dataroom/types";
import { canAccess, createLogEntry, sortDocuments } from "@/lib/dataroom/utils";
import { DocumentCard } from "@/components/dataroom/DocumentCard";
import { ActivityLogPanel } from "@/components/dataroom/ActivityLogPanel";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  ShieldCheck, 
  Filter, 
  ChevronRight, 
  Menu,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, Shield as SheetShield, SheetTrigger } from "@/components/ui/sheet";
import { authService } from "@/core/services/auth.service";

const CATEGORIES: DataRoomCategory[] = ['All', 'Financial', 'Governance', 'Capital', 'Legal'];

export default function DataRoomPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<DataRoomCategory>('All');
  const [sortBy, setSortBy] = useState("newest");
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);

  // Simulation: Update Role via helper
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    authService.setRole(role); // Update global mock auth state
  };

  const handleAction = (doc: DocumentItem, action: 'View' | 'Download') => {
    const entry = createLogEntry(activeRole, action, doc.title);
    setLogs(prev => [entry, ...prev].slice(0, 20));
  };

  const filteredDocs = useMemo(() => {
    let result = INSTITUTIONAL_DOCUMENTS.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || doc.category === category;
      return matchesSearch && matchesCategory;
    });

    return sortDocuments(result, sortBy);
  }, [search, category, sortBy]);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Header / Toolbar */}
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Institutional Vault</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter">Secure Data Room</h1>
                <p className="text-sm text-muted-foreground mt-1">Audit-grade documentation for Baalvion shareholders and board members.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col gap-1.5 min-w-[180px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Simulate Identity</span>
                  <Select value={activeRole} onValueChange={(val) => handleRoleChange(val as UserRole)}>
                    <SelectTrigger className="h-10 bg-card border-border/50">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public Viewer</SelectItem>
                      <SelectItem value="phase1">Accredited Investor (P1)</SelectItem>
                      <SelectItem value="BoardMember">Board Member</SelectItem>
                      <SelectItem value="compliance">Compliance Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 w-80">
                      <ActivityLogPanel logs={logs} />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search document registry..." 
                  className="pl-10 h-11 bg-card border-border/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-11 bg-card border-border/50">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Latest Upload</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="size">File Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={category} onValueChange={(v) => setCategory(v as DataRoomCategory)} className="mb-8">
              <TabsList className="bg-card border border-border/50 h-11 p-1">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat} 
                    className="px-6 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  doc={doc} 
                  hasAccess={canAccess(activeRole, doc)}
                  onAction={(action) => handleAction(doc, action)}
                />
              ))}
            </div>

            {filteredDocs.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-border/50 rounded-xl">
                <p className="text-muted-foreground text-sm font-medium">No documents matching current filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Audit Log Sidebar (Desktop Only) */}
      <aside className="hidden lg:block w-80 shrink-0 border-l border-border/50">
        <ActivityLogPanel logs={logs} />
      </aside>
    </div>
  );
}
