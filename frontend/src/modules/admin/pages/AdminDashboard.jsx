import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight, ArrowDownRight, MoreVertical, Eye, Plus, Send,
    UserCheck, MessageSquare, Image, ShieldCheck,
    Users, FileText, IndianRupee, TrendingUp, Clock
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    adminStats, loanGrowthData, revenueData, loanDistribution, recentActivity, loansData
} from '../utils/dummyData';

const iconMap = { Users, FileText, IndianRupee, TrendingUp, Clock };
const colorMap = {
    blue: { bg: 'var(--admin-primary)', light: 'rgba(10,44,90,0.08)' },
    green: { bg: 'var(--admin-green)', light: 'rgba(0,166,81,0.08)' },
    gold: { bg: 'var(--admin-gold)', light: 'rgba(244,161,0,0.08)' },
    purple: { bg: '#7c3aed', light: 'rgba(124,58,237,0.08)' },
    teal: { bg: '#0891b2', light: 'rgba(8,145,178,0.08)' },
};

const fadeIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'white', border: '1px solid var(--admin-border)', borderRadius: 10, padding: '10px 14px', boxShadow: 'var(--admin-shadow)', fontSize: 13 }}>
            <p style={{ fontWeight: 700, color: 'var(--admin-text)', marginBottom: 4 }}>{label}</p>
            {payload.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, color: p.color, fontWeight: 600 }}>
                    <span>{p.name}:</span><span>{typeof p.value === 'number' && p.name.includes('₹') ? `₹${p.value}L` : p.value}</span>
                </div>
            ))}
        </div>
    );
};

