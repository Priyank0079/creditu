import React, { useEffect, useState, useRef } from 'react';
import { Check, ShieldCheck, Lock, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import gsap from 'gsap';

const ProgressCard = ({ percentage = 35 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ringRef = useRef(null);
  const particleContainerRef = useRef(null);

  useEffect(() => {
    // Counter animation
    const controls = animate(0, percentage, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1], // custom ease
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    });

    // Ring glow pulsing with GSAP
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        filter: 'drop-shadow(0 0 12px rgba(244, 180, 0, 0.6))',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Particle logic
    const createParticle = () => {
      if (!particleContainerRef.current) return;
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-gold rounded-full opacity-0 pointer-events-none';
      particleContainerRef.current.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const radius = 88; // center to ring
      const startX = 88 + Math.cos(angle) * (radius - 10);
      const startY = 88 + Math.sin(angle) * (radius - 10);

      gsap.set(particle, { x: startX, y: startY });

      gsap.to(particle, {
        opacity: 0.6,
        x: startX + (Math.random() - 0.5) * 40,
        y: startY + (Math.random() - 0.5) * 40,
        scale: 0,
        duration: 2 + Math.random(),
        ease: "power1.out",
        onComplete: () => particle.remove()
      });
    };

    const interval = setInterval(createParticle, 300);

    return () => {
      controls.stop();
      clearInterval(interval);
    };
  }, [percentage]);

  const steps = [
    { id: 1, label: 'Check Eligibility', description: 'Basic document verification', completed: true },
    { id: 2, label: 'KYC Verification', description: 'Awaiting document upload', completed: false, current: true },
    { id: 3, label: 'Profile Completion', description: 'Final profile details', completed: false, locked: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100/50 relative overflow-hidden group"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none transition-transform group-hover:scale-125 duration-1000" />
      <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-start mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gold rounded-full" />
            <h3 className="text-2xl font-bold text-primary tracking-tight">Loan Progress</h3>
          </div>
          <p className="text-[11px] text-textSecondary font-semibold mt-1 uppercase tracking-[0.2em] ml-3.5 opacity-60">REF: #CRU-7429</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-[#F0FAF4] text-trust px-4 py-2 rounded-2xl border border-trust/10 shadow-sm"
        >
          <ShieldCheck size={16} strokeWidth={2.5} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider">Verified Secure</span>
        </motion.div>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-16 xl:gap-24">
        {/* AMAZING CIRCULAR PROGRESS */}
        <div className="relative isolate">
          {/* Outer Glow Ring */}
          <div className="absolute inset-[-15px] border border-gray-50 rounded-full opacity-50" />
          <div className="absolute inset-[-30px] border border-gray-50/50 rounded-full opacity-30" />

          <div className="relative w-44 h-44 flex items-center justify-center" ref={particleContainerRef}>
            <svg className="w-full h-full -rotate-90 drop-shadow-2xl">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBC04" />
                  <stop offset="100%" stopColor="#F4B400" />
                </linearGradient>
                <filter id="neonWrap">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Path with depth */}
              <circle
                cx="88"
                cy="88"
                r="78"
                className="stroke-gray-100/80 fill-none"
                strokeWidth="12"
              />

              {/* Progress Path */}
              <motion.circle
                ref={ringRef}
                cx="88"
                cy="88"
                r="78"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(244, 180, 0, 0.4))' }}
              />

              {/* Glowing Head Point */}
              <motion.circle
                cx="88"
                cy="88"
                r="78"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, strokeDasharray: "0 1000", opacity: 0 }}
                animate={{
                  pathLength: percentage / 100,
                  strokeDasharray: "1 1000",
                  opacity: 1
                }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center">
              <div className="relative">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black text-primary tracking-tighter block"
                >
                  {displayValue}<span className="text-2xl text-gold">%</span>
                </motion.span>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-primary p-1.5 rounded-lg shadow-lg"
                >
                  <Zap size={12} className="text-gold fill-gold" />
                </motion.div>
              </div>
              <span className="text-[10px] font-black text-textSecondary uppercase tracking-[0.3em] mt-1 opacity-40">Complete</span>
            </div>
          </div>
        </div>

        {/* REFINED STEPS LIST */}
        <div className="flex-1 w-full space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 100 }}
              className={`flex items-start gap-6 relative group/step ${index !== steps.length - 1 ? "pb-2" : ""}`}
            >
              {/* Vertical Connector with gradient */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[19px] top-12 bottom-[-8px] w-0.5 bg-gradient-to-b from-gray-100 to-transparent" />
              )}

              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 transform group-hover/step:scale-110 ${step.completed ? 'bg-trust text-white shadow-xl shadow-trust/20 rotate-[-8deg]' :
                step.current ? 'bg-primary text-white ring-8 ring-primary/5 shadow-xl shadow-primary/20 scale-105' :
                  'bg-gray-50 text-gray-300 border border-gray-100'
                }`}>
                {step.completed ? <Check size={20} strokeWidth={3} /> :
                  step.locked ? <Lock size={16} /> :
                    <span className="text-base font-black">{step.id}</span>}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className={`text-lg font-bold tracking-tight ${step.locked ? 'text-gray-300' : 'text-primary'}`}>
                    {step.label}
                  </h4>
                  {step.current && (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gold text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest shadow-lg shadow-gold/20"
                    >
                      Active
                    </motion.span>
                  )}
                </div>
                <p className={`text-xs ${step.locked ? 'text-gray-200' : 'text-textSecondary/60'} font-semibold tracking-wide`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER TRACKER */}
      <div className="mt-14 pt-10 border-t border-gray-50 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-trust/20 rounded-full blur-md animate-ping" />
              <div className="w-3 h-3 bg-trust rounded-full relative z-10 border-2 border-white" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest opacity-50 leading-none">Status</p>
              <p className="text-sm font-bold text-primary tracking-tight">System Under Review</p>
            </div>
          </div>

          <div className="bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100 flex items-center gap-4 group/btn cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            <div className="relative z-10 flex flex-col items-end">
              <p className="text-[9px] font-black text-textSecondary uppercase tracking-widest opacity-40">Progress</p>
              <p className="text-xs font-bold text-primary">Step 2 <span className="text-gray-300 mx-1">/</span> 5</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-primary group-hover:translate-x-1 transition-transform relative z-10">
              <ChevronRight size={16} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* MULTI-INDICATOR PROGRESS BAR */}
        <div className="space-y-3">
          <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden p-[3px] border border-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 2.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-primary via-[#0a4d8c] to-primary-light rounded-full shadow-[0_2px_10px_rgba(11,60,109,0.2)]"
            />
          </div>

          <div className="flex justify-between gap-1.5 px-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-700 ${i <= percentage / 20 + 1 ? 'bg-primary scale-x-100 shadow-lg shadow-primary/10' : 'bg-gray-100/50 scale-x-[0.9] opacity-50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;