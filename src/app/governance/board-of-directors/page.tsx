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
            <section className="py-16 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4 max-w-4xl text-left">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Contact Our Board of Directors</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    EMAIL: <a href="mailto:board@baalvion.com" className="text-primary hover:underline">board@baalvion.com</a>
                                </p>
                                <p>You may also send correspondence to our:</p>
                                <address className="not-italic">
                                    Board of Directors c/o Corporate Communications Department<br />
                                    Yeshwant Avenue Building, NX, NX Road, Y K Nagar, Virar West, Virar, Maharashtra 401303
                                </address>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">How to report concerns, complaints and potential illegal or unethical conduct</h2>
                            <div className="space-y-6 text-gray-700">
                                <p>
                                    Baalvion is committed to conducting its business activities in the highest ethical and professional manner and to achieving compliance with applicable laws, rules, regulations, accounting standards and controls and audit practices. As part of this commitment, Baalvion has adopted the Code of Business Conduct and Ethics, which sets out basic principles of conduct applicable to all employees, and numerous other policies and procedures designed to help us meet our legal, regulatory and ethical obligations.
                                </p>
                                <p>
                                    The Global Policy for Reporting Potential Illegal or Unethical Conduct requires that you report any concerns you may have about potential illegal or unethical conduct. You may report any such concerns to Legal & Compliance ("L&C") by contacting a Managing Director in L&C directly or via the Business Integrity Hotline or Business Integrity Reporting Website:
                                </p>
                                <ul className="list-disc list-inside pl-4 space-y-2">
                                    <li>Business Integrity Hotline</li>
                                    <li>Business Integrity Reporting Website</li>
                                </ul>
                                <p>
                                    The Business Integrity Hotline and the Business Integrity Reporting Website are administered on behalf of Baalvion by NAVEX Global, Inc. ("Navex"), an independent third party. Navex collects information and passes it to senior individuals within Baalvion L&C for handling and investigation. Navex does not use the personal data or other information collected for any other purpose.
                                </p>
                                <p>
                                    Reports, which may be made anonymously, are treated confidentially to the extent reasonably possible. Reports made in good faith may be made without fear of dismissal or retaliation of any kind. You may also report potential violations of law or regulation directly to a regulator or government authority.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
