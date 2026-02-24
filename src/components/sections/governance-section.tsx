import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leadershipTeam } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function GovernanceSection({ id }: { id: string }) {
  return (
    <section id={id} className="w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Governance & Leadership
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our team is composed of experienced leaders dedicated to driving value and maintaining the highest standards of governance.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {leadershipTeam.map((member) => {
            const memberImage = PlaceHolderImages.find((p) => p.id === member.imageId);
            return (
              <Card key={member.name} className="flex flex-col">
                <CardHeader className="items-center text-center">
                  {memberImage && (
                    <Image
                      src={memberImage.imageUrl}
                      alt={`Photo of ${member.name}`}
                      data-ai-hint={memberImage.imageHint}
                      width={120}
                      height={120}
                      className="rounded-full mb-4"
                    />
                  )}
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm font-medium text-primary">{member.title}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
