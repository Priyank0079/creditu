import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { emiData } from '../utils/dummyData';

const statusCfg = {
    Overdue: { badge: 'badge-danger', bg: 'rgba(239,68,68,0.05)', border: 'rgba(239,68,68,0.15)', icon: AlertTriangle, color: '#ef4444' },
    Upcoming: { badge: 'badge-info', bg: 'rgba(37,99,235,0.05)', border: 'rgba(37,99,235,0.12)', icon: Clock, color: '#2563eb' },
    Paid: { badge: 'badge-success', bg: 'rgba(0,166,81,0.05)', border: 'rgba(0,166,81,0.12)', icon: CheckCircle, color: '#00A651' },
};

const AdminEMI = () => {
    const [emis, setEmis] = useState(emiData);
    const [activeTab, setActiveTab] = useState('All');
    const [loading, setLoading] = useState({});
    const [notif, setNotif] = useState(null);

    const tabs = ['All', 'Overdue', 'Upcoming', 'Paid'];
    const filtered = activeTab === 'All' ? emis : emis.filter(e => e.status === activeTab);

    const showNotif = (msg) => {
        setNotif(msg);
        setTimeout(() => setNotif(null), 3000);
    };

    const handleMarkPaid = (id, user) => {
        setLoading(prev => ({ ...prev, [id]: 'paying' }));
        setTimeout(() => {
            setEmis(prev => prev.map(e => e.id === id ? { ...e, status: 'Paid', daysOverdue: 0 } : e));
            setLoading(prev => ({ ...prev, [id]: null }));
            showNotif(`Success: Payment marked for ${user}!`);
        }, 800);
    };

    const handleRemind = (id, user) => {
        setLoading(prev => ({ ...prev, [id]: 'reminding' }));
        setTimeout(() => {
            setLoading(prev => ({ ...prev, [id]: null }));
            showNotif(`Alert: EMI Reminder sent to ${user}!`);
        }, 800);
    };

    const counts = {
        Overdue: emis.filter(e => e.status === 'Overdue').length,
        Upcoming: emis.filter(e => e.status === 'Upcoming').length,
        Paid: emis.filter(e => e.status === 'Paid').length,
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Notification Toast */}
            <AnimatePresence>
                {notif && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        style={{
                            position: 'fixed', top: 30, left: '50%', zIndex: 1000,
                            padding: '12px 24px', borderRadius: 12, background: 'var(--admin-text)',
                            color: 'white', fontWeight: 700, fontSize: 13, boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                            display: 'flex', alignItems: 'center', gap: 10
                        }}
                    >
                        <CheckCircle size={16} style={{ color: 'var(--admin-green)' }} />
                        {notif}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">EMI Management</h1>
                <p className="admin-page-subtitle">Track overdue, upcoming, and paid EMIs across all borrowers</p>
            </div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
                {[
                    { label: 'Overdue EMIs', count: counts.Overdue, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', icon: AlertTriangle, sub: 'Needs immediate action' },
                    { label: 'Upcoming EMIs', count: counts.Upcoming, color: '#2563eb', bg: 'rgba(37,99,235,0.08)', icon: Clock, sub: 'Due in next 30 days' },
                    { label: 'Paid EMIs', count: counts.Paid, color: '#00A651', bg: 'rgba(0,166,81,0.08)', icon: CheckCircle, sub: 'This month' },
                ].map(card => (
                    <div key={card.label} className="admin-stat-card" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 15, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <card.icon size={23} style={{ color: card.color }} />
                        </div>
                        <div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.count}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)', marginTop: 4 }}>{card.label}</div>
                            <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 2 }}>{card.sub}</div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 5 }} className="no-scrollbar">
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 18px', borderRadius: 10, border: `1.5px solid ${activeTab === tab ? 'var(--admin-primary)' : 'var(--admin-border)'}`,
                            background: activeTab === tab ? 'var(--admin-primary)' : 'white',
                            color: activeTab === tab ? 'white' : 'var(--admin-text)',
                            fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s', whiteSpace: 'nowrap'
                        }}>
                        {tab}
                        {tab !== 'All' && counts[tab] !== undefined && (
                            <span style={{ marginLeft: 8, fontSize: 10, background: activeTab === tab ? 'rgba(255,255,255,0.2)' : 'var(--admin-bg)', padding: '2px 8px', borderRadius: 100, fontWeight: 900 }}>
                                {counts[tab]}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* EMI Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtered.map((emi, i) => {
                    const cfg = statusCfg[emi.status];
                    const StatusIcon = cfg.icon;
                    const isPaying = loading[emi.id] === 'paying';
                    const isReminding = loading[emi.id] === 'reminding';

                    return (
                        <motion.div key={emi.id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                            style={{
                                background: 'white', border: `1px solid ${activeTab === 'All' ? 'var(--admin-border)' : cfg.border}`,
                                borderRadius: 16, padding: '20px 24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                                ...(emi.status === 'Overdue' && { borderLeft: `4px solid ${cfg.color}` })
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: `${cfg.color}10`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <StatusIcon size={20} style={{ color: cfg.color }} />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                                        <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--admin-text)' }}>{emi.user}</span>
                                        <span className={`badge ${cfg.badge}`} style={{ fontSize: 10, padding: '2px 8px' }}>{emi.status}</span>
                                        {emi.daysOverdue > 0 && (
                                            <span style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', background: 'rgba(239,68,68,0.08)', padding: '2px 8px', borderRadius: 6 }}>
                                                {emi.daysOverdue}D OVERDUE
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600 }}>
                                        <span style={{ color: 'var(--admin-primary)' }}>{emi.id}</span>
                                        <span>•</span>
                                        <span>{emi.loanId}</span>
                                        <span>•</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Calendar size={12} /> Due: {emi.dueDate}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--admin-text)', letterSpacing: '-0.02em' }}>{emi.amount}</div>
                                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 700, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMI Amount</div>
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    {emi.status !== 'Paid' && (
                                        <>
                                            <button
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => handleRemind(emi.id, emi.user)}
                                                disabled={isReminding}
                                                style={{ gap: 6, fontWeight: 700, padding: '8px 14px' }}
                                            >
                                                {isReminding ? 'Sending...' : <><Bell size={13} /> Remind</>}
                                            </button>
                                            <button
                                                className="admin-btn admin-btn-success admin-btn-sm"
                                                onClick={() => handleMarkPaid(emi.id, emi.user)}
                                                disabled={isPaying}
                                                style={{ gap: 6, fontWeight: 700, padding: '8px 14px', minWidth: 115, justifyContent: 'center' }}
                                            >
                                                {isPaying ? 'Processing...' : <><CheckCircle size={13} /> Mark Paid</>}
                                            </button>
                                        </>
                                    )}
                                    {emi.status === 'Paid' && (
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '8px 16px', background: 'rgba(0,166,81,0.08)',
                                            borderRadius: 10, color: '#00A651', fontWeight: 800, fontSize: 12
                                        }}>
                                            <CheckCircle size={15} /> PAYMENT CLEARED
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {filtered.length === 0 && (
                    <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                        <div style={{ fontSize: 40, marginBottom: 15 }}>✨</div>
                        <h3 style={{ fontWeight: 800, color: 'var(--admin-text)' }}>Excellent job!</h3>
                        <p style={{ fontSize: 14 }}>No {activeTab.toLowerCase()} EMIs to display at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEMI;
