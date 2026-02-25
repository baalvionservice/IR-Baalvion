import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pressReleases } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PressReleasesSection({ id }: { id: string }) {
  return (
    <section id={id} className="w-full bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Recent Press Releases
          </h2>
          <p className="mt-4 text-muted-foreground">
            Stay informed with the latest official announcements, financial reporting, and strategic milestones from Baalvion.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
                {pressReleases.map((release, index) => (
                <Card key={index} className="p-4 sm:p-6 bg-background">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-1">{release.date}</p>
                            <h3 className="font-semibold text-lg text-foreground">{release.title}</h3>
                        </div>
                        <Button asChild variant="outline" className="shrink-0">
                            <Link href={release.link}>
                                Read Release <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </Card>
                ))}
            </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="#">
              View All Press Releases
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
