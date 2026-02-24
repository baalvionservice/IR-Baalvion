"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Check, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { phase2Documents } from "@/lib/phase2-data";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Phase2DataRoomPage() {
  const { toast } = useToast();

  const handleDownload = (docName: string) => {
    toast({
      title: "Audit Log: Download",
      description: `Download initiated for ${docName}.`,
    });
  };

  const handleAcknowledge = (docName: string) => {
    toast({
      title: "Audit Log: Acknowledge",
      description: `${docName} has been marked as acknowledged.`,
    });
  };

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Phase 2: SPV Data Room</h1>
          <p className="text-muted-foreground">Confidential documents for Project Olympus SPV.</p>
        </div>
        
        <Alert className="mb-8">
            <FileText className="h-4 w-4" />
            <AlertTitle>Confidential & Audited</AlertTitle>
            <AlertDescription>
              Access and downloads are tracked for compliance. Acknowledge documents as required.
            </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Document Library</CardTitle>
            <CardDescription>
              All documents related to your SPV investment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {phase2Documents.map((category, index) => (
                <AccordionItem value={`item-${index}`} key={category.category}>
                  <AccordionTrigger className="text-lg">
                    {category.category} ({category.docs.length} docs)
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                    <div className="overflow-x-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Document Name</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {category.docs.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {doc.name}
                                </TableCell>
                                <TableCell>
                                <Badge variant="outline">v{doc.version}</Badge>
                                </TableCell>
                                <TableCell>{doc.date}</TableCell>
                                <TableCell>
                                <Badge variant={doc.status === 'Acknowledged' ? 'default' : 'secondary'}>
                                    {doc.status}
                                </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => {}}>
                                    <Eye className="h-5 w-5" />
                                    <span className="sr-only">Preview {doc.name}</span>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.name)}>
                                    <Download className="h-5 w-5" />
                                    <span className="sr-only">Download {doc.name}</span>
                                </Button>
                                {doc.status === 'Pending' && (
                                    <Button variant="ghost" size="icon" onClick={() => handleAcknowledge(doc.name)}>
                                    <Check className="h-5 w-5" />
                                    <span className="sr-only">Acknowledge {doc.name}</span>
                                    </Button>
                                )}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
