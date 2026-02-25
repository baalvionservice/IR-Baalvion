"use client";

import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, FileText, FileSpreadsheet } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EventsPage() {
    const scheduledEvent = new Date('2026-02-10T12:00:00Z');
    const currentDay = new Date('2026-02-25T12:00:00Z');
    const presentationImage = PlaceHolderImages.find(p => p.id === 'news-3-image');

    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">NEWS & EVENTS</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Events & Presentations</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Events Calendar */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Events Calendar</h2>
                            <Card className="p-0 overflow-hidden border">
                                <Calendar
                                    month={new Date('2026-02-01')}
                                    modifiers={{
                                        scheduled: scheduledEvent,
                                        current: currentDay,
                                    }}
                                    modifiersClassNames={{
                                        scheduled: 'bg-gray-200 rounded-full',
                                        current: 'bg-yellow-400 text-black rounded-full',
                                    }}
                                    classNames={{
                                        caption: 'bg-black text-white flex justify-between px-4 py-2 items-center',
                                        caption_label: 'text-lg font-bold',
                                        nav_button: 'text-white hover:text-gray-300',
                                        head_cell: 'font-semibold text-sm text-gray-700 w-12',
                                        cell: 'w-12 h-12',
                                        day: 'h-10 w-10',
                                    }}
                                />
                            </Card>
                            <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-yellow-400 border border-gray-300"></div>
                                    <span>Current Day</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300"></div>
                                    <span>Scheduled Event</span>
                                </div>
                            </div>
                        </div>

                        {/* Latest Events */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Latest Events</h2>
                            <div className="space-y-8">
                                <p className="text-xs text-gray-500">
                                    Statements made during these events may contain a number of forward-looking statements. We call your attention to the fact that Baalvion's actual results may of course differ from these statements. Baalvion has filed reports with the SEC, which list some of the factors that may cause the results of Baalvion to differ materially from what is included in the event. Baalvion assumes no duty and does not undertake to update any forward-looking statements.
                                </p>
                                <div className="border border-gray-200 p-8">
                                    <h3 className="text-xl font-bold mb-2">
                                        Baalvion's Martin S. Small to Present at the 2026 Bank of America Securities Financial Services Conference on February 10th
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">Feb 10, 2026</p>
                                    <Link href="#" className="text-sm font-bold text-primary hover:underline flex items-center">
                                        <span className="mr-2">&gt;</span> Webcast
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-yellow-400 text-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12">Featured Presentation</h2>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-4">
                            <p className="font-semibold">12 JUN 2025</p>
                            <h3 className="text-4xl font-bold">
                                Baalvion, Inc. 2025 Investor Day
                            </h3>
                            <Button asChild variant="link" className="text-black p-0 text-base hover:underline">
                                <Link href="#">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Link>
                            </Button>
                        </div>
                        <div>
                           {presentationImage && (
                                <Card className="overflow-hidden border-black">
                                     <Image
                                        src={presentationImage.imageUrl}
                                        alt="Investor Day Presentation"
                                        data-ai-hint={presentationImage.imageHint}
                                        width={600}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                </Card>
                           )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Archived Events</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-start mb-8 gap-4">
                           <p className="text-sm font-medium">Select Year:</p>
                            <Select defaultValue="2026">
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

                        <div className="space-y-8">
                            <div className="border-b border-gray-200 pb-8">
                                <p className="text-sm text-gray-500 mb-2">10 Feb 2026 11:20 AM ET</p>
                                <h3 className="text-xl font-bold mb-4">
                                    Baalvion's Martin S. Small to Present at the 2026 Bank of America Securities Financial Services Conference on February 10th
                                </h3>
                                <div className="flex gap-4">
                                    <Link href="#" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                        <LinkIcon className="h-4 w-4" /> Webcast
                                    </Link>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 pb-8">
                                <p className="text-sm text-gray-500 mb-2">15 Jan 2026 7:30 AM ET</p>
                                <h3 className="text-xl font-bold mb-4">
                                    Q4 2025 Baalvion, Inc. Earnings Conference Call
                                </h3>
                                <div className="flex gap-4 flex-wrap">
                                    <Link href="#" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                    <LinkIcon className="h-4 w-4" /> Webcast
                                    </Link>
                                    <Link href="#" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                        <FileText className="h-4 w-4" /> Earnings Release
                                    </Link>
                                    <Link href="#" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                    <FileSpreadsheet className="h-4 w-4" /> Earnings Supplement
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Archived Presentations</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-start mb-8 gap-4">
                           <p className="text-sm font-medium">Select Year:</p>
                            <Select defaultValue="2025">
                                <SelectTrigger className="w-[120px] bg-white text-black border-gray-300">
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
