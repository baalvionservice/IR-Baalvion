"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain, ChevronDown, Loader2, ShieldCheck, LogOut, LayoutDashboard, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationService } from "@/core/services/navigation.service";
import { authService } from "@/core/services/auth.service";
import { NavigationItem, UserRole } from "@/core/content/schemas";
import { AlertsSidebar } from "@/components/notifications/AlertsSidebar";
import { LanguageSelector } from "./LanguageSelector";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('public');
  const [isLoading, setIsLoading] = useState(true);

  const loadNavigation = useCallback(async () => {
    setIsLoading(true);
    const { role } = await authService.getCurrentUser();
    setUserRole(role);
    const response = await navigationService.getNavigation();
    if (response.success) {
      setNavItems(response.data || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    loadNavigation();
    window.addEventListener('storage', loadNavigation);
    window.addEventListener('auth-updated', loadNavigation);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', loadNavigation);
      window.removeEventListener('auth-updated', loadNavigation);
    }
  }, [loadNavigation]);
  
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-50 flex h-16 items-center border-b transition-all duration-300",
          scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent bg-background"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
              aria-label="Baalvion Home"
            >
              <Mountain className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="hidden sm:inline-block tracking-tighter text-xl">Baalvion</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              {isLoading ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-4">
                  <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                  <span>Loading Menu...</span>
                </div>
              ) : (
                <NavItems items={navItems} />
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {userRole !== 'public' && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => setIsAlertsOpen(true)}
                aria-label="View institutional alerts"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
            )}
            
            <LanguageSelector />

            <div className="hidden sm:flex items-center gap-2">
              <AuthButtons userRole={userRole} />
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Mobile Menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs" aria-label="Mobile Navigation Menu">
                  <div className="flex flex-col p-4 h-full">
                      <Link href="/" className="mb-8 flex items-center gap-2 font-bold" onClick={closeSheet}>
                          <Mountain className="h-6 w-6 text-primary" aria-hidden="true" />
                          <span className="text-xl">Baalvion</span>
                      </Link>
                      <nav className="flex flex-col space-y-4 overflow-y-auto pr-4" aria-label="Mobile Navigation">
                        <NavItems items={navItems} isMobile onLinkClick={closeSheet} />
                      </nav>
                      <div className="mt-auto pt-8 border-t">
                        <AuthButtons userRole={userRole} isMobile onAction={closeSheet} />
                      </div>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AlertsSidebar open={isAlertsOpen} onOpenChange={setIsAlertsOpen} />
    </>
  );
}

const NavItems = memo(({ items, isMobile, onLinkClick }: { items: NavigationItem[], isMobile?: boolean, onLinkClick?: () => void }) => {
  return items.map((item) => {
    if (item.children && item.children.length > 0) {
      if (isMobile) {
        return (
          <div key={item.id} className="space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-2">{item.label}</p>
            <div className="pl-4 space-y-2 flex flex-col">
              {item.children.map((child) => (
                <NavChild key={child.id} child={child} onLinkClick={onLinkClick} isMobile />
              ))}
            </div>
          </div>
        );
      }
      return (
        <DropdownMenu key={item.id}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm font-semibold flex items-center gap-1 px-3">
              {item.label} <ChevronDown className="h-3 w-3 opacity-50" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="start">
            {item.children.map((child) => (
              <NavChild key={child.id} child={child} onLinkClick={onLinkClick} />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Link
        key={item.id}
        href={item.href || '#'}
        onClick={onLinkClick}
        className={cn(
          "text-sm font-semibold transition-colors px-3 py-2 rounded-md",
          isMobile ? "text-lg" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {item.label}
      </Link>
    );
  });
});

NavItems.displayName = 'NavItems';

function NavChild({ child, onLinkClick, isMobile }: { child: NavigationItem, onLinkClick?: () => void, isMobile?: boolean }) {
  if (child.isHeader) {
    return <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground pt-4 pb-1 font-bold">{child.label}</DropdownMenuLabel>;
  }
  if (child.label === '---') return <DropdownMenuSeparator aria-hidden="true" />;
  
  if (isMobile) {
    return (
      <Link href={child.href || '#'} onClick={onLinkClick} className="text-sm font-medium text-foreground/80 hover:text-primary py-1">
        {child.label}
      </Link>
    );
  }

  return (
    <DropdownMenuItem asChild className="cursor-pointer">
      <Link href={child.href || '#'} onClick={onLinkClick}>{child.label}</Link>
    </DropdownMenuItem>
  );
}

function AuthButtons({ userRole, isMobile, onAction }: any) {
  if (userRole !== 'public') {
    return (
      <div className={cn("flex items-center gap-2", isMobile && "flex-col w-full")}>
        <Button variant="ghost" size="sm" onClick={() => { authService.signOut(); onAction?.(); }} className="gap-2">
          <LogOut className="h-4 w-4" aria-hidden="true" /> Sign Out
        </Button>
        <Button asChild size="sm" className="shadow-lg gap-2 w-full">
          <Link href="/performance" onClick={onAction}><LayoutDashboard className="h-4 w-4" aria-hidden="true" /> Portal</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-2", isMobile && "flex-col w-full")}>
      <Button asChild variant="outline" size="sm" className="w-full">
        <Link href="/onboarding" onClick={onAction}>Register</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="shadow-md w-full" aria-label="Institutional login simulator">Institutional Login</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">Simulation Profiles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { authService.setRole('phase1'); window.location.href='/performance'; }}>
            Simulate Investor (LP)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { authService.setRole('admin'); window.location.href='/admin/dashboard'; }}>
            Simulate Admin (GP)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { authService.setRole('compliance'); window.location.href='/admin/intelligence'; }}>
            Simulate Compliance
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
