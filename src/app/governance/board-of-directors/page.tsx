import type { Metadata } from 'next';

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
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 text-center text-black">
                    <h2 className="text-2xl font-bold">Content Coming Soon</h2>
                    <p className="text-gray-600 mt-4">Details about our Board of Directors will be listed here.</p>
                </div>
            </section>
        </>
    );
}
