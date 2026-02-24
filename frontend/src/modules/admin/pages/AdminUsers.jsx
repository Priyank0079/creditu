import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, Eye, ShieldX, Trash2, X, Phone, Mail, MapPin, CreditCard, Calendar, IndianRupee, CheckCircle, XCircle, Clock } from 'lucide-react';
import { usersData } from '../utils/dummyData';

const kycColors = { Verified: 'badge-success', Pending: 'badge-warning', Rejected: 'badge-danger' };
const accountColors = { Active: 'badge-success', Blocked: 'badge-danger' };
const scoreColor = (s) => s >= 750 ? '#00A651' : s >= 650 ? '#F4A100' : '#ef4444';

const CreditScoreRing = ({ score }) => {
    const pct = ((score - 300) / (900 - 300)) * 100;
    const color = scoreColor(score);
    return (
        <div style={{ position: 'relative', width: 80, height: 80 }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(10,44,90,0.08)" strokeWidth="6" />
                <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="6"
                    strokeDasharray={`${pct * 2.01} 201`} strokeDashoffset="50.3" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--admin-text-muted)', letterSpacing: '0.05em' }}>CIBIL</span>
            </div>
        </div>
    );
};

const UserDrawer = ({ user, onClose }) => (
    <AnimatePresence>
        {user && (
            <>
                <motion.div className="admin-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                <motion.div className="admin-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
                    {/* Header */}
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-bg)' }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>User Details</h3>
                        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--admin-border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-muted)' }}>
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                        {/* Profile */}
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: 20, margin: '0 auto 12px',
                                background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontSize: 22, fontWeight: 800,
                                boxShadow: '0 8px 24px rgba(10,44,90,0.22)',
                            }}>{user.avatar}</div>
                            <h4 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: 'var(--admin-text)' }}>{user.name}</h4>
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>{user.id}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
                                <span className={`badge ${kycColors[user.kycStatus]}`}>{user.kycStatus}</span>
                                <span className={`badge ${accountColors[user.accountStatus]}`}>{user.accountStatus}</span>
                            </div>
                        </div>

                        {/* Credit Score */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <CreditScoreRing score={user.creditScore} />
                        </div>

                        {/* Info Grid */}
                        {[
                            { icon: Mail, label: 'Email', value: user.email },
                            { icon: Phone, label: 'Phone', value: user.phone },
                            { icon: MapPin, label: 'City', value: user.city },
                            { icon: CreditCard, label: 'PAN', value: user.pan },
                            { icon: CreditCard, label: 'Aadhaar', value: user.aadhaar },
                            { icon: IndianRupee, label: 'Monthly Income', value: user.income },
                            { icon: Calendar, label: 'Joined', value: user.joinDate },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid rgba(10,44,90,0.04)' }}>
                                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={16} style={{ color: 'var(--admin-primary)' }} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }}>{value}</p>
                                </div>
                            </div>
                        ))}

                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                            <div style={{ background: 'var(--admin-bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--admin-primary)' }}>{user.loans}</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Total Loans</div>
                            </div>
                            <div style={{ background: 'var(--admin-bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--admin-green)' }}>{user.totalBorrowed}</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Total Borrowed</div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 12 }}>
                        <button className="admin-btn admin-btn-danger" style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
                            <ShieldX size={15} /> Block User
                        </button>
                        <button className="admin-btn admin-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                            Send Message
                        </button>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

const AdminUsers = () => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);

    const filtered = usersData.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.phone.includes(search);
        const matchStatus = filterStatus === 'All' || u.accountStatus === filterStatus || u.kycStatus === filterStatus;
        return matchSearch && matchStatus;
    });

    const exportCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Credit Score', 'KYC', 'Status'];
        const rows = filtered.map(u => [u.id, u.name, u.email, u.phone, u.creditScore, u.kycStatus, u.accountStatus]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'creditu_users.csv';
        link.click();
    };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">User Management</h1>
                <p className="admin-page-subtitle">Manage all registered users, KYC status, and accounts</p>
            </div>

            {/* Top Bar */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid var(--admin-border)', borderRadius: 10, padding: '0 14px', boxShadow: 'var(--admin-shadow)' }}>
                    <Search size={15} style={{ color: 'var(--admin-text-muted)', flexShrink: 0 }} />
                    <input className="admin-input" placeholder="Search by name, email, phone..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '10px 0' }} />
                </div>
                <select className="admin-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option>All</option><option>Active</option><option>Blocked</option><option>Verified</option><option>Pending</option><option>Rejected</option>
                </select>
                <button className="admin-btn admin-btn-ghost" onClick={exportCSV} style={{ gap: 8 }}>
                    <Download size={15} /> Export CSV
                </button>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text-muted)', background: 'var(--admin-bg)', padding: '9px 14px', borderRadius: 10 }}>
                    {filtered.length} users
                </span>
            </motion.div>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="admin-card">
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Credit Score</th>
                                <th>KYC Status</th>
                                <th>Account</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((user) => (
                                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                                background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'white', fontSize: 12, fontWeight: 800,
                                            }}>{user.avatar}</div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 13 }}>{user.name}</div>
                                                <div style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: 13, color: 'var(--admin-text-muted)' }}>{user.email}</td>
                                    <td style={{ fontSize: 13 }}>{user.phone}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 44, height: 5, borderRadius: 3, background: 'var(--admin-bg)', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${((user.creditScore - 300) / 600) * 100}%`, background: scoreColor(user.creditScore), borderRadius: 3 }} />
                                            </div>
                                            <span style={{ fontSize: 13, fontWeight: 800, color: scoreColor(user.creditScore) }}>{user.creditScore}</span>
                                        </div>
                                    </td>
                                    <td><span className={`badge ${kycColors[user.kycStatus]}`}>{user.kycStatus}</span></td>
                                    <td><span className={`badge ${accountColors[user.accountStatus]}`}>{user.accountStatus}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setSelectedUser(user)}>
                                                <Eye size={13} />
                                            </button>
                                            <button className="admin-btn admin-btn-danger admin-btn-sm">
                                                <ShieldX size={13} />
                                            </button>
                                            <button className="admin-btn admin-btn-sm" style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 10px' }}>
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
        </div>
    );
};

export default AdminUsers;
