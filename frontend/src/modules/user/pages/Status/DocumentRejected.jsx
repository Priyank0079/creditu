import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle, FileX2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';
import Button from '../../components/common/Button.jsx';

const DocumentRejected = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8"
        >
          <FileX2 size={48} strokeWidth={2} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-black text-primary mb-3">Verification Failed</h1>
          <p className="text-textSecondary font-medium mb-8 leading-relaxed">
            We couldn't verify your <span className="text-primary font-bold">PAN Card</span> due to a blurred image or missing details.
          </p>
        </motion.div>

        <div className="w-full bg-white border border-border rounded-[32px] p-8 shadow-card mb-10 text-left">
          <h3 className="text-xs font-bold text-textSecondary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-500" /> Improvement Tips
          </h3>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">1</span>
              </div>
              <p className="text-sm text-textSecondary font-medium">Capture the document in <span className="text-primary font-bold">good lighting</span> conditions.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">2</span>
              </div>
              <p className="text-sm text-textSecondary font-medium">Ensure all <span className="text-primary font-bold">4 corners</span> of the card are visible in the frame.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">3</span>
              </div>
              <p className="text-sm text-textSecondary font-medium">Avoid using <span className="text-primary font-bold">camera flash</span> as it may cause reflections.</p>
            </li>
          </ul>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="py-5 rounded-2xl order-2 md:order-1"
            onClick={() => navigate('/dashboard')}
          >
            Maybe Later
          </Button>
          <Button
            className="py-5 rounded-2xl order-1 md:order-2 flex items-center gap-2"
            onClick={() => navigate('/kyc')}
          >
            <RefreshCw size={18} /> Re-upload Now
          </Button>
        </div>

        <button className="mt-8 flex items-center gap-2 text-xs font-bold text-textSecondary hover:text-primary transition-colors">
          <HelpCircle size={16} /> Contact Support if this is a mistake
        </button>
      </div>
    </MainLayout>
  );
};

export default DocumentRejected;
