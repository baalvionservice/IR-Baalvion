"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  FileText,
  Calendar,
  Download,
  DollarSign,
  FileCertificate,
  Gavel,
  MessagesSquare,
  Activity,
  BarChart,
  Briefcase,
  Banknote,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import Link from 'next/link';
import { investorData } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MeetingSchedulerModal from '@/components/dashboard/MeetingSchedulerModal';
import { type MockEvent, mockEventLog, addEventListener, removeEventListener, addMockEvent } from '@/lib/events';
import PaymentGateway from '@/components/dashboard/PaymentGateway';
import { Bar as RechartsBar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const chartData = [
  { name: 'Q1 23', value: 120000 },
  { name: 'Q2 23', value: 150000 },
  { name: 'Q3 23', value: 175000 },
  { name: 'Q4 23', value: 210000 },
  { name: 'Q1 24', value: 250000 },
  { name: 'Q2 24', value: 310000 },
  { name: 'Q3 24', value: 420000 },
];

export default function DashboardPage() {
  const {
    name,
    executiveOverview,
    status,
    capitalStructure,
    financialReporting,
    governanceUpdates,
    communications,
  } = investorData;

  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [activityFeed, setActivityFeed] = useState<MockEvent[]>(mockEventLog.slice(0, 4));
  const { toast } = useToast();

  useEffect(() => {
    const handleNewEvent = (newEvent: MockEvent) => {
      setActivityFeed(prev => [newEvent, ...prev].slice(0, 4));
    };
    addEventListener(handleNewEvent);
    
    // Simulate automated reporting notifications
    const reportInterval = setInterval(() => {
        addMockEvent({
            user: 'System',
            action: 'Generated Quarterly P&L Report',
            phase: 'System'
        });
        toast({
            title: "New Report Available",
            description: "The Q3 2024 P&L Report has been added to the data room.",
        });
    }, 30000); // every 30 seconds for demo purposes

    return () => {
      removeEventListener(handleNewEvent);
      clearInterval(reportInterval);
    }
  }, [toast]);

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Investor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {name}.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign />
                  Executive Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Total Invested
                  </span>
                  <span className="text-2xl font-bold">
                    ${executiveOverview.investedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Ownership
                  </span>
                  <span className="text-2xl font-bold">
                    {executiveOverview.ownershipPercentage}%
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Security Type
                  </span>
                  <span className="text-2xl font-bold">
                    {executiveOverview.securityType}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign/> Investment Execution</CardTitle>
                <CardDescription>Finalize your investment and manage fund transfers.</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentGateway/>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCertificate />
                  Capital Structure
                </CardTitle>
                <CardDescription>
                  Your holdings and position in the company's capitalization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Share Class</p>
                    <p className="font-medium">{capitalStructure.shareClass}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shares Held</p>
                    <p className="font-medium">
                      {capitalStructure.sharesHeld.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Voting Power</p>
                    <p className="font-medium">{capitalStructure.votingPower}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Certificate ID</p>
                    <p className="font-medium truncate">
                      {capitalStructure.certificateId}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Company Cap Table (Simplified)</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead>Ownership</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {capitalStructure.capTable.map((row) => (
                        <TableRow key={row.class}>
                          <TableCell>{row.class}</TableCell>
                          <TableCell>{row.count}</TableCell>
                          <TableCell>{row.ownership}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Share Certificate
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Financial Reporting
                </CardTitle>
                 <CardDescription>High-level financial metrics and reports.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Portfolio Value</span>
                    <span className="text-2xl font-bold">${financialReporting.metrics.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Total Returns</span>
                    <span className="text-2xl font-bold text-green-400">+{financialReporting.metrics.totalReturnsPercent}%</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-sm text-muted-foreground">Capital Deployment</span>
                    <Progress value={financialReporting.metrics.capitalDeploymentPercent} className="h-3 mt-2" />
                    <p className="text-xs text-right text-muted-foreground">{financialReporting.metrics.capitalDeploymentPercent}% Deployed</p>
                    </div>
                </div>
                
                 <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`}/>
                       <Tooltip 
                        cursor={{fill: 'hsl(var(--accent))'}}
                        contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                      />
                      <RechartsBar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <Separator/>
                <div>
                    <h4 className="font-medium mb-2">Recent Reports</h4>
                    <div className="space-y-2">
                        {financialReporting.reports.map((report) => (
                            <div key={report.name} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-muted">
                                <div className='flex items-center gap-2'>
                                    <FileText className='h-4 w-4 text-muted-foreground'/>
                                    <p>{report.name}</p>
                                </div>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={report.link}>View</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Accreditation:</span>
                  <Badge variant={status.accreditation === 'Verified' ? 'default' : 'secondary'}>
                    {status.accreditation}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Data Room:</span>
                  <Badge variant={status.dataRoomAccess === 'Granted' ? 'default' : 'secondary'}>
                    {status.dataRoomAccess}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">KYC/AML:</span>
                  <Badge variant={status.kycAml === 'Passed' ? 'default' : 'secondary'}>
                    {status.kycAml}
                  </Badge>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessagesSquare />
                  Communications
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                 <Button asChild>
                  <Link href="/data-room">
                    <FileText />
                    View Data Room
                  </Link>
                </Button>
                <Dialog open={isMeetingModalOpen} onOpenChange={setIsMeetingModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Calendar />
                            Schedule Meeting
                        </Button>
                    </DialogTrigger>
                    <MeetingSchedulerModal closeModal={() => setIsMeetingModalOpen(false)} />
                </Dialog>
                <div className="pt-4 space-y-4">
                  {communications.announcements.map((note) => (
                    <div key={note.id} className="flex items-start gap-4 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{note.message}</p>
                        <p className="text-xs text-muted-foreground">{note.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity/> Recent Platform Activity</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      {activityFeed.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.user} at {item.timestamp}</p>
                          </div>
                      </div>
                      ))}
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel />
                  Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {governanceUpdates.notices.map((note) => (
                    <div key={note.id} className="flex items-start gap-4 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary flex-shrink-0">
                        <Gavel className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{note.message}</p>
                        <p className="text-xs text-muted-foreground">{note.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase/> Key Partners</CardTitle>
                    <CardDescription>The world-class partners supporting our operations.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-y-6">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <Banknote className="h-7 w-7 text-primary"/>
                        <p className="text-sm font-semibold mt-2">Goldman Sachs</p>
                        <p className="text-xs text-muted-foreground">Banking Partner</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <ShieldCheck className="h-7 w-7 text-primary"/>
                        <p className="text-sm font-semibold mt-2">Deloitte</p>
                        <p className="text-xs text-muted-foreground">Auditor</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <Scale className="h-7 w-7 text-primary"/>
                        <p className="text-sm font-semibold mt-2">Skadden, Arps</p>
                        <p className="text-xs text-muted-foreground">Legal Counsel</p>
                    </div>
                     <div className="flex flex-col items-center gap-1 text-center">
                         <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        <p className="text-sm font-semibold mt-2">McKinsey & Co.</p>
                        <p className="text-xs text-muted-foreground">Strategic Advisor</p>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
