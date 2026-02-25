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

    // Mock User Data
    const user = {
        name: 'Aman Srivastava',
        role: 'Elite Account',
        creditScore: 742,
        kycStatus: 'Verified',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman'
    };

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

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Dashboard',
            sub: 'Main Control Center',
            color: '#3B82F6',
            bg: 'rgba(59, 130, 246, 0.12)',
            path: '/dashboard'
        },
        {
            icon: ShieldCheck,
            label: 'KYC Status',
            sub: 'Verification Details',
            color: '#10B981',
            bg: 'rgba(16, 185, 129, 0.12)',
            path: '/kyc'
        },
        {
            icon: Settings,
            label: 'Settings',
            sub: 'Profile Preferences',
            color: '#6366F1',
            bg: 'rgba(99, 102, 241, 0.12)',
            path: '/status'
        },
    ];

    return (
        <>
            {/* ── Premium Style Enhancements */}
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
                    opacity: 0.8;
                }
                .profile-dropdown-glass {
                    background: var(--card-bg) !important;
                    backdrop-filter: blur(24px) !important;
                    -webkit-backdrop-filter: blur(24px) !important;
                    border: 1px solid var(--border-color) !important;
                    box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.2) !important;
                    border-radius: 28px !important;
                }
                .menu-item-hover:hover {
                    background: linear-gradient(135deg, rgba(255, 204, 255, 0.12), rgba(255, 255, 153, 0.08)) !important;
                    transform: translateX(4px);
                }
                .notif-pulse-animation {
                    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 114, 182, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(244, 114, 182, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 114, 182, 0); }
                }
            `}</style>

            <motion.nav
                animate={{ y: isVisible ? 0 : -90 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className={`nav-gradient-border fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'shadow-[0_12px_40px_rgba(11,60,109,0.12)]'
                    : ''
                    }`}
                style={{
                    background: scrolled
                        ? 'var(--nav-scrolled)'
                        : 'var(--nav-bg)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid var(--border-color)'
                }}
            >
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* ── Logo Section */}
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/images/image.png" alt="Creditu" style={{ height: 36, width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(11,60,109,0.15))' }} />
                        </motion.div>
                    </Link>

                    {/* ── Actions Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setNotifPulse(false)}
                            style={{
                                position: 'relative', width: 44, height: 44, borderRadius: 16, border: '1px solid var(--border-color)',
                                background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', shadow: '0 4px 12px rgba(0,0,0,0.03)'
                            }}
                        >
                            <Bell size={20} color="#0B3C6D" strokeWidth={2.5} />
                            {notifPulse && (
                                <span className="notif-pulse-animation" style={{
                                    position: 'absolute', top: 12, right: 12, width: 8, height: 8,
                                    borderRadius: '50%', background: '#F472B6', border: '2px solid white'
                                }} />
                            )}
                        </motion.button>

                        {/* Profile Trigger */}
                        <div ref={menuRef} style={{ position: 'relative' }}>
                            <motion.button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    height: 44, padding: '0 6px 0 14px', borderRadius: 16, border: '1px solid var(--border-color)',
                                    background: 'var(--card-bg)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', shadow: '0 4px 12px rgba(0,0,0,0.03)'
                                }}
                            >
                                <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{user.name.split(' ')[0]}</p>
                                    <p style={{ fontSize: 9, fontWeight: 700, color: '#10B981', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{user.role.split(' ')[0]}</p>
                                </div>
                                <div style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <ChevronDown size={14} color="#0B3C6D" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s' }} />
                            </motion.button>

                            {/* Enhanced Dropdown */}
                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.92, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 15, scale: 0.92, filter: 'blur(10px)' }}
                                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                        className="profile-dropdown-glass"
                                        style={{
                                            position: 'absolute', right: 0, top: 'calc(100% + 12px)', width: 300,
                                            borderRadius: 24, overflow: 'hidden', zIndex: 200, padding: '8px'
                                        }}
                                    >
                                        {/* Dropdown Header */}
                                        <div style={{
                                            padding: '20px 16px', borderRadius: 20, marginBottom: 8,
                                            background: 'linear-gradient(135deg, rgba(255, 204, 255, 0.15) 0%, rgba(255, 255, 153, 0.1) 100%)',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                                        }}>
                                            <div style={{ position: 'relative', marginBottom: 12 }}>
                                                <div style={{
                                                    width: 68, height: 68, borderRadius: 22, overflow: 'hidden', border: '3px solid white',
                                                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                                                }}>
                                                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%' }} />
                                                </div>
                                                <div style={{
                                                    position: 'absolute', bottom: -6, right: -6, background: '#F4A100', width: 24, height: 24,
                                                    borderRadius: 8, border: '2.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                }}>
                                                    <Crown size={12} color="white" fill="white" />
                                                </div>
                                            </div>
                                            <h4 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 2px' }}>{user.name}</h4>
                                            <p style={{ fontSize: 11, fontWeight: 700, color: '#10B981', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{user.role}</p>

                                            {/* Score Badge */}
                                            <div style={{
                                                marginTop: 14, padding: '6px 12px', background: 'var(--card-bg)', borderRadius: 12,
                                                display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-color)'
                                            }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                                                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary)' }}>Credit Score: </span>
                                                <span style={{ fontSize: 12, fontWeight: 900, color: 'var(--text-primary)' }}>{user.creditScore}</span>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            {menuItems.map((item, id) => (
                                                <motion.button
                                                    key={id}
                                                    onClick={() => { navigate(item.path); setShowProfileMenu(false); }}
                                                    className="menu-item-hover"
                                                    style={{
                                                        width: '100%', padding: '12px 14px', borderRadius: 16, border: 'none', background: 'transparent',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <item.icon size={18} color={item.color} strokeWidth={2.5} />
                                                        </div>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{item.label}</p>
                                                            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', margin: '2px 0 0' }}>{item.sub}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={14} color="#CBD5E1" />
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Logout Button */}
                                        <div style={{ padding: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: 8 }}>
                                            <motion.button
                                                whileHover={{ scale: 1.02, backgroundColor: '#EF4444', color: '#FFFFFF' }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => navigate('/')}
                                                style={{
                                                    width: '100%', padding: '14px', borderRadius: 16, border: 'none', background: '#FEF2F2',
                                                    color: '#EF4444', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.3s'
                                                }}
                                            >
                                                <LogOut size={16} strokeWidth={3} />
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
