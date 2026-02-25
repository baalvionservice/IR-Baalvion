
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IrrMetrics } from "@/types/performance";
import { TrendingUp, ArrowUpRight, Wallet, Percent, ShieldCheck } from "lucide-react";

interface Props {
  metrics: IrrMetrics;
  currentNav: number;
}

export function MetricsSummaryGrid({ metrics, currentNav }: Props) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const formatPercent = (val: number) => (val * 100).toFixed(1) + "%";

  const cards = [
    { title: "Net IRR", value: formatPercent(metrics.netIRR), icon: TrendingUp, color: "text-green-500", desc: "After Management Fees" },
    { title: "TVPI", value: metrics.TVPI.toFixed(2) + "x", icon: ArrowUpRight, color: "text-blue-500", desc: "Total Value to Paid-In" },
    { title: "DPI", value: metrics.DPI.toFixed(2) + "x", icon: Wallet, color: "text-primary", desc: "Distributed to Paid-In" },
    { title: "Current NAV", value: formatCurrency(currentNav), icon: ShieldCheck, color: "text-amber-500", desc: "Market Valuation" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-card/50 border-border/50">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-3 w-3 ${card.color}`} />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold tracking-tighter">{card.value}</div>
            <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tight">{card.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
