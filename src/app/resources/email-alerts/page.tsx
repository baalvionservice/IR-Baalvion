import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Investor Email Alerts | Baalvion',
    description: 'Sign up for investor email alerts from Baalvion.',
};

export default function EmailAlertsPage() {
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">RESOURCES</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Investor Email Alerts</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <Card className="max-w-2xl mx-auto bg-white border-gray-200 text-black">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl md:text-4xl">Stay Updated</CardTitle>
                            <CardDescription className="text-gray-600">
                                Sign up to receive email alerts for new press releases, SEC filings, and investor events.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <form className="flex w-full items-center gap-4">
                                <div className="w-full">
                                    <label htmlFor="email-alert" className="sr-only">Your Email</label>
                                    <Input 
                                        id="email-alert"
                                        type="email" 
                                        placeholder="Your Email Address" 
                                        className="w-full bg-gray-50 border-gray-300"
                                    />
                                </div>
                                <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-sm whitespace-nowrap">
                                    Sign up
                                </Button>
                            </form>
                            <p className="text-xs text-gray-500 mt-4 text-center">You can unsubscribe at any time. See our <Link href="#" className="underline">Privacy Policy</Link>.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
}
