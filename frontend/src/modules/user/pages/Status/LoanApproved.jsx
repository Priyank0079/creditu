import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PartyPopper, ArrowRight, Share2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';
import Button from '../../components/common/Button.jsx';

const LoanApproved = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-trust/10 rounded-full flex items-center justify-center text-trust mb-8 relative"
        >
          <CheckCircle2 size={48} strokeWidth={2.5} />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-trust/20 rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-black text-primary mb-4 flex items-center justify-center gap-3">
            Congratulations! <PartyPopper className="text-gold" />
          </h1>
          <p className="text-textSecondary font-medium text-lg mb-8 leading-relaxed">
            Your loan application for <span className="text-primary font-bold">₹5,00,000</span> has been approved with a dedicated rate of <span className="text-trust font-bold text-xl">9.3%</span>.
          </p>
        </motion.div>

        {/* Loan Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-white border border-border rounded-[32px] p-8 shadow-premium mb-10 text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

          <h3 className="text-xs font-bold text-textSecondary uppercase tracking-[0.2em] mb-6">Loan Summary</h3>

          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-black text-trust flex items-center gap-1.5">
                <span className="w-2 h-2 bg-trust rounded-full animate-pulse" /> Approved
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-1">Reference ID</p>
              <p className="text-sm font-black text-primary">#CRD-948275</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-1">Monthly EMI</p>
              <p className="text-sm font-black text-primary">₹14,250</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-1">Tenure</p>
              <p className="text-sm font-black text-primary">36 Months</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-dashed border-border flex items-center justify-between">
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:text-gold transition-colors">
              <Download size={16} /> Download Letter
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:text-gold transition-colors">
              <Share2 size={16} /> Share Receipt
            </button>
          </div>
        </motion.div>

        <div className="w-full space-y-4">
          <Button
            className="w-full py-5 rounded-2xl"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard <ArrowRight size={18} className="ml-1" />
          </Button>
          <p className="text-[10px] text-textSecondary font-bold uppercase tracking-widest">
            Funds will be credited within 24 hours
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoanApproved;
