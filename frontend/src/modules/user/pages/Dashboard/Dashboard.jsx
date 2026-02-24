import React from 'react';
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

const Dashboard = () => {
    const navigate = useNavigate();

    const loanOffers = [
        {
            id: 1,
            type: 'Personal Loan',
            amount: '5,00,000',
            rate: '9.3',
            gradient: 'blue',
            description: 'Apply now for instant approval and lowest interest rates.'
        },
        {
            id: 2,
            type: 'Medical Loan',
            amount: '10,00,000',
            rate: '10.5',
            gradient: 'gold',
            comingSoon: true,
            description: 'Emergency funding for your health needs. Launching soon!'
        },
        {
            id: 3,
            type: 'Career Loan',
            amount: '15,00,000',
            rate: '8.5',
            gradient: 'green',
            comingSoon: true,
            description: 'Invest in your future skills and education.'
        },
    ];

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

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
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
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-border cursor-pointer hover:border-gold/50 transition-colors" onClick={() => navigate('/status')}>
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
                        <button className="text-xs font-bold text-gold uppercase tracking-widest hover:underline">View All</button>
                    </div>

                    <div className="flex overflow-x-auto gap-8 pb-10 -mx-4 px-4 snap-x no-scrollbar">
                        {loanOffers.map((offer) => (
                            <div key={offer.id} className="snap-center">
                                <LoanCard {...offer} onApply={handleApply} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Progress Card */}
                <section className="mb-12 cursor-pointer" onClick={() => navigate('/kyc')}>
                    <ProgressCard percentage={35} />
                </section>

                {/* Categories Grid */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-primary">Loan Categories</h2>
                        <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Select to proceed</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {categories.map((cat) => (
                            <div key={cat.id} onClick={() => !cat.disabled && navigate(cat.path)}>
                                <CategoryCard {...cat} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Account Summary Snippet */}
                <section className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
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
                            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 min-w-[200px]"
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
