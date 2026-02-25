import { Card } from '@/components/ui/card';
import { pressReleases } from '@/lib/data';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function PressReleasesSection({ id }: { id: string }) {
  return (
    <section id={id} className="w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Press Releases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressReleases.map((release, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between bg-card p-6 border-border"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{release.title}</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{release.date}</p>
                <Button
                  asChild
                  variant="link"
                  className="p-0 h-auto text-primary mt-4"
                >
                  <Link href={release.link}>
                    Read full release
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12">
          <Button size="lg" asChild>
            <Link href="#">
              All releases <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
