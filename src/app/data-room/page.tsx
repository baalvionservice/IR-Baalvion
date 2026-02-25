"use client";

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, File, FileText, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { documents } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { addMockEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: 'Secure Data Room | Baalvion',
  description: 'Access confidential documents for due diligence. All activities are logged for security and compliance.',
};

const getFileIcon = (type: string) => {
  switch (type) {
    case 'PDF':
      return <FileText className="h-5 w-5" />;
    case 'PPTX':
      return <File className="h-5 w-5" />;
    case 'XLSX':
      return <FileSpreadsheet className="h-5 w-5" />;
    case 'DOCX':
      return <File className="h-5 w-5" />;
    default:
      return <File className="h-5 w-5" />;
  }
};

export default function DataRoomPage() {
  const { toast } = useToast();

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Initiated",
      description: `Your download for ${docName} will begin shortly.`,
    });
    addMockEvent({ user: 'Investor', action: `Downloaded document: ${docName}`, phase: 'P1' });
  };

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Secure Data Room</CardTitle>
            <CardDescription>
              Access confidential documents for due diligence. All activities are logged for security and compliance purposes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{getFileIcon(doc.type)}</TableCell>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.name)}>
                        <Download className="h-5 w-5" />
                        <span className="sr-only">Download {doc.name}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}