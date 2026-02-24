"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Banknote, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addMockEvent } from '@/lib/events';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function PaymentGateway() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [amount] = useState(750000);

  const conversionRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 157.5,
    CHF: 0.9,
  };

  const convertedAmount = amount * conversionRates[currency];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const handleAllotment = () => {
    toast({ title: 'Verifying Funds...', description: 'This may take a moment.' });
     addMockEvent({ user: 'System', action: `Verified funds, preparing share allotment`, phase: 'Admin' });
    setTimeout(() => {
        toast({ title: 'Funds Verified & Shares Allotted!', description: 'Transaction ID: MOCK_TX_8472981Z'});
        addMockEvent({ user: 'System', action: 'Completed share allotment for investor.', phase: 'Admin' });
        setStep(4);
    }, 3000);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 3) {
      timer = setTimeout(handleAllotment, 5000); // Simulate bank processing time
    }
    return () => clearTimeout(timer);
  }, [step]);

  const handleSign = () => {
    toast({ title: 'Simulating E-Signature...' });
    addMockEvent({ user: 'Investor', action: 'E-signed Term Sheet', phase: 'P1' });
    setTimeout(() => {
      toast({ title: 'Term Sheet Signed Successfully' });
      setStep(2);
    }, 1500);
  };
  
  const handleFundTransfer = () => {
    toast({ title: 'Simulating Fund Transfer...' });
    addMockEvent({ user: 'Investor', action: `Initiated ${currency} fund transfer`, phase: 'P1' });
    setTimeout(() => {
        setStep(3);
    }, 2000);
  }

  return (
    <div className="space-y-4">
        {step === 1 && (
             <Card className="bg-background/50">
                <CardHeader>
                    <CardTitle>Step 1: Review & Sign Term Sheet</CardTitle>
                    <CardDescription>Please review the auto-generated term sheet for your investment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-md bg-muted/30">
                        <h4 className="font-semibold">Series A Term Sheet Summary</h4>
                        <p className="text-sm text-muted-foreground mt-2">This document outlines the terms for an investment of $750,000 USD in Baalvion for 150,000 Series A Preferred Shares...</p>
                        <Button variant="link" className="p-0 h-auto mt-2">
                            View Full Term Sheet <ExternalLink className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                    <Button onClick={handleSign} className="w-full">
                        Agree & E-Sign Term Sheet <ArrowRight className="ml-2"/>
                    </Button>
                </CardContent>
            </Card>
        )}
        {step === 2 && (
             <Card className="bg-background/50">
                <CardHeader>
                    <CardTitle>Step 2: Wire Transfer Funds</CardTitle>
                    <CardDescription>Use the information below to send funds from your financial institution.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(conversionRates).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <div className="text-right flex-1">
                            <p className="text-muted-foreground">Amount to Wire</p>
                            <p className="text-2xl font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedAmount)}</p>
                        </div>
                    </div>
                    <div className="space-y-3 text-sm border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div><span className="font-medium text-muted-foreground">Bank:</span> Goldman Sachs</div>
                            <Button variant="ghost" size="icon" onClick={() => handleCopy("Goldman Sachs")}><Copy className="h-4 w-4"/></Button>
                        </div>
                         <div className="flex justify-between items-center">
                            <div><span className="font-medium text-muted-foreground">SWIFT/BIC:</span> GSCBUS33XXX</div>
                             <Button variant="ghost" size="icon" onClick={() => handleCopy("GSCBUS33XXX")}><Copy className="h-4 w-4"/></Button>
                        </div>
                         <div className="flex justify-between items-center">
                            <div><span className="font-medium text-muted-foreground">Account Number:</span> 4815162342</div>
                             <Button variant="ghost" size="icon" onClick={() => handleCopy("4815162342")}><Copy className="h-4 w-4"/></Button>
                        </div>
                         <div className="flex justify-between items-center">
                            <div><span className="font-medium text-muted-foreground">Reference:</span> BV-INV-007</div>
                             <Button variant="ghost" size="icon" onClick={() => handleCopy("BV-INV-007")}><Copy className="h-4 w-4"/></Button>
                        </div>
                    </div>
                     <p className="text-xs text-muted-foreground">Note: Please ensure the reference code is included in your wire transfer. Transfers may take 3-5 business days to be confirmed.</p>
                     <Button onClick={handleFundTransfer} className="w-full">
                        I Have Sent The Funds <ArrowRight className="ml-2"/>
                    </Button>
                </CardContent>
            </Card>
        )}
        {step >= 3 && (
             <Card className="bg-background/50">
                <CardHeader>
                    <CardTitle>Step 3: Awaiting Confirmation</CardTitle>
                    <CardDescription>
                         {step === 3 ? "We are awaiting confirmation of your funds from our banking partners." : "Funds received and shares allotted."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4 p-4 border rounded-md">
                        <Banknote className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedAmount)}</p>
                            <p className="text-sm text-muted-foreground">Status: {step === 3 ? 'Pending Confirmation' : 'Completed'}</p>
                        </div>
                   </div>
                   {step === 3 && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Scanning for incoming transfers...</span>
                    </div>
                   )}
                   {step === 4 && (
                       <div className="p-4 border rounded-md bg-green-500/10 text-green-400">
                           <h4 className="font-semibold">Allotment Complete</h4>
                           <p className="text-sm">150,000 Series A shares have been credited to your account. Your cap table and dashboard have been updated.</p>
                       </div>
                   )}
                </CardContent>
            </Card>
        )}
    </div>
  );
}
