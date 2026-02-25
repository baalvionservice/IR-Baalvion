
import { getSessionFromCookie } from '@/lib/auth/session';
import CapitalOverview from '@/components/dashboard/CapitalOverview';
import CapitalCalls from '@/components/dashboard/CapitalCalls';
import DistributionLedger from '@/components/dashboard/DistributionLedger';
import NavChart from '@/components/dashboard/NavChart';
import DocumentPreview from '@/components/dashboard/DocumentPreview';
import ActiveVoting from '@/components/dashboard/ActiveVoting';
import { EventPackageDownload } from '@/components/dashboard/EventPackageDownload';
import { cookies } from 'next/headers';

async function getDashboardData() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('baalvion_session_mock')?.value || '';

  const headers = {
    Cookie: `baalvion_session_mock=${sessionCookie}`,
  };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  const [summary, calls, distributions, navHistory, documents, votes] = await Promise.all([
    fetch(`${baseUrl}/api/v1/investor/capital-summary`, { headers }).then((res) => res.json()),
    fetch(`${baseUrl}/api/v1/investor/capital-calls`, { headers }).then((res) => res.json()),
    fetch(`${baseUrl}/api/v1/investor/distributions`, { headers }).then((res) => res.json()),
    fetch(`${baseUrl}/api/v1/investor/nav-history`, { headers }).then((res) => res.json()),
    fetch(`${baseUrl}/api/v1/investor/documents`, { headers }).then((res) => res.json()),
    fetch(`${baseUrl}/api/v1/investor/active-votes`, { headers }).then((res) => res.json()),
  ]);

  return {
    summary: summary.data,
    calls: calls.data,
    distributions: distributions.data,
    navHistory: navHistory.data,
    documents: documents.data,
    votes: votes.data,
  };
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('baalvion_session_mock')?.value;
  const session = getSessionFromCookie(sessionCookie);
  
  const data = await getDashboardData();

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
          <p className="text-muted-foreground">
            Institutional Capital Overview for {session.email}
          </p>
        </div>
        <EventPackageDownload />
      </div>

      <CapitalOverview summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <NavChart data={data.navHistory} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CapitalCalls calls={data.calls} />
            <DistributionLedger distributions={data.distributions} />
          </div>
        </div>
        
        <div className="space-y-8">
          <ActiveVoting votes={data.votes} />
          <DocumentPreview documents={data.documents} role={session.role} />
        </div>
      </div>
    </div>
  );
}
