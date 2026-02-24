"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, UserCheck, Award, TrendingUp, PieChart, CheckCircle, FileSignature } from "lucide-react";
import { pendingApprovalsP1, pendingApprovalsP2, auditLogs, phase3Data } from "@/lib/admin-data";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function AdminPage() {
  const capTableData = [
    { class: 'Founders', allocation: '40.00%', shares: '4,000,000' },
    { class: 'Series A', allocation: '25.00%', shares: '2,500,000' },
    { class: 'Seed', allocation: '15.00%', shares: '1,500,000' },
    { class: 'Employee Pool (ESOP)', allocation: '10.00%', shares: '1,000,000' },
    { class: 'Phase 3 Operator Pool', allocation: '7.50%', shares: '750,000' },
    { class: 'Warrants', allocation: '2.50%', shares: '250,000' },
  ];

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>
        
        <Tabs defaultValue="approvals-p1" className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-5xl mx-auto">
            <TabsTrigger value="approvals-p1">P1 Approvals</TabsTrigger>
            <TabsTrigger value="approvals-p2">P2 SPV Management</TabsTrigger>
            <TabsTrigger value="phase3">P3 Operator Equity</TabsTrigger>
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
          
          <TabsContent value="phase3">
            <div className="grid gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Award /> Phase 3: Elite Operator Equity Program</CardTitle>
                  <CardDescription>Manage the equity grants for the world's top 30 strategic operators.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Total Pool Allocation</span>
                    <span className="text-2xl font-bold">{phase3Data.pool.totalAllocation}</span>
                    <span className="text-xs text-muted-foreground">({phase3Data.pool.totalShares.toLocaleString()} shares)</span>
                  </div>
                   <div className="flex flex-col gap-1 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Grants Issued</span>
                    <span className="text-2xl font-bold">{phase3Data.pool.issuedGrants} / 30</span>
                     <span className="text-xs text-muted-foreground">({phase3Data.pool.issuedShares.toLocaleString()} shares)</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Available to Grant</span>
                    <span className="text-2xl font-bold">{phase3Data.pool.availableGrants}</span>
                     <span className="text-xs text-muted-foreground">({phase3Data.pool.availableShares.toLocaleString()} shares)</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>Operator Grants</CardTitle>
                            <CardDescription>Review and manage individual operator grants and onboarding.</CardDescription>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>Create New Grant</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Create Operator Grant</DialogTitle>
                                <DialogDescription>
                                  Onboard a new strategic operator and issue their equity grant.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input id="name" defaultValue="Elena Petrov" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="role" className="text-right">
                                    Expertise
                                  </Label>
                                  <Input id="role" defaultValue="AI in Logistics" className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="grant" className="text-right">
                                    Grant (Shares)
                                  </Label>
                                  <Input id="grant" type="number" defaultValue="25000" className="col-span-3" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Issue Grant</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Operator</TableHead>
                                    <TableHead>Grant Size (Shares)</TableHead>
                                    <TableHead>Vesting Status</TableHead>
                                    <TableHead>Onboarding Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {phase3Data.operators.map((op) => (
                                    <TableRow key={op.id}>
                                        <TableCell>
                                          <div className="font-medium">{op.name}</div>
                                          <div className="text-xs text-muted-foreground">{op.expertise}</div>
                                        </TableCell>
                                        <TableCell>{op.grant.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                <Progress value={op.vestingProgress} className="h-2"/>
                                                <span className="text-xs text-muted-foreground">{op.vestingProgress}% Vested</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={op.status === "Active" ? "default" : "secondary"}>
                                                <CheckCircle className="mr-1 h-3 w-3" />
                                                {op.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">Manage</Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                 <div className="space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><PieChart/> Simplified Cap Table</CardTitle>
                             <CardDescription>High-level overview of equity distribution.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {capTableData.map(item => (
                                    <div key={item.class} className="flex justify-between items-center text-sm">
                                        <div>
                                            <p className="font-medium">{item.class}</p>
                                            <p className="text-xs text-muted-foreground">{item.shares} shares</p>
                                        </div>
                                        <div className="font-bold">{item.allocation}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                     </Card>
                      <Alert>
                        <UserCheck className="h-4 w-4" />
                        <AlertTitle>Simulate Operator Login</AlertTitle>
                        <AlertDescription>
                          Jump to the personalized dashboard for an elite operator.
                        </AlertDescription>
                        <Button asChild className="mt-4 w-full">
                          <Link href="/phase3/dashboard">Login as Elena Petrov</Link>
                        </Button>
                      </Alert>
                 </div>
              </div>
            </div>
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
                  <Input id="hero-title" defaultValue="The Global B2B Trade Operating System" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overview-text">Company Overview Text</Label>
                  <Textarea id="overview-text" defaultValue="At Baalvion, our mission is to build and operate the foundational B2B trade ecosystem for the next century..." rows={5} />
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
