"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain, ChevronDown, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import RegistrationModal from "@/components/investor-registration/registration-modal";
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

type FlowType = "phase1" | "phase2";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationFlow, setRegistrationFlow] = useState<FlowType>("phase1");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    loadNavigation();

    window.addEventListener('storage', loadNavigation);
    window.addEventListener('navigation-updated', loadNavigation);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', loadNavigation);
      window.removeEventListener('navigation-updated', loadNavigation);
    }
  }, [loadNavigation]);
  
  const closeSheet = () => setIsSheetOpen(false);

  const onModalOpen = (flow: FlowType) => {
    setRegistrationFlow(flow);
    setIsModalOpen(true);
    closeSheet();
  }

  const handleSignOut = () => {
    authService.setRole('public');
    window.location.href = '/';
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex h-16 items-center border-b transition-all duration-300",
          scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent bg-background"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity" aria-label="Baalvion Home">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline-block font-headline tracking-tighter text-xl">Baalvion</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {isLoading ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-4">
                  <Loader2 className="h-3 w-3 animate-spin" />
                </div>
              ) : (
                <NavItems items={navItems} />
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <LanguageToggle />

            <div className="hidden sm:flex items-center gap-2">
              <AuthButtons 
                userRole={userRole} 
                onSignOut={handleSignOut} 
                onOpenModal={onModalOpen} 
              />
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs">
                  <div className="flex flex-col p-4 h-full">
                      <Link href="/" className="mb-8 flex items-center gap-2 font-semibold" onClick={closeSheet}>
                          <Mountain className="h-6 w-6 text-primary" />
                          <span className="text-xl">Baalvion</span>
                      </Link>
                      <nav className="flex flex-col space-y-4 overflow-y-auto pr-4">
                        <NavItems items={navItems} isMobile onLinkClick={closeSheet} />
                      </nav>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden sm:max-w-xl md:max-w-2xl bg-background border-none shadow-2xl">
          <div className="p-6">
            <RegistrationModal closeModal={() => setIsModalOpen(false)} flowType={registrationFlow} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const NavItems = memo(({ items, isMobile, onLinkClick }: { items: NavigationItem[], isMobile?: boolean, onLinkClick?: () => void }) => {
  return items.map((item) => {
    if (item.children && item.children.length > 0) {
      if (isMobile) {
        return (
          <div key={item.id} className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">{item.label}</p>
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
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-transparent text-sm font-semibold flex items-center gap-1 px-3">
              {item.label} <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="start">
            <div className="max-h-[70vh] overflow-y-auto py-1">
              {item.children.map((child) => (
                <NavChild key={child.id} child={child} onLinkClick={onLinkClick} />
              ))}
            </div>
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
  if (child.label === '---') {
    return <DropdownMenuSeparator />;
  }
  
  if (isMobile) {
    return (
      <Link 
        href={child.href || '#'} 
        onClick={onLinkClick}
        className="text-sm font-medium text-foreground/80 hover:text-primary py-1"
      >
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

function LanguageToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Switch Language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-bold">English (US)</DropdownMenuItem>
        <DropdownMenuItem disabled>Español (Coming Q2)</DropdownMenuItem>
        <DropdownMenuItem disabled>中文 (Coming Q3)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthButtons({ userRole, onSignOut, onOpenModal }: any) {
  if (userRole !== 'public') {
    return (
      <>
        <Button size="sm" variant="ghost" onClick={onSignOut} className="font-semibold">Sign Out</Button>
        <Button asChild size="sm" className="shadow-lg">
          <Link href="/dashboard">Portal</Link>
        </Button>
      </>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="font-semibold shadow-md">Investor Access</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onOpenModal("phase1")} className="cursor-pointer py-2">Apply for Access</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onOpenModal("phase2")} className="cursor-pointer py-2">Phase 2 SPV Invite</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
