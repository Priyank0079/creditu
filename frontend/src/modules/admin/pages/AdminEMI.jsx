import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { emiData } from '../utils/dummyData';

const statusCfg = {
    Overdue: { badge: 'badge-danger', bg: 'rgba(239,68,68,0.05)', border: 'rgba(239,68,68,0.15)', icon: AlertTriangle, color: '#ef4444' },
    Upcoming: { badge: 'badge-info', bg: 'rgba(37,99,235,0.05)', border: 'rgba(37,99,235,0.12)', icon: Clock, color: '#2563eb' },
    Paid: { badge: 'badge-success', bg: 'rgba(0,166,81,0.05)', border: 'rgba(0,166,81,0.12)', icon: CheckCircle, color: '#00A651' },
};

const AdminEMI = () => {
    const [emis, setEmis] = useState(emiData);
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Overdue', 'Upcoming', 'Paid'];
    const filtered = activeTab === 'All' ? emis : emis.filter(e => e.status === activeTab);

    const handleMarkPaid = (id) => setEmis(prev => prev.map(e => e.id === id ? { ...e, status: 'Paid' } : e));

    const counts = {
        Overdue: emis.filter(e => e.status === 'Overdue').length,
        Upcoming: emis.filter(e => e.status === 'Upcoming').length,
        Paid: emis.filter(e => e.status === 'Paid').length,
    };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">EMI Management</h1>
                <p className="admin-page-subtitle">Track overdue, upcoming, and paid EMIs across all borrowers</p>
            </div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
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
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 18px', borderRadius: 10, border: `1.5px solid ${activeTab === tab ? 'var(--admin-primary)' : 'var(--admin-border)'}`,
                            background: activeTab === tab ? 'var(--admin-primary)' : 'white',
                            color: activeTab === tab ? 'white' : 'var(--admin-text)',
                            fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s',
                        }}>
                        {tab}
                        {tab !== 'All' && counts[tab] !== undefined && (
                            <span style={{ marginLeft: 6, fontSize: 11, background: activeTab === tab ? 'rgba(255,255,255,0.2)' : 'var(--admin-bg)', padding: '2px 7px', borderRadius: 100 }}>
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
                    return (
                        <motion.div key={emi.id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                            style={{
                                background: cfg.bg, border: `1px solid ${cfg.border}`,
                                borderRadius: 16, padding: '18px 22px',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${cfg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <StatusIcon size={20} style={{ color: cfg.color }} />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                                        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--admin-text)' }}>{emi.user}</span>
                                        <span className={`badge ${cfg.badge}`}>{emi.status}</span>
                                        {emi.daysOverdue > 0 && (
                                            <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444' }}>
                                                {emi.daysOverdue} days overdue
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--admin-text-muted)', fontWeight: 600 }}>
                                        <span>{emi.id}</span>
                                        <span>•</span>
                                        <span>{emi.loanId}</span>
                                        <span>•</span>
                                        <span>Due: {emi.dueDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: cfg.color }}>{emi.amount}</div>
                                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600, marginTop: 2 }}>EMI Amount</div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {emi.status !== 'Paid' && (
                                        <>
                                            <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ gap: 6 }}>
                                                <Bell size={13} /> Remind
                                            </button>
                                            <button className="admin-btn admin-btn-success admin-btn-sm" onClick={() => handleMarkPaid(emi.id)} style={{ gap: 6 }}>
                                                <CheckCircle size={13} /> Mark Paid
                                            </button>
                                        </>
                                    )}
                                    {emi.status === 'Paid' && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: '#00A651' }}>
                                            <CheckCircle size={14} /> Cleared
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminEMI;
