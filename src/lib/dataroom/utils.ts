
import { UserRole } from "@/core/content/schemas";
import { DocumentItem, ActivityLogEntry } from "./types";

export function canAccess(role: UserRole, doc: DocumentItem): boolean {
  if (role === 'admin') return true;
  return doc.allowedRoles.includes(role);
}

export function formatLogTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
}

export function createLogEntry(role: UserRole, action: ActivityLogEntry['action'], documentName: string): ActivityLogEntry {
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: formatLogTimestamp(),
    role,
    action,
    documentName
  };
}

export function sortDocuments(docs: DocumentItem[], sortBy: string): DocumentItem[] {
  const sorted = [...docs];
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'size':
      return sorted.sort((a, b) => parseFloat(b.fileSize) - parseFloat(a.fileSize));
    default:
      return sorted;
  }
}
