import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Award } from 'lucide-react';
import {
    RadialBarChart, RadialBar, ResponsiveContainer,
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { usersData } from '../utils/dummyData';

const scoreRanges = [
    { range: '300–549', label: 'Poor', color: '#ef4444', count: 0, pct: 0 },
    { range: '550–649', label: 'Fair', color: '#F4A100', count: 0, pct: 0 },
    { range: '650–749', label: 'Good', color: '#2563eb', count: 0, pct: 0 },
    { range: '750–850', label: 'Very Good', color: '#00A651', count: 0, pct: 0 },
    { range: '851–900', label: 'Excellent', color: '#7c3aed', count: 0, pct: 0 },
];

usersData.forEach(u => {
    if (u.creditScore < 550) scoreRanges[0].count++;
    else if (u.creditScore < 650) scoreRanges[1].count++;
    else if (u.creditScore < 750) scoreRanges[2].count++;
    else if (u.creditScore < 851) scoreRanges[3].count++;
    else scoreRanges[4].count++;
});
scoreRanges.forEach(r => r.pct = Math.round((r.count / usersData.length) * 100));

const avgScore = Math.round(usersData.reduce((a, u) => a + u.creditScore, 0) / usersData.length);

const scoreColor = (s) => s >= 750 ? '#00A651' : s >= 650 ? '#2563eb' : s >= 550 ? '#F4A100' : '#ef4444';

const AdminCreditScore = () => {
    const radialData = [{ name: 'Score', value: avgScore, fill: scoreColor(avgScore) }];

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">Credit Score</h1>
                <p className="admin-page-subtitle">Portfolio credit health analysis and user score distribution</p>
            </div>

            {/* Top Overview */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, marginBottom: 24 }}>

                {/* Avg Score Card */}
                <div className="admin-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Portfolio Average
                    </h3>
                    <div style={{ width: 160, height: 160, position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" startAngle={220} endAngle={-40} data={[{ value: 100, fill: '#e8f0fb' }, { value: (avgScore - 300) / 6, fill: scoreColor(avgScore) }]}>
                                <RadialBar dataKey="value" cornerRadius={8} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 34, fontWeight: 900, color: scoreColor(avgScore), lineHeight: 1 }}>{avgScore}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)', letterSpacing: '0.08em' }}>AVG CIBIL</span>
                        </div>
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#00A651', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <TrendingUp size={14} /> +12 pts vs last month
                        </span>
                    </div>
                    <div style={{ marginTop: 12, padding: '8px 16px', background: `${scoreColor(avgScore)}12`, borderRadius: 100 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: scoreColor(avgScore) }}>Good Portfolio Health</span>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="chart-container">
                    <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Score Distribution</h3>
                    <p style={{ margin: '0 0 20px', fontSize: 12, color: 'var(--admin-text-muted)' }}>Users per credit score band</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={scoreRanges} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,44,90,0.05)" />
                            <XAxis dataKey="range" tick={{ fontSize: 11, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip formatter={(v, n) => [`${v} users`, 'Count']} />
                            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                {scoreRanges.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Score Range Cards */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
                {scoreRanges.map(range => (
                    <div key={range.range} className="admin-stat-card" style={{ padding: '16px', textAlign: 'center', borderTop: `3px solid ${range.color}` }}>
                        <div style={{ fontSize: 26, fontWeight: 900, color: range.color }}>{range.count}</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: range.label === 'Poor' ? '#ef4444' : 'var(--admin-text)', marginTop: 3 }}>{range.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 2 }}>{range.range}</div>
                        <div style={{ height: 4, background: '#e8f0fb', borderRadius: 2, marginTop: 10, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${range.pct}%`, background: range.color, borderRadius: 2 }} />
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: range.color, marginTop: 5 }}>{range.pct}%</div>
                    </div>
                ))}
            </motion.div>

            {/* User Score Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="admin-card">
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={17} style={{ color: 'var(--admin-gold)' }} />
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Individual Credit Scores</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr><th>User</th><th>Credit Score</th><th>Rating</th><th>KYC</th><th>Active Loans</th><th>Total Borrowed</th></tr>
                        </thead>
                        <tbody>
                            {[...usersData].sort((a, b) => b.creditScore - a.creditScore).map(user => {
                                const color = scoreColor(user.creditScore);
                                const rating = user.creditScore >= 750 ? 'Very Good' : user.creditScore >= 650 ? 'Good' : user.creditScore >= 550 ? 'Fair' : 'Poor';
                                return (
                                    <tr key={user.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${color}, ${color}aa)`, color: 'white', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{user.name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>{user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 52, height: 6, borderRadius: 3, background: '#e8f0fb', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${((user.creditScore - 300) / 600) * 100}%`, background: color, borderRadius: 3 }} />
                                                </div>
                                                <span style={{ fontSize: 14, fontWeight: 900, color }}>{user.creditScore}</span>
                                            </div>
                                        </td>
                                        <td><span className="badge" style={{ background: `${color}15`, color }}>{rating}</span></td>
                                        <td><span className={`badge ${user.kycStatus === 'Verified' ? 'badge-success' : user.kycStatus === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>{user.kycStatus}</span></td>
                                        <td style={{ fontWeight: 700, textAlign: 'center' }}>{user.loans}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--admin-green)' }}>{user.totalBorrowed}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminCreditScore;
