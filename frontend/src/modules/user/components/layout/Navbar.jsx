import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Settings,
    LogOut,
    ChevronRight,
    LayoutDashboard,
    ShieldCheck,
    MessageSquare,
    ChevronDown,
    Crown
} from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [notifPulse, setNotifPulse] = useState(true);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {/* ── Animated gradient keyframes injected once */}
            <style>{`
                @keyframes navGradientShift {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .nav-gradient-border::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 1.5px;
                    background: linear-gradient(90deg, #FFCCFF, #FFFF99, #FFCCFF, #FFFF99);
                    background-size: 300% 100%;
                    animation: navGradientShift 3s ease infinite;
                    opacity: 0.85;
                }
                .notif-glow:hover {
                    box-shadow: 0 0 20px rgba(255, 204, 255, 0.55);
                }
                .avatar-glow:hover {
                    box-shadow: 0 0 22px rgba(255, 204, 255, 0.50);
                }
                @keyframes bellWiggle {
                    0%,100%{ transform: rotate(0deg); }
                    20%    { transform: rotate(-18deg); }
                    40%    { transform: rotate(18deg); }
                    60%    { transform: rotate(-10deg); }
                    80%    { transform: rotate(10deg); }
                }
                .bell-animate { animation: bellWiggle 0.6s ease; }
            `}</style>

            <motion.nav
                animate={{ y: isVisible ? 0 : -90 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className={`nav-gradient-border fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'shadow-[0_8px_32px_rgba(11,60,109,0.09)]'
                    : ''
                    }`}
                style={{
                    background: scrolled
                        ? 'linear-gradient(135deg, rgba(232,240,251,0.92) 0%, rgba(237,232,248,0.90) 50%, rgba(245,239,254,0.88) 100%)'
                        : 'linear-gradient(135deg, rgba(232,240,251,0.72) 0%, rgba(245,239,254,0.60) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    position: 'fixed',
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        padding: '0 20px',
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* ── LEFT: Logo */}
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <img
                                src="/images/image.png"
                                alt="Creditu"
                                style={{
                                    height: 32,
                                    width: 'auto',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 2px 8px rgba(11,60,109,0.18))',
                                }}
                            />
                        </motion.div>
                    </Link>

                    {/* ── RIGHT: Bell + Avatar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

                        {/* Bell */}
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setNotifPulse(false)}
                            className="notif-glow"
                            style={{
                                position: 'relative',
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '1.5px solid rgba(255,204,255,0.45)',
                                background: 'rgba(255,255,255,0.85)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.3s, box-shadow 0.3s',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <Bell size={18} color="#0B3C6D" strokeWidth={2.2} />
                            {notifPulse && (
                                <span style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    width: 7,
                                    height: 7,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg,#FFCCFF,#f472b6)',
                                    border: '1.5px solid white',
                                    boxShadow: '0 0 6px rgba(255,100,200,0.7)',
                                }} />
                            )}
                        </motion.button>

                        {/* Avatar + Profile Dropdown */}
                        <div ref={menuRef} style={{ position: 'relative' }}>
                            <motion.button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="avatar-glow"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255,204,255,0.55)',
                                    background: 'white',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'box-shadow 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman"
                                    alt="User"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {/* Crown badge */}
                                <div style={{
                                    position: 'absolute', bottom: -2, right: -2,
                                    width: 16, height: 16, background: 'white',
                                    borderRadius: 5, border: '1px solid #f0e0ff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                                }}>
                                    <Crown size={9} color="#F4B400" fill="#F4B400" />
                                </div>
                            </motion.button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 'calc(100% + 12px)',
                                            width: 280,
                                            background: 'rgba(255,255,255,0.97)',
                                            borderRadius: 28,
                                            boxShadow: '0 24px 60px rgba(11,60,109,0.14)',
                                            border: '1px solid rgba(255,204,255,0.3)',
                                            overflow: 'hidden',
                                            zIndex: 200,
                                            backdropFilter: 'blur(20px)',
                                        }}
                                    >
                                        {/* Header */}
                                        <div style={{
                                            padding: '24px 20px 16px',
                                            textAlign: 'center',
                                            borderBottom: '1px solid rgba(0,0,0,0.04)',
                                            background: 'linear-gradient(160deg,rgba(255,204,255,0.1) 0%,rgba(255,255,153,0.06) 100%)',
                                        }}>
                                            <div style={{
                                                width: 60, height: 60,
                                                borderRadius: 20,
                                                border: '2.5px solid rgba(255,204,255,0.45)',
                                                overflow: 'hidden',
                                                margin: '0 auto 10px',
                                                boxShadow: '0 8px 20px rgba(255,100,200,0.18)',
                                            }}>
                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman" alt="Aman" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0B3C6D', margin: '0 0 4px', letterSpacing: '-0.01em' }}>Aman Srivastava</h4>
                                            <p style={{ fontSize: 10, fontWeight: 700, color: '#1FAF5A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Elite Account</p>
                                        </div>

                                        {/* Menu Items */}
                                        <div style={{ padding: '10px 12px' }}>
                                            {[
                                                { icon: LayoutDashboard, label: 'Dashboard', sub: 'Control Center', color: '#3b82f6', bg: '#eff6ff' },
                                                { icon: ShieldCheck, label: 'KYC Status', sub: 'Verified', color: '#1FAF5A', bg: '#ebf9f1' },
                                                { icon: Settings, label: 'Settings', sub: 'Preferences', color: '#6b7280', bg: '#f9fafb' },
                                            ].map((item, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)', x: 2 }}
                                                    style={{
                                                        width: '100%', display: 'flex', alignItems: 'center',
                                                        justifyContent: 'space-between', padding: '10px 10px',
                                                        borderRadius: 16, border: 'none', background: 'transparent',
                                                        cursor: 'pointer', marginBottom: 2,
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div style={{
                                                            width: 36, height: 36, background: item.bg, borderRadius: 12,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        }}>
                                                            <item.icon size={16} color={item.color} strokeWidth={2.2} />
                                                        </div>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0B3C6D', lineHeight: 1 }}>{item.label}</div>
                                                            <div style={{ fontSize: 10, fontWeight: 600, color: '#aab0be', marginTop: 2 }}>{item.sub}</div>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={13} color="#d1d5db" />
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Logout */}
                                        <div style={{ padding: '8px 12px 14px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => navigate('/')}
                                                style={{
                                                    width: '100%', padding: '11px 0',
                                                    borderRadius: 14, border: 'none',
                                                    background: '#fef2f2', color: '#ef4444',
                                                    fontWeight: 800, fontSize: 11,
                                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                                    cursor: 'pointer', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    gap: 8, transition: 'background 0.2s',
                                                }}
                                                onMouseOver={e => e.currentTarget.style.background = '#ef4444'}
                                                onMouseOut={e => e.currentTarget.style.background = '#fef2f2'}
                                            >
                                                <LogOut size={14} strokeWidth={2.5} />
                                                Secure Logout
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
