"use client";

import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Events & Presentations | Baalvion',
    description: 'Upcoming and past events and presentations from Baalvion.',
};

export default function EventsPage() {
    const scheduledEvent = new Date('2026-02-10T12:00:00Z');
    const currentDay = new Date('2026-02-25T12:00:00Z');

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
        </>
    );
}
