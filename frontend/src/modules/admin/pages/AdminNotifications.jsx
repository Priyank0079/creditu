import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Send, Users, CheckCircle, Clock, Plus, X } from 'lucide-react';
import { notificationsData } from '../utils/dummyData';

const typeColors = { Loan: 'badge-info', EMI: 'badge-warning', Bulk: 'badge-purple', KYC: 'badge-default', Promo: 'badge-success' };
const statusColors = { Sent: 'badge-success', Draft: 'badge-default' };

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState(notificationsData);
    const [showCompose, setShowCompose] = useState(false);
    const [form, setForm] = useState({ title: '', message: '', target: 'All Users', type: 'Bulk' });

    const handleSend = () => {
        if (!form.title || !form.message) return;
        const newNotif = {
            id: notifications.length + 1,
            ...form,
            date: '24 Feb 2026',
            status: 'Sent',
            icon: 'Bell',
        };
        setNotifications(prev => [newNotif, ...prev]);
        setForm({ title: '', message: '', target: 'All Users', type: 'Bulk' });
        setShowCompose(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 className="admin-page-title">Notifications</h1>
                    <p className="admin-page-subtitle">Send push notifications to users and track history</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowCompose(true)} style={{ gap: 8 }}>
                    <Plus size={15} /> New Notification
                </button>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
                {[
                    { label: 'Total Sent', value: notifications.filter(n => n.status === 'Sent').length, icon: Send, color: 'var(--admin-green)' },
                    { label: 'Bulk Notifications', value: notifications.filter(n => n.target === 'All Users').length, icon: Users, color: 'var(--admin-primary)' },
                    { label: 'Drafts', value: notifications.filter(n => n.status === 'Draft').length, icon: Clock, color: 'var(--admin-gold)' },
                    { label: 'This Month', value: notifications.length, icon: Bell, color: '#7c3aed' },
                ].map(card => (
                    <div key={card.label} className="admin-stat-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 11, background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <card.icon size={18} style={{ color: card.color }} />
                        </div>
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: card.color }}>{card.value}</div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)' }}>{card.label}</div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Notification History */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }} className="admin-card">
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--admin-border)' }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Notification History</h3>
                </div>
                <div style={{ padding: '8px 0' }}>
                    {notifications.map((notif, i) => (
                        <motion.div key={notif.id}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                            style={{
                                display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 24px',
                                borderBottom: '1px solid rgba(10,44,90,0.04)',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,44,90,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                                {notif.icon === 'CheckCircle' ? '✅' : notif.icon === 'Bell' ? '🔔' : notif.icon === 'AlertCircle' ? '⚠️' : notif.icon === 'XCircle' ? '❌' : '🎁'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--admin-text)' }}>{notif.title}</span>
                                    <span className={`badge ${typeColors[notif.type] || 'badge-default'}`}>{notif.type}</span>
                                    <span className={`badge ${statusColors[notif.status]}`}>{notif.status}</span>
                                </div>
                                <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--admin-text-muted)', lineHeight: 1.5 }}>{notif.message}</p>
                                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#b0bdd6', fontWeight: 600 }}>
                                    <span>→ {notif.target}</span>
                                    <span>•</span>
                                    <span>{notif.date}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                {notif.status === 'Draft' && (
                                    <button className="admin-btn admin-btn-success admin-btn-sm" style={{ gap: 5 }}>
                                        <Send size={12} /> Send
                                    </button>
                                )}
                                <button className="admin-btn admin-btn-sm" style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 10px' }}
                                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}>
                                    <X size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Compose Modal */}
            <AnimatePresence>
                {showCompose && (
                    <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setShowCompose(false)}>
                        <motion.div className="admin-modal"
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                            style={{ padding: 0 }}
                        >
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '24px 24px 0 0', background: 'var(--admin-bg)' }}>
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>Compose Notification</h3>
                                <button onClick={() => setShowCompose(false)} style={{ width: 32, height: 32, border: '1px solid var(--admin-border)', borderRadius: 8, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-muted)' }}>
                                    <X size={15} />
                                </button>
                            </div>
                            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7, display: 'block' }}>Notification Title</label>
                                    <input className="admin-input" placeholder="e.g. EMI Reminder" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7, display: 'block' }}>Message</label>
                                    <textarea className="admin-input" placeholder="Write your message..." rows={4}
                                        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        style={{ resize: 'vertical', minHeight: 100, fontFamily: 'inherit' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                    <div>
                                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7, display: 'block' }}>Target</label>
                                        <select className="admin-select" style={{ width: '100%' }} value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))}>
                                            <option>All Users</option>
                                            <option>Active Loan Users</option>
                                            <option>Overdue EMI Users</option>
                                            <option>KYC Pending Users</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7, display: 'block' }}>Type</label>
                                        <select className="admin-select" style={{ width: '100%' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                                            <option value="Bulk">Bulk</option>
                                            <option value="Loan">Loan</option>
                                            <option value="EMI">EMI</option>
                                            <option value="KYC">KYC</option>
                                            <option value="Promo">Promo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 12, justifyContent: 'flex-end', background: 'var(--admin-bg)', borderRadius: '0 0 24px 24px' }}>
                                <button className="admin-btn admin-btn-ghost" onClick={() => setShowCompose(false)}>Cancel</button>
                                <button className="admin-btn admin-btn-primary" onClick={handleSend} style={{ gap: 8 }}>
                                    <Send size={14} /> Send Notification
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminNotifications;
