import type { Metadata } from 'next';
import Link from 'next/link';
import { leadershipTeam, globalLeaders } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { slugify } from '@/utils/slug-generator';

export const metadata: Metadata = {
  title: 'Global Leadership | Executive Committee',
  description: 'Meet the executive leadership team driving Baalvion’s vision for the future of global B2B trade infrastructure.',
};

export default function LeadershipPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-primary tracking-[0.2em] mb-4 uppercase">About Us</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Global Executive Committee</h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
              Strategic execution at scale, led by a committee of industry pioneers in technology, finance, and logistics.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16 mb-12 ">
            {leadershipTeam.map((member) => {
              const img = PlaceHolderImages.find(p => p.id === member.imageId);
              return (
                <div key={member.name} className="group">
                  <div className="aspect-square size-[200px] bg-gray-100 mb-8 overflow-hidden transition-all duration-500">
                    {img && (
                      <Image
                        src={img.imageUrl}
                        alt={`Photo of ${member.name}`}
                        data-ai-hint={img.imageHint}
                        width={100}
                        height={100}
                        className="h-full w-full object-top scale-100 group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-1">{member.name}</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{member.title}</p>
                  <Link href={`/governance/leadership/${slugify(member.name)}` || ''} className="inline-flex items-center text-sm font-bold text-black border-b-2 border-primary pb-1 hover:border-black transition-colors">
                    Read Biography &gt;
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 pt-20">
            <h2 className="text-2xl font-bold mb-12 uppercase tracking-widest text-gray-400 text-center">Global Functional Leadership</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
              {globalLeaders.map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="h-1 bg-primary w-8 mb-4 opacity-50" />
                  <h4 className="font-bold text-lg leading-tight">{member.name}</h4>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">{member.title}</p>
                  <Link href={`/governance/leadership/${slugify(member.name)}` || ''} className="block text-[10px] font-bold hover:text-primary transition-colors">Bio &gt;</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 p-12 bg-gray-50 text-center">
            <h3 className="text-xl font-bold mb-4 italic">"Leadership is the capacity to translate vision into reality."</h3>
            <p className="text-gray-500 text-sm">— Baalvion Operational Excellence Charter</p>
          </div>
        </div>
      </section>
    </div>
  );
}



