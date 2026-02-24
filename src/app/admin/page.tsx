import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { File, Download } from "lucide-react";

export default function AdminPage() {
  const pendingApprovals = [
    { id: "INV001", name: "John Doe", date: "2024-07-28", status: "Pending" },
    { id: "INV002", name: "Jane Smith", date: "2024-07-27", status: "Pending" },
  ];

  const auditLogs = [
    { id: "LOG001", user: "Jane Smith", action: "Downloaded 'Q2 Financials.pdf'", timestamp: "2024-07-28 10:45:12" },
    { id: "LOG002", user: "Admin", action: "Approved investor 'John Doe'", timestamp: "2024-07-28 09:12:05" },
    { id: "LOG003", user: "John Doe", action: "Viewed 'Pitch Deck.pptx'", timestamp: "2024-07-27 18:30:00" },
  ];

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>
        
        <Tabs defaultValue="approvals">
          <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
            <TabsTrigger value="approvals">Investor Approvals</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs & Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Investor Approvals</CardTitle>
                <CardDescription>Review and approve new investor applications.</CardDescription>
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
                    {pendingApprovals.map((investor) => (
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
          
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit & Compliance Tracker</CardTitle>
                <CardDescription>Monitor all investor and admin activities within the data room.</CardDescription>
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
        </Tabs>
      </div>
    </main>
  );
}
