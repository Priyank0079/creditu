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
  Lock,
  History,
  Info
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('approved'); // 'approved', 'empty', 'rejected'

  const statusContent = {
    approved: {
      icon: CheckCircle2,
      color: '#1FAF5A',
      lightColor: 'rgba(31, 175, 90, 0.12)',
      title: 'Application Approved!',
      desc: 'Great news! Your application has been successfully verified and approved by our banking partners.',
      cta: 'View Final Offer'
    },
    empty: {
      icon: Search,
      color: '#F4B400',
      lightColor: 'rgba(244, 180, 0, 0.12)',
      title: 'Under Review',
      desc: 'Our financial analysts are currently processing your application. This usually takes 2-4 business hours.',
      cta: 'Refresh Status'
    },
    rejected: {
      icon: AlertCircle,
      color: '#EF4444',
      lightColor: 'rgba(239, 68, 68, 0.12)',
      title: 'Action Required',
      desc: 'We couldn\'t verify your documents due to clarity issues. Please re-upload them to move forward.',
      cta: 'Re-upload Now'
    }
  };

  const current = statusContent[status];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 pb-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <header className="flex items-center justify-between mb-10 max-w-lg mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-95"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div className="text-center">
          <h1 className="font-extrabold text-lg text-slate-900 tracking-tight">Application Status</h1>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[.15em]">Live Processing</p>
          </div>
        </div>
        <div className="w-11 h-11 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
          <ShieldCheck size={20} />
        </div>
      </header>

      <div className="max-w-md mx-auto relative z-10">
        {/* Modern Segmented Control */}
        <div className="flex p-1.5 bg-slate-100 rounded-[22px] mb-12 border border-slate-200/50 shadow-inner">
          {['approved', 'empty', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${status === s
                  ? 'bg-white text-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="flex flex-col items-center text-center"
          >
            {/* Status Visualizer */}
            <div className="relative mb-8">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-[-40px] rounded-full blur-[80px]"
                style={{ backgroundColor: current.color }}
              />

              <div
                className="w-40 h-40 rounded-[48px] flex items-center justify-center relative shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-[8px] border-white"
                style={{ backgroundColor: current.lightColor }}
              >
                <current.icon size={64} style={{ color: current.color }} strokeWidth={2.5} />

                {/* Floating Detail */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100"
                >
                  <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                </motion.div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">{current.title}</h2>
            <p className="text-slate-500 font-medium px-4 mb-10 leading-relaxed text-[15px]">
              {current.desc}
            </p>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mb-10">
              <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-center group transition-all duration-300 hover:shadow-md hover:border-blue-100">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <History size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Last Update</p>
                <p className="text-sm font-bold text-slate-800">2 mins ago</p>
              </div>

              <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-center group transition-all duration-300 hover:shadow-md hover:border-green-100">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-green-50 group-hover:text-green-500 transition-colors">
                  <ShieldCheck size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Security</p>
                <p className="text-sm font-bold text-slate-800">Level 3 Core</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0B3C6D] text-white py-5 rounded-3xl font-black text-lg shadow-[0_15px_35px_rgba(11,60,109,0.25)] flex items-center justify-center gap-3 transition-all active:bg-[#082d52]"
              onClick={() => {
                if (status === 'approved') navigate('/status/approved');
                else if (status === 'rejected') navigate('/kyc');
                else navigate('/dashboard');
              }}
            >
              {current.cta}
              <div className="p-1.5 bg-white/10 rounded-xl">
                <ChevronRight size={18} />
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="px-5 py-2.5 bg-slate-100/80 rounded-2xl border border-slate-200/50 flex items-center gap-3">
            <Info size={16} className="text-blue-500" />
            <p className="text-[11px] font-semibold text-slate-500">Need help? <span className="text-blue-600 underline cursor-pointer">Contact Partner Support</span></p>
          </div>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.25em]">
            Verified RBI Regulated Entity
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
