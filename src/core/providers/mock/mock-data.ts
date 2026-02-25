import { NavigationItem, PageDefinition, UserRole } from "../../content/schemas";

export const MOCK_NAVIGATION: NavigationItem[] = [
  {
    id: 'nav-home',
    label: 'Home',
    href: '/',
    roles: ['public', 'phase1', 'phase2', 'phase3', 'admin'],
    isActive: true,
    order: 0,
    children: [
      { id: 'sub-overview', label: 'Overview', href: '/#overview', roles: ['public'], isActive: true, order: 1 },
      { id: 'sub-thesis', label: 'Investment Thesis', href: '/#thesis', roles: ['public'], isActive: true, order: 2 },
      { id: 'sub-gov', label: 'Governance Principles', href: '/#governance', roles: ['public'], isActive: true, order: 3 },
    ]
  },
  {
    id: 'nav-news',
    label: 'News & Events',
    href: '/news-and-events/news',
    roles: ['public', 'phase1', 'phase2', 'phase3', 'admin'],
    isActive: true,
    order: 1,
    children: [
      { id: 'news-news', label: 'News', href: '/news-and-events/news', roles: ['public'], isActive: true, order: 1 },
      { id: 'news-pr', label: 'Press Releases', href: '/news-and-events/press-releases', roles: ['public'], isActive: true, order: 2 },
      { id: 'news-events', label: 'Events', href: '/news-and-events/events', roles: ['public'], isActive: true, order: 3 },
    ]
  },
  {
      id: 'nav-dashboards',
      label: 'Dashboards',
      roles: ['phase1', 'phase2', 'phase3', 'admin'],
      isActive: true,
      order: 2,
      children: [
          { id: 'dash-p1', label: 'P1: Investor Dashboard', href: '/dashboard', roles: ['phase1', 'admin'], isActive: true, order: 1 },
          { id: 'dash-p2', label: 'P2: SPV Dashboard', href: '/phase2/dashboard', roles: ['phase2', 'admin'], isActive: true, order: 2 },
          { id: 'dash-p3', label: 'P3: Operator Dashboard', href: '/phase3/dashboard', roles: ['phase3', 'admin'], isActive: true, order: 3 },
      ]
  }
];

export const MOCK_PAGES: PageDefinition[] = [
  {
    id: 'page-home',
    slug: '/',
    title: 'Baalvion | Investor Relations',
    description: 'Engineering the Backbone of Global Trade',
    seo: { title: 'Baalvion | Home', description: 'Institutional-Grade IR Platform' },
    sections: [
      { id: 'sec-hero', type: 'hero', content: {}, roles: ['public'], isActive: true, order: 0 },
      { id: 'sec-who', type: 'who-we-are', content: {}, roles: ['public'], isActive: true, order: 1 },
      { id: 'sec-trust', type: 'trust-signals', content: {}, roles: ['public'], isActive: true, order: 2 },
      { id: 'sec-results', type: 'quarterly-results', content: {}, roles: ['public'], isActive: true, order: 3 },
      { id: 'sec-overview', type: 'overview', content: { anchor: 'overview' }, roles: ['public'], isActive: true, order: 4 },
      { id: 'sec-thesis', type: 'thesis', content: { anchor: 'thesis' }, roles: ['public'], isActive: true, order: 5 },
      { id: 'sec-gov', type: 'governance', content: { anchor: 'governance' }, roles: ['public'], isActive: true, order: 6 },
      { id: 'sec-news', type: 'news', content: { anchor: 'news' }, roles: ['public'], isActive: true, order: 7 },
      { id: 'sec-press', type: 'press-releases', content: { anchor: 'press-releases' }, roles: ['public'], isActive: true, order: 8 },
      { id: 'sec-risk', type: 'risk', content: { anchor: 'risk' }, roles: ['public'], isActive: true, order: 9 },
    ]
  }
];
