import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { transactionsData } from '../utils/dummyData';

const statusColors = { Success: 'badge-success', Failed: 'badge-danger', Pending: 'badge-warning' };
const typeColors = { 'EMI Payment': 'badge-info', 'Disbursement': 'badge-purple' };

const AdminTransactions = () => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filtered = transactionsData.filter(t => {
        const matchSearch = t.user.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search);
        const matchStatus = filterStatus === 'All' || t.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalAmt = filtered.filter(t => t.status === 'Success').reduce((acc, t) => {
        const amt = parseFloat(t.amount.replace(/[₹,]/g, ''));
        return acc + amt;
    }, 0);

    const exportCSV = () => {
        const headers = ['Transaction ID', 'User', 'Loan ID', 'Amount', 'Mode', 'Status', 'Date', 'Type'];
        const rows = filtered.map(t => [t.id, t.user, t.loanId, t.amount, t.mode, t.status, t.date, t.type]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'creditu_transactions.csv';
        link.click();
    };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">Transactions</h1>
                <p className="admin-page-subtitle">Track all payment transactions, EMIs and disbursements</p>
            </div>

            {/* Summary Cards */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
                {[
                    { label: 'Total Transactions', value: filtered.length, color: 'var(--admin-primary)', bg: 'rgba(10,44,90,0.07)' },
                    { label: 'Successful', value: filtered.filter(t => t.status === 'Success').length, color: 'var(--admin-green)', bg: 'rgba(0,166,81,0.07)' },
                    { label: 'Failed', value: filtered.filter(t => t.status === 'Failed').length, color: '#ef4444', bg: 'rgba(239,68,68,0.07)' },
                    { label: 'Total Volume', value: `₹${(totalAmt / 1000).toFixed(0)}K`, color: 'var(--admin-gold)', bg: 'rgba(244,161,0,0.07)' },
                ].map(card => (
                    <div key={card.label} className="admin-stat-card" style={{ padding: 18 }}>
                        <div style={{ fontSize: 24, fontWeight: 900, color: card.color }}>{card.value}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-text-muted)', marginTop: 4 }}>{card.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.08 } }}
                style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid var(--admin-border)', borderRadius: 10, padding: '0 14px' }}>
                    <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
                    <input className="admin-input" placeholder="Search transaction ID or user..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '9px 0', fontSize: 13 }} />
                </div>
                <select className="admin-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option>All</option><option>Success</option><option>Failed</option><option>Pending</option>
                </select>
                <input type="date" className="admin-select" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ fontSize: 13 }} />
                <input type="date" className="admin-select" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ fontSize: 13 }} />
                <button className="admin-btn admin-btn-ghost" onClick={exportCSV} style={{ gap: 8 }}>
                    <Download size={15} /> Export
                </button>
            </motion.div>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }} className="admin-card">
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th><th>User</th><th>Loan ID</th><th>Amount</th>
                                <th>Payment Mode</th><th>Type</th><th>Status</th><th>Date</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((txn) => (
                                <motion.tr key={txn.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <td>
                                        <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--admin-primary)', background: 'rgba(10,44,90,0.05)', padding: '3px 8px', borderRadius: 6 }}>
                                            {txn.id}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #0A2C5A, #1a6fba)', color: 'white', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {txn.avatar}
                                            </div>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{txn.user}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)', fontWeight: 600 }}>{txn.loanId}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            {txn.type === 'Disbursement' ? <ArrowDownRight size={14} style={{ color: 'var(--admin-green)' }} /> : <ArrowUpRight size={14} style={{ color: 'var(--admin-primary)' }} />}
                                            <span style={{ fontWeight: 800, color: txn.type === 'Disbursement' ? 'var(--admin-green)' : 'var(--admin-text)' }}>{txn.amount}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: 12, fontWeight: 700, background: 'var(--admin-bg)', padding: '4px 10px', borderRadius: 8 }}>{txn.mode}</span>
                                    </td>
                                    <td><span className={`badge ${typeColors[txn.type] || 'badge-default'}`}>{txn.type}</span></td>
                                    <td><span className={`badge ${statusColors[txn.status]}`}>{txn.status}</span></td>
                                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{txn.date}</td>
                                    <td>
                                        <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ fontSize: 11 }}>
                                            Receipt
                                        </button>
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

export default AdminTransactions;
