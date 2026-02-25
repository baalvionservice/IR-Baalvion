import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { boardOfDirectors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
    title: 'Board of Directors | Baalvion',
    description: 'Information about Baalvion\'s Board of Directors.',
};

export default function BoardOfDirectorsPage() {
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">GOVERNANCE</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Board of Directors</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Link href="#" className="text-sm text-gray-600 hover:underline">
                            Click here to read about Baalvion's approach to Board diversity
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-7xl mx-auto">
                        {boardOfDirectors.map((member) => {
                            const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
                            return (
                                <div key={member.name} className="text-center flex flex-col items-center">
                                    {memberImage ? (
                                        <Image
                                            src={memberImage.imageUrl}
                                            alt={`Portrait of ${member.name}`}
                                            data-ai-hint={memberImage.imageHint}
                                            width={150}
                                            height={150}
                                            className="rounded-full mb-4 object-cover"
                                        />
                                    ) : (
                                        <div className="w-[150px] h-[150px] bg-gray-200 rounded-full mb-4"></div>
                                    )}
                                    <h3 className="text-lg font-bold">{member.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{member.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
