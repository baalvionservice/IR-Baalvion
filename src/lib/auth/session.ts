import { AppRole } from '@/lib/rbac/roles';

export interface UserSession {
  uid: string;
  email: string;
  role: AppRole;
  isSimulated?: boolean;
}

/**
 * Normalizes any mock cookie role (UI-facing `UserRole` or internal `AppRole`)
 * into a concrete `AppRole` understood by the RBAC engine.
 */
function normalizeCookieRole(rawRole: string): AppRole {
  const value = rawRole as string;

  // Already an AppRole – pass through
  if (
    value === 'public' ||
    value === 'p1_institutional' ||
    value === 'p2_spv' ||
    value === 'p3_operator' ||
    value === 'admin' ||
    value === 'compliance'
  ) {
    return value as AppRole;
  }

  // Map UI/UserRole-style values to RBAC roles
  switch (value) {
    case 'phase1':
    case 'P1Investor':
      return 'p1_institutional';
    case 'phase2':
    case 'P2Investor':
      return 'p2_spv';
    case 'phase3':
    case 'P3Operator':
      return 'p3_operator';
    case 'ComplianceOfficer':
      return 'compliance';
    case 'admin':
      return 'admin';
    default:
      return 'public';
  }
}

/**
 * Mock Session Provider
 * In a real app, this would parse a JWT from a cookie.
 */
export function getSessionFromCookie(cookieValue?: string): UserSession {
  // Default role for unauthorized users
  const defaultSession: UserSession = {
    uid: 'guest',
    email: 'guest@baalvion.com',
    role: 'public'
  };

  if (!cookieValue) return defaultSession;

  try {
    // We expect a cookie named 'baalvion_session_mock'
    // For this prototype, it could be a simple role string or a JSON
    if (cookieValue.startsWith('{')) {
      const parsed = JSON.parse(cookieValue) as UserSession;
      return {
        ...defaultSession,
        ...parsed,
        role: normalizeCookieRole(parsed.role as unknown as string),
      };
    }
    
    return {
      ...defaultSession,
      role: normalizeCookieRole(cookieValue),
    };
  } catch (e) {
    return defaultSession;
  }
}
