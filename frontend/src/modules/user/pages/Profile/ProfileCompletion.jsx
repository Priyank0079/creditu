import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  FileX,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('approved'); // 'approved', 'empty', 'rejected'

  const statusContent = {
    approved: {
      icon: CheckCircle2,
      color: '#1FAF5A',
      title: 'Loan Approved!',
      desc: 'Congratulations! Your loan application has been vetted and successfully approved by our partners.',
      cta: 'View Loan Details'
    },
    empty: {
      icon: Search,
      color: '#F4B400',
      title: 'Under Analysis',
      desc: 'We are currently reviewing your financial profile. This usually takes 2-4 business hours.',
      cta: 'Check Updates'
    },
    rejected: {
      icon: AlertCircle,
      color: '#EF4444',
      title: 'Action Required',
      desc: 'Your documents were rejected due to poor visibility. Please re-upload clear copies to continue.',
      cta: 'Re-upload Documents'
    }
  };

  const current = statusContent[status];

  return (
    <div className="min-h-screen bg-[#061e38] bg-gradient-to-br from-[#0B3C6D] via-[#061e38] to-black text-white p-6 pb-24 relative overflow-hidden">
      {/* Premium Background Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <header className="flex items-center justify-between mb-12 max-w-lg mx-auto">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-95">
          <ArrowLeft size={22} className="text-white" />
        </button>
        <div className="text-center">
          <h1 className="font-black text-xl tracking-tight">Profile Status</h1>
          <p className="text-[9px] text-white/40 uppercase font-bold tracking-[.2em] mt-0.5 ml-1">Live Credit Pipeline</p>
        </div>
        <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gold">
          <ShieldCheck size={22} />
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* Status Tab Toggle for Demo */}
        <div className="flex gap-2 mb-16 bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10">
          {['approved', 'empty', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${status === s ? 'bg-white text-[#0B3C6D] shadow-lg' : 'text-white/40 hover:text-white/70'
                }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            {/* Status Visualizer */}
            <div className="relative mb-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-[-40px] rounded-full blur-3xl"
                style={{ backgroundColor: current.color }}
              />
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center relative border-8 border-white/5"
                style={{ backgroundColor: `${current.color}15` }}
              >
                <current.icon size={56} style={{ color: current.color }} strokeWidth={2.5} />

                {/* Tiny detail bubbles */}
                <div className="absolute top-2 right-2 bg-white/10 p-1.5 rounded-lg backdrop-blur-md">
                  <Zap size={14} className="text-gold fill-gold" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-black mb-4 tracking-tighter">{current.title}</h2>
            <p className="text-white/60 font-medium px-6 mb-12 leading-relaxed text-[15px]">
              {current.desc}
            </p>

            {/* Status Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mb-12">
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[32px] border border-white/10 flex flex-col items-center group hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-4 group-hover:text-gold transition-colors">
                  <FileX size={24} />
                </div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Current State</p>
                <p className="text-[15px] font-bold text-white capitalize">{status}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[32px] border border-white/10 flex flex-col items-center group hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-4 group-hover:text-trust transition-colors">
                  <Lock size={24} />
                </div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Security</p>
                <p className="text-[15px] font-bold text-white">Full Access</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-[#0B3C6D] py-5 rounded-[28px] font-black text-base shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 active:bg-gray-100 transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              {current.cta}
              <div className="p-1 bg-[#0B3C6D]/10 rounded-lg">
                <ChevronRight size={18} />
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <p className="mt-12 text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.25em]">
          Verified RBI Regulated Entity
        </p>
      </div>
    </div>
  );
};

export default ProfileCompletion;
