import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle, XCircle, Eye, X, IndianRupee, Calendar, User, Percent, Calculator } from 'lucide-react';
import { loansData } from '../utils/dummyData';

const statusColors = { Approved: 'badge-success', Pending: 'badge-warning', Rejected: 'badge-danger' };

const LoanModal = ({ loan, onClose, onApprove, onReject }) => {
    if (!loan) return null;
    const calcEMI = (P, r, n) => {
        const ri = r / 12 / 100;
        return Math.round(P * ri * Math.pow(1 + ri, n) / (Math.pow(1 + ri, n) - 1));
    };
    const emi = calcEMI(loan.amount, loan.interest, loan.tenure);
    const totalPayable = emi * loan.tenure;
    const totalInterest = totalPayable - loan.amount;

    // Generate 4 EMI rows
    const emiRows = Array.from({ length: 4 }, (_, i) => {
        const monthInterest = Math.round(((loan.amount - (emi - Math.round(loan.amount * loan.interest / 1200)) * i) * loan.interest / 1200));
        const principal = emi - monthInterest;
        const balance = loan.amount - principal * (i + 1);
        return { month: i + 1, emi, principal: Math.max(0, principal), interest: Math.max(0, monthInterest), balance: Math.max(0, balance) };
    });

    return (
        <AnimatePresence>
            <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
                <motion.div className="admin-modal"
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: 20 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                    style={{ padding: 0 }}
                >
                    {/* Modal Header */}
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-bg)', borderRadius: '24px 24px 0 0' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>Loan Details — {loan.id}</h3>
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>{loan.type} • {loan.user}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <span className={`badge ${statusColors[loan.status]}`}>{loan.status}</span>
                            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--admin-border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-muted)' }}>
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    <div style={{ padding: 24, overflowY: 'auto', maxHeight: 'calc(90vh - 140px)' }}>
                        {/* Loan Summary Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
                            {[
                                { label: 'Loan Amount', value: `₹${(loan.amount / 100000).toFixed(1)}L`, icon: IndianRupee, color: 'var(--admin-primary)' },
                                { label: 'Tenure', value: `${loan.tenure} months`, icon: Calendar, color: 'var(--admin-green)' },
                                { label: 'Interest Rate', value: `${loan.interest}% p.a.`, icon: Percent, color: 'var(--admin-gold)' },
                                { label: 'Monthly EMI', value: `₹${emi.toLocaleString()}`, icon: Calculator, color: '#7c3aed' },
                            ].map(item => (
                                <div key={item.label} style={{ background: 'var(--admin-bg)', borderRadius: 14, padding: '16px 14px', textAlign: 'center' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                                        <item.icon size={17} style={{ color: item.color }} />
                                    </div>
                                    <div style={{ fontSize: 16, fontWeight: 900, color: item.color }}>{item.value}</div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{item.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Total Interest Summary */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(10,44,90,0.04), rgba(10,44,90,0.02))', border: '1px solid var(--admin-border)', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--admin-primary)' }}>₹{(loan.amount / 100000).toFixed(2)}L</div>
                                <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600 }}>Principal</div>
                            </div>
                            <div style={{ width: 1, background: 'var(--admin-border)' }} />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#ef4444' }}>₹{(totalInterest / 100000).toFixed(2)}L</div>
                                <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600 }}>Total Interest</div>
                            </div>
                            <div style={{ width: 1, background: 'var(--admin-border)' }} />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--admin-green)' }}>₹{(totalPayable / 100000).toFixed(2)}L</div>
                                <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600 }}>Total Payable</div>
                            </div>
                        </div>

                        {/* User Info */}
                        <div style={{ background: 'var(--admin-bg)', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
                            <h4 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 800, color: 'var(--admin-text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <User size={14} style={{ color: 'var(--admin-primary)' }} /> Applicant Details
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                {[
                                    { label: 'Name', value: loan.user },
                                    { label: 'User ID', value: loan.userId },
                                    { label: 'Purpose', value: loan.purpose },
                                    { label: 'City', value: loan.city },
                                    { label: 'Applied On', value: loan.appliedDate },
                                    { label: 'Approved On', value: loan.approvedDate || '—' },
                                ].map(item => (
                                    <div key={item.label}>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)', marginTop: 2 }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* EMI Schedule */}
                        <div>
                            <h4 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 800, color: 'var(--admin-text)' }}>EMI Breakdown (First 4 months)</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="admin-table">
                                    <thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                                    <tbody>
                                        {emiRows.map(row => (
                                            <tr key={row.month}>
                                                <td style={{ fontWeight: 700 }}>{row.month}</td>
                                                <td style={{ color: 'var(--admin-primary)', fontWeight: 700 }}>₹{row.emi.toLocaleString()}</td>
                                                <td style={{ color: 'var(--admin-green)', fontWeight: 600 }}>₹{row.principal.toLocaleString()}</td>
                                                <td style={{ color: '#ef4444', fontWeight: 600 }}>₹{row.interest.toLocaleString()}</td>
                                                <td style={{ fontWeight: 600 }}>₹{row.balance.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    {loan.status === 'Pending' && (
                        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 12, background: 'var(--admin-bg)', borderRadius: '0 0 24px 24px' }}>
                            <button className="admin-btn admin-btn-danger" style={{ flex: 1, justifyContent: 'center', gap: 8 }} onClick={() => { onReject(loan.id); onClose(); }}>
                                <XCircle size={15} /> Reject Loan
                            </button>
                            <button className="admin-btn admin-btn-success" style={{ flex: 1, justifyContent: 'center', gap: 8 }} onClick={() => { onApprove(loan.id); onClose(); }}>
                                <CheckCircle size={15} /> Approve Loan
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const AdminLoans = () => {
    const [loans, setLoans] = useState(loansData);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedLoan, setSelectedLoan] = useState(null);

    const handleApprove = (id) => setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    const handleReject = (id) => setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));

    const filtered = loans.filter(l => {
        const matchSearch = l.user.toLowerCase().includes(search.toLowerCase()) || l.id.includes(search);
        const matchStatus = filterStatus === 'All' || l.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">Loan Management</h1>
                <p className="admin-page-subtitle">Review, approve or reject loan applications</p>
            </div>

            {/* Summary Pills */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                {['All', 'Pending', 'Approved', 'Rejected'].map(status => {
                    const count = status === 'All' ? loans.length : loans.filter(l => l.status === status).length;
                    const active = filterStatus === status;
                    return (
                        <button key={status} onClick={() => setFilterStatus(status)}
                            style={{
                                padding: '8px 16px', borderRadius: 10, border: `1.5px solid ${active ? 'var(--admin-primary)' : 'var(--admin-border)'}`,
                                background: active ? 'var(--admin-primary)' : 'white',
                                color: active ? 'white' : 'var(--admin-text)',
                                fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s',
                                display: 'flex', alignItems: 'center', gap: 7,
                            }}>
                            {status}
                            <span style={{ fontSize: 11, background: active ? 'rgba(255,255,255,0.2)' : 'var(--admin-bg)', padding: '2px 7px', borderRadius: 100, fontWeight: 800 }}>
                                {count}
                            </span>
                        </button>
                    );
                })}
                <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid var(--admin-border)', borderRadius: 10, padding: '0 14px' }}>
                    <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
                    <input className="admin-input" placeholder="Search loan ID or user..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '9px 0', fontSize: 13 }} />
                </div>
            </motion.div>

            {/* Loans Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="admin-card">
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Loan ID</th><th>Applicant</th><th>Type</th><th>Amount</th>
                                <th>Tenure</th><th>Rate</th><th>Status</th><th>Applied</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((loan) => (
                                <motion.tr key={loan.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <td style={{ fontWeight: 700, color: 'var(--admin-primary)', fontSize: 12 }}>{loan.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)', color: 'white', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {loan.avatar}
                                            </div>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{loan.user}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-info">{loan.type}</span></td>
                                    <td style={{ fontWeight: 800, color: 'var(--admin-text)' }}>₹{(loan.amount / 100000).toFixed(1)}L</td>
                                    <td style={{ fontSize: 13 }}>{loan.tenure} mo</td>
                                    <td style={{ fontWeight: 700, color: 'var(--admin-gold)' }}>{loan.interest}%</td>
                                    <td><span className={`badge ${statusColors[loan.status]}`}>{loan.status}</span></td>
                                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{loan.appliedDate}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setSelectedLoan(loan)}>
                                                <Eye size={13} /> Details
                                            </button>
                                            {loan.status === 'Pending' && (
                                                <>
                                                    <button className="admin-btn admin-btn-success admin-btn-sm" onClick={() => handleApprove(loan.id)} style={{ gap: 4 }}>
                                                        <CheckCircle size={12} />
                                                    </button>
                                                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleReject(loan.id)} style={{ gap: 4 }}>
                                                        <XCircle size={12} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <LoanModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} onApprove={handleApprove} onReject={handleReject} />
        </div>
    );
};

export default AdminLoans;
