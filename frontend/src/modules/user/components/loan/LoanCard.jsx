import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ArrowUpRight, Zap, Lock, Info } from 'lucide-react';
import gsap from 'gsap';

const LoanCard = ({ type, rate, amount, gradient = 'blue', comingSoon = false, isBlank = false, description, onApply }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const gradients = {
    blue: 'bg-gradient-to-br from-[#0B3C6D] via-[#082d52] to-[#041629]',
    gold: 'bg-gradient-to-br from-[#F4B400] via-[#c99500] to-[#8a6a00]',
    green: 'bg-gradient-to-br from-[#1FAF5A] via-[#168a47] to-[#0b4d27]',
    purple: 'bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]',
    red: 'bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#991b1b]',
    orange: 'bg-gradient-to-br from-[#f97316] via-[#ea580c] to-[#9a3412]',
    pink: 'bg-gradient-to-br from-[#ec4899] via-[#db2777] to-[#831843]',
    indigo: 'bg-gradient-to-br from-[#4f46e5] via-[#4338ca] to-[#312e81]',
    teal: 'bg-gradient-to-br from-[#0d9488] via-[#0891b2] to-[#155e75]',
    slate: 'bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617]',
    blank: 'bg-gradient-to-br from-gray-200/50 to-gray-300/30 border-2 border-dashed border-gray-400/20',
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card || comingSoon || isBlank) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const xPercent = (x / width - 0.5) * 20;
      const yPercent = (y / height - 0.5) * -20;

      gsap.to(card, {
        rotateY: xPercent,
        rotateX: yPercent,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 0.6,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [comingSoon, isBlank]);

  if (isBlank) {
    return (
      <div className="perspective-1000">
        <div className="relative w-[340px] h-[210px] rounded-[24px] p-6 text-white/40 shadow-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border-2 border-dashed border-black/5 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
            <CreditCard size={24} className="opacity-20" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-30">More Offers Coming</p>
        </div>
      </div>
    );
  }

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        className={`relative w-[340px] h-[210px] rounded-[24px] p-6 text-white shadow-2xl transition-all duration-300 preserve-3d overflow-hidden ${gradients[gradient]} ${comingSoon ? 'opacity-90 grayscale-[0.5]' : ''}`}
      >
        {/* Glow Effect */}
        <div
          ref={glowRef}
          className="absolute w-48 h-48 bg-white/20 rounded-full blur-[60px] pointer-events-none opacity-0 mix-blend-overlay"
        />

        {/* Card Decor */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="w-12 h-9 bg-gradient-to-br from-gold/40 to-white/10 rounded-md border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />
                <div className="grid grid-cols-3 grid-rows-3 h-full gap-[1px] opacity-30 p-1">
                  {[...Array(9)].map((_, i) => <div key={i} className="bg-white/40 rounded-[1px]" />)}
                </div>
              </div>
              <p className="text-[9px] font-semibold tracking-[1.5px] text-white/80 uppercase">CreditU Premier</p>
            </div>
            {comingSoon ? (
              <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                <Lock size={12} className="text-gold" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-gold">Coming Soon</span>
              </div>
            ) : (
              <div className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10">
                <Zap size={10} className="fill-gold text-gold" />
                <span className="text-white">Active</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight leading-tight">{type}</h3>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/50 font-bold mb-1">Max Limit</p>
                <p className="text-xl font-bold tracking-tight">₹{amount}</p>
              </div>
              <div className="w-[1px] h-8 bg-white/15" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/50 font-bold mb-1">Interest</p>
                <p className="text-xl font-bold tracking-tight">{rate}% <span className="text-[10px] font-medium opacity-60">p.a.</span></p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-medium text-white/70 leading-relaxed max-w-[200px] line-clamp-2">
              {description}
            </p>
            {!comingSoon && (
              <motion.button
                onClick={onApply}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-primary p-2.5 rounded-xl shadow-lg shadow-black/20"
              >
                <ArrowUpRight size={20} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Coming Soon Overlay Effect */}
        {comingSoon && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-none flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/10 p-2 rounded-full mb-2">
              <Info size={24} className="text-gold" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCard;