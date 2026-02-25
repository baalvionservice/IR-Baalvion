import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Governance Overview | Baalvion',
    description: 'An overview of Baalvion\'s governance structure.',
};

const governanceDocuments = [
    { title: 'Categorical Standards of Director Independence' },
    { title: 'Code of Business Conduct and Ethics' },
    { title: 'Code of Ethics for Chief Executive and Senior Financial Officers' },
    { title: 'Corporate Governance Guidelines' },
    { title: 'Lead Independent Director Guidelines' },
];

const committeeCharters = [
    { title: 'Audit Committee' },
    { title: 'Management Development & Compensation Committee' },
    { title: 'Executive Committee' },
    { title: 'Nominating and Governance Committee' },
    { title: 'Risk Committee' },
];

const organizationalDocuments = [
    { title: 'Amended and Restated Bylaws' },
    { title: 'Restated Certificate of Incorporation' },
];

export default function GovernanceOverviewPage() {
    return (
        <>
            <section className="bg-black text-white py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-primary tracking-widest mb-2">GOVERNANCE</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Governance Overview</h1>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-black">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-black">Company Overview</h2>
                        <div className="space-y-6 text-gray-700">
                            <p>
                                Baalvion's corporate governance framework is a set of principles, guidelines and practices that support sustainable financial performance and value creation for our shareholders over the long-term. Our commitment to good corporate governance is integral to our business and reflects not only regulatory requirements, the NYSE listing standards and broadly recognized governance practices, but effective leadership and oversight by our senior management team and Board of Directors.
                            </p>
                            <p>
                                We regularly conduct calls with our shareholders to solicit feedback on our corporate governance framework. We make an effort to incorporate this feedback through enhanced policies, processes and disclosure. Please see our Corporate Governance guidelines and our latest Proxy Statement for details on our corporate governance framework.
                            </p>
                            <p>
                                If you are looking for <Link href="#" className="text-primary hover:underline">Investment Stewardship</Link> information, please click here.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold mt-16 mb-8 text-black">Governance Documents</h2>
                    </div>

                    <div className="border-t border-gray-200">
                        {governanceDocuments.map((doc, index) => (
                            <Link 
                                key={index} 
                                href="#" 
                                className="flex justify-between items-center bg-gray-50 p-6 w-full hover:bg-gray-100 transition-colors border-b border-gray-200"
                            >
                                <span className="font-bold text-black">{doc.title}</span>
                                <FileText className="h-6 w-6 text-primary" />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-bold mb-8 text-black">Committee Charters</h2>
                        <div className="border-t border-gray-200">
                            {committeeCharters.map((charter, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="flex justify-between items-center bg-gray-50 p-6 w-full hover:bg-gray-100 transition-colors border-b border-gray-200"
                                >
                                    <span className="font-bold text-black">{charter.title}</span>
                                    <FileText className="h-6 w-6 text-primary" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-bold mb-8 text-black">Organizational Documents</h2>
                        <div className="border-t border-gray-200">
                            {organizationalDocuments.map((doc, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="flex justify-between items-center bg-gray-50 p-6 w-full hover:bg-gray-100 transition-colors border-b border-gray-200"
                                >
                                    <span className="font-bold text-black">{doc.title}</span>
                                    <FileText className="h-6 w-6 text-primary" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-bold mb-8 text-black">Contact Our Board of Directors</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                EMAIL: <a href="mailto:board@baalvion.com" className="text-primary hover:underline">board@baalvion.com</a>
                            </p>
                            <p>You may also send correspondence to our:</p>
                            <address className="not-italic">
                                Board of Directors c/o Corporate Communications Department<br />
                                50 Hudson Yards<br />
                                New York, NY 10001
                            </address>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
