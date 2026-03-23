import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, Eye, X, FileText, User, MapPin, Calendar, AlertCircle, ShieldCheck } from 'lucide-react';
import { kycData } from '../utils/dummyData';

const statusColors = { Verified: 'badge-success', Pending: 'badge-warning', Rejected: 'badge-danger' };

const KYCModal = ({ kyc, onClose, onApprove, onReject }) => {
    if (!kyc) return null;

    return (
        <AnimatePresence>
            <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
                <motion.div className="admin-modal"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    style={{ maxWidth: 600, padding: 0 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-bg)', borderRadius: '24px 24px 0 0' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>KYC Review — {kyc.id}</h3>
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>{kyc.type} Request</p>
                        </div>
                        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--admin-border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ padding: 24, overflowY: 'auto', maxHeight: '70vh' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>
                                {kyc.avatar}
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{kyc.name}</h4>
                                <p style={{ margin: 0, fontSize: 13, color: 'var(--admin-text-muted)' }}>{kyc.userId}</p>
                                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                    <span className={`badge ${statusColors[kyc.status]}`}>{kyc.status}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                            {[
                                { label: 'Location', value: kyc.city, icon: MapPin },
                                { label: 'Submitted On', value: kyc.date, icon: Calendar },
                                { label: 'Document Type', value: kyc.type, icon: FileText },
                                { label: 'User ID', value: kyc.userId, icon: User },
                            ].map(item => (
                                <div key={item.label} style={{ background: 'var(--admin-bg)', borderRadius: 12, padding: 14 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <item.icon size={12} /> {item.label}
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: 700 }}>{item.value}</div>
                                </div>
                            ))}
                        </div>

                        <h5 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>Uploaded Documents</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {kyc.documents.map(doc => (
                                <div key={doc} style={{ border: '1.5px solid var(--admin-border)', borderRadius: 14, padding: 16, textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(10,44,90,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                                        <FileText size={20} style={{ color: 'var(--admin-primary)' }} />
                                    </div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>{doc}</div>
                                    <div style={{ fontSize: 10, color: 'var(--admin-primary)', fontWeight: 800, marginTop: 4 }}>VIEW PREVIEW</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {kyc.status === 'Pending' && (
                        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 12, background: 'var(--admin-bg)', borderRadius: '0 0 24px 24px' }}>
                            <button className="admin-btn admin-btn-danger" style={{ flex: 1, justifyContent: 'center', gap: 8 }} onClick={() => { onReject(kyc.id); onClose(); }}>
                                <XCircle size={15} /> Reject
                            </button>
                            <button className="admin-btn admin-btn-success" style={{ flex: 1, justifyContent: 'center', gap: 8 }} onClick={() => { onApprove(kyc.id); onClose(); }}>
                                <CheckCircle size={15} /> Approve
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const AdminKYC = () => {
    const [kycs, setKycs] = useState(kycData);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [selectedKyc, setSelectedKyc] = useState(null);

    const handleApprove = (id) => setKycs(prev => prev.map(k => k.id === id ? { ...k, status: 'Verified' } : k));
    const handleReject = (id) => setKycs(prev => prev.map(k => k.id === id ? { ...k, status: 'Rejected' } : k));

    const filtered = kycs.filter(k => {
        const matchSearch = k.name.toLowerCase().includes(search.toLowerCase()) || k.id.includes(search);
        const matchFilter = filter === 'All' || k.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="admin-page-title">KYC Verification</h1>
                    <p className="admin-page-subtitle">Review and approve user identity documents</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
                {['All', 'Pending', 'Verified', 'Rejected'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`admin-btn ${filter === f ? 'admin-btn-primary' : 'admin-btn-ghost'}`} style={{ borderRadius: 10, fontSize: 13 }}>
                        {f} ({f === 'All' ? kycs.length : kycs.filter(k => k.status === f).length})
                    </button>
                ))}
                <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid var(--admin-border)', borderRadius: 10, padding: '0 14px' }}>
                    <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
                    <input className="admin-input" placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', boxShadow: 'none' }} />
                </div>
            </div>

            <div className="admin-card">
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr><th>ID</th><th>User</th><th>Type</th><th>Location</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(kyc => (
                                <tr key={kyc.id}>
                                    <td style={{ fontWeight: 800, color: 'var(--admin-primary)', fontSize: 12 }}>{kyc.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)', color: 'white', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {kyc.avatar}
                                            </div>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{kyc.name}</span>
                                        </div>
                                    </td>
                                    <td><span style={{ fontSize: 12, fontWeight: 600 }}>{kyc.type}</span></td>
                                    <td style={{ fontSize: 12 }}>{kyc.city}</td>
                                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{kyc.date}</td>
                                    <td><span className={`badge ${statusColors[kyc.status]}`}>{kyc.status}</span></td>
                                    <td>
                                        <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setSelectedKyc(kyc)}>
                                            <Eye size={13} /> {kyc.status === 'Pending' ? 'Review' : 'View'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <KYCModal kyc={selectedKyc} onClose={() => setSelectedKyc(null)} onApprove={handleApprove} onReject={handleReject} />
        </div>
    );
};

export default AdminKYC;
