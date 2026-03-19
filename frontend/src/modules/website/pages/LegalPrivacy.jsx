import React, { useEffect } from 'react';
import WebsiteNavbar from '../components/WebsiteNavbar';
import WebsiteFooter from '../components/WebsiteFooter';
import { Shield, Lock, Eye, FileText, Bell, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const LegalPrivacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: Shield,
            title: "Information We Collect",
            content: "We collect information you provide directly to us when you create an account, apply for a loan, or communicate with us. This includes identity data (Aadhar, PAN), contact information, and financial history necessary for credit assessment."
        },
        {
            icon: Lock,
            title: "How We Use Your Data",
            content: "Your data is primarily used to evaluate loan eligibility, process applications, and prevent fraud. We also use it to communicate account updates, security alerts, and personalized financial offers that may benefit you."
        },
        {
            icon: Eye,
            title: "Information Sharing",
            content: "We do not sell your personal data. We only share information with regulated financial partners, credit bureaus (like CIBIL), and service providers who help us operate our loan services under strict confidentiality agreements."
        },
        {
            icon: FileText,
            title: "Data Retention",
            content: "We retain your information as long as necessary to provide services and comply with legal or regulatory requirements set by the Reserve Bank of India (RBI)."
        },
        {
            icon: Bell,
            title: "Your Rights",
            content: "You have the right to access, correct, or request deletion of your personal information. You can also opt-out of marketing communications at any time through your account settings."
        },
        {
            icon: Shield,
            title: "Cookies & Tracking",
            content: "We use cookies to enhance your experience, remember preferences, and analyze app usage. You can manage cookie settings in your browser, but some features may not work without them."
        },
        {
            icon: Eye,
            title: "Children's Privacy",
            content: "Our services are not intended for individuals under 18. We do not knowingly collect information from children. If we discover such data, we will delete it immediately."
        },
        {
            icon: RefreshCw,
            title: "Policy Updates",
            content: "We may update this policy periodically to reflect changes in our practices or for legal reasons. We will notify you of any significant changes via email or app notifications."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <WebsiteNavbar />

            {/* Header section with gradient */}
            <header className="pt-40 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gold/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-6 mt-1.5">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-textSecondary font-medium leading-relaxed">
                            Last Updated: March 19, 2026. Your privacy and data security are our top priorities at <span className="text-gold font-bold">creditU</span>. Learn how we handle your information with transparency and care.
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
                    className="mt-24 p-12 rounded-[40px] bg-primary text-white relative overflow-hidden"
                >
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mb-40 -mr-40" />
                    
                    <h2 className="text-3xl font-black mb-8 relative z-10">Still have questions?</h2>
                    <p className="text-white/80 text-lg font-medium max-w-2xl mb-10 relative z-10">
                        Our compliance team is here to help if you need further clarification on our data handling practices or have specific privacy concerns.
                    </p>
                    <a 
                        href="mailto:i@creditu.in" 
                        className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold-dark transition-all relative z-10 shadow-lg"
                    >
                        Contact Privacy Team
                    </a>
                </motion.div>
            </main>

            <WebsiteFooter />
        </div>
    );
};

export default LegalPrivacy;
