import { Card, CardContent } from "@/components/ui/card";
import { Banknote, Scale, ShieldCheck } from "lucide-react";

export default function TrustSignals() {
  const signals = [
    { name: "Goldman Sachs", category: "Banking Partner", icon: <Banknote className="h-8 w-8 text-primary" /> },
    { name: "Deloitte", category: "Auditor", icon: <ShieldCheck className="h-8 w-8 text-primary" /> },
    { name: "Skadden, Arps", category: "Legal Counsel", icon: <Scale className="h-8 w-8 text-primary" /> },
    { name: "McKinsey & Co.", category: "Strategic Advisor", icon: <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
  ];

  return (
    <section id="trust" className="w-full bg-card">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Institutional-Grade Partners
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our operations are supported by a network of world-class financial, legal, and strategic partners, ensuring the highest standards of governance and execution.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal) => (
            <Card key={signal.name} className="bg-background/50 text-center">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                {signal.icon}
                <div className="flex-grow">
                  <p className="text-lg font-bold">{signal.name}</p>
                  <p className="text-sm text-muted-foreground">{signal.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
