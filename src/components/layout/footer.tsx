import { Mountain, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2" aria-label="Baalvion Home">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Baalvion</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Engineering the institutional-grade operating system for global B2B trade.
            </p>
             <form className="w-full max-w-sm space-y-2">
              <p className="text-sm font-semibold">Stay up to date</p>
              <div className="flex space-x-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Investments</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Investment Thesis</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Phase 1: Institutional</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Phase 2: Private SPVs</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Phase 3: Operators</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Mission</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Leadership</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Partners</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
               <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Risk Disclosure</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {year} Baalvion Corporation. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
             <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-primary"/></Link>
             <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary"/></Link>
             <Link href="#" aria-label="YouTube"><Youtube className="h-5 w-5 hover:text-primary"/></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
