import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Download, FileText, TrendingUp, Users, IndianRupee } from 'lucide-react';
import { monthlyReport, userGrowthData } from '../utils/dummyData';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'white', border: '1px solid var(--admin-border)', borderRadius: 10, padding: '10px 14px', boxShadow: 'var(--admin-shadow)', fontSize: 12 }}>
            <p style={{ fontWeight: 800, color: 'var(--admin-text)', marginBottom: 6 }}>{label}</p>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, fontWeight: 600, marginBottom: 2 }}>{p.name}: {p.value}</div>
            ))}
        </div>
    );
};

const AdminReports = () => {
    const [activeReport, setActiveReport] = useState('monthly');

    const handleDownloadPDF = () => {
        alert('📄 Generating PDF report... (Demo mode — connect backend for real PDF generation)');
    };

    const totalDisbursed = monthlyReport.reduce((a, r) => a + r.disbursed, 0);
    const totalRevenue = monthlyReport.reduce((a, r) => a + r.revenue, 0);
    const totalUsers = monthlyReport[monthlyReport.length - 1].users;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 className="admin-page-title">Reports</h1>
                    <p className="admin-page-subtitle">Financial analytics, user growth and performance metrics</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="admin-btn admin-btn-ghost" onClick={handleDownloadPDF} style={{ gap: 8 }}>
                        <Download size={15} /> Download PDF
                    </button>
                    <button className="admin-btn admin-btn-primary" style={{ gap: 8 }}>
                        <FileText size={15} /> Generate Report
                    </button>
                </div>
            </div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
                {[
                    { label: 'Total Disbursed (Aug–Feb)', value: `₹${totalDisbursed}L`, icon: IndianRupee, color: 'var(--admin-primary)' },
                    { label: 'Total Revenue', value: `₹${totalRevenue}L`, icon: TrendingUp, color: 'var(--admin-green)' },
                    { label: 'Total Users', value: totalUsers.toLocaleString(), icon: Users, color: 'var(--admin-gold)' },
                    { label: 'Avg NPA Rate', value: '1.33%', icon: FileText, color: '#7c3aed' },
                ].map(card => (
                    <div key={card.label} className="admin-stat-card" style={{ padding: 20 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 11, background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <card.icon size={19} style={{ color: card.color }} />
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: card.color }}>{card.value}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-text-muted)', marginTop: 5 }}>{card.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                {/* Disbursement & Revenue */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }} className="chart-container">
                    <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Monthly Disbursement & Revenue</h3>
                    <p style={{ margin: '0 0 20px', fontSize: 12, color: 'var(--admin-text-muted)' }}>In Lakhs (₹L)</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={monthlyReport} barSize={12} barGap={5}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,44,90,0.05)" />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700 }} />
                            <Bar dataKey="disbursed" fill="var(--admin-primary)" radius={[5, 5, 0, 0]} name="Disbursed (₹L)" />
                            <Bar dataKey="revenue" fill="var(--admin-green)" radius={[5, 5, 0, 0]} name="Revenue (₹L)" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* User Growth */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.22 } }} className="chart-container">
                    <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>User Growth</h3>
                    <p style={{ margin: '0 0 20px', fontSize: 12, color: 'var(--admin-text-muted)' }}>Cumulative registered users</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,44,90,0.05)" />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: 'var(--admin-text-muted)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="users" stroke="var(--admin-gold)" strokeWidth={3} dot={{ fill: 'var(--admin-gold)', r: 4, strokeWidth: 2, stroke: 'white' }} name="Users" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Monthly Breakdown Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="admin-card">
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--admin-text)' }}>Monthly Breakdown</h3>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={handleDownloadPDF} style={{ gap: 6 }}>
                        <Download size={13} /> Export
                    </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Disbursed (₹L)</th>
                                <th>Revenue (₹L)</th>
                                <th>New Users</th>
                                <th>Loan Applications</th>
                                <th>NPA Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyReport.map((row, i) => (
                                <motion.tr key={row.month} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: i * 0.04 } }}>
                                    <td style={{ fontWeight: 700 }}>{row.month}</td>
                                    <td>
                                        <span style={{ fontWeight: 800, color: 'var(--admin-primary)' }}>₹{row.disbursed}L</span>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 800, color: 'var(--admin-green)' }}>₹{row.revenue}L</span>
                                    </td>
                                    <td style={{ fontWeight: 700 }}>{row.users.toLocaleString()}</td>
                                    <td style={{ fontWeight: 700 }}>{row.loans.toLocaleString()}</td>
                                    <td>
                                        <span style={{
                                            fontWeight: 800, fontSize: 13,
                                            color: row.npa > 1.5 ? '#ef4444' : row.npa > 1.3 ? '#F4A100' : '#00A651'
                                        }}>
                                            {row.npa}%
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminReports;
