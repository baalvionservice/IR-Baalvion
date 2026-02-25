import ContactSection from '@/components/sections/contact-section';
import GovernanceSection from '@/components/sections/governance-section';
import HeroSection from '@/components/sections/hero-section';
import NewsSection from '@/components/sections/news-section';
import OverviewSection from '@/components/sections/overview-section';
import PressReleasesSection from '@/components/sections/press-releases-section';
import QuarterlyResultsSection from '@/components/sections/quarterly-results-section';
import RiskSection from '@/components/sections/risk-section';
import ThesisSection from '@/components/sections/thesis-section';
import TrustSignals from '@/components/global/TrustSignals';
import WhoWeAreSection from '@/components/sections/who-we-are-section';

export default function Home() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <WhoWeAreSection />
      <TrustSignals />
      <QuarterlyResultsSection />
      <div className="space-y-16 py-16 md:space-y-24 md:py-24 lg:space-y-32 lg:py-32">
        <OverviewSection id="overview" />
        <ThesisSection id="thesis" />
        <GovernanceSection id="governance" />
        <NewsSection id="news" />
        <PressReleasesSection id="press-releases" />
        <ContactSection id="contact" />
        <RiskSection id="risk" />
      </div>
    </main>
  );
}
