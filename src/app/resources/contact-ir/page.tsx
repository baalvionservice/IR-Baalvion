import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
    title: 'Contact Investor Relations | Baalvion',
    description: 'Contact the Baalvion Investor Relations team.',
};

export default function ContactIrPage() {
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">RESOURCES</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Contact Investor Relations</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <Card className="max-w-3xl mx-auto bg-white border-gray-200 text-black">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl md:text-4xl">Get in Touch</CardTitle>
                            <CardDescription className="text-gray-600">
                            For inquiries or to begin the application process, please reach out. This channel is for prospective accredited investors only.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" className="bg-gray-50 border-gray-300" />
                                </div>
                                <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" className="bg-gray-50 border-gray-300" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Enter your message" className="min-h-[120px] bg-gray-50 border-gray-300" />
                            </div>
                            <div className="flex justify-center">
                                <Button type="submit" className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 rounded-sm">Submit Inquiry</Button>
                            </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
}
