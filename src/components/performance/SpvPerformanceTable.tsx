
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SpvPerformance } from "@/types/performance";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface Props {
  data: SpvPerformance[];
}

export function SpvPerformanceTable({ data }: Props) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="bg-card/30 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Portfolio Asset Performance
        </CardTitle>
        <CardDescription className="text-xs">Individual SPV valuation tracking and performance attribution.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase text-muted-foreground pl-6">Strategic Asset</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-muted-foreground">Deployed Capital</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-muted-foreground">Current Value</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-muted-foreground text-right pr-6">Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((spv) => (
              <TableRow key={spv.id} className="border-border/50 group hover:bg-primary/5 transition-colors">
                <TableCell className="pl-6 py-4">
                  <p className="font-bold text-sm tracking-tight">{spv.name}</p>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-tighter">{spv.id}</p>
                </TableCell>
                <TableCell className="text-sm font-medium">{formatCurrency(spv.deployed)}</TableCell>
                <TableCell className="text-sm font-bold">{formatCurrency(spv.currentValue)}</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-bold flex items-center gap-1 ${spv.gainPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {spv.gainPercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {spv.gainPercent > 0 ? "+" : ""}{spv.gainPercent}%
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">Gross ROI</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
