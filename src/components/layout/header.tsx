"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain, ChevronDown, Globe } from "lucide-react";
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
import { publicNav, loggedInNav, type NavItem } from "@/lib/nav-data";

type FlowType = "phase1" | "phase2";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationFlow, setRegistrationFlow] = useState<FlowType>("phase1");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Simulate user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const checkLogin = () => {
      const hasApplied = localStorage.getItem('hasPhase1Applied') || localStorage.getItem('hasPhase2Applied') || localStorage.getItem('hasPhase3Applied');
      setIsLoggedIn(!!hasApplied);
    };
    checkLogin();

    window.addEventListener('storage', checkLogin); // Listen for changes in other tabs

    // Effect to handle navigation from admin login simulation
    const checkLoginRedirect = () => {
      if (window.location.pathname.startsWith('/phase3/dashboard') || window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/phase2/dashboard')) {
        setIsLoggedIn(true);
      }
    };
    checkLoginRedirect();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', checkLogin);
    }
  }, [isModalOpen]);
  
  const closeSheet = () => setIsSheetOpen(false);

  const onModalOpen = (flow: FlowType) => {
    setRegistrationFlow(flow);
    setIsModalOpen(true);
    closeSheet();
  }

  const onModalClose = () => {
    setIsModalOpen(false);
    // Simulate post-registration state change
    if (registrationFlow === 'phase1') {
      localStorage.setItem('hasPhase1Applied', 'true');
    } else {
      localStorage.setItem('hasPhase2Applied', 'true');
    }
    setIsLoggedIn(true);
  }

  const handleSignOut = () => {
    localStorage.removeItem('hasPhase1Applied');
    localStorage.removeItem('hasPhase2Applied');
    localStorage.removeItem('hasPhase3Applied');
    setIsLoggedIn(false);
    closeSheet();
    // In a real app, you would also clear tokens/session and redirect
    window.location.href = '/';
  }

  const renderNavItems = (items: NavItem[], isMobile = false) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm font-medium flex items-center gap-1 px-2">
                {item.label} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              {item.children.map((child, index) => {
                 if (child.label === '---') {
                    return <DropdownMenuSeparator key={`separator-${index}`} />;
                 }
                 if (child.isHeader) {
                    return <DropdownMenuLabel key={child.label}>{child.label}</DropdownMenuLabel>;
                 }
                 return (
                    <DropdownMenuItem asChild key={child.label}>
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
          key={item.label}
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
    <nav className={cn("items-center gap-4 text-lg font-medium", isMobile ? "flex flex-col space-y-4" : "hidden md:flex")}>
      {renderNavItems(isLoggedIn ? loggedInNav : publicNav, isMobile)}
    </nav>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex h-16 items-center border-b transition-all duration-300",
          scrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent"
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
                <DropdownMenuItem disabled>Español (coming soon)</DropdownMenuItem>
                <DropdownMenuItem disabled>Français (coming soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex items-center gap-2">
              {isLoggedIn ? (
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="#">Qualification Criteria</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/resources/contact-ir">Contact IR Team</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="#">FAQs</Link></DropdownMenuItem>
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
                      <div className="mt-8 flex flex-col gap-4">
                        {isLoggedIn ? (
                           <>
                            <Button asChild size="sm" onClick={closeSheet}><Link href="/dashboard">Dashboard</Link></Button>
                            <Button size="sm" variant="outline" onClick={handleSignOut}>Sign Out</Button>
                          </>
                        ) : (
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm">Investor Access</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onModalOpen("phase1")}>Apply for Access</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onModalOpen("phase2")}>Phase 2 SPV Invite</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild><Link href="#">Qualification Criteria</Link></DropdownMenuItem>
                                    <DropdownMenuItem asChild><Link href="/resources/contact-ir">Contact IR Team</Link></DropdownMenuItem>
                                    <DropdownMenuItem asChild><Link href="#">FAQs</Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                      </div>
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
