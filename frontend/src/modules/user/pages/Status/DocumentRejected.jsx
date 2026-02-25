import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle, FileX2, Info, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';
import Button from '../../components/common/Button.jsx';

const DocumentRejected = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F8FAFC]/50 flex flex-col items-center">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-xl w-full mx-auto px-6 py-12 relative z-10 flex flex-col items-center text-center">

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-28 h-28 bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center justify-center text-red-500 mb-10 border border-slate-100"
          >
            <FileX2 size={56} strokeWidth={2.5} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Verification Failed</h1>
            <p className="text-slate-500 font-semibold text-lg mb-10 leading-relaxed max-w-sm mx-auto">
              We couldn't verify your <span className="text-red-600 font-black">PAN Card</span> due to low image quality.
            </p>
          </motion.div>

          {/* Guide Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.04)] mb-10 text-left relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-50 rounded-xl text-red-500">
                <AlertCircle size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">How to fix this</h3>
            </div>

            <div className="space-y-6">
              {[
                { id: 1, text: "Capture the document in ", bold: "good lighting", icon: Zap, color: "text-amber-500" },
                { id: 2, text: "Ensure all ", bold: "4 corners", textSuffix: " are visible", icon: ChevronRight, color: "text-blue-500" },
                { id: 3, text: "Avoid using ", bold: "camera flash", textSuffix: " (no reflections)", icon: Info, color: "text-green-500" }
              ].map((tip) => (
                <div key={tip.id} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <tip.icon size={18} className={tip.color} />
                  </div>
                  <p className="text-sm text-slate-600 font-bold leading-tight">
                    {tip.text}<span className="text-slate-900">{tip.bold}</span>{tip.textSuffix}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="w-full flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0B3C6D] text-white py-6 rounded-3xl font-black text-lg shadow-[0_20px_40px_rgba(11,60,109,0.2)] flex items-center justify-center gap-3"
              onClick={() => navigate('/kyc')}
            >
              <RefreshCw size={20} /> Re-upload Document
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="w-full bg-slate-100 text-slate-600 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              Maybe Later
            </motion.button>
          </div>

          <button className="mt-10 flex items-center justify-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-widest">
            <HelpCircle size={16} /> Need help? Contact Support
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentRejected;
