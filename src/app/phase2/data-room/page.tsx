"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Check, Eye, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { phase2Documents, type Document } from "@/lib/phase2-data";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Phase2DataRoomPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

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

  const handlePreview = (doc: Document) => {
    setSelectedDoc(doc);
    setIsPreviewOpen(true);
  };

  const filteredDocuments = useMemo(() => {
    return phase2Documents.map(category => {
      const filteredDocs = category.docs.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
      return { ...category, docs: filteredDocs };
    }).filter(category => category.docs.length > 0);
  }, [searchTerm, statusFilter]);

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
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter documents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="Not Required">Not Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Accordion type="multiple" defaultValue={filteredDocuments.map((_, index) => `item-${index}`)} className="w-full">
              {filteredDocuments.map((category, index) => (
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
                                <Button variant="ghost" size="icon" onClick={() => handlePreview(doc)}>
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
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No documents match your filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

       <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>{selectedDoc?.name}</DialogTitle>
                <DialogDescription>
                    Category: {selectedDoc?.category} | Version: {selectedDoc?.version} | Uploaded: {selectedDoc?.date}
                </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm max-w-none rounded-lg border bg-muted/30 p-4 max-h-[60vh] overflow-y-auto">
                <h3 className="text-foreground">Mock Document Content</h3>
                <p className="text-muted-foreground">This is a placeholder for the document content of "{selectedDoc?.name}". In a real implementation, this would be an embedded PDF viewer or a secure HTML rendering of the document.</p>
                <h4 className="text-foreground">Section 1: Introduction</h4>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                <h4 className="text-foreground">Section 2: Terms and Conditions</h4>
                <p className="text-muted-foreground">Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
                 <h4 className="text-foreground">Section 3: Signatures</h4>
                <p className="text-muted-foreground">IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.</p>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </main>
  );
}
