"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="bg-background text-foreground py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            <span className="text-primary">Investor</span>
                            <br />
                            Relations
                        </h1>
                        <p className="mt-4 max-w-md text-lg text-muted-foreground">
                            Latest information for interested parties of Baalvion stock.
                        </p>
                        <div className="mt-6 space-y-2">
                            <Link href="/dashboard" className="flex items-center text-sm text-foreground hover:text-primary transition-colors">
                                <span className="text-primary font-bold mr-2">{'>'}</span>
                                See our latest quarterly results
                            </Link>
                            <Link href="#press-releases" className="flex items-center text-sm text-foreground hover:text-primary transition-colors">
                                <span className="text-primary font-bold mr-2">{'>'}</span>
                                See our latest press releases
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (Stock Widget) */}
                    <div className="flex justify-center md:justify-end">
                        <div className="border border-border p-6 rounded-lg w-full max-w-sm bg-background">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold">NYSE: BAA</h3>
                                <div className="h-4 w-4 bg-primary"></div>
                            </div>
                            <div className="mt-4">
                                <p className="text-4xl font-bold">$1,081.05</p>
                                <p className="text-green-400 font-semibold">+10.04 (0.94%)</p>
                            </div>
                            <div className="mt-4 border-t border-border pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Market Cap:</span>
                                    <span className="font-bold">$167.73B</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                20 minutes min. delay | February 24, 2026 4:00 PM ET
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-x-12 gap-y-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Annual Report and Proxy</h2>
                        <div className="space-y-4">
                            <Button asChild variant="outline" className="w-full justify-between text-base p-7 hover:border-primary cursor-pointer">
                                <Link href="#">
                                    2024 Annual Report <span className="text-primary font-bold">{'>'}</span>
                                </Link>
                            </Button>
                             <Button asChild variant="outline" className="w-full justify-between text-base p-7 hover:border-primary cursor-pointer">
                                <Link href="#">
                                    2025 Proxy <span className="text-primary font-bold">{'>'}</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                     <div>
                        <h2 className="text-3xl font-bold mb-6">2025 Investor Day</h2>
                        <div className="space-y-4">
                            <Button asChild variant="outline" className="w-full justify-between text-base p-7 hover:border-primary cursor-pointer">
                                <Link href="#">
                                    Full presentation <span className="text-primary font-bold">{'>'}</span>
                                </Link>
                            </Button>
                             <Button asChild variant="outline" className="w-full justify-between text-base p-7 hover:border-primary cursor-pointer">
                                <Link href="#">
                                    Agenda <span className="text-primary font-bold">{'>'}</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
