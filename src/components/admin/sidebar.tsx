"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Navigation, 
  FileText, 
  Layers, 
  FolderTree, 
  ShieldCheck, 
  Newspaper, 
  Users, 
  History, 
  Settings,
  Mountain,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Navigation, label: "Navigation Manager", href: "/admin/navigation" },
  { icon: FileText, label: "Page Manager", href: "/admin/pages" },
  { icon: Layers, label: "Dashboard Modules", href: "/admin/dashboards" },
  { icon: FolderTree, label: "Data Room Manager", href: "/admin/dataroom" },
  { icon: ShieldCheck, label: "Governance Manager", href: "/admin/governance" },
  { icon: Newspaper, label: "News & Events", href: "/admin/news" },
  { icon: Users, label: "Role & Access", href: "/admin/roles" },
  { icon: History, label: "Audit Log", href: "/admin/audit" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "border-r bg-card transition-all duration-300 flex flex-col",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="h-16 flex items-center px-6 border-b justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Mountain className="h-6 w-6 text-primary shrink-0" />
          {!isCollapsed && <span>Baalvion</span>}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t text-[10px] text-muted-foreground text-center">
        {!isCollapsed && <p>© 2026 CMS v1.0.4-beta</p>}
      </div>
    </aside>
  );
}
