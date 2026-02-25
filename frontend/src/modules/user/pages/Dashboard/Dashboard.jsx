import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FileCheck,
    UserCheck,
    MapPin,
    Briefcase,
    Stethoscope,
    ShieldCheck,
    TrendingUp,
    CreditCard
} from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import LoanCard from '../../components/loan/LoanCard.jsx';
import ProgressCard from '../../components/loan/LoanProgressCard.jsx';
import CategoryCard from '../../components/loan/LoanCategoryCard.jsx';
import HeroCarousel from '../../components/loan/HeroCarousel.jsx';
import { featuredLoansData } from '../../../admin/utils/dummyData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [loanOffers, setLoanOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = () => {
            const stored = localStorage.getItem('loanOffersData');
            if (stored) {
                setLoanOffers(JSON.parse(stored).filter(o => o.status !== 'Disabled'));
            } else {
                setLoanOffers(featuredLoansData);
            }
        };

        fetchOffers();
        window.addEventListener('storage', fetchOffers);
        return () => window.removeEventListener('storage', fetchOffers);
    }, []);

    const categories = [
        { id: 1, icon: FileCheck, title: 'Eligibility Check', status: 'Completed', path: '/status' },
        { id: 2, icon: UserCheck, title: 'KYC Verification', status: 'Action', path: '/kyc' },
        { id: 3, icon: MapPin, title: 'Income Details', status: 'Pending', path: '/kyc' },
        { id: 4, icon: ShieldCheck, title: 'Selfie Verification', status: 'Pending', path: '/kyc' },
        { id: 5, icon: Briefcase, title: 'Career Loan', disabled: true },
        { id: 6, icon: Stethoscope, title: 'Medical Loan', disabled: true },
    ];

    const handleApply = () => {
        navigate('/eligibility');
    };

    const categoriesRef = useRef(null);

    const scrollToCategories = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <MainLayout>
            {/* ── Full-width Hero Carousel */}
            <div style={{ padding: '0 0 28px' }}>
                <HeroCarousel onCtaClick={handleApply} />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
                {/* Header Section */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-black text-primary tracking-tight"
                        >
                            Hello, Aman! 👋
                        </motion.h1>
                        <p className="text-textSecondary font-medium mt-1">Here's your loan application status.</p>
                    </div>
                    <div
                        onClick={() => navigate('/status')}
                        className="flex items-center gap-3 p-2 rounded-2xl border border-[rgba(11,60,109,0.12)] cursor-pointer hover:border-gold/50 transition-all hover:shadow-md"
                        style={{ background: 'var(--card-bg)', backdropFilter: 'blur(8px)' }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">Credit Score</p>
                            <p className="text-lg font-black text-primary leading-none">742</p>
                        </div>
                    </div>
                </header>

                {/* Loan Offers Carousel */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                            <CreditCard size={22} className="text-gold" /> Featured Loan Offers
                        </h2>
                        <button
                            onClick={scrollToCategories}
                            className="text-xs font-bold text-gold uppercase tracking-widest hover:underline"
                        >
                            View All
                        </button>
                    </div>

                    <div className="flex overflow-x-auto gap-8 pb-10 -mx-4 px-4 snap-x no-scrollbar">
                        {loanOffers.map((offer) => (
                            <div key={offer.id} className="snap-center">
                                <LoanCard {...offer} comingSoon={offer.status === 'Coming Soon'} onApply={handleApply} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Progress Card */}
                <section className="mb-12 cursor-pointer" onClick={() => navigate('/kyc')}>
                    <ProgressCard percentage={35} />
                </section>

                {/* Categories Grid */}
                <section ref={categoriesRef} className="mb-12 pt-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div style={{ width: 4, height: 26, borderRadius: 4, background: 'linear-gradient(180deg,#F4A100,#FFD166)', boxShadow: '0 0 10px rgba(244,161,0,0.3)', flexShrink: 0 }} />
                            <h2 className="text-xl font-bold text-primary" style={{ letterSpacing: '-0.02em' }}>Loan Categories</h2>
                        </div>
                        <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Select to proceed</p>
                    </div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5"
                        variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
                        initial="hidden"
                        animate="visible"
                    >
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 130, damping: 18 } } }}
                                onClick={() => !cat.disabled && navigate(cat.path)}
                            >
                                <CategoryCard {...cat} />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Account Summary Snippet */}
                <section
                    className="rounded-[32px] p-8 border relative overflow-hidden"
                    style={{
                        background: 'var(--card-bg)',
                        borderColor: 'var(--border-color)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.05)',
                    }}
                >
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-20 -mt-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,204,255,0.25) 0%, transparent 70%)' }} />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full -ml-16 -mb-16 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,255,153,0.20) 0%, transparent 70%)' }} />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-black text-primary mb-2">Grow with Creditu</h3>
                            <p className="text-textSecondary max-w-md font-medium">
                                Unlock higher loan limits and better interest rates by completing your profile and maintaining a good credit behavior.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/status')}
                            style={{ background: 'linear-gradient(135deg, #0B3C6D 0%, #1a5a9e 100%)', boxShadow: '0 8px 24px rgba(11,60,109,0.30)' }}
                            className="text-white px-8 py-4 rounded-2xl font-bold min-w-[200px]"
                        >
                            Complete Profile
                        </motion.button>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
