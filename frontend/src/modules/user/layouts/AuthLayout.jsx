import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col md:flex-row">
      {/* Left Side: Illustration & Branding (Visible on MD+) */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-trust/10 rounded-full -ml-48 -mb-48 blur-[100px]" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex justify-center"
          >
            <div className="bg-white/10 p-8 rounded-[40px] backdrop-blur-xl border border-white/10 shadow-2xl relative">
              <ShieldCheck size={120} className="text-gold" strokeWidth={1.5} />
              <div className="absolute -top-4 -right-4 bg-trust p-3 rounded-2xl shadow-xl border-4 border-primary">
                <Zap size={24} className="text-white fill-white" />
              </div>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-white mb-4 leading-tight"
          >
            Secure <span className="text-gold">Financial</span> Freedom
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg max-w-sm mx-auto font-medium"
          >
            Join 2M+ users who trust Creditu for their personal and business growth.
          </motion.p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Logo */}
        <div className="md:hidden mb-12">
          <Link to="/">
            <img src="/images/image.png" alt="Creditu" className="h-10 mix-blend-multiply" />
          </Link>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>

        {/* Footer Quote */}
        <div className="mt-12 text-center">
          <p className="text-textSecondary text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <ShieldCheck size={12} className="text-trust" /> 256-bit SSL Secured
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
