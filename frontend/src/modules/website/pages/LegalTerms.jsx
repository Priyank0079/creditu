import React, { useEffect } from 'react';
import WebsiteNavbar from '../components/WebsiteNavbar';
import WebsiteFooter from '../components/WebsiteFooter';
import { FileCheck, CreditCard, Ban, Gavel, Scale, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

const LegalTerms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: Scale,
            title: "Acceptance of Terms",
            content: "By using our website reflect or accessing creditU services, you agree to these legal terms and conditions. These terms govern your use of our digital platforms and any loan products you apply for."
        },
        {
            icon: CreditCard,
            title: "Eligibility",
            content: "You must be an Indian citizen, aged between 21 and 60, and have a valid source of income to apply for loans. Providing false or misleading information will result in immediate rejection and potential legal action."
        },
        {
            icon: Gavel,
            title: "Loan Approval",
            content: "Credit approval is at the sole discretion of our RBI-registered NBFC partners. We facilitate the application process and do not guarantee approval. Interest rates and processing fees will be disclosed before final disbursal."
        },
        {
            icon: AlertOctagon,
            title: "KYC Requirements",
            content: "Applicants are required to provide valid identity documents as per RBI's KYC (Know Your Customer) guidelines. Your application will only proceed if the verification is successful."
        },
        {
            icon: Ban,
            title: "Prohibited Use",
            content: "You may not use our platform for any illegal activities or to harass others. Any unauthorized attempt to breach our security or access other users' data is strictly prohibited and reportable to authorities."
        },
        {
            icon: Scale,
            title: "Limitation of Liability",
            content: "CreditU is not responsible for any indirect or consequential damages arising from your use of our services or any loan application. Our platform is provided 'as-is' and 'as-available'."
        },
        {
            icon: Gavel,
            title: "Governing Law",
            content: "These terms will be governed by and interpreted as per Indian laws. Any disputes will be subject to the exclusive jurisdiction of the courts in Bengaluru, India."
        },
        {
            icon: FileCheck,
            title: "Electronic Consent",
            content: "You consent to receive all communications and documents electronically. Your digital signature and OTP-based verification hold the same legal weight as a physical signature for loan agreements."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <WebsiteNavbar />

            {/* Header section with gradient */}
            <header className="pt-40 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-gold/5 rounded-full blur-[100px] pointer-events-none -ml-20 -mt-20" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-6 mt-1.5">
                            Terms and Condition
                        </h1>
                        <p className="text-lg text-textSecondary font-medium leading-relaxed">
                            Last Updated: March 19, 2026. This document outlines the legal agreement between you and <span className="text-gold font-bold">creditU</span> regarding our services and your responsibilities.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Content Section */}
            <main className="pb-32 container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-soft hover:border-gold/30 hover:shadow-premium transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                                <section.icon size={26} />
                            </div>
                            <h3 className="text-xl font-black text-primary mb-4">{section.title}</h3>
                            <p className="text-textSecondary font-medium leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Additional detailed text if needed */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 rounded-[40px] bg-primary text-white relative overflow-hidden text-center max-w-5xl mx-auto shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl -mt-40 -mr-40" />
                    
                    <h2 className="text-3xl font-black mb-8 relative z-10">Legal Disclaimer</h2>
                    <p className="text-white/80 text-lg font-medium mb-10 relative z-10 leading-relaxed font-sans">
                        CreditU is a technology platform and not a lender. All loans are provided by our RBI-registered NBFC partners. We follow all guidelines set by the Reserve Bank of India and local financial regulations to ensure your safety and fairness.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <a href="mailto:grievance@creditu.in" className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">
                            Grievance Redressal
                        </a>
                    </div>
                </motion.div>
            </main>

            <WebsiteFooter />
        </div>
    );
};

export default LegalTerms;
