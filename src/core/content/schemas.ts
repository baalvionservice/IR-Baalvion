export type UserRole = 'public' | 'phase1' | 'phase2' | 'phase3' | 'admin' | 'compliance';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  roles: UserRole[];
  children?: NavigationItem[];
  isHeader?: boolean;
  isActive: boolean;
  order: number;
}

export interface PageSection {
  id: string;
  type: string; // Maps to ComponentRegistry keys
  content: any; // Flexible data structure per component type
  roles: UserRole[];
  isActive: boolean;
  order: number;
}

export interface PageDefinition {
  id: string;
  slug: string;
  title: string;
  description?: string;
  sections: PageSection[];
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
  };
}

export interface DashboardModule {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'documents' | 'activity';
  title: string;
  description?: string;
  config: any;
  roles: UserRole[];
  isActive: boolean;
  order: number;
}

export interface DataRoomFile {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  version: string;
  url: string;
  roles: UserRole[];
  isWatermarked: boolean;
  expiryDate?: string;
}

export interface DataRoomFolder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  roles: UserRole[];
  files: string[]; // Array of DataRoomFile IDs
}
