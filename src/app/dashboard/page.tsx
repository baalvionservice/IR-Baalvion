import { getSessionFromCookie } from "@/lib/auth/session";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { cookies } from "next/headers";

async function getDashboardData() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("baalvion_session_mock")?.value || "";

  const headers = {
    Cookie: `baalvion_session_mock=${sessionCookie}`,
  };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:9002";

  const [summary, calls, distributions, navHistory, documents, votes] =
    await Promise.all([
      fetch(`${baseUrl}/api/v1/investor/capital-summary`, { headers }).then(
        (res) => res.json()
      ),
      fetch(`${baseUrl}/api/v1/investor/capital-calls`, { headers }).then(
        (res) => res.json()
      ),
      fetch(`${baseUrl}/api/v1/investor/distributions`, { headers }).then(
        (res) => res.json()
      ),
      fetch(`${baseUrl}/api/v1/investor/nav-history`, { headers }).then((res) =>
        res.json()
      ),
      fetch(`${baseUrl}/api/v1/investor/documents`, { headers }).then((res) =>
        res.json()
      ),
      fetch(`${baseUrl}/api/v1/investor/active-votes`, { headers }).then(
        (res) => res.json()
      ),
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
  const sessionCookie = cookieStore.get("baalvion_session_mock")?.value;
  const session = getSessionFromCookie(sessionCookie);
  const data = await getDashboardData();

  return (
    <DashboardClient
      data={data}
      userEmail={session.email}
      userRole={session.role}
    />
  );
}
