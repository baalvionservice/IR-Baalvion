"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function InvestorDayPage() {
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">NEWS & EVENTS</p>
                    <h1 className="text-4xl md:text-5xl font-bold">2025 Investor Day</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Archived Presentations</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-start mb-8 gap-4">
                           <p className="text-sm font-medium">Select Year:</p>
                            <Select defaultValue="2025">
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2025">2025</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-8">
                            <div className="border-b border-gray-200 pb-8">
                                <p className="text-sm text-gray-500 mb-2">12 Jun 2025</p>
                                <h3 className="text-xl font-bold mb-4">
                                    Baalvion, Inc. 2025 Investor Day
                                </h3>
                                <div className="flex gap-4">
                                    <Button asChild variant="link" className="text-black p-0 hover:underline">
                                      <Link href="#">
                                          <Download className="mr-2 h-4 w-4" />
                                          Download PDF
                                      </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}