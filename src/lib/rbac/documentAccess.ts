import { UserRole } from '@/core/content/schemas';

export interface RestrictedDocument {
  id: string | number;
  name: string;
  restrictedTo?: UserRole[];
}

/**
 * Document-Level Access Filtering
 * Returns only documents allowed for the current role.
 */
export function filterDocumentsByAccess<T extends RestrictedDocument>(
  documents: T[],
  currentRole: UserRole
): T[] {
  // Admins see everything
  if (currentRole === 'admin') return documents;

  return documents.filter(doc => {
    // If no restriction, public can see
    if (!doc.restrictedTo || doc.restrictedTo.length === 0) return true;
    
    // Check if current role is in allowed list
    return doc.restrictedTo.includes(currentRole);
  });
}
