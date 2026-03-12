import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { leadershipTeam, globalLeaders } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { slugify } from '@/utils/slug-generator';

type LeaderSource = 'executive' | 'global';

type Leader =
  | (typeof leadershipTeam)[number] & { source: LeaderSource }
  | ((typeof globalLeaders)[number] & { source: LeaderSource; imageId?: string; bio?: string });

function findLeaderBySlug(slug: string): Leader | null {
  const executive = leadershipTeam.find((member) => slugify(member.name) === slug);
  if (executive) {
    return { ...executive, source: 'executive' };
  }

  const global = globalLeaders.find((member) => slugify(member.name) === slug);
  if (global) {
    return {
      ...global,
      source: 'global',
      bio: global.title,
    };
  }

  return null;
}

export interface SingleLeaderPageParams {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: SingleLeaderPageParams): Metadata {
  const leader = findLeaderBySlug(params.slug);

  if (!leader) {
    return {
      title: 'Leader not found | Baalvion',
    };
  }

  return {
    title: `${leader.name} | Leadership`,
    description: leader.bio || leader.title,
  };
}

export default function SingleLeaderPage({ params }: SingleLeaderPageParams) {
  const leader = findLeaderBySlug(params.slug);

  if (!leader) {
    return notFound();
  }

  const imageId = 'imageId' in leader ? leader.imageId : undefined;
  const image =
    imageId && PlaceHolderImages.find((p) => p.id === imageId)
      ? PlaceHolderImages.find((p) => p.id === imageId)
      : PlaceHolderImages.find((p) => p.id === 'executive-2-photo');

  return (
    <div className="min-h-screen bg-white text-black animate-in fade-in duration-700">
      <section className="bg-black text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-xs md:text-sm text-gray-400 mb-4 space-x-2">
            <Link href="/governance/leadership" className="hover:text-white underline-offset-4 hover:underline">
              Leadership
            </Link>
            <span>/</span>
            <span className="text-gray-300">{leader.name}</span>
          </nav>

          <p className="text-[0.7rem] md:text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
            Leadership Profile
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{leader.name}</h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-2xl">{leader.title}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 md:gap-16 items-start">
          <div className="space-y-6">
            {image && (
              <div className="bg-gray-100 overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={leader.name}
                  data-ai-hint={image.imageHint}
                  width={500}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}

            <div className="border border-gray-200 p-4 md:p-5 space-y-2 text-sm text-gray-600">
              <p className="font-semibold text-xs tracking-[0.18em] uppercase text-gray-500">
                Role
              </p>
              <p>{leader.title}</p>
              <p className="font-semibold text-xs tracking-[0.18em] uppercase text-gray-500 mt-4">
                Category
              </p>
              <p>{leader.source === 'executive' ? 'Executive Leadership' : 'Global Functional Leadership'}</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            {leader.bio && (
              <p className="text-base md:text-lg">{leader.bio}</p>
            )}

            <p className="text-sm md:text-base">
              As part of Baalvion&apos;s leadership, {leader.name.split(' ')[0]} helps guide the firm&apos;s strategy
              across technology, capital markets, and global trade infrastructure. Their work supports our mission to
              build a unified operating system for institutional B2B commerce.
            </p>

            <p className="text-sm md:text-base">
              This role collaborates closely with cross-functional teams spanning product, risk, operations, and
              investor partnerships to ensure disciplined execution and long-term value creation for all stakeholders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}