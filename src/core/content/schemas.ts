export type UserRole = 
  | 'public' 
  | 'phase1' 
  | 'phase2' 
  | 'phase3' 
  | 'admin' 
  | 'compliance'
  | 'SuperAdmin'
  | 'IRManager'
  | 'ComplianceOfficer'
  | 'P1Investor'
  | 'P2Investor'
  | 'P3Operator'
  | 'BoardMember';

export type ModuleName = 'Navigation' | 'Pages' | 'DataRoom' | 'Dashboard' | 'Governance' | 'AuditLogs' | 'Settings';

export type ActionType = 'view' | 'create' | 'edit' | 'delete' | 'reorder' | 'publish' | 'upload' | 'manage' | 'configure';

export interface Permission {
  module: ModuleName;
  actions: ActionType[];
}

export interface RoleDefinition {
  role: UserRole;
  permissions: Permission[];
}

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
  type: string;
  content: any;
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
  status: 'Draft' | 'Published';
  publishDate?: string;
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
  };
}

export interface AuditLogEntry {
  id: string;
  userRole: UserRole;
  module: ModuleName;
  action: ActionType;
  entityId: string;
  timestamp: string;
  previousState?: any;
  newState?: any;
}

export interface PlatformSettings {
  branding: {
    companyName: string;
    logoUrl: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
  features: {
    enableRegistration: boolean;
    enableDataRoomWatermark: boolean;
    maintenanceMode: boolean;
  };
  environment: 'mock' | 'production';
}
