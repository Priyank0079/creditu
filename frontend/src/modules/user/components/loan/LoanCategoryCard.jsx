import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, Clock, Zap, Lock } from 'lucide-react';

/* ─────────────────────────────────────────────
   Per-status design tokens
───────────────────────────────────────────── */
const STATUS_CONFIG = {
  Completed: {
    cardBg: 'linear-gradient(145deg, #ffffff 0%, #f0faf4 100%)',
    border: 'rgba(0,166,81,0.18)',
    hoverBorder: 'rgba(0,166,81,0.45)',
    hoverShadow: '0 16px 48px rgba(0,166,81,0.14)',
    iconBg: 'linear-gradient(135deg, #00A651 0%, #00c96e 100%)',
    iconShadow: '0 6px 20px rgba(0,166,81,0.35)',
    badgeBg: 'rgba(0,166,81,0.1)',
    badgeColor: '#00A651',
    accentBar: 'linear-gradient(180deg, #00A651, #00c96e)',
    glow: 'rgba(0,166,81,0.22)',
    label: 'Completed',
    badgeIcon: CheckCircle2,
  },
  Action: {
    cardBg: 'linear-gradient(145deg, #fffdf5 0%, #fff8e6 100%)',
    border: 'rgba(244,161,0,0.22)',
    hoverBorder: 'rgba(244,161,0,0.5)',
    hoverShadow: '0 16px 48px rgba(244,161,0,0.16)',
    iconBg: 'linear-gradient(135deg, #F4A100 0%, #FFD166 100%)',
    iconShadow: '0 6px 20px rgba(244,161,0,0.38)',
    badgeBg: 'rgba(244,161,0,0.12)',
    badgeColor: '#c98000',
    accentBar: 'linear-gradient(180deg, #F4A100, #FFD166)',
    glow: 'rgba(244,161,0,0.24)',
    label: 'Action',
    badgeIcon: Zap,
  },
  Pending: {
    cardBg: 'linear-gradient(145deg, #ffffff 0%, #f5f9ff 100%)',
    border: 'rgba(10,44,90,0.1)',
    hoverBorder: 'rgba(10,44,90,0.28)',
    hoverShadow: '0 16px 48px rgba(10,44,90,0.1)',
    iconBg: 'linear-gradient(135deg, #0A2C5A 0%, #1a4d8a 100%)',
    iconShadow: '0 6px 20px rgba(10,44,90,0.25)',
    badgeBg: 'rgba(10,44,90,0.07)',
    badgeColor: '#0A2C5A',
    accentBar: 'linear-gradient(180deg, #0A2C5A, #1a4d8a)',
    glow: 'rgba(10,44,90,0.14)',
    label: 'Pending',
    badgeIcon: Clock,
  },
};

const DISABLED_CONFIG = {
  cardBg: 'linear-gradient(145deg, #fdf8ff 0%, #f3eeff 100%)',
  border: 'rgba(109,40,217,0.15)',
  hoverBorder: 'rgba(109,40,217,0.3)',
  hoverShadow: '0 16px 48px rgba(109,40,217,0.12)',
  iconBg: 'linear-gradient(135deg, #7C3AED 0%, #a855f7 100%)',
  iconShadow: '0 6px 20px rgba(124,58,237,0.28)',
  badgeBg: 'rgba(109,40,217,0.1)',
  badgeColor: '#7C3AED',
  accentBar: 'linear-gradient(180deg, #7C3AED, #a855f7)',
  glow: 'rgba(124,58,237,0.18)',
  label: 'Soon',
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const CategoryCard = ({ icon: Icon, title, status, count, disabled = false }) => {
  const cfg = disabled
    ? DISABLED_CONFIG
    : STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  const BadgeIcon = !disabled && cfg.badgeIcon;

  return (
    <motion.div
      /* Entry */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      /* Hover */
      whileHover={!disabled ? {
        y: -6,
        boxShadow: cfg.hoverShadow,
        borderColor: cfg.hoverBorder,
        transition: { type: 'spring', stiffness: 260, damping: 22 },
      } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{
        background: cfg.cardBg,
        borderRadius: 20,
        border: `1.5px solid ${cfg.border}`,
        padding: '20px 18px',
        cursor: disabled ? 'default' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 20px ${cfg.glow}`,
        opacity: 1,
      }}
    >
      {/* ── Gold/Green/Navy accent bar (left edge) */}
      <div style={{
        position: 'absolute', top: 16, left: 0,
        width: 3, height: 32, borderRadius: '0 4px 4px 0',
        background: disabled ? cfg.accentBar : cfg.accentBar,
        opacity: disabled ? 0.4 : 1,
      }} />

      {/* ── Hover shimmer sweep */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Soft corner glow */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
        filter: 'blur(16px)', pointerEvents: 'none',
      }} />

      {/* ── ICON BADGE */}
      <div style={{ marginBottom: 14, position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ position: 'relative' }}>
          {/* Pulse ring — only for Action status */}
          {!disabled && status === 'Action' && (
            <motion.div
              animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: 'absolute', inset: -6, borderRadius: 18,
                border: '2px solid rgba(244,161,0,0.35)',
                pointerEvents: 'none',
              }}
            />
          )}
          <motion.div
            whileHover={!disabled ? { rotate: [0, -8, 8, 0], transition: { duration: 0.4 } } : {}}
            style={{
              width: 46, height: 46, borderRadius: 14,
              background: disabled ? cfg.iconBg : cfg.iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: cfg.iconShadow,
              position: 'relative', zIndex: 1,
            }}
          >
            <Icon size={20} color="white" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Status badge — top right */}
        {status && !disabled && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: cfg.badgeBg,
            borderRadius: 100, padding: '4px 9px',
          }}>
            {BadgeIcon && <BadgeIcon size={10} color={cfg.badgeColor} strokeWidth={2.5} />}
            <span style={{
              fontSize: 9, fontWeight: 800, color: cfg.badgeColor,
              textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>{cfg.label}</span>
          </div>
        )}

        {disabled && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: cfg.badgeBg, borderRadius: 100, padding: '4px 9px',
          }}>
            <Lock size={9} color={cfg.badgeColor} />
            <span style={{ fontSize: 9, fontWeight: 800, color: cfg.badgeColor, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Soon</span>
          </div>
        )}
      </div>

      {/* ── TITLE + SUBTITLE */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h4 style={{
          fontSize: 13, fontWeight: 750, margin: '0 0 4px 0',
          color: disabled ? '#5B21B6' : '#0A2C5A',
          letterSpacing: '-0.01em', lineHeight: 1.25,
          fontFamily: "'Inter', 'Poppins', sans-serif",
        }}>{title}</h4>

        {count && (
          <p style={{ fontSize: 11, fontWeight: 500, color: '#7B8DB0', margin: 0 }}>
            {count} available
          </p>
        )}
        {!count && !disabled && (
          <p style={{ fontSize: 11, fontWeight: 500, color: '#7B8DB0', margin: 0 }}>
            {status === 'Completed' ? 'View details' : status === 'Action' ? 'Action required' : 'Not started'}
          </p>
        )}
        {disabled && (
          <p style={{ fontSize: 11, fontWeight: 500, color: '#9D6FD9', margin: 0 }}>Coming soon</p>
        )}
      </div>

      {/* ── Arrow CTA (bottom right) */}
      {!disabled && (
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            position: 'absolute', bottom: 14, right: 14,
            width: 26, height: 26, borderRadius: '50%',
            background: disabled ? 'transparent' : cfg.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: cfg.iconShadow,
            zIndex: 1,
          }}
        >
          <ChevronRight size={13} color="white" strokeWidth={2.5} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryCard;