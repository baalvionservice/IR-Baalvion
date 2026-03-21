import { getSessionFromCookie } from "@/lib/auth/session";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { cookies } from "next/headers";

async function safeFetch(url: string, headers: Record<string, string>) {
  try {
    const response = await fetch(url, {
      headers,
      cache: "no-store", // Ensure fresh data in production
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return { data: null };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { data: null };
  }
}

async function getDashboardData() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("baalvion_session_mock")?.value || "";

  const headers = {
    Cookie: `baalvion_session_mock=${sessionCookie}`,
  };

  // In production, use the current domain for internal API calls
  // In development, allow localhost fallback
  let baseUrl: string;

  if (process.env.NODE_ENV === "production") {
    // Use the current domain for internal API calls in production
    baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://ir.baalvion.com";
  } else {
    // Development fallback
    baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:9002";
  }

  const [summary, calls, distributions, navHistory, documents, votes] =
    await Promise.all([
      safeFetch(`${baseUrl}/api/v1/investor/capital-summary`, headers),
      safeFetch(`${baseUrl}/api/v1/investor/capital-calls`, headers),
      safeFetch(`${baseUrl}/api/v1/investor/distributions`, headers),
      safeFetch(`${baseUrl}/api/v1/investor/nav-history`, headers),
      safeFetch(`${baseUrl}/api/v1/investor/documents`, headers),
      safeFetch(`${baseUrl}/api/v1/investor/active-votes`, headers),
    ]);

  return {
    summary: summary?.data || null,
    calls: calls?.data || [],
    distributions: distributions?.data || [],
    navHistory: navHistory?.data || [],
    documents: documents?.data || [],
    votes: votes?.data || [],
  };
}

export default async function DashboardPage() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("baalvion_session_mock")?.value;
    const session = getSessionFromCookie(sessionCookie);

    // Add error boundary for data fetching
    let data;
    try {
      data = await getDashboardData();
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
      // Provide fallback data structure
      data = {
        summary: null,
        calls: [],
        distributions: [],
        navHistory: [],
        documents: [],
        votes: [],
      };
    }

    return (
      <DashboardClient
        data={data}
        userEmail={session?.email || "guest@baalvion.com"}
        userRole={session?.role || "public"}
      />
    );
  } catch (error) {
    console.error("Dashboard page error:", error);

    // Fallback UI for production errors
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">
            Dashboard Temporarily Unavailable
          </h1>
          <p className="text-muted-foreground mb-4">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page or contact support if the issue persists.
          </p>
        </div>
      </div>
    );
  }
}
