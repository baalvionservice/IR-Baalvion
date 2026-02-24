"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, Mountain } from "lucide-react";
import { cn } from "@/lib/utils";
import RegistrationModal from "@/components/investor-registration/registration-modal";
import { navLinks } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // Simulate user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Simulate login after registration modal closes
    if (!isModalOpen && !isLoggedIn) {
        // A real app would check a session or token.
        // We'll just set it to true after first modal interaction.
        // This is a placeholder for a real auth check.
        const hasApplied = localStorage.getItem('hasApplied');
        if(hasApplied) setIsLoggedIn(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen, isLoggedIn]);
  
  const closeSheet = () => setIsSheetOpen(false);

  const onModalClose = () => {
    setIsModalOpen(false);
    // This is a placeholder for real post-registration logic
    localStorage.setItem('hasApplied', 'true');
    setIsLoggedIn(true);
  }

  const handleSignOut = () => {
    localStorage.removeItem('hasApplied');
    setIsLoggedIn(false);
    // In a real app, you would also clear tokens/session
  }

  const LoggedInNav = () => (
    <>
      <Link href="/dashboard" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
      <Link href="/data-room" onClick={closeSheet} className="text-muted-foreground transition-colors hover:text-foreground">Data Room</Link>
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
      {isLoggedIn ? <LoggedInNav /> : <PublicNav />}
    </nav>
  );

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
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="hidden sm:flex">Apply for Access</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-6 sm:max-w-xl md:max-w-2xl">
                <RegistrationModal closeModal={onModalClose} />
              </DialogContent>
            </Dialog>
          )}

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col p-6">
                    <Link href="/" className="mb-8 flex items-center gap-2 font-semibold">
                        <Mountain className="h-6 w-6 text-primary" />
                        <span>Baalvion</span>
                    </Link>
                    <NavContent />
                     {!isLoggedIn && (
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="mt-6 w-full">Apply for Access</Button>
                            </DialogTrigger>
                             <DialogContent className="max-w-md p-6 sm:max-w-xl md:max-w-2xl">
                                <RegistrationModal closeModal={onModalClose} />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
