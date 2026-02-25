"use client";

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { pressReleases } from '@/lib/data';

export default function PressReleasesPage() {
    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedCategory, setSelectedCategory] = useState('All Releases');
    
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">NEWS & EVENTS</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Press Releases</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Year:</label>
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="w-[120px] bg-white text-black border-gray-300">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2026">2026</SelectItem>
                                    <SelectItem value="2025">2025</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                             <label className="text-sm font-medium">Category:</label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-[180px] bg-white text-black border-gray-300">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Releases">All Releases</SelectItem>
                                    <SelectItem value="Financials">Financials</SelectItem>
                                    <SelectItem value="Corporate">Corporate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {pressReleases.map((release, index) => (
                            <div key={index} className="border-b border-gray-200 pb-8">
                                <h2 className="text-xl font-bold mb-2 hover:underline">
                                    <Link href={release.link}>{release.title}</Link>
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">{release.date}</p>
                                {(release.download || release.webcast || release.supplement) && (
                                     <div className="flex items-center gap-4 text-sm font-bold text-primary">
                                        {release.download && (
                                            <Link href={release.download} className="hover:underline flex items-center gap-1">
                                                <span className="mr-1">&gt;</span> Download
                                            </Link>
                                        )}
                                        {release.webcast && (
                                            <Link href={release.webcast} className="hover:underline flex items-center gap-1">
                                                <span className="mr-1">&gt;</span> Webcast
                                            </Link>
                                        )}
                                         {release.supplement && (
                                            <Link href={release.supplement} className="hover:underline flex items-center gap-1">
                                                <span className="mr-1">&gt;</span> Supplement
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
