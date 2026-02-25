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

export type ModuleName = 'Navigation' | 'Pages' | 'DataRoom' | 'Dashboard' | 'Governance' | 'AuditLogs' | 'Settings' | 'Workflow' | 'Voting' | 'BoardMaterials' | 'Notifications';

export type ActionType = 'view' | 'create' | 'edit' | 'delete' | 'reorder' | 'publish' | 'upload' | 'manage' | 'configure' | 'approve' | 'reject' | 'requestReview' | 'vote' | 'send' | 'schedule';

export type WorkflowStatus = 'Draft' | 'InReview' | 'Approved' | 'Published' | 'Archived' | 'Rejected';

export type VoteStatus = 'Draft' | 'Open' | 'Closed' | 'Archived' | 'Invalid';

export type VoteChoice = 'Approve' | 'Reject' | 'Abstain';

export type BoardMaterialClassification = 'BoardOnly' | 'CommitteeOnly' | 'Confidential';

export type NotificationStatus = 'Draft' | 'Scheduled' | 'Sent' | 'Archived';

export type NotificationModuleSource = 'Page' | 'Vote' | 'DataRoom' | 'Governance' | 'Manual';

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
  workflowStatus?: WorkflowStatus;
}

export interface PageSection {
  id: string;
  type: string;
  content: any;
  roles: UserRole[];
  isActive: boolean;
  order: number;
}

export interface VersionInfo {
  version: number;
  timestamp: string;
  author: string;
  changesSummary?: string;
}

export interface PageDefinition {
  id: string;
  slug: string;
  title: string;
  description?: string;
  sections: PageSection[];
  draftSections?: PageSection[];
  status: 'Draft' | 'Published';
  workflowStatus: WorkflowStatus;
  currentVersion: number;
  versionHistory: VersionInfo[];
  publishDate?: string;
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
  };
}

export interface VoteRecord {
  voterId: string;
  voterRole: UserRole;
  choice: VoteChoice;
  timestamp: string;
}

export interface Vote {
  id: string;
  title: string;
  description: string;
  resolutionText: string;
  createdByRole: UserRole;
  eligibleRoles: UserRole[];
  status: VoteStatus;
  startDate: string;
  endDate: string;
  votes: VoteRecord[];
  results?: {
    approve: number;
    reject: number;
    abstain: number;
    participationRate: number;
    isQuorumMet: boolean;
  };
  versionHistory: VersionInfo[];
}

export interface BoardMaterial {
  id: string;
  title: string;
  meetingDate: string;
  classification: BoardMaterialClassification;
  relatedVotes: string[];
  documentIds: string[];
  workflowStatus: WorkflowStatus;
  versionHistory: VersionInfo[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  moduleSource: NotificationModuleSource;
  entityId?: string;
  targetRoles: UserRole[];
  status: NotificationStatus;
  scheduledAt?: string;
  sentAt?: string;
  deliveryStats?: {
    totalRecipients: number;
    deliveredCount: number;
    failedCount: number;
  };
  versionHistory: VersionInfo[];
}

export interface Subscription {
  id: string;
  role: UserRole;
  email: string;
  preferences: {
    News: boolean;
    Governance: boolean;
    Voting: boolean;
    DataRoom: boolean;
  };
  active: boolean;
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
    freezePublishing: boolean;
    autoNotifyEnabled: boolean;
    autoSendEnabled: boolean;
  };
  environment: 'mock' | 'production';
}
