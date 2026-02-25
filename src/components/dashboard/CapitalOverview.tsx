'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Percent, TrendingUp, Wallet } from 'lucide-react';

interface CapitalSummary {
  commitment: number;
  calledCapital: number;
  distributions: number;
  nav: number;
  irr: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function CapitalOverview({ summary }: { summary: CapitalSummary }) {
  const remainingCommitment = summary.commitment - summary.calledCapital;

  const metrics = [
    {
      title: 'Total Commitment',
      value: formatCurrency(summary.commitment),
      icon: Wallet,
      color: 'text-primary',
    },
    {
      title: 'Called Capital',
      value: formatCurrency(summary.calledCapital),
      icon: DollarSign,
      color: 'text-blue-500',
    },
    {
      title: 'Remaining Commitment',
      value: formatCurrency(remainingCommitment),
      icon: DollarSign,
      color: 'text-orange-500',
    },
    {
      title: 'Total Distributions',
      value: formatCurrency(summary.distributions),
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      title: 'Current NAV',
      value: formatCurrency(summary.nav),
      icon: DollarSign,
      color: 'text-purple-500',
    },
    {
      title: 'Net IRR',
      value: `${summary.irr}%`,
      icon: Percent,
      color: 'text-primary',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
