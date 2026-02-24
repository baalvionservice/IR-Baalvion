import { Mountain } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Baalvion Home">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Baalvion</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Pioneering the future of investment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#overview" className="text-sm text-muted-foreground hover:text-primary">Overview</Link></li>
              <li><Link href="#thesis" className="text-sm text-muted-foreground hover:text-primary">Investment Thesis</Link></li>
              <li><Link href="#governance" className="text-sm text-muted-foreground hover:text-primary">Governance</Link></li>
              <li><Link href="#news" className="text-sm text-muted-foreground hover:text-primary">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">LinkedIn</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Twitter</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {year} Baalvion Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
