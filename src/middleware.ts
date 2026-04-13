import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionFromCookie } from '@/lib/auth/session';
import { getRequiredPermissionForRoute } from '@/lib/rbac/routeRegistry';
import { checkPermission } from '@/lib/rbac/checkPermission';

/**
 * Institutional Edge Gatekeeper
 * Enforces RBAC policy before the request reaches any application logic.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Resolve Required Permission for current route
  const requiredPermission = getRequiredPermissionForRoute(pathname);

  // If route is public, proceed
  if (!requiredPermission) {
    return NextResponse.next();
  }

  // 2. Fetch Mock Session from Cookie
  const sessionCookie = request.cookies.get('baalvion_session_mock')?.value;
  const session = getSessionFromCookie(sessionCookie);

  // 3. Evaluate Policy
  const isAuthorized = checkPermission(session.role, requiredPermission);

  if (!isAuthorized) {
    console.warn(`[RBAC] Access Denied: ${pathname} requires ${requiredPermission}. Current role: ${session.role}`);
    
    // Redirect unauthorized users to index with a clear signal
    const url = request.nextUrl.clone();
    url.pathname = '/';
    // url.searchParams.set('auth_error', 'unauthorized');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Matcher configuration for institutional routes
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/data-room/:path*',
    '/admin/:path*',
    '/phase2/:path*',
    '/phase3/:path*',
    '/performance/:path*',
    '/capital-ops/:path*',
    '/governance/my-voting',
  ],
};
