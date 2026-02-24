import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, Calendar, Download, Briefcase, BarChart, DollarSign } from "lucide-react";
import Link from "next/link";
import { investorData } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { name, status, portfolio, financials, notifications } = investorData;

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Investor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {name}.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase />
                  My Portfolio
                </CardTitle>
                <CardDescription>Overview of your current holdings in Baalvion.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investment</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Ownership</TableHead>
                      <TableHead>Committed Capital</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolio.holdings.map((holding, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{holding.name}</TableCell>
                        <TableCell>{holding.shares.toLocaleString()}</TableCell>
                        <TableCell>{holding.ownership}%</TableCell>
                        <TableCell>${holding.committedCapital.toLocaleString()}</TableCell>
                        <TableCell>{holding.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart />
                  Key Financials
                </CardTitle>
                 <CardDescription>High-level financial metrics and capital deployment status.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
                  <span className="text-2xl font-bold">${financials.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Total Returns</span>
                  <span className="text-2xl font-bold text-green-400">+{financials.totalReturnsPercent}%</span>
                </div>
                 <div className="flex flex-col gap-1 col-span-2">
                  <span className="text-sm text-muted-foreground">Capital Deployment</span>
                  <Progress value={financials.capitalDeploymentPercent} className="h-3 mt-2" />
                   <p className="text-xs text-right text-muted-foreground">{financials.capitalDeploymentPercent}% Deployed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Status</CardTitle>
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
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                 <Button>
                  <DollarSign />
                  Make an Investment
                </Button>
                <Button asChild variant="outline">
                  <Link href="/data-room">
                    <FileText />
                    View Documents
                  </Link>
                </Button>
                <Button variant="outline">
                  <Calendar />
                  Schedule Meeting
                </Button>
                <Button variant="outline">
                  <Download />
                  Download Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((note) => (
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
          </div>
        </div>
      </div>
    </main>
  );
}
