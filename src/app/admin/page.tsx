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
import { ShieldCheck, UserCheck, Award, PieChart, CheckCircle, AlertCircle, UserX, UserCheck2, Calculator, FileWarning } from "lucide-react";
import { pendingApprovalsP1 as initialP1Approvals, pendingApprovalsP2 as initialP2Approvals, phase3Data as initialPhase3Data } from "@/lib/admin-data";
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
import { useState, useEffect } from "react";
import { mockEventLog, addMockEvent, addEventListener, removeEventListener, type MockEvent } from "@/lib/events";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export default function AdminPage() {
  const [phase3Data, setPhase3Data] = useState(initialPhase3Data);
  const [p1Approvals, setP1Approvals] = useState(initialP1Approvals);
  const [p2Approvals, setP2Approvals] = useState(initialP2Approvals);
  const [logs, setLogs] = useState<MockEvent[]>(mockEventLog);
  const [newInvestment, setNewInvestment] = useState(0);
  const [newGrants, setNewGrants] = useState(0);
  
  // State for the Create Grant dialog
  const [isGrantDialogOpen, setIsGrantDialogOpen] = useState(false);
  const [newOpName, setNewOpName] = useState('Sofia Rodriguez');
  const [newOpExpertise, setNewOpExpertise] = useState('Regulatory Tech');
  const [newOpGrant, setNewOpGrant] = useState('25000');


  const { toast } = useToast();

  useEffect(() => {
    const handleNewEvent = (newEvent: MockEvent) => {
      setLogs(prev => [newEvent, ...prev]);
    };
    addEventListener(handleNewEvent);
    return () => removeEventListener(handleNewEvent);
  }, []);

  const totalShares = capTableData.reduce((acc, item) => acc + item.shares, 0);

  const handleLeaverStatusChange = (operatorId: string, status: "Good Leaver" | "Bad Leaver") => {
    setPhase3Data(prevData => ({
      ...prevData,
      operators: prevData.operators.map(op => 
        op.id === operatorId ? { ...op, status: status } : op
      )
    }));
    toast({ title: `Operator status updated to ${status}` });
    addMockEvent({ user: 'Admin', action: `Marked operator ${operatorId} as ${status}`, phase: 'Admin' });
  };

  const handleApproveP1 = (investorId: string) => {
    const investor = p1Approvals.find(inv => inv.id === investorId);
    if (!investor) return;

    toast({ title: `Approved investor ${investor.name}` });
    addMockEvent({ user: 'Admin', action: `Approved Phase 1 investor ${investor.name}`, phase: 'Admin' });
    setP1Approvals(prev => prev.filter(inv => inv.id !== investorId));
  };
  
  const handleP2Action = (investorId: string, action: "docs" | "capital-call") => {
    const investor = p2Approvals.find(inv => inv.id === investorId);
    if (!investor) return;
    
    if (action === 'capital-call') {
        toast({ title: `Capital Call Initiated`, description: `Capital call initiated for ${investor.name} on ${investor.entity}` });
        addMockEvent({ user: 'Admin', action: `Initiated Capital Call for ${investor.name} (${investor.entity})`, phase: 'Admin' });
        setP2Approvals(prev => prev.filter(inv => inv.id !== investorId));
    } else {
        toast({ title: `Managing documents for ${investor.name}`});
    }
  };

  const capTableData = [
    { class: 'Founders', allocation: 40.00, shares: 4000000 },
    { class: 'Series A', allocation: 25.00, shares: 2500000 + newInvestment },
    { class: 'Seed', allocation: 15.00, shares: 1500000 },
    { class: 'Employee Pool (ESOP)', allocation: 10.00, shares: 1000000 },
    { class: 'Phase 3 Operator Pool', allocation: 7.50, shares: phase3Data.pool.totalShares + newGrants * 25000 },
    { class: 'Warrants', allocation: 2.50, shares: 250000 },
  ];

  const handleCreateGrant = () => {
    if (!newOpName || !newOpExpertise || !newOpGrant) {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all fields.'});
        return;
    }

    const grantAmount = parseInt(newOpGrant, 10);
    if (isNaN(grantAmount) || grantAmount <= 0) {
        toast({ variant: 'destructive', title: 'Invalid Grant', description: 'Please enter a valid number of shares.'});
        return;
    }

    const newOperator = {
        id: `OP${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
        name: newOpName,
        expertise: newOpExpertise,
        grant: grantAmount,
        status: "Pending Docs",
        vestingProgress: 0,
    };

    setPhase3Data(prevData => {
        const newOperators = [...prevData.operators, newOperator];
        const newIssuedGrants = prevData.pool.issuedGrants + 1;
        const newIssuedShares = prevData.pool.issuedShares + grantAmount;

        return {
            ...prevData,
            operators: newOperators,
            pool: {
                ...prevData.pool,
                issuedGrants: newIssuedGrants,
                issuedShares: newIssuedShares,
                availableGrants: 30 - newIssuedGrants,
                availableShares: prevData.pool.totalShares - newIssuedShares,
            }
        }
    });

    toast({ title: "Grant Issued", description: `An equity grant has been issued to ${newOpName}.`});
    addMockEvent({ user: 'Admin', action: `Issued Phase 3 grant to ${newOpName}`, phase: 'Admin' });
    setIsGrantDialogOpen(false);
    // Reset form
    setNewOpName('');
    setNewOpExpertise('');
    setNewOpGrant('25000');
  };


  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>
        
        <Tabs defaultValue="approvals-p1" className="w-full">
          <TabsList className="grid w-full grid-cols-6 max-w-6xl mx-auto">
            <TabsTrigger value="approvals-p1">P1 Approvals</TabsTrigger>
            <TabsTrigger value="approvals-p2">P2 SPV Management</TabsTrigger>
            <TabsTrigger value="phase3">P3 Operator Equity</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="tax">Tax & Compliance</TabsTrigger>
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
                    {p1Approvals.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell>{investor.id}</TableCell>
                        <TableCell>{investor.name}</TableCell>
                        <TableCell>{investor.date}</TableCell>
                        <TableCell>
                          <Badge variant={investor.status === "Pending" ? "secondary" : "default"}>{investor.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">View Application</Button>
                          <Button size="sm" onClick={() => handleApproveP1(investor.id)}>Approve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                     {p1Approvals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No pending approvals.
                        </TableCell>
                      </TableRow>
                    )}
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
                    {p2Approvals.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell>{investor.id}</TableCell>
                        <TableCell>{investor.name}</TableCell>
                        <TableCell><Badge variant="outline">{investor.entity}</Badge></TableCell>
                        <TableCell>
                          <Badge variant={investor.status.includes("Pending") ? "secondary" : "default"}>{investor.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => handleP2Action(investor.id, 'docs')}>Manage Docs</Button>
                          <Button size="sm" onClick={() => handleP2Action(investor.id, 'capital-call')}>Initiate Capital Call</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {p2Approvals.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                            No pending SPV actions.
                            </TableCell>
                        </TableRow>
                    )}
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
                    <span className="text-xs text-muted-foreground">({(phase3Data.pool.totalShares).toLocaleString()} shares)</span>
                  </div>
                   <div className="flex flex-col gap-1 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Grants Issued</span>
                    <span className="text-2xl font-bold">{phase3Data.pool.issuedGrants} / 30</span>
                     <span className="text-xs text-muted-foreground">({(phase3Data.pool.issuedShares).toLocaleString()} shares)</span>
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
                          <Dialog open={isGrantDialogOpen} onOpenChange={setIsGrantDialogOpen}>
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
                                  <Input id="name" value={newOpName} onChange={(e) => setNewOpName(e.target.value)} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="role" className="text-right">
                                    Expertise
                                  </Label>
                                  <Input id="role" value={newOpExpertise} onChange={(e) => setNewOpExpertise(e.target.value)} className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="grant" className="text-right">
                                    Grant (Shares)
                                  </Label>
                                  <Input id="grant" type="number" value={newOpGrant} onChange={(e) => setNewOpGrant(e.target.value)} className="col-span-3" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleCreateGrant}>Issue Grant</Button>
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
                                        <TableCell>
                                            {op.grant.toLocaleString()}
                                            <p className="text-xs text-muted-foreground">(Non-Voting)</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                <Progress value={op.vestingProgress} className="h-2"/>
                                                <span className="text-xs text-muted-foreground">{op.vestingProgress}% Vested</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={op.status === "Active" ? "default" : op.status === "Pending Docs" ? "secondary" : "destructive"}>
                                                {op.status === "Active" && <CheckCircle className="mr-1 h-3 w-3" />}
                                                {op.status.includes("Leaver") && <UserX className="mr-1 h-3 w-3" />}
                                                {op.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button variant="ghost" size="sm">Manage</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                              <DropdownMenuItem onClick={() => handleLeaverStatusChange(op.id, 'Good Leaver')}><UserCheck2 className="mr-2 h-4 w-4"/>Mark as Good Leaver</DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleLeaverStatusChange(op.id, 'Bad Leaver')} className="text-destructive"><UserX className="mr-2 h-4 w-4"/>Mark as Bad Leaver</DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
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
                            <CardTitle className="flex items-center gap-2"><PieChart/> Dilution & Cap Table Simulator</CardTitle>
                             <CardDescription>Model the impact of new investments and grants.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <Label>New Series A Investment (Shares)</Label>
                                <Slider defaultValue={[0]} max={500000} step={25000} onValueChange={(value) => setNewInvestment(value[0])} />
                                <p className="text-sm font-bold text-right">{newInvestment.toLocaleString()} Shares</p>
                              </div>
                              <div className="space-y-2">
                                <Label>New Operator Grants (25k shares each)</Label>
                                <Slider defaultValue={[0]} max={10} step={1} onValueChange={(value) => setNewGrants(value[0])} />
                                 <p className="text-sm font-bold text-right">{newGrants} Grants</p>
                              </div>
                              <Separator/>
                              <div className="space-y-4">
                                  {capTableData.map(item => (
                                      <div key={item.class} className="flex justify-between items-center text-sm">
                                          <div>
                                              <p className="font-medium">{item.class}</p>
                                              <p className="text-xs text-muted-foreground">{item.shares.toLocaleString()} shares</p>
                                          </div>
                                          <div className="font-bold">{((item.shares / totalShares) * 100).toFixed(2)}%</div>
                                      </div>
                                  ))}
                              </div>
                              <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Simulation Mode</AlertTitle>
                                <AlertDescription>
                                  These changes are for modeling purposes only and do not affect live data.
                                </AlertDescription>
                              </Alert>
                            </div>
                        </CardContent>
                     </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileWarning /> Equity Provisions</CardTitle>
                             <CardDescription>Key terms governing the Operator Equity Program.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-4">
                           <div>
                             <h4 className="font-semibold text-foreground">Clawback & Buyback</h4>
                             <p>Performance-based clawbacks and company buyback rights are in effect to ensure alignment. Specific terms are detailed in individual grant agreements.</p>
                           </div>
                            <div>
                             <h4 className="font-semibold text-foreground">Good/Bad Leaver Rules</h4>
                             <p>Vesting is subject to leaver status. "Bad Leavers" may forfeit all unvested and certain vested shares, as determined by the compensation committee.</p>
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
                <CardTitle>Real-Time Audit & Compliance Tracker</CardTitle>
                <CardDescription>Monitor all investor and admin activities across all phases.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Log ID</TableHead>
                      <TableHead>Phase</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">Alerts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id} className={log.action.includes('Failed') ? 'bg-destructive/10' : ''}>
                        <TableCell>{log.id}</TableCell>
                        <TableCell><Badge variant="outline">{log.phase}</Badge></TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="text-right">
                          {log.action.includes('Failed') && <AlertCircle className="h-5 w-5 text-destructive inline-block" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calculator /> Mock Tax Calculator</CardTitle>
                <CardDescription>Simulate tax withholding for cross-border investments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                    <Input id="investment-amount" type="number" placeholder="1000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investor-country">Investor Jurisdiction</Label>
                    <Input id="investor-country" placeholder="e.g., India, Singapore" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="tax-treaty">Tax Treaty Rate (%)</Label>
                    <Input id="tax-treaty" type="number" placeholder="e.g., 10, 15" />
                  </div>
                </div>
                <Button>Calculate Mock Withholding Tax</Button>
                <Separator/>
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-semibold">Mock Calculation Results</h4>
                  <p className="text-sm">Gross Investment: <span className="font-mono text-foreground">$1,000,000.00</span></p>
                  <p className="text-sm">Applicable Tax Rate (Simulated): <span className="font-mono text-foreground">15.00%</span></p>
                  <p className="text-sm font-bold">Estimated Withholding Tax: <span className="font-mono text-primary">$150,000.00</span></p>
                  <p className="text-sm">Net Investment Received: <span className="font-mono text-foreground">$850,000.00</span></p>
                  <Alert variant="default" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>For Simulation Only</AlertTitle>
                    <AlertDescription>
                      This is a simplified mock calculator. Actual tax obligations depend on complex international treaties and legal advice.
                    </AlertDescription>
                  </Alert>
                </div>
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
