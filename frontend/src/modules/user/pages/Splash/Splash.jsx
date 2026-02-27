import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
        <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18` }}
        >
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
    const rootRef = useRef(null);
    const targetLogoRef = useRef(null);
    const flyingLogoControls = useAnimation();
    const pulseControls = useAnimation();

    const [introPlaying, setIntroPlaying] = useState(false);
    const [showFlyingLogo, setShowFlyingLogo] = useState(false);
    const [showStaticCircleLogo, setShowStaticCircleLogo] = useState(false);
    const [path, setPath] = useState({
        startX: -150,
        startY: 860,
        arcX: 120,
        arcY: 320,
        preX: 160,
        preY: 230,
        endX: 180,
        endY: 340,
        finalScale: 0.3,
    });

    useLayoutEffect(() => {
        let rafId = 0;

        const measure = () => {
            if (!rootRef.current || !targetLogoRef.current) return;
            const rootRect = rootRef.current.getBoundingClientRect();
            const targetRect = targetLogoRef.current.getBoundingClientRect();
            const endX = targetRect.left + targetRect.width / 2 - rootRect.left;
            const endY = targetRect.top + targetRect.height / 2 - rootRect.top;

            setPath({
                startX: -150,
                startY: rootRect.height + 150,
                arcX: Math.max(92, endX * 0.36),
                arcY: Math.max(140, endY - 130),
                preX: Math.max(120, endX * 0.8),
                preY: Math.max(115, endY - 24),
                endX,
                endY,
                finalScale: 0.3,
            });
        };

        const schedule = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(measure);
        };

        schedule();
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    useEffect(() => {
        let alive = true;
        const timer = window.setTimeout(async () => {
            if (!alive) return;
            setIntroPlaying(true);
            setShowFlyingLogo(true);

            await flyingLogoControls.start({
                x: [path.startX, path.arcX, path.preX, path.endX],
                y: [path.startY, path.arcY, path.preY, path.endY],
                scale: [1, 0.82, 0.42, path.finalScale],
                rotate: [-20, 5, 1, 0],
                opacity: [0, 1, 1, 1],
                filter: ['blur(8px)', 'blur(2px)', 'blur(0px)', 'blur(0px)'],
                boxShadow: [
                    '0 30px 56px rgba(10,44,90,0.25)',
                    '0 22px 42px rgba(10,44,90,0.2)',
                    '0 14px 28px rgba(10,44,90,0.17)',
                    '0 9px 18px rgba(10,44,90,0.15)',
                ],
                transition: {
                    duration: 1.5,
                    times: [0, 0.48, 0.84, 1],
                    ease: [0.22, 1, 0.36, 1],
                },
            });

            await flyingLogoControls.start({
                scale: [path.finalScale, path.finalScale * 0.95, path.finalScale],
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            });

            await pulseControls.start({
                opacity: [0, 0.72, 0],
                scale: [0.9, 1.12, 1],
                transition: { duration: 0.5, ease: 'easeOut' },
            });

            if (!alive) return;
            setShowStaticCircleLogo(true);
            await flyingLogoControls.start({ opacity: 0, transition: { duration: 0.15 } });
            setShowFlyingLogo(false);
            setIntroPlaying(false);
        }, 300);

        return () => {
            alive = false;
            window.clearTimeout(timer);
        };
    }, [flyingLogoControls, pulseControls, path]);

    return (
        <div ref={rootRef} className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-between">
            {/* Gold top blob */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[58%] overflow-hidden"
                style={{
                    background: 'linear-gradient(165deg, #F4A100 0%, #f6b739 52%, #e99b00 100%)',
                    backgroundSize: '150% 150%',
                }}
                animate={{
                    backgroundPosition: introPlaying ? ['0% 22%', '100% 76%'] : '40% 35%',
                }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/15"
                    animate={introPlaying ? { x: [-6, 9], y: [0, -10] } : { x: 0, y: 0 }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                    className="absolute top-10 -left-16 w-40 h-40 rounded-full bg-white/10"
                    animate={introPlaying ? { x: [0, 10], y: [0, -8] } : { x: 0, y: 0 }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                    className="absolute bottom-0 right-8 w-28 h-28 rounded-full bg-[#0A2C5A]/10"
                    animate={introPlaying ? { x: [0, -8], y: [0, -6] } : { x: 0, y: 0 }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-white/08 blur-2xl" />
            </motion.div>

            {/* White bottom curve sits above the gold */}
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
            <div className="absolute bottom-0 left-0 right-0" style={{ top: 'calc(58% + 0px)', background: 'white', zIndex: 9 }} />

            {/* Logo & badge */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-20 pt-14 flex flex-col items-center"
            >
                <div className="relative flex items-center justify-center mb-6">
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.18, 0.38, 0.18] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            width: 130,
                            height: 60,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.55)',
                            filter: 'blur(20px)',
                            pointerEvents: 'none',
                        }}
                    />

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            width: 120,
                            height: 54,
                            borderRadius: 32,
                            background: 'conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.7) 80%, transparent 100%)',
                            filter: 'blur(3px)',
                            pointerEvents: 'none',
                        }}
                    />

                    <motion.div
                        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        style={{
                            position: 'absolute',
                            width: 108,
                            height: 46,
                            borderRadius: 28,
                            border: '1.5px solid rgba(255,255,255,0.6)',
                            pointerEvents: 'none',
                        }}
                    />

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

            {/* Central illustration */}
            <div className="relative z-20 flex items-center justify-center" style={{ marginTop: -16 }}>
                <motion.div
                    animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                >
                    <div className="w-56 h-56 bg-white/20 backdrop-blur-xl rounded-[36px] border border-white/30 shadow-2xl flex items-center justify-center">
                        <div ref={targetLogoRef} className="w-36 h-36 rounded-full relative overflow-hidden flex items-center justify-center">
                            <motion.div
                                animate={{ y: ['-55%', '55%', '-55%'] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(10,44,90,0.10) 45%, rgba(0,166,81,0.14) 100%)',
                                }}
                            />
                            <div className="absolute inset-0 bg-white/20" />
                            <motion.div
                                className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={pulseControls}
                            />
                            <img
                                src="/images/image.png"
                                alt="Creditu"
                                className="w-24 h-24 object-contain drop-shadow-xl relative z-10"
                                style={{
                                    opacity: showStaticCircleLogo ? 1 : 0,
                                    transition: 'opacity 150ms ease-out',
                                }}
                            />
                        </div>
                    </div>

                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute -top-3 -right-3 bg-[#00A651] p-2.5 rounded-[14px] shadow-lg border-4 border-white"
                    >
                        <Lock size={15} className="text-white" />
                    </motion.div>

                    <motion.div
                        animate={{ x: [-8, 8, -8] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="absolute -top-5 -left-7 bg-white rounded-2xl shadow-lg p-3 border border-gray-100"
                    >
                        <TrendingUp size={22} className="text-[#F4A100]" />
                    </motion.div>
                </motion.div>
            </div>

            {showFlyingLogo && (
                <motion.div
                    initial={{
                        x: path.startX,
                        y: path.startY,
                        scale: 1,
                        rotate: -20,
                        opacity: 0,
                        filter: 'blur(8px)',
                    }}
                    animate={flyingLogoControls}
                    className="absolute z-30 pointer-events-none"
                    style={{
                        width: 240,
                        height: 240,
                        top: 0,
                        left: 0,
                        marginLeft: -120,
                        marginTop: -120,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, filter, opacity',
                    }}
                >
                    <img
                        src="/images/image.png"
                        alt="CreditU flying logo"
                        className="w-full h-full object-contain"
                        style={{
                            filter: 'drop-shadow(0 10px 22px rgba(10,44,90,0.28))',
                            transform: 'translateZ(16px)',
                        }}
                    />
                </motion.div>
            )}

            {/* Floating stat cards */}
            <div className="relative z-20 w-full max-w-sm" style={{ height: 90 }}>
                <FloatingCard icon={Users} value="2.4M+" label="Active Users" color="#0A2C5A" delay={0.4} style={{ left: 12, top: 8 }} />
                <FloatingCard icon={BadgeCheck} value="RBI Listed" label="Safe & Trusted" color="#00A651" delay={0.55} style={{ right: 12, top: 8 }} />
            </div>

            {/* Bottom copy + CTA */}
            <div className="relative z-20 w-full max-w-sm text-center px-8 pb-10">
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[38px] font-black text-[#0A2C5A] leading-[1.1] mb-3"
                >
                    Easy Loans.
                    <br />
                    <span className="text-[#F4A100]">Smarter Finance</span>
                </motion.h1>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed text-sm px-2">
                    Unlock your financial potential with hassle-free loan solutions tailored for your dreams.
                </p>

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
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: '#0d3870' }} />
                    <span className="relative z-10">Get Started</span>
                    <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="flex items-center justify-center gap-2 mt-5">
                    <ShieldCheck size={12} className="text-[#00A651]" />
                    <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.22em]">Trusted by 2.4M+ Active Users</p>
                </div>
            </div>
        </div>
    );
};

export default Splash;
