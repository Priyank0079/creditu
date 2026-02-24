import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Database, BarChart3, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';
import Button from '../../components/common/Button.jsx';

const CheckEligibility = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const checkSteps = [
    { icon: Search, label: 'Scanning local databases...', duration: 2000 },
    { icon: Database, label: 'Retrieving credit history...', duration: 2500 },
    { icon: ShieldCheck, label: 'Verifying identity markers...', duration: 2000 },
    { icon: BarChart3, label: 'Calculating risk profile...', duration: 1500 },
  ];

  useEffect(() => {
    let currentTimer;
    if (step < checkSteps.length) {
      currentTimer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, checkSteps[step].duration);
    } else {
      setIsComplete(true);
    }
    return () => clearTimeout(currentTimer);
  }, [step]);

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 flex flex-col items-center">
        {!isComplete ? (
          <div className="w-full text-center">
            <div className="relative mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 mx-auto border-4 border-primary/5 border-t-gold rounded-full flex items-center justify-center"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-primary/5 p-8 rounded-full"
                >
                  <ShieldCheck size={60} className="text-primary" strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>

            <h1 className="text-3xl font-black text-primary mb-3">Checking Eligibility</h1>
            <p className="text-textSecondary font-medium mb-12">Please wait while we analyze your financial health.</p>

            <div className="space-y-4 w-full">
              {checkSteps.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: idx <= step ? 1 : 0.3,
                    x: 0,
                    scale: idx === step ? 1.05 : 1
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${idx === step ? 'bg-white border-gold shadow-md' :
                    idx < step ? 'bg-primary/5 border-transparent' : 'bg-transparent border-border'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${idx <= step ? 'text-primary' : 'text-textSecondary'
                    }`}>
                    {idx < step ? <CheckCircle2 size={20} className="text-trust" /> :
                      idx === step ? <Loader2 size={20} className="animate-spin text-gold" /> :
                        <s.icon size={20} />}
                  </div>
                  <span className={`text-sm font-bold ${idx === step ? 'text-primary' : 'text-textSecondary'}`}>
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full"
          >
            <div className="w-24 h-24 bg-trust/10 rounded-full flex items-center justify-center text-trust mx-auto mb-8">
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black text-primary mb-4">You're Eligible!</h2>
            <p className="text-textSecondary font-medium text-lg mb-10 leading-relaxed">
              Great news! Based on our analysis, you qualify for a loan up to <span className="text-primary font-bold">₹10,00,000</span>.
            </p>

            <div className="bg-gold/5 border border-gold/20 rounded-[32px] p-8 mb-10 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <BarChart3 className="text-gold/20" size={60} />
              </div>
              <p className="text-[10px] font-bold text-gold-dark uppercase tracking-widest mb-1">Estimated Credit Power</p>
              <p className="text-4xl font-black text-primary mb-4">High</p>
              <p className="text-sm text-textSecondary font-medium">Your financial profile shows strong stability and repayment capacity.</p>
            </div>

            <Button
              className="w-full py-5 rounded-2xl"
              onClick={() => navigate('/kyc')}
            >
              Proceed to KYC <ArrowRight size={18} className="ml-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default CheckEligibility;
