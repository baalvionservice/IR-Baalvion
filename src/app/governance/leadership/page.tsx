import type { Metadata } from 'next';
import Link from 'next/link';
import { leadershipTeam, globalLeaders } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Leadership | Baalvion',
    description: 'Information about Baalvion\'s leadership team.',
};

export default function LeadershipPage() {
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-left max-w-4xl">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">ABOUT US</p>
                    <h1 className="text-4xl md:text-5xl font-bold">The Global Executive Committee</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                        {leadershipTeam.slice(0, 2).map((member) => (
                            <div key={member.name}>
                                <div className="w-[222.25px] h-[222.25px] bg-gray-200 mb-6"></div>
                                <h3 className="text-2xl font-bold">{member.name}</h3>
                                <p className="text-base text-gray-500">{member.title}</p>
                                <Link href="#" className="text-sm font-bold text-primary hover:underline flex items-center mt-4">
                                    <span className="mr-2">&gt;</span> Read {member.name.split(' ')[0]}'s bio
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {globalLeaders.map((member) => (
                            <div key={member.name}>
                                <div className="w-[125px] h-[125px] bg-gray-200 mb-4"></div>
                                <h3 className="text-lg font-bold">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.title}</p>
                                <Link href="#" className="text-xs font-bold text-primary hover:underline flex items-center mt-3">
                                    <span className="mr-2">&gt;</span> Read {member.name.split(' ')[0]}'s bio
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
