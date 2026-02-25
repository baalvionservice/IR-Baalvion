import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from '@/lib/countries';

export const metadata: Metadata = {
    title: 'Contact Investor Relations | Baalvion',
    description: 'Contact the Baalvion Investor Relations team.',
};

export default function ContactIrPage() {
    const inputStyle = "w-full bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-2 text-black ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary placeholder:text-gray-500 text-sm";

    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">RESOURCES</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Contact Investor Relations</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Left Column */}
                            <div className="space-y-8">
                                <div className="space-y-1">
                                    <Label htmlFor="first-name" className="text-xs text-gray-700">First Name*</Label>
                                    <Input id="first-name" placeholder="First Name" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email" className="text-xs text-gray-700">Email*</Label>
                                    <Input id="email" type="email" placeholder="Email" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="institution" className="text-xs text-gray-700">Institution</Label>
                                    <Input id="institution" placeholder="Institution" className={inputStyle} />
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="address2" className="text-xs text-gray-700">Address2</Label>
                                    <Input id="address2" placeholder="Address2" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="state" className="text-xs text-gray-700">State*</Label>
                                    <Input id="state" placeholder="State" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="country" className="text-xs text-gray-700">Country</Label>
                                    <Select defaultValue="united-states">
                                        <SelectTrigger className="w-full justify-between bg-white border border-gray-300 rounded-sm px-3 py-2 text-black ring-offset-0 focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem key={country} value={country.toLowerCase().replace(/\s/g, '-')}>
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            {/* Right Column */}
                             <div className="space-y-8">
                                <div className="space-y-1">
                                    <Label htmlFor="last-name" className="text-xs text-gray-700">Last Name*</Label>
                                    <Input id="last-name" placeholder="Last Name" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="title" className="text-xs text-gray-700">Title*</Label>
                                    <Input id="title" placeholder="Title" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="address1" className="text-xs text-gray-700">Address1*</Label>
                                    <Input id="address1" placeholder="Address1" className={inputStyle} />
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="city" className="text-xs text-gray-700">City*</Label>
                                    <Input id="city" placeholder="City" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="zip-code" className="text-xs text-gray-700">Zip Code*</Label>
                                    <Input id="zip-code" placeholder="Zip Code" className={inputStyle} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="comments" className="text-xs text-gray-700">Questions and Comments</Label>
                                    <Textarea id="comments" placeholder="Questions and Comments" className="bg-white border-gray-300 rounded-sm min-h-[110px]" />
                                </div>
                            </div>
                        </div>

                        {/* Captcha and Submit */}
                        <div className="pt-4">
                             <div className="space-y-2 max-w-xs">
                                <div className="bg-gray-200 h-12 flex items-center justify-center border border-gray-300">
                                    <p className="text-gray-500 text-2xl tracking-[0.2em] italic font-serif">106506</p>
                                </div>
                                <Label htmlFor="captcha" className="text-xs text-gray-700">Enter the code shown above.</Label>
                                <Input id="captcha" className={inputStyle} />
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-sm px-8 py-3">
                                Submit <span className="ml-2 font-bold">&gt;</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
