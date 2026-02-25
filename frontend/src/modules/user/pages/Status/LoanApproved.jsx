import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PartyPopper, ArrowRight, Share2, Download, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';
import confetti from 'canvas-confetti';

const LoanApproved = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Premium Confetti Celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since it's a function call, we use it directly
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F8FAFC]/50 flex flex-col items-center relative overflow-hidden">
        {/* Decorative Mesh Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-xl w-full mx-auto px-6 py-12 relative z-10 flex flex-col items-center text-center">

          {/* Header Action Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 px-5 py-2 rounded-full border border-green-100 flex items-center gap-2 mb-10 shadow-sm"
          >
            <ShieldCheck size={16} className="text-green-600" />
            <span className="text-[11px] font-extrabold text-green-700 uppercase tracking-widest">Pre-Approved Offer Live</span>
          </motion.div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-28 h-28 bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center text-green-500 mb-10 border border-slate-100 relative"
          >
            <CheckCircle2 size={56} strokeWidth={2.5} />
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-[-15px] bg-green-100/50 rounded-[50px] -z-10 blur-xl"
            />
          </motion.div>

          {/* Title & Headline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Congratulations! <PartyPopper className="inline-block text-yellow-500 ml-1" />
            </h1>
            <p className="text-slate-500 font-semibold text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              Your loan application for <span className="text-blue-600 font-black">₹5,00,000</span> has been verified and fully approved.
            </p>
          </motion.div>

          {/* Loan Details Card */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 100 }}
            className="w-full bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] mb-10 text-left relative overflow-hidden group hover:border-blue-200 transition-all duration-500"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500" />

            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[.25em] mb-1">Approved Amount</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">₹5,00,000</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">9.3% Fixed</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp size={28} />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 md:gap-12 mb-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly EMI</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-lg font-black text-slate-800">₹14,250</p>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference ID</p>
                <p className="text-lg font-black text-slate-800 tracking-tight">#CRD-948275</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenure</p>
                <p className="text-lg font-black text-slate-800">36 Months</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout Time</p>
                <div className="flex items-center justify-end gap-2">
                  <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                  <p className="text-lg font-black text-slate-800 italic">~24 Hours</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <motion.button whileHover={{ x: 3 }} className="flex items-center gap-3 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                <Download size={18} /> Download Sanction Letter
              </motion.button>
              <div className="flex items-center gap-3">
                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <div className="w-full space-y-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0B3C6D] text-white py-6 rounded-3xl font-black text-lg shadow-[0_20px_40px_rgba(11,60,109,0.2)] flex items-center justify-center gap-3"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard <ArrowRight size={20} className="ml-1" />
            </motion.button>
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Joined 50k+ Happy Borrowers
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoanApproved;
