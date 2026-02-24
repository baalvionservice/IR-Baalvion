"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RegistrationModal from "@/components/investor-registration/registration-modal";
import { useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
    <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-foreground">The Global B2B Trade</span>
          <span className="block text-primary">Operating System</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground md:max-w-xl">
         An institutional-grade investment opportunity in the backbone of modern commerce. Accredited investors only.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button size="lg">Apply for Investment Access</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-6 sm:max-w-xl md:max-w-2xl">
                    <RegistrationModal closeModal={() => setIsModalOpen(false)} />
                </DialogContent>
            </Dialog>
            <Button asChild size="lg" variant="outline">
                <Link href="#overview">
                    Learn More
                    <ArrowDown className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
