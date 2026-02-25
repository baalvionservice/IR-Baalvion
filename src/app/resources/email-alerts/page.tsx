import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Investor Email Alerts | Baalvion',
    description: 'Sign up for investor email alerts from Baalvion.',
};

export default function EmailAlertsPage() {
    const mailingLists = [
        "Press Releases",
        "Events",
        "Presentations",
        "SEC Filings",
        "End of Day Stock Quote",
        "Financial Reports"
    ];

    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">RESOURCES</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Investor Email Alerts</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Section 1: Information */}
                    <div className="mb-12 space-y-6 text-sm text-gray-700">
                        <h2 className="text-3xl font-bold text-black text-center">Subscribe to Email Alerts</h2>
                        <p>
                            To opt-in for investor email alerts, please enter your email address in the field below and select at least one alert option. After submitting your request, you will receive an activation email to the requested email address. You must click the activation link in order to complete your subscription. You can sign up for additional alert options at any time.
                        </p>
                        <p>
                            At Baalvion Inc., we promise to treat your data with respect and will not share your information with any third party. You can unsubscribe to any of the investor alerts you are subscribed to by visiting the 'unsubscribe' section below. If you experience any issues with this process, please contact us for further assistance.
                        </p>
                        <p className="font-bold">
                            By providing your email address below, you are providing consent to Baalvion Inc. to send you the requested Investor Email Alert updates.
                        </p>
                    </div>

                    {/* Section 2: Form */}
                    <div className="border-t border-gray-200 pt-12">
                        <form className="space-y-8">
                            <p className="text-xs text-gray-600">* Required</p>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold">Email Address *</Label>
                                <Input id="email" type="email" placeholder="Your Email" className="bg-white border-gray-300" />
                            </div>

                            <div className="space-y-4">
                                <Label className="font-bold">Mailing Lists *</Label>
                                <div className="space-y-3">
                                    {mailingLists.map((item) => (
                                        <div key={item} className="flex items-center space-x-3">
                                            <Checkbox id={item.toLowerCase().replace(/ /g, '-')} />
                                            <Label htmlFor={item.toLowerCase().replace(/ /g, '-')} className="font-normal cursor-pointer text-sm">
                                                {item}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-sm px-6 py-3">
                                Sign up <span className="ml-1">&gt;</span>
                            </Button>
                        </form>
                        <p className="text-xs text-gray-600 mt-8">
                            For further information on how we protect your information, please refer to our <Link href="#" className="underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
