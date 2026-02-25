import React, { useEffect, useState, useRef } from 'react';
import { Check, ShieldCheck, Lock, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import gsap from 'gsap';

/* ─────────────────────────────────────────────
   ALL LOGIC UNCHANGED — only UI redesigned
───────────────────────────────────────────── */
const ProgressCard = ({ percentage = 35 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ringRef = useRef(null);   // kept (GSAP target)
  const particleContainerRef = useRef(null); // kept
  const barRef = useRef(null);
  const shineRef = useRef(null);
  const cardRef = useRef(null);

  /* ── ALL ORIGINAL LOGIC PRESERVED ── */
  useEffect(() => {
    const controls = animate(0, percentage, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    });

    // Ring glow — kept unchanged
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        filter: 'drop-shadow(0 0 12px rgba(244, 180, 0, 0.6))',
        duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }

    // Particle logic — kept unchanged
    const createParticle = () => {
      if (!particleContainerRef.current) return;
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-gold rounded-full opacity-0 pointer-events-none';
      particleContainerRef.current.appendChild(particle);
      const angle = Math.random() * Math.PI * 2;
      const radius = 88;
      const startX = 88 + Math.cos(angle) * (radius - 10);
      const startY = 88 + Math.sin(angle) * (radius - 10);
      gsap.set(particle, { x: startX, y: startY });
      gsap.to(particle, {
        opacity: 0.6,
        x: startX + (Math.random() - 0.5) * 40,
        y: startY + (Math.random() - 0.5) * 40,
        scale: 0,
        duration: 2 + Math.random(),
        ease: 'power1.out',
        onComplete: () => particle.remove(),
      });
    };
    const interval = setInterval(createParticle, 300);

    /* NEW: GSAP horizontal bar fill + shine */
    if (barRef.current) {
      gsap.fromTo(barRef.current,
        { width: '0%' },
        { width: `${percentage}%`, duration: 2.6, ease: 'power3.out', delay: 0.3 }
      );
    }
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        x: '280%',
        duration: 1.8,
        delay: 1,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 2.2,
      });
    }

    /* NEW: subtle floating for main card */
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }

    return () => {
      controls.stop();
      clearInterval(interval);
    };
  }, [percentage]);

  /* Steps data — UNCHANGED */
  const steps = [
    { id: 1, label: 'Check Eligibility', description: 'Basic document verification', completed: true },
    { id: 2, label: 'KYC Verification', description: 'Awaiting document upload', completed: false, current: true },
    { id: 3, label: 'Profile Completion', description: 'Final profile details', completed: false, locked: true },
  ];

  /* Step marker fill (1-5 dots) */
  const filledDots = Math.round((percentage / 100) * 5);

  /* ── UI ── */
  return (
    <div className="relative" ref={cardRef}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-8%',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10,44,90,0.12) 0%, transparent 70%)',
        filter: 'blur(48px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-8%', left: '-6%',
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,161,0,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ══ MAIN GLASS CARD ══ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 1,
          background: 'var(--card-bg)',
          borderRadius: 24,
          padding: '32px',
          boxShadow: '0 8px 48px rgba(0,0,0,0.1)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(4px)',
          overflow: 'hidden',
        }}
      >
        {/* Soft inner decorative accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 180, height: 180,
          background: 'radial-gradient(circle at 80% 20%, rgba(244,161,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ══ TOP HEADER ══ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              {/* Gold accent bar */}
              <div style={{
                width: 4, height: 28, borderRadius: 4,
                background: 'linear-gradient(180deg, #F4A100 0%, #FFD166 100%)',
                boxShadow: '0 0 10px rgba(244,161,0,0.35)',
                flexShrink: 0,
              }} />
              <h3 style={{
                fontSize: 22, fontWeight: 800, color: 'var(--text-primary)',
                letterSpacing: '-0.03em', fontFamily: "'Inter', 'Poppins', sans-serif",
                margin: 0,
              }}>Loan Progress</h3>
            </div>
            <p style={{
              fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)',
              letterSpacing: '0.16em', textTransform: 'uppercase', marginLeft: 14,
            }}>REF: #CRU-7429</p>
          </div>

          {/* Right — Verified Secure badge */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            animate={{ boxShadow: ['0 0 0 0 rgba(0,166,81,0.3)', '0 0 0 6px rgba(0,166,81,0)', '0 0 0 0 rgba(0,166,81,0.3)'] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(135deg, #00A651 0%, #00c874 100%)',
              color: 'white', borderRadius: 100,
              padding: '7px 14px',
              boxShadow: '0 4px 14px rgba(0,166,81,0.25)',
              cursor: 'default',
            }}
          >
            <ShieldCheck size={13} strokeWidth={2.5} />
            <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Verified Secure
            </span>
          </motion.div>
        </div>

        {/* ══ PROGRESS PERCENTAGE CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #0A2C5A 0%, #0d3870 55%, #0f4a8a 100%)',
            borderRadius: 20, padding: '24px 28px',
            marginBottom: 24,
            boxShadow: '0 8px 32px rgba(10,44,90,0.22)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Card inner glow */}
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,161,0,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-30%', left: '5%',
            width: 130, height: 130, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,166,81,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Percentage */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 180 }}
              style={{ fontSize: 56, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              {displayValue}
            </motion.span>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#F4A100', marginBottom: 10 }}>%</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
              Complete
            </span>
            {/* Zap icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                marginLeft: 'auto', background: 'rgba(244,161,0,0.2)',
                borderRadius: 10, padding: 8, marginBottom: 4,
              }}
            >
              <Zap size={14} className="text-gold fill-gold" style={{ color: '#F4A100', fill: '#F4A100' }} />
            </motion.div>
          </div>

          {/* ── PREMIUM HORIZONTAL PROGRESS BAR ── */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Track */}
            <div style={{
              height: 14, borderRadius: 100,
              background: 'rgba(255,255,255,0.1)',
              position: 'relative', overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)',
            }}>
              {/* Fill — animated via GSAP */}
              <div
                ref={barRef}
                style={{
                  height: '100%', width: '0%', borderRadius: 100,
                  background: 'linear-gradient(90deg, #0d3870 0%, #F4A100 60%, #FFD166 100%)',
                  boxShadow: '0 0 14px rgba(244,161,0,0.5)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* GSAP shine sweep */}
                <div
                  ref={shineRef}
                  style={{
                    position: 'absolute', top: 0, left: '-80%',
                    width: '60%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />
              </div>

              {/* Step marker dots on track */}
              {[20, 40, 60, 80].map((pos) => (
                <div key={pos} style={{
                  position: 'absolute', top: '50%', left: `${pos}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 4, height: 4, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                  zIndex: 2,
                }} />
              ))}
            </div>

            {/* Step dots below bar */}
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0.7, opacity: 0.3 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{
                    flex: 1, height: 4, borderRadius: 100,
                    background: i <= filledDots
                      ? 'linear-gradient(90deg, #00A651, #00c874)'
                      : 'rgba(255,255,255,0.12)',
                    boxShadow: i <= filledDots ? '0 0 6px rgba(0,166,81,0.4)' : 'none',
                    transition: 'all 0.7s',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══ STEP CARDS ══ */}
        {/* Hidden particle container — kept to preserve original logic */}
        <div ref={particleContainerRef} style={{ display: 'none' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {steps.map((step, index) => {
            const isCompleted = step.completed;
            const isActive = step.current;
            const isLocked = step.locked;

            /* Per-step styles */
            const cardBg = isCompleted ? 'rgba(0,166,81,0.07)'
              : isActive ? 'rgba(244,161,0,0.06)'
                : 'var(--card-bg)';
            const borderCol = isCompleted ? 'rgba(0,166,81,0.18)'
              : isActive ? 'rgba(244,161,0,0.22)'
                : 'var(--border-color)';
            const iconBg = isCompleted ? 'linear-gradient(135deg, #00A651, #00c874)'
              : isActive ? 'linear-gradient(135deg, #0A2C5A, #0d3870)'
                : 'var(--border-color)';
            const iconColor = isLocked ? '#B0C0D8' : 'white';
            const iconShadow = isCompleted ? '0 4px 14px rgba(0,166,81,0.3)'
              : isActive ? '0 4px 14px rgba(10,44,90,0.3)'
                : 'none';

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.12, type: 'spring', stiffness: 120 }}
                whileHover={{
                  y: -2, boxShadow: isCompleted
                    ? '0 8px 28px rgba(0,166,81,0.14), 0 0 0 1.5px rgba(0,166,81,0.28)'
                    : isActive
                      ? '0 8px 28px rgba(10,44,90,0.12), 0 0 0 1.5px rgba(244,161,0,0.28)'
                      : '0 4px 16px rgba(10,44,90,0.06)'
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', borderRadius: 16,
                  background: cardBg,
                  border: `1px solid ${borderCol}`,
                  cursor: 'default', transition: 'box-shadow 0.25s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Active card shimmer bg */}
                {isActive && (
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'linear-gradient(105deg, transparent 35%, rgba(244,161,0,0.06) 50%, transparent 65%)',
                    }}
                  />
                )}

                {/* Icon badge */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {/* Active pulse ring */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      style={{
                        position: 'absolute', inset: -6, borderRadius: '50%',
                        border: '2px solid rgba(10,44,90,0.25)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  <div style={{
                    width: 42, height: 42, borderRadius: 14,
                    background: isLocked ? '#EEF4FF' : iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: iconShadow,
                    color: iconColor,
                  }}>
                    {isCompleted ? <Check size={19} strokeWidth={3} color="white" />
                      : isLocked ? <Lock size={16} color="#B0C0D8" />
                        : <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>{step.id}</span>}
                  </div>
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                    <h4 style={{
                      fontSize: 14, fontWeight: 700, margin: 0,
                      color: isLocked ? '#B0C0D8' : 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}>{step.label}</h4>
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        style={{
                          fontSize: 9, fontWeight: 800, color: '#0A2C5A',
                          textTransform: 'uppercase', letterSpacing: '0.13em',
                          background: 'linear-gradient(135deg, #F4A100, #FFD166)',
                          padding: '3px 10px', borderRadius: 100,
                          boxShadow: '0 2px 8px rgba(244,161,0,0.3)',
                          flexShrink: 0,
                        }}
                      >Active</motion.span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 12, fontWeight: 500, margin: 0,
                    color: isLocked ? '#C5D2E0' : 'var(--text-secondary)',
                    letterSpacing: '0.01em',
                  }}>{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ══ FOOTER ══ */}
        <div style={{ borderTop: '1px solid rgba(10,44,90,0.06)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>

            {/* Status pill card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(0,166,81,0.07)',
              border: '1px solid rgba(0,166,81,0.15)',
              borderRadius: 14, padding: '10px 16px',
            }}>
              <div style={{ position: 'relative' }}>
                <motion.div
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    background: 'rgba(0,166,81,0.25)', pointerEvents: 'none',
                  }}
                />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00A651', position: 'relative', zIndex: 1 }} />
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.16em', margin: 0 }}>Status</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>System Under Review</p>
              </div>
            </div>

            {/* Step counter card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#F5F9FF', border: '1px solid rgba(10,44,90,0.08)',
                borderRadius: 14, padding: '10px 16px', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div>
                <p style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.16em', margin: 0 }}>Progress</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Step 2 <span style={{ color: '#B0C0D8', margin: '0 4px' }}>/</span> 5
                </p>
              </div>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0A2C5A, #0d3870)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(10,44,90,0.25)',
                  flexShrink: 0,
                }}
              >
                <ChevronRight size={15} strokeWidth={3} color="white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressCard;