export const leadershipTeam = [
    {
      name: "Alexandros Vasilias",
      title: "Founder & Chief Visionary Officer",
      bio: "A serial entrepreneur with over 20 years of experience building and scaling complex logistical and financial systems. Alexandros's vision is to create a frictionless global trade environment, powered by intelligent technology and transparent governance.",
      imageId: "founder-photo",
    },
    {
      name: "Isabella Rossi",
      title: "Chief Financial Officer",
      bio: "Isabella orchestrates the company's capital allocation strategy, drawing on a decorated career in M&A and strategic finance at top-tier global investment banks. She ensures rigorous financial discipline and sustainable, long-term growth.",
      imageId: "executive-1-photo",
    },
    {
      name: "Kenji Tanaka",
      title: "Chief Technology Officer",
      bio: "A leading expert in distributed systems and AI, Kenji architected our core platform. His work focuses on building a secure, scalable, and resilient technology backbone capable of handling the complexities of modern global trade.",
      imageId: "executive-2-photo",
    },
  ];
  
  export const newsArticles = [
    {
      title: "Baalvion Acquires FinTech 'VeriTrade' to Automate Trade Finance Compliance",
      excerpt: "The acquisition integrates VeriTrade's AI-powered AML and KYC technology directly into the Baalvion OS, reducing transaction friction and enhancing security for all platform participants. This move is central to our strategy of owning the complete compliance stack.",
      date: "2024-07-15",
      imageId: "news-1-image",
    },
    {
      title: "Strategic Partnership with 'PortLink Logistics' to Digitize Global Shipping Routes",
      excerpt: "This collaboration will onboard PortLink's extensive network of carriers and port operators onto the Baalvion platform, creating unprecedented visibility and efficiency in maritime logistics. We anticipate a 30% reduction in processing times for shared clients.",
      date: "2024-06-28",
      imageId: "news-2-image",
    },
    {
      title: "Founder Alexandros Vasilias Details Vision for a 'Unified Ledger for Global Trade' at Davos",
      excerpt: "Speaking at the World Economic Forum, Mr. Vasilias outlined Baalvion's long-term vision to create a single, immutable source of truth for B2B transactions, aiming to unlock trillions in liquidity and eliminate fraud.",
      date: "2024-06-10",
      imageId: "news-3-image",
    },
     {
      title: "Baalvion Reports 150% YoY Growth in Platform Transaction Volume for Q2 2024",
      excerpt: "The company has exceeded all financial projections, citing strong enterprise adoption of its integrated trade OS and the successful rollout of its automated customs clearance module in key APAC markets.",
      date: "2024-07-20",
      imageId: "news-1-image",
    }
  ];

export const pressReleases = [
  {
    title: "Baalvion's CFO Isabella Rossi to Speak at the Global Finance Leadership Conference on March 5th",
    date: "Feb 15, 2024",
    link: "#",
  },
  {
    title: "Baalvion Appoints Tech Veteran Kenji Tanaka to Board of Directors",
    date: "Jan 30, 2024",
    link: "#",
  },
  {
    title: "Baalvion Reports Record Growth in Q4 2023, Exceeding All Projections",
    date: "Jan 18, 2024",
    link: "#",
  },
];

export const documents = [
  { id: 1, name: "Baalvion Corporate Bylaws.pdf", type: "PDF", category: "Legal", uploadDate: "2024-01-05", size: "1.2 MB" },
  { id: 2, name: "Series A - Pitch Deck.pptx", type: "PPTX", category: "Presentations", uploadDate: "2024-07-22", size: "15.2 MB" },
  { id: 3, name: "Series A - Financial Model.xlsx", type: "XLSX", category: "Financials", uploadDate: "2024-07-22", size: "1.8 MB" },
  { id: 4, name: "Q2 2024 Unaudited Financials.pdf", type: "PDF", category: "Financials", uploadDate: "2024-07-25", size: "2.5 MB" },
  { id: 5, name: "Independent Audited Financials (FY 2023).pdf", type: "PDF", category: "Financials", uploadDate: "2024-05-10", size: "4.1 MB" },
  { id: 6, name: "Master Shareholder Agreement.pdf", type: "PDF", category: "Legal", uploadDate: "2024-01-10", size: "0.8 MB" },
  { id: 7, name: "Series A - Subscription Agreement.docx", type: "DOCX", category: "Legal", uploadDate: "2024-07-14", size: "0.4 MB" },
  { id: 8, name: "Risk Disclosure Statement (Updated Q3 2024).pdf", type: "PDF", category: "Compliance", uploadDate: "2024-07-12", size: "0.5 MB" },
  { id: 9, name: "Capital Deployment & Use of Funds.pdf", type: "PDF", category: "Strategy", uploadDate: "2024-07-11", size: "1.2 MB" },
];

export const investorData = {
    name: "Alexandros Vasilias",
    executiveOverview: {
        investedAmount: 750000,
        ownershipPercentage: 1.87,
        securityType: "Series A Preferred",
    },
    status: {
      accreditation: "Verified",
      dataRoomAccess: "Granted",
      kycAml: "Passed",
    },
    capitalStructure: {
        shareClass: "Series A",
        sharesHeld: 150000,
        votingPower: "1.87%",
        certificateId: "BV-CERT-001A-007",
        capTable: [
            { class: 'Founders', count: '2,000,000', ownership: '50.00%' },
            { class: 'Seed', count: '500,000', ownership: '12.50%' },
            { class: 'Series A', count: '1,500,000', ownership: '37.50%' },
        ]
    },
    financialReporting: {
        reports: [
            { name: "Q2 2024 Financial Report", date: "2024-07-25", link: "/data-room" },
            { name: "H1 2024 Capital Deployment Summary", date: "2024-07-11", link: "/data-room" },
        ],
        metrics: {
            totalValue: 985000,
            totalReturnsPercent: 31.3,
            capitalDeploymentPercent: 85,
        }
    },
    governanceUpdates: {
        notices: [
            { id: 1, message: "Action Required: Please vote on the new director proposal before August 5th.", date: "2024-07-28" },
            { id: 2, message: "Governance Update: Q3 board meeting minutes are now available.", date: "2024-07-29" },
        ]
    },
    communications: {
        announcements: [
            { id: 1, message: "New document 'Q2 2024 Financial Report.pdf' added to the data room.", date: "2024-07-25" },
            { id: 2, message: "Webinar: Join us for the Q3 Investor Update on August 15th.", date: "2024-07-30" },
        ]
    }
};
