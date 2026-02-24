import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TrendingUp, Target, Zap } from "lucide-react";

export default function ThesisSection({ id }: { id: string }) {
  const chart1 = PlaceHolderImages.find((p) => p.id === "thesis-chart-1");
  const chart2 = PlaceHolderImages.find((p) => p.id === "thesis-chart-2");

  return (
    <section id={id} className="w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Investment Thesis
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our strategy is centered on creating a durable competitive moat by integrating critical infrastructure for global B2B trade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="items-center">
                    <TrendingUp className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Capture High-Growth Corridors</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">We target trade routes and digital ecosystems experiencing exponential growth, focusing on emerging markets and technology-driven supply chains where our integrated system can provide maximum value.</p>
                </CardContent>
            </Card>
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="items-center">
                    <Target className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Acquire Strategic Technology</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Our M&A strategy focuses on acquiring key technologies in trade finance, compliance automation (AML/KYC), and logistics management to accelerate our platform's capabilities and market penetration.</p>
                </CardContent>
            </Card>
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="items-center">
                    <Zap className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Build a Network Effect</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">By integrating essential services, we create a powerful network effect. Each new partner, customer, and transaction on our platform increases its value for all other participants, creating a self-reinforcing cycle of growth.</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Opportunity Analysis</CardTitle>
              <CardDescription>Projected growth in our target addressable markets (TAM).</CardDescription>
            </CardHeader>
            <CardContent>
              {chart1 && (
                <Image
                  src={chart1.imageUrl}
                  alt="Market Opportunity Chart"
                  data-ai-hint={chart1.imageHint}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Capital Allocation Strategy</CardTitle>
              <CardDescription>Our disciplined approach to deploying capital for maximum ROI.</CardDescription>
            </CardHeader>
            <CardContent>
              {chart2 && (
                <Image
                  src={chart2.imageUrl}
                  alt="Capital Allocation Chart"
                  data-ai-hint={chart2.imageHint}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
