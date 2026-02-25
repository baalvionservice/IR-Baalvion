"use client";

import { useState, useEffect } from "react";
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

  const loadNavigation = async () => {
    setIsLoading(true);
    const { role } = await authService.getCurrentUser();
    setUserRole(role);
    const response = await navigationService.getNavigation();
    if (response.success) {
      setNavItems(response.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    loadNavigation();

    window.addEventListener('storage', loadNavigation);
    window.addEventListener('navigation-updated', loadNavigation);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', loadNavigation);
      window.removeEventListener('navigation-updated', loadNavigation);
    }
  }, []);
  
  const closeSheet = () => setIsSheetOpen(false);

  const onModalOpen = (flow: FlowType) => {
    setRegistrationFlow(flow);
    setIsModalOpen(true);
    closeSheet();
  }

  const onModalClose = () => {
    setIsModalOpen(false);
    loadNavigation();
  }

  const handleSignOut = () => {
    authService.setRole('public');
    window.location.href = '/';
  }

  const renderNavItems = (items: NavigationItem[], isMobile = false) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenu key={item.id}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm font-medium flex items-center gap-1 px-2">
                {item.label} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 max-h-[80vh] overflow-y-auto" align="start">
              {item.children.map((child) => {
                 if (child.isHeader) {
                    return <DropdownMenuLabel key={child.id} className="text-[10px] uppercase tracking-widest text-muted-foreground pt-4 pb-1">{child.label}</DropdownMenuLabel>;
                 }
                 if (child.label === '---') {
                    return <DropdownMenuSeparator key={child.id} />;
                 }
                 return (
                    <DropdownMenuItem asChild key={child.id}>
                        <Link href={child.href || '#'} onClick={isMobile ? closeSheet : undefined}>{child.label}</Link>
                    </DropdownMenuItem>
                 )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      return (
        <Link
          key={item.id}
          href={item.href || '#'}
          onClick={isMobile ? closeSheet : undefined}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2"
        >
          {item.label}
        </Link>
      );
    });
  };

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn("items-center gap-2", isMobile ? "flex flex-col space-y-4" : "hidden md:flex")}>
      {isLoading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
          <Loader2 className="h-3 w-3 animate-spin" /> Synchronizing...
        </div>
      ) : (
        renderNavItems(navItems, isMobile)
      )}
    </nav>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex h-16 items-center border-b transition-all duration-300",
          scrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent bg-background"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={closeSheet}>
              <Mountain className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline-block">Baalvion</span>
            </Link>
            <NavContent />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem disabled>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex items-center gap-2">
              {userRole !== 'public' ? (
                <>
                  <Button size="sm" variant="outline" onClick={handleSignOut}>Sign Out</Button>
                  <Button asChild size="sm">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </>
              ) : (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm">Investor Access</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onModalOpen("phase1")}>Apply for Access</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onModalOpen("phase2")}>Phase 2 SPV Invite</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full">
                  <div className="flex flex-col p-6">
                      <Link href="/" className="mb-8 flex items-center gap-2 font-semibold" onClick={closeSheet}>
                          <Mountain className="h-6 w-6 text-primary" />
                          <span>Baalvion</span>
                      </Link>
                      <NavContent isMobile={true}/>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md p-6 sm:max-w-xl md:max-w-2xl">
          <RegistrationModal closeModal={onModalClose} flowType={registrationFlow} />
        </DialogContent>
      </Dialog>
    </>
  );
}
