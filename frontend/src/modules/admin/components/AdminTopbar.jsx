import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, Menu, User, Settings, LogOut, Shield } from 'lucide-react';

const pageTitles = {
    '/admin': 'Dashboard',
    '/admin/users': 'User Management',
    '/admin/loans': 'Loan Management',
    '/admin/transactions': 'Transactions',
    '/admin/emi': 'EMI Management',
    '/admin/credit': 'Credit Score',
    '/admin/reports': 'Reports',
    '/admin/notifications': 'Notifications',
    '/admin/settings': 'Settings',
};

const AdminTopbar = ({ onMenuToggle, notifCount = 3 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifs, setShowNotifs] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        const handle = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    const pageTitle = pageTitles[location.pathname] || 'Admin Panel';

    const notifications = [
        { id: 1, text: 'New loan application from Meera Patel', time: '2m ago', icon: '📋', unread: true },
        { id: 2, text: 'EMI overdue: Karan Singh – ₹9,050', time: '18m ago', icon: '⚠️', unread: true },
        { id: 3, text: 'KYC verified for Vikram Nair', time: '1h ago', icon: '✅', unread: true },
        { id: 4, text: 'Daily report generated successfully', time: '3h ago', icon: '📊', unread: false },
    ];

    return (
        <header className="admin-topbar" style={{ justifyContent: 'space-between' }}>
            {/* Left */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                    onClick={onMenuToggle}
                    style={{
                        width: 36, height: 36, borderRadius: 9,
                        background: 'var(--admin-bg)', border: '1px solid var(--admin-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--admin-text)', transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'white'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--admin-bg)'}
                >
                    <Menu size={17} />
                </button>

                <div>
                    <h1 style={{ fontSize: 17, fontWeight: 800, color: 'var(--admin-text)', letterSpacing: '-0.02em', margin: 0 }}>
                        {pageTitle}
                    </h1>
                    <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', fontWeight: 500, margin: 0 }}>
                        Creditu Admin Panel
                    </p>
                </div>
            </div>

            {/* Center: Search */}
            <div
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: searchFocused ? 'white' : 'var(--admin-bg)',
                    border: `1.5px solid ${searchFocused ? 'var(--admin-primary)' : 'var(--admin-border)'}`,
                    borderRadius: 10, padding: '8px 14px',
                    transition: 'all 0.2s', width: searchFocused ? 280 : 220,
                    boxShadow: searchFocused ? '0 0 0 3px rgba(10,44,90,0.07)' : 'none',
                    flex: '0 0 auto',
                }}
                className="hidden-mobile"
            >
                <Search size={15} style={{ color: searchFocused ? 'var(--admin-primary)' : 'var(--admin-text-muted)', flexShrink: 0, transition: 'color 0.2s' }} />
                <input
                    type="text"
                    placeholder="Search users, loans..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    style={{
                        border: 'none', outline: 'none', background: 'transparent',
                        fontSize: 13, color: 'var(--admin-text)', width: '100%',
                        fontFamily: 'inherit',
                    }}
                />
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Notifications */}
                <div ref={notifRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
                        style={{
                            width: 38, height: 38, borderRadius: 10, border: '1px solid var(--admin-border)',
                            background: showNotifs ? 'var(--admin-primary)' : 'var(--admin-bg)',
                            color: showNotifs ? 'white' : 'var(--admin-text)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', position: 'relative', transition: 'all 0.18s',
                        }}
                    >
                        <Bell size={17} />
                        {notifCount > 0 && (
                            <span style={{
                                position: 'absolute', top: 7, right: 7,
                                width: 8, height: 8, borderRadius: '50%',
                                background: '#ef4444', border: '2px solid white',
                            }} />
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifs && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                                transition={{ duration: 0.18 }}
                                style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                                    width: 340, background: 'white',
                                    borderRadius: 18, border: '1px solid var(--admin-border)',
                                    boxShadow: 'var(--admin-shadow-lg)', zIndex: 500, overflow: 'hidden',
                                }}
                            >
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--admin-text)' }}>Notifications</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--admin-green)', cursor: 'pointer' }}>Mark all read</span>
                                </div>
                                {notifications.map(n => (
                                    <div key={n.id} style={{
                                        display: 'flex', gap: 12, padding: '14px 20px',
                                        background: n.unread ? 'rgba(10,44,90,0.025)' : 'white',
                                        borderBottom: '1px solid rgba(10,44,90,0.04)',
                                        cursor: 'pointer', transition: 'background 0.15s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,44,90,0.04)'}
                                        onMouseLeave={e => e.currentTarget.style.background = n.unread ? 'rgba(10,44,90,0.025)' : 'white'}
                                    >
                                        <span style={{ fontSize: 18 }}>{n.icon}</span>
                                        <div>
                                            <p style={{ margin: 0, fontSize: 12, fontWeight: n.unread ? 700 : 500, color: 'var(--admin-text)', lineHeight: 1.4 }}>{n.text}</p>
                                            <p style={{ margin: '3px 0 0', fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600 }}>{n.time}</p>
                                        </div>
                                        {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--admin-green)', marginTop: 4, flexShrink: 0 }} />}
                                    </div>
                                ))}
                                <div style={{ padding: '12px 20px', textAlign: 'center' }}>
                                    <button onClick={() => { navigate('/admin/notifications'); setShowNotifs(false); }}
                                        style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        View All Notifications
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile */}
                <div ref={profileRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: 'var(--admin-bg)', border: '1px solid var(--admin-border)',
                            borderRadius: 12, padding: '6px 12px 6px 6px',
                            cursor: 'pointer', transition: 'all 0.18s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'white'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--admin-bg)'}
                    >
                        <div style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: 11, fontWeight: 800,
                        }}>
                            SA
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }} className="hidden-mobile">Admin</span>
                        <ChevronDown size={13} style={{ color: 'var(--admin-text-muted)', transform: showProfile ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                                transition={{ duration: 0.18 }}
                                style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                                    width: 220, background: 'white',
                                    borderRadius: 16, border: '1px solid var(--admin-border)',
                                    boxShadow: 'var(--admin-shadow-lg)', zIndex: 500, overflow: 'hidden',
                                }}
                            >
                                <div style={{ padding: '16px', borderBottom: '1px solid var(--admin-border)' }}>
                                    <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--admin-text)' }}>Super Admin</div>
                                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 2 }}>admin@creditu.in</div>
                                </div>
                                {[
                                    { icon: User, label: 'My Profile', path: '/admin/settings' },
                                    { icon: Shield, label: 'Security', path: '/admin/settings' },
                                    { icon: Settings, label: 'Settings', path: '/admin/settings' },
                                ].map(item => (
                                    <button key={item.label}
                                        onClick={() => { navigate(item.path); setShowProfile(false); }}
                                        style={{
                                            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer',
                                            fontSize: 13, fontWeight: 600, color: 'var(--admin-text)', transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--admin-bg)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                    >
                                        <item.icon size={15} style={{ color: 'var(--admin-text-muted)' }} />
                                        {item.label}
                                    </button>
                                ))}
                                <div style={{ borderTop: '1px solid var(--admin-border)', padding: '8px' }}>
                                    <button
                                        onClick={() => navigate('/')}
                                        style={{
                                            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '10px 12px', borderRadius: 10, background: '#fee2e2',
                                            border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#dc2626',
                                            transition: 'all 0.18s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
