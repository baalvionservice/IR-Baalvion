import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const pendingApprovalsP1 = [
    { id: "INV001", name: "John Doe", date: "2024-07-28", status: "Pending" },
    { id: "INV002", name: "Jane Smith", date: "2024-07-27", status: "Pending" },
  ];

  const pendingApprovalsP2 = [
    { id: "SPV-003", name: "Acme Capital", entity: "Project Olympus", date: "2024-07-29", status: "Docs Submitted" },
    { id: "SPV-004", name: "Synergy Ventures", entity: "Project Titan", date: "2024-07-28", status: "Pending Docs" },
  ];

  const auditLogs = [
    { id: "LOG001", user: "Jane Smith (P1)", action: "Downloaded 'Q2 Financials.pdf'", timestamp: "2024-07-28 10:45:12" },
    { id: "LOG002", user: "Admin", action: "Approved P1 investor 'John Doe'", timestamp: "2024-07-28 09:12:05" },
    { id: "LOG003", user: "Acme Capital (P2)", action: "Acknowledged 'SPV Operating Agreement'", timestamp: "2024-07-29 14:22:01" },
    { id: "LOG004", user: "Admin", action: "Initiated Capital Call for 'Project Olympus'", timestamp: "2024-07-29 11:05:00" },
  ];

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>
        
        <Tabs defaultValue="approvals-p1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
            <TabsTrigger value="approvals-p1">P1 Approvals</TabsTrigger>
            <TabsTrigger value="approvals-p2">P2 SPV Management</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="cms">Content Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="approvals-p1">
            <Card>
              <CardHeader>
                <CardTitle>Pending Phase 1 Investor Approvals</CardTitle>
                <CardDescription>Review and approve new investor applications for the main fund.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovalsP1.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell>{investor.id}</TableCell>
                        <TableCell>{investor.name}</TableCell>
                        <TableCell>{investor.date}</TableCell>
                        <TableCell>
                          <Badge variant={investor.status === "Pending" ? "secondary" : "default"}>{investor.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">View Application</Button>
                          <Button size="sm">Approve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals-p2">
            <Card>
              <CardHeader>
                <CardTitle>Phase 2 SPV Management</CardTitle>
                <CardDescription>Manage Special Purpose Vehicles and their respective investors.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor ID</TableHead>
                      <TableHead>Investor Name</TableHead>
                      <TableHead>SPV Entity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovalsP2.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell>{investor.id}</TableCell>
                        <TableCell>{investor.name}</TableCell>
                        <TableCell><Badge variant="outline">{investor.entity}</Badge></TableCell>
                        <TableCell>
                          <Badge variant={investor.status.includes("Pending") ? "secondary" : "default"}>{investor.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">Manage Docs</Button>
                          <Button size="sm">Initiate Capital Call</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit & Compliance Tracker</CardTitle>
                <CardDescription>Monitor all investor and admin activities across all phases.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Log ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.id}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cms">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Update content for the public-facing website sections.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Live Content</AlertTitle>
                  <AlertDescription>
                    Changes saved here will be reflected on the public website.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Hero Section Title</Label>
                  <Input id="hero-title" defaultValue="Invest in the Future of Innovation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overview-text">Company Overview Text</Label>
                  <Textarea id="overview-text" defaultValue="At Baalvion, we are not just building products; we are crafting the future..." rows={5} />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
