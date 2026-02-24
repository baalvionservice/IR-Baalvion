"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, Mountain, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import RegistrationModal from "@/components/investor-registration/registration-modal";
import { navLinks } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FlowType = "phase1" | "phase2";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationFlow, setRegistrationFlow] = useState<FlowType>("phase1");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Simulate user authentication state
  const [isPhase1LoggedIn, setIsPhase1LoggedIn] = useState(false);
  const [isPhase2LoggedIn, setIsPhase2LoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Placeholder for real auth check
    const hasP1Applied = !!localStorage.getItem('hasPhase1Applied');
    const hasP2Applied = !!localStorage.getItem('hasPhase2Applied');
    if (hasP1Applied) setIsPhase1LoggedIn(true);
    if (hasP2Applied) setIsPhase2LoggedIn(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen]);
  
  const closeSheet = () => setIsSheetOpen(false);

  const onModalOpen = (flow: FlowType) => {
    setRegistrationFlow(flow);
    setIsModalOpen(true);
  }

  const onModalClose = () => {
    setIsModalOpen(false);
    // Placeholder for real post-registration logic
    if (registrationFlow === 'phase1') {
      localStorage.setItem('hasPhase1Applied', 'true');
      setIsPhase1LoggedIn(true);
    } else {
      localStorage.setItem('hasPhase2Applied', 'true');
      setIsPhase2LoggedIn(true);
      setIsPhase1LoggedIn(false); // P2 users are distinct
      localStorage.removeItem('hasPhase1Applied');
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('hasPhase1Applied');
    localStorage.removeItem('hasPhase2Applied');
    setIsPhase1LoggedIn(false);
    setIsPhase2LoggedIn(false);
    // In a real app, you would also clear tokens/session
  }

  const LoggedInNav = () => (
    <>
      {isPhase1LoggedIn && (
        <>
          <Link href="/dashboard" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground">P1 Dashboard</Link>
          <Link href="/data-room" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground">P1 Data Room</Link>
        </>
      )}
      {isPhase2LoggedIn && (
        <>
          <Link href="/phase2/dashboard" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"> <Briefcase/> P2 Dashboard</Link>
          <Link href="/phase2/data-room" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"> <Users/> P2 Data Room</Link>
        </>
      )}
      <Link href="/admin" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground">Admin</Link>
    </>
  );
  
  const PublicNav = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={closeSheet}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  const NavContent = () => (
    <nav className="flex flex-col gap-6 text-lg font-medium md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      {isPhase1LoggedIn || isPhase2LoggedIn ? <LoggedInNav /> : <PublicNav />}
    </nav>
  );
  
  const isLoggedIn = isPhase1LoggedIn || isPhase2LoggedIn;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center border-b transition-all duration-300",
        scrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block">Baalvion</span>
          </Link>
          <div className="hidden md:flex">
            <NavContent />
          </div>
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

          {isLoggedIn ? (
             <Button size="sm" variant="outline" onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onModalOpen("phase2")}>Phase 2 Invite</Button>
              <Dialog open={isModalOpen && registrationFlow === 'phase1'} onOpenChange={(isOpen) => !isOpen && setIsModalOpen(false)}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => onModalOpen("phase1")}>Apply for Access</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-6 sm:max-w-xl md:max-w-2xl">
                  <RegistrationModal closeModal={onModalClose} flowType="phase1" />
                </DialogContent>
              </Dialog>
            </div>
          )}
          
          <Dialog open={isModalOpen && registrationFlow === 'phase2'} onOpenChange={(isOpen) => !isOpen && setIsModalOpen(false)}>
              <DialogContent className="max-w-md p-6 sm:max-w-xl md:max-w-2xl">
                  <RegistrationModal closeModal={onModalClose} flowType="phase2" />
              </DialogContent>
          </Dialog>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col p-6">
                    <Link href="/" className="mb-8 flex items-center gap-2 font-semibold" onClick={closeSheet}>
                        <Mountain className="h-6 w-6 text-primary" />
                        <span>Baalvion</span>
                    </Link>
                    <NavContent />
                     {!isLoggedIn && (
                       <div className="mt-6 flex flex-col gap-2">
                        <Button size="sm" variant="outline" onClick={() => { onModalOpen("phase2"); closeSheet(); }}>Phase 2 Invite</Button>
                        <Button size="sm" onClick={() => { onModalOpen("phase1"); closeSheet(); }}>Apply for Access</Button>
                       </div>
                    )}
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
