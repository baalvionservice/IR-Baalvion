import { AppRole } from '@/lib/rbac/roles';

export interface UserSession {
  uid: string;
  email: string;
  role: AppRole;
  isSimulated?: boolean;
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
      return JSON.parse(cookieValue) as UserSession;
    }
    
    return {
      ...defaultSession,
      role: cookieValue as AppRole
    };
  } catch (e) {
    return defaultSession;
  }
}
