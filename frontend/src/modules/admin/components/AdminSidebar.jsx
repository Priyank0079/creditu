import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, FileText, ArrowLeftRight, Calendar,
    CreditCard, BarChart2, Bell, Settings, LogOut, ChevronLeft,
    ChevronRight, Menu, Shield
} from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: FileText, label: 'Loans', path: '/admin/loans' },
    { icon: ArrowLeftRight, label: 'Transactions', path: '/admin/transactions' },
    { icon: Calendar, label: 'EMI Management', path: '/admin/emi' },
    { icon: CreditCard, label: 'Credit Score', path: '/admin/credit' },
    { icon: BarChart2, label: 'Reports', path: '/admin/reports' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const AdminSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (setMobileOpen) setMobileOpen(false);
        navigate('/');
    };

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] md:hidden"
                        style={{ background: 'rgba(10,44,90,0.45)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
                style={{ overflow: 'hidden' }}
                animate={{ width: collapsed ? 72 : 260 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Logo Section */}
                <div
                    style={{
                        padding: collapsed ? '22px 16px' : '22px 20px',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: collapsed ? 'center' : 'space-between',
                        minHeight: 72,
                    }}
                >
                    <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', overflow: 'hidden' }}>
                        {/* Logo Icon */}
                        <div style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            background: 'linear-gradient(135deg, #00A651 0%, #F4A100 50%, #0A2C5A 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            fontSize: 18,
                            fontWeight: 900,
                            color: 'white',
                            fontFamily: 'Inter, sans-serif',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        }}>
                            ₹
                        </div>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                                >
                                    <div style={{ color: 'white', fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                        Creditu
                                    </div>
                                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                        Admin Panel
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>

                    {!collapsed && (
                        <button
                            onClick={() => setCollapsed(true)}
                            style={{
                                width: 28, height: 28, borderRadius: 8,
                                background: 'rgba(255,255,255,0.08)',
                                border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'rgba(255,255,255,0.5)',
                                transition: 'background 0.18s',
                                flexShrink: 0,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        >
                            <ChevronLeft size={14} />
                        </button>
                    )}
                </div>

                {/* Admin Info */}
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                        >
                            <div style={{
                                width: 38, height: 38, borderRadius: 10,
                                background: 'linear-gradient(135deg, rgba(0,166,81,0.2), rgba(244,161,0,0.2))',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#00A651', fontWeight: 800, fontSize: 14,
                                flexShrink: 0,
                            }}>
                                SA
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>Super Admin</div>
                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600 }}>admin@creditu.in</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', overflowX: 'hidden' }} className="admin-scrollbar">
                    {!collapsed && (
                        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', padding: '6px 6px 10px', textTransform: 'uppercase' }}>
                            Main Menu
                        </div>
                    )}
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <div key={item.path} className="admin-tooltip">
                                <Link
                                    to={item.path}
                                    className={`sidebar-nav-item ${active ? 'active' : ''}`}
                                    style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '12px' : '12px 14px' }}
                                    onClick={() => setMobileOpen && setMobileOpen(false)}
                                >
                                    <item.icon size={19} className="nav-icon" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                                {collapsed && <span className="tooltip-text">{item.label}</span>}
                            </div>
                        );
                    })}
                </nav>

                {/* Collapse toggle (when collapsed) + Logout */}
                <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {collapsed && (
                        <div className="admin-tooltip" style={{ marginBottom: 6 }}>
                            <button
                                onClick={() => setCollapsed(false)}
                                className="sidebar-nav-item"
                                style={{ width: '100%', justifyContent: 'center', padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}
                            >
                                <ChevronRight size={18} />
                            </button>
                            <span className="tooltip-text">Expand</span>
                        </div>
                    )}
                    <div className="admin-tooltip">
                        <button
                            onClick={handleLogout}
                            className="sidebar-nav-item"
                            style={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '12px' : '12px 14px', color: 'rgba(239,68,68,0.7)', gap: collapsed ? 0 : 14 }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ef4444'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(239,68,68,0.7)'; }}
                        >
                            <LogOut size={19} />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        Logout
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                        {collapsed && <span className="tooltip-text">Logout</span>}
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;
