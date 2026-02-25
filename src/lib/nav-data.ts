export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
  isHeader?: boolean;
};

export const publicNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [
        { label: "Overview", href: "#overview" },
        { label: "Investment Thesis", href: "#thesis" },
        { label: "Governance Principles", href: "#governance" },
        { label: "ESG & Risk Management", href: "#risk" },
        { label: "Corporate Highlights", href: "#news" },
    ]
  },
  {
    label: "About Us",
    children: [
      { label: "Mission & Vision", href: "#overview" },
      { label: "Leadership Team", href: "#governance" },
      { label: "Board of Directors", href: "#" },
      { label: "Advisors & Partners", href: "#trust" },
      { label: "History & Milestones", href: "#" },
    ],
  },
  {
    label: "Investments",
    children: [
      { label: "Active Opportunities", isHeader: true },
      { label: "Phase 1: Institutional", href: "#" },
      { label: "Phase 2: Private SPVs", href: "#" },
      { label: "Phase 3: Strategic Operators", href: "#" },
      { label: "---" as any }, // Separator
      { label: "Past Investments / Case Studies", href: "#" },
      { label: "Investment Approach & Strategy", href: "#thesis" },
    ],
  },
  {
    label: "News & Events",
    href: "#news",
    children: [
      { label: "2026 Investor Day", href: "#" },
      { label: "Events & Presentations", href: "#" },
      { label: "Press Releases", href: "#" },
    ],
  },
  {
    label: "Governance",
    children: [
      { label: "ESG & Risk Management", href: "#risk" },
      { label: "Policies & Framework", href: "#" },
      { label: "Legal & Regulatory Filings", href: "#" },
      { label: "Compliance Dashboard", href: "/admin" },
      { label: "Audit Reports", href: "#" },
    ],
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const loggedInNav: NavItem[] = [
  {
    label: "Dashboards",
    children: [
      { label: "P1: Investor Dashboard", href: "/dashboard" },
      { label: "P2: SPV Dashboard", href: "/phase2/dashboard" },
      { label: "P3: Operator Dashboard", href: "/phase3/dashboard" },
      { label: "---" as any },
      { label: "Admin Panel", href: "/admin" },
    ],
  },
  {
    label: "Data Rooms",
    children: [
      { label: "P1: Institutional Data Room", href: "/data-room" },
      { label: "P2: SPV Data Room", href: "/phase2/data-room" },
      { label: "Download Center", href: "#" },
      { label: "Audit & Version History", href: "/admin" },
    ],
  },
  {
    label: "Governance",
    children: [
      { label: "My Voting", href: "#" },
      { label: "Board Materials", href: "#" },
      { label: "Compliance Center", href: "#" },
      { label: "Legal & Regulatory Filings", href: "#" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "News & Events", href: "/#news" },
      { label: "Contact IR", href: "/#contact" },
    ],
  },
];
