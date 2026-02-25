import ContactSection from '@/components/sections/contact-section';
import GovernanceSection from '@/components/sections/governance-section';
import HeroSection from '@/components/sections/hero-section';
import NewsSection from '@/components/sections/news-section';
import OverviewSection from '@/components/sections/overview-section';
import PressReleasesSection from '@/components/sections/press-releases-section';
import QuickLinksSection from '@/components/sections/quick-links-section';
import RiskSection from '@/components/sections/risk-section';
import ThesisSection from '@/components/sections/thesis-section';
import TrustSignals from '@/components/global/TrustSignals';

export default function Home() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <TrustSignals />
      <div className="space-y-16 py-16 md:space-y-24 md:py-24 lg:space-y-32 lg:py-32">
        <OverviewSection id="overview" />
        <ThesisSection id="thesis" />
        <GovernanceSection id="governance" />
        <RiskSection id="risk" />
        <NewsSection id="news" />
        <PressReleasesSection id="press-releases" />
        <ContactSection id="contact" />
      </div>
      <QuickLinksSection />
    </main>
  );
}
