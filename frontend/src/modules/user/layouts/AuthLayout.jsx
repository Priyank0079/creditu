import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">

      {/* ── Mobile top gold band (< md) ── */}
      <div className="md:hidden relative bg-[#F4A100] px-6 pt-14 pb-20 overflow-hidden flex-shrink-0">
        {/* Decorative circles like reference */}
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/20" />
        <div className="absolute -bottom-8 -left-6 w-24 h-24 rounded-full bg-white/15" />

        {/* Logo — transparent, no bg */}
        {/* Mobile gold header band logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
          <Link to="/">
            <motion.div
              className="relative overflow-hidden inline-flex"
              style={{
                background: 'white', borderRadius: 12,
                padding: '7px 16px',
                boxShadow: '0 6px 24px rgba(255,255,255,0.45)',
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              {/* === Logo: no bg, animated glow only === */}
              <div className="relative flex items-center justify-center">
                {/* Bloom */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', width: 120, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', filter: 'blur(18px)', pointerEvents: 'none' }}
                />
                {/* Spinning conic ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', width: 112, height: 48, borderRadius: 28, background: 'conic-gradient(from 0deg, transparent 55%, rgba(255,255,255,0.65) 78%, transparent 100%)', filter: 'blur(3px)', pointerEvents: 'none' }}
                />
                {/* Pulsing border ring */}
                <motion.div
                  animate={{ scale: [0.94, 1.1, 0.94], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', width: 100, height: 40, borderRadius: 24, border: '1.5px solid rgba(255,255,255,0.55)', pointerEvents: 'none' }}
                />
                <motion.img
                  src="/images/image.png" alt="Creditu"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                  className="h-8 object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.85)) drop-shadow(0 2px 5px rgba(10,44,90,0.2))' }}
                />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-2xl font-black text-white leading-tight">
          Smart Loans.<br />
          <span className="text-[#0A2C5A]">Instant Decisions.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-white/80 text-sm font-medium mt-2">
          Trusted by 2.4M+ users across India
        </motion.p>
      </div>

      {/* ── Desktop layout ── */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* Left panel — visible md+ */}
        <div className="hidden md:flex md:w-[420px] lg:w-[480px] bg-[#F4A100] relative flex-col justify-between p-12 overflow-hidden flex-shrink-0">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/15 -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#0A2C5A]/15 -ml-20 -mb-20" />
          <div className="absolute bottom-1/3 right-6 w-20 h-20 rounded-full bg-white/10" />

          {/* Logo — no bg, animated glow */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/">
              <div className="relative flex items-center justify-center" style={{ padding: '4px 0' }}>
                {/* Bloom */}
                <motion.div
                  animate={{ scale: [1, 1.45, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', width: 140, height: 58, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', filter: 'blur(22px)', pointerEvents: 'none' }}
                />
                {/* Spinning conic ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', width: 130, height: 54, borderRadius: 32, background: 'conic-gradient(from 0deg, transparent 55%, rgba(255,255,255,0.68) 78%, transparent 100%)', filter: 'blur(3px)', pointerEvents: 'none' }}
                />
                {/* Pulsing border ring */}
                <motion.div
                  animate={{ scale: [0.94, 1.1, 0.94], opacity: [0.3, 0.65, 0.3] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', width: 118, height: 46, borderRadius: 28, border: '1.5px solid rgba(255,255,255,0.55)', pointerEvents: 'none' }}
                />
                <motion.img
                  src="/images/image.png" alt="Creditu"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.12 }}
                  className="h-9 w-auto object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.85)) drop-shadow(0 2px 6px rgba(10,44,90,0.22))' }}
                />
              </div>
            </Link>
          </motion.div>


          {/* Headline block */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="relative z-10">
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Smart Loans.<br />
              <span className="text-[#0A2C5A]">Instant Decisions.</span>
            </h2>
            <p className="text-white/80 text-base font-medium leading-relaxed mb-10">
              Check eligibility in 60 seconds. No paperwork, no branch visit.
            </p>

            {/* Stats pill cards */}
            {[
              { icon: Users, label: '2.4M+ Users', sub: 'Active borrowers' },
              { icon: TrendingUp, label: '₹1,200 Cr+', sub: 'Loans disbursed' },
              { icon: BadgeCheck, label: 'RBI Registered', sub: 'Safe & regulated' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
                className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 mb-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F4A100]/15 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-[#0A2C5A]" />
                </div>
                <div>
                  <div className="font-black text-[#0A2C5A] text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500 font-medium">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <div className="relative z-10 flex items-center gap-2">
            <ShieldCheck size={14} className="text-white/60" />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">256-bit SSL • RBI Compliant</span>
          </div>
        </div>

        {/* Right panel — form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-14 bg-white relative">
          {/* Subtle top-right accent */}
          <div className="hidden md:block absolute top-0 right-0 w-40 h-40 rounded-bl-[80px] bg-[#F4A100]/10 pointer-events-none" />
          <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 rounded-tr-[60px] bg-[#0A2C5A]/04 pointer-events-none" />

          {/* Form card (lifted, white, clean) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-md"
          >
            {/* Mobile: pull card up over gold band */}
            <div className="md:hidden -mt-14 bg-white rounded-[28px] shadow-xl px-6 pt-8 pb-6 mb-4">
              {children}
            </div>
            <div className="hidden md:block">
              {children}
            </div>
          </motion.div>

          {/* Security footer mobile */}
          <p className="md:hidden text-center text-textSecondary text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-4">
            <ShieldCheck size={11} className="text-[#00A651]" /> 256-bit SSL Secured
          </p>

          {/* Security footer desktop */}
          <p className="hidden md:flex text-center text-textSecondary text-[10px] font-bold uppercase tracking-[0.2em] items-center justify-center gap-2 mt-10">
            <ShieldCheck size={11} className="text-[#00A651]" /> 256-bit SSL Secured
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
