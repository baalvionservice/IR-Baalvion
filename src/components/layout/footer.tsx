import { Mountain, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <Link href="/" className="flex items-center gap-2" aria-label="Baalvion Home">
              <span className="text-2xl font-bold">Baalvion</span>
            </Link>
        </div>

        {/* Top section with addresses and links */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          
          {/* Column 1: Headquarters */}
          <div className="space-y-2">
            <h4 className="font-bold tracking-wider mb-2">BAALVION, INC.</h4>
            <p className="font-bold">Headquarters:</p>
            <address className="not-italic">
                Yeshwant Avenue Building, NX, NX Road, Y K Nagar, Virar West, Virar, Maharashtra 401303
                <br />
                {"Phone: +91 8951284770"}
            </address>
          </div>

          {/* Column 2: Contact Info & Registered Address */}
          <div className="space-y-4">
            <div className="space-y-2">
                <h4 className="font-bold tracking-wider mb-2">CONTACT INFORMATION</h4>
                <p>Baalvion Investor Relations</p>
                <p>Email: invrel@baalvion.com</p>
            </div>
            <div className="space-y-2">
                <h4 className="font-bold tracking-wider mb-2">REGISTERED ADDRESS</h4>
                <p className="text-gray-500 text-[10px]">(for Corporate/Legal Purposes)</p>
                <address className="not-italic">
                    CIN: U43121OD2025PTC048479
                    <br />
                    C/o Dilip Kumar Kuldeep, Upper Mania, Po- Pakjhola, Semiliguda, Koraput, Koraput, Orissa, India, 764036
                </address>
            </div>
          </div>

          {/* Column 3: Investor Services */}
          <div className="space-y-2">
            <h4 className="font-bold tracking-wider mb-2">INVESTOR SERVICES & RESOURCES</h4>
            <ul className="space-y-1 font-bold">
              <li><Link href="#" className="hover:underline">IR HOME</Link></li>
              <li><Link href="#" className="hover:underline">FINANCIALS</Link></li>
              <li><Link href="#news" className="hover:underline">NEWS & EVENTS</Link></li>
              <li><Link href="#" className="hover:underline">STOCK INFORMATION</Link></li>
              <li><Link href="#governance" className="hover:underline">GOVERNANCE</Link></li>
              <li><Link href="#" className="hover:underline">RESOURCES</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 bg-gray-300" />

        {/* Bottom legal links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-3 text-xs text-gray-700">
            <Link href="#" className="hover:underline whitespace-nowrap">Terms & Conditions</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Privacy Policy</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Business Continuity</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Baalvion Corporate Tax Strategy</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Baalvion Gender/Compliance Reports</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Baalvion Investor Policy</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Manage Cookies</Link>
        </div>

        <Separator className="my-6 bg-gray-300" />

        {/* Copyright and Social */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
            <p>© 2026 Baalvion, Inc. All rights reserved. Powered by Baalvion Group</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
             <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-black"/></Link>
             <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-black"/></Link>
             <Link href="#" aria-label="YouTube"><Youtube className="h-5 w-5 hover:text-black"/></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
