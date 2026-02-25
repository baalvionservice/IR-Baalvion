import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import QuickLinksSection from '@/components/sections/quick-links-section';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Baalvion | Investor Relations',
    template: '%s | Baalvion',
  },
  description: 'Institutional-Grade Investor Relations Platform. Engineering the backbone of global B2B trade.',
  keywords: ['Baalvion', 'Investor Relations', 'B2B Trade', 'Logistics', 'Finance', 'Governance'],
  authors: [{ name: 'Baalvion Corporate Communications' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  metadataBase: new URL('https://baalvion.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', inter.variable)}>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <Header />
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <QuickLinksSection />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
