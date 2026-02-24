import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileText, Landmark } from "lucide-react";

export default function RiskSection({ id }: { id: string }) {
  const compliancePoints = [
    {
      icon: ShieldCheck,
      title: "Data Security",
      description: "Implementing state-of-the-art cybersecurity measures to protect investor data and intellectual property."
    },
    {
      icon: FileText,
      title: "Regulatory Adherence",
      description: "Proactively ensuring compliance with all relevant financial regulations and reporting standards across jurisdictions."
    },
    {
      icon: Landmark,
      title: "Corporate Governance",
      description: "Upholding the highest standards of corporate governance to ensure transparency, fairness, and accountability."
    }
  ];

  return (
    <section id={id} className="w-full bg-card">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Risk & Compliance
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our commitment to robust risk management and uncompromising compliance forms the bedrock of our operations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {compliancePoints.map((point) => (
            <div key={point.title} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <point.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
