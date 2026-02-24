import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Zap, TrendingUp, Users, BadgeCheck, Lock } from 'lucide-react';

/* Floating stat card */
const FloatingCard = ({ icon: Icon, label, value, color, style, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        style={style}
        className="absolute bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100"
    >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18` }}>
            <Icon size={17} style={{ color }} />
        </div>
        <div>
            <div className="text-[13px] font-black text-[#0A2C5A] leading-none">{value}</div>
            <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{label}</div>
        </div>
    </motion.div>
);

const Splash = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-between">

            {/* ── Gold top blob ── */}
            <div className="absolute top-0 left-0 right-0 h-[58%] bg-[#F4A100] overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/15" />
                <div className="absolute top-10 -left-16 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute bottom-0 right-8 w-28 h-28 rounded-full bg-[#0A2C5A]/10" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-white/08 blur-2xl" />
            </div>

            {/* ── White bottom curve ── sits above the gold, clipping it ── */}
            <div
                className="absolute w-full"
                style={{
                    top: 'calc(58% - 48px)',
                    height: 96,
                    background: 'white',
                    borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                    zIndex: 10,
                }}
            />
            <div
                className="absolute bottom-0 left-0 right-0"
                style={{ top: 'calc(58% + 0px)', background: 'white', zIndex: 9 }}
            />

            {/* ── Logo & badge ── */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-20 pt-14 flex flex-col items-center"
            >
                {/* === LOGO: no bg, pure animation === */}
                <div className="relative flex items-center justify-center mb-6">

                    {/* Bloom glow – soft pulsing light behind logo */}
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.18, 0.38, 0.18] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            width: 130, height: 60,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.55)',
                            filter: 'blur(20px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Spinning ring — conic gradient halo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            width: 120, height: 54,
                            borderRadius: 32,
                            background: 'conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.7) 80%, transparent 100%)',
                            filter: 'blur(3px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Inner subtle ring pulse */}
                    <motion.div
                        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        style={{
                            position: 'absolute',
                            width: 108, height: 46,
                            borderRadius: 28,
                            border: '1.5px solid rgba(255,255,255,0.6)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Logo — no background, just drop-shadow for visibility */}
                    <motion.img
                        src="/images/image.png"
                        alt="Creditu"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
                        className="h-9 w-auto object-contain relative z-10"
                        style={{
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 2px 6px rgba(10,44,90,0.25))',
                        }}
                    />
                </div>

                {/* 'Powered by Speed' badge */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30"
                >
                    <Zap size={13} className="text-white fill-white" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Powered by Speed</span>
                </motion.div>
            </motion.div>

            {/* ── Central illustration (on gold bg) ── */}
            <div className="relative z-20 flex items-center justify-center" style={{ marginTop: -16 }}>
                <motion.div
                    animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                >
                    {/* Main card */}
                    <div
                        className="w-56 h-56 bg-white/20 backdrop-blur-xl rounded-[36px] border border-white/30 shadow-2xl flex items-center justify-center"
                    >
                        <div className="w-36 h-36 bg-white/25 rounded-full flex items-center justify-center">
                            <ShieldCheck size={72} className="text-white drop-shadow-xl" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Lock badge */}
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute -top-3 -right-3 bg-[#00A651] p-2.5 rounded-[14px] shadow-lg border-4 border-white"
                    >
                        <Lock size={15} className="text-white" />
                    </motion.div>

                    {/* Floating → TrendingUp */}
                    <motion.div
                        animate={{ x: [-8, 8, -8] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="absolute -top-5 -left-7 bg-white rounded-2xl shadow-lg p-3 border border-gray-100"
                    >
                        <TrendingUp size={22} className="text-[#F4A100]" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating stat cards (white section) */}
            <div className="relative z-20 w-full max-w-sm" style={{ height: 90 }}>
                <FloatingCard icon={Users} value="2.4M+" label="Active Users"
                    color="#0A2C5A" delay={0.4}
                    style={{ left: 12, top: 8 }} />
                <FloatingCard icon={BadgeCheck} value="RBI Listed" label="Safe & Trusted"
                    color="#00A651" delay={0.55}
                    style={{ right: 12, top: 8 }} />
            </div>

            {/* ── Bottom copy + CTA ── */}
            <div className="relative z-20 w-full max-w-sm text-center px-8 pb-10">
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[38px] font-black text-[#0A2C5A] leading-[1.1] mb-3"
                >
                    Easy Loans.<br />
                    <span className="text-[#F4A100]">Smarter Finance</span>
                </motion.h1>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed text-sm px-2">
                    Unlock your financial potential with hassle-free loan solutions tailored for your dreams.
                </p>

                {/* Gold CTA button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/auth')}
                    className="w-full py-[17px] rounded-[22px] font-black text-[17px] flex items-center justify-center gap-2 shadow-xl group overflow-hidden relative"
                    style={{
                        background: '#0A2C5A',
                        color: 'white',
                        boxShadow: '0 10px 32px rgba(10,44,90,0.22)',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: '#0d3870' }}
                    />
                    <span className="relative z-10">Get Started</span>
                    <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Trust footer */}
                <div className="flex items-center justify-center gap-2 mt-5">
                    <ShieldCheck size={12} className="text-[#00A651]" />
                    <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.22em]">
                        Trusted by 2.4M+ Active Users
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Splash;