const StatCard = ({ stat, index }) => {
    const Icon = iconMap[stat.icon];
    const colors = colorMap[stat.color];
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = stat.rawValue;
        const duration = 1200;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [stat.rawValue]);

    return (
        <motion.div
            variants={fadeIn}
            className="admin-stat-card"
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {/* Gradient decoration */}
            <div style={{
                position: 'absolute', top: -20, right: -20, width: 90, height: 90,
                borderRadius: '50%', background: colors.light, zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: colors.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 4px 14px ${colors.bg}40`,
                    }}>
                        {Icon && <Icon size={21} color="white" />}
                    </div>
                    <span style={{
                        display: 'flex', alignItems: 'center', gap: 3,
                        fontSize: 11, fontWeight: 700,
                        color: stat.trendUp ? 'var(--admin-green)' : '#ef4444',
                        background: stat.trendUp ? 'rgba(0,166,81,0.1)' : 'rgba(239,68,68,0.1)',
                        padding: '3px 8px', borderRadius: 100,
                    }}>
                        {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {stat.trend}
                    </span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--admin-text)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                    {stat.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)', marginTop: 6 }}>{stat.label}</div>
                <div style={{ fontSize: 11, color: '#b0bdd6', marginTop: 3, fontWeight: 500 }}>{stat.sub}</div>
            </div>
        </motion.div>
    );
};

const statusColors = { Approved: 'badge-success', Pending: 'badge-warning', Rejected: 'badge-danger' };

const LoanDetailModal = ({ loan, onClose }) => {
    if (!loan) return null;

    const fullData = loansData.find(l => l.id === loan.id) || loan;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(10, 44, 90, 0.4)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000, padding: 20
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                style={{
                    background: 'white', borderRadius: 24, width: '100%', maxWidth: 500,
                    overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    border: '1px solid var(--admin-border)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '24px 30px', background: 'linear-gradient(135deg, var(--admin-primary) 0%, #1a6fba 100%)',
                    color: 'white', position: 'relative'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <div style={{
                            width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, fontWeight: 900
                        }}>{fullData.avatar}</div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{fullData.user}</h2>
                            <span style={{ fontSize: 13, opacity: 0.8 }}>ID: {fullData.id} • {fullData.type}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 30px', marginBottom: 25 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Amount</label>
                            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--admin-primary)' }}>{typeof fullData.amount === 'number' ? `₹${fullData.amount.toLocaleString()}` : fullData.amount}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Status</label>
                            <span className={`badge ${statusColors[fullData.status]}`} style={{ padding: '4px 12px', fontSize: 12 }}>{fullData.status}</span>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Tenure</label>
                            <div style={{ fontSize: 15, fontWeight: 700 }}>{fullData.tenure || '--'} Months</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Interest Rate</label>
                            <div style={{ fontSize: 15, fontWeight: 700 }}>{fullData.interest || '--'}% p.a.</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Monthly EMI</label>
                            <div style={{ fontSize: 15, fontWeight: 700 }}>₹{fullData.emi?.toLocaleString() || '--'}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Date Applied</label>
                            <div style={{ fontSize: 15, fontWeight: 700 }}>{fullData.appliedDate || fullData.date}</div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(10,44,90,0.03)', borderRadius: 16, padding: 16, marginBottom: 25 }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Purpose of Loan</label>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--admin-text)', lineHeight: 1.5 }}>
                            {fullData.purpose || 'Personal financial requirements and emergency expenses.'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                        <button
                            className="admin-btn admin-btn-primary"
                            style={{ flex: 1, height: 48, borderRadius: 14 }}
                            onClick={onClose}
                        >
                            Review Detailed Documents
                        </button>
                        <button
                            className="admin-btn admin-btn-ghost"
                            style={{ width: 48, height: 48, borderRadius: 14, padding: 0 }}
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedLoan, setSelectedLoan] = useState(null);
    const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: 28 }}>
                <motion.h1 initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="admin-page-title">
                    Welcome back, Admin 👋
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }} className="admin-page-subtitle">
                    Here's what's happening with Creditu today — 24 Feb 2026
                </motion.p>
            </div>

            {/* Quick Actions Grid */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}
            >
                {[
                    { label: 'Verify KYC', icon: UserCheck, color: 'var(--admin-primary)', path: '/dashboard/admin/kyc' },
                    { label: 'Disburse Loan', icon: IndianRupee, color: 'var(--admin-green)', path: '/dashboard/admin/loans' },
                    { label: 'Support Reply', icon: MessageSquare, color: 'var(--admin-gold)', path: '/dashboard/admin/support' },
                    { label: 'Send Alert', icon: Send, color: '#7c3aed', path: '/dashboard/admin/notifications' },
                    { label: 'Add Banner', icon: Image, color: '#ec4899', path: '/dashboard/admin/carousel' },
                    { label: 'Admin Settings', icon: ShieldCheck, color: '#64748b', path: '/dashboard/admin/settings' },
                ].map((action, i) => (
                    <motion.div
                        key={action.label}
                        whileHover={{ y: -4, boxShadow: '0 12px 20px -8px rgba(10,44,90,0.15)' }}
                        onClick={() => navigate(action.path)}
                        style={{
                            background: 'white', borderRadius: 16, padding: '16px 12px', textAlign: 'center',
                            cursor: 'pointer', border: '1.5px solid var(--admin-border)', transition: 'all 0.2s',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10
                        }}
                    >
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <action.icon size={20} style={{ color: action.color }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--admin-text)' }}>{action.label}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={container} initial="hidden" animate="show"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 28 }}
            >
                {adminStats.map((stat, i) => <StatCard key={stat.id} stat={stat} index={i} />)}
            </motion.div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 340px', gap: 20, marginBottom: 24 }}>
                {/* Loan Growth Line Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="chart-container"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Loan Growth</h3>
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>Applications & disbursals</p>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--admin-green)', background: 'rgba(0,166,81,0.08)', padding: '4px 10px', borderRadius: 100 }}>
                            +18.7% ↑
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={loanGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,44,90,0.06)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="loans" stroke="var(--admin-primary)" strokeWidth={2.5} dot={{ fill: 'var(--admin-primary)', r: 3 }} name="Applications" />
                            <Line type="monotone" dataKey="disbursed" stroke="var(--admin-green)" strokeWidth={2.5} dot={{ fill: 'var(--admin-green)', r: 3 }} name="Disbursed (₹L)" strokeDasharray="4 2" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Revenue Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="chart-container"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Revenue Overview</h3>
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>Revenue vs Expenses (₹L)</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={revenueData} barSize={14} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,44,90,0.06)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="revenue" fill="var(--admin-primary)" radius={[5, 5, 0, 0]} name="Revenue" />
                            <Bar dataKey="expenses" fill="rgba(244,161,0,0.7)" radius={[5, 5, 0, 0]} name="Expenses" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="chart-container"
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Loan Distribution</h3>
                    <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--admin-text-muted)' }}>By loan category</p>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={loanDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                                {loanDistribution.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(v) => `${v}%`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                        {loanDistribution.map((item) => (
                            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--admin-text-muted)' }}>{item.name}</span>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--admin-text)' }}>{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="admin-card"
            >
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Recent Loan Activity</h3>
                        <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>Latest applications and status updates</p>
                    </div>
                    <button
                        className="admin-btn admin-btn-ghost admin-btn-sm"
                        onClick={() => navigate('/dashboard/admin/loans')}
                    >
                        View All
                    </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Loan ID</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((row) => (
                                <tr key={row.id}>
                                    <td style={{ fontWeight: 700, fontSize: 12, color: 'var(--admin-primary)' }}>{row.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: 9,
                                                background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)',
                                                color: 'white', fontSize: 11, fontWeight: 800,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>{row.avatar}</div>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{row.user}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 700 }}>{row.amount}</td>
                                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{row.type}</td>
                                    <td><span className={`badge ${statusColors[row.status]}`}>{row.status}</span></td>
                                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{row.date}</td>
                                    <td>
                                        <button
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            style={{ gap: 5 }}
                                            onClick={() => setSelectedLoan(row)}
                                        >
                                            <Eye size={13} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedLoan && (
                    <LoanDetailModal
                        loan={selectedLoan}
                        onClose={() => setSelectedLoan(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
