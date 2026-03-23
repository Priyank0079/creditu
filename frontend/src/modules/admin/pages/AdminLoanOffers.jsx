import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X, Eye, EyeOff, Layout, CreditCard, IndianRupee, TrendingUp, Info } from 'lucide-react';
import { featuredLoansData } from '../utils/dummyData';

const AdminLoanOffers = () => {
    const [offers, setOffers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        rate: '',
        gradient: 'blue',
        status: 'Active',
        description: ''
    });

    useEffect(() => {
        const stored = localStorage.getItem('loanOffersData');
        if (stored) {
            setOffers(JSON.parse(stored));
        } else {
            setOffers(featuredLoansData);
            localStorage.setItem('loanOffersData', JSON.stringify(featuredLoansData));
        }
    }, []);

    const saveToLocal = (updated) => {
        localStorage.setItem('loanOffersData', JSON.stringify(updated));
        setOffers(updated);
        window.dispatchEvent(new Event('storage'));
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();
        let updated;
        if (editingOffer) {
            updated = offers.map(o => o.id === editingOffer.id ? { ...formData, id: o.id } : o);
        } else {
            const newOffer = {
                ...formData,
                id: Date.now()
            };
            updated = [...offers, newOffer];
        }
        saveToLocal(updated);
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this loan offer?')) {
            const updated = offers.filter(o => o.id !== id);
            saveToLocal(updated);
        }
    };

    const openModal = (offer = null) => {
        if (offer) {
            setEditingOffer(offer);
            setFormData({ ...offer });
        } else {
            setEditingOffer(null);
            setFormData({
                type: '',
                amount: '',
                rate: '',
                gradient: 'blue',
                status: 'Active',
                description: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingOffer(null);
    };

    return (
        <div style={{ paddingBottom: 40 }}>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="admin-page-title">Loan Offer Management</h1>
                    <p className="admin-page-subtitle">Configure featured loan cards shown on user dashboard</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => openModal()} style={{ borderRadius: 12 }}>
                    <Plus size={18} /> Add New Offer
                </button>
            </div>

            <div className="admin-card">
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Offer Details</th>
                                <th>Max Limit</th>
                                <th>Interest</th>
                                <th>Style</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map((offer) => (
                                <tr key={offer.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10,
                                                background: offer.gradient === 'blue' ? '#0B3C6D' :
                                                    offer.gradient === 'gold' ? '#F4A100' :
                                                        offer.gradient === 'green' ? '#00A651' :
                                                            offer.gradient === 'purple' ? '#7c3aed' :
                                                                offer.gradient === 'red' ? '#ef4444' :
                                                                    offer.gradient === 'orange' ? '#f97316' :
                                                                        offer.gradient === 'pink' ? '#ec4899' :
                                                                            offer.gradient === 'indigo' ? '#4f46e5' :
                                                                                offer.gradient === 'teal' ? '#0d9488' :
                                                                                    '#1e293b',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                            }}>
                                                <CreditCard size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 13, fontWeight: 700 }}>{offer.type}</div>
                                                <div style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>{offer.description.substring(0, 40)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span style={{ fontWeight: 800 }}>₹{offer.amount}</span></td>
                                    <td><span style={{ fontWeight: 800 }}>{offer.rate}% p.a.</span></td>
                                    <td>
                                        <span style={{
                                            fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                                            padding: '4px 10px', borderRadius: 6, background: 'var(--admin-bg)',
                                            color: offer.gradient === 'blue' ? '#0B3C6D' :
                                                offer.gradient === 'gold' ? '#F4A100' :
                                                    offer.gradient === 'green' ? '#00A651' :
                                                        offer.gradient === 'purple' ? '#7c3aed' :
                                                            offer.gradient === 'red' ? '#ef4444' :
                                                                offer.gradient === 'orange' ? '#f97316' :
                                                                    offer.gradient === 'pink' ? '#ec4899' :
                                                                        offer.gradient === 'indigo' ? '#4f46e5' :
                                                                            offer.gradient === 'teal' ? '#0d9488' :
                                                                                '#1e293b'
                                        }}>
                                            {offer.gradient}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${offer.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                                            {offer.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => openModal(offer)}>
                                                <Edit3 size={14} />
                                            </button>
                                            <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(offer.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="admin-modal-overlay" onClick={closeModal}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="admin-modal"
                            style={{ maxWidth: 500, padding: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{editingOffer ? 'Edit Loan Offer' : 'New Loan Offer'}</h3>
                                <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)' }}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleAddOrUpdate} style={{ padding: 24 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Loan Type / Title</label>
                                        <div style={{ position: 'relative' }}>
                                            <Layout size={14} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} placeholder="e.g. Personal Loan" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Max Amount</label>
                                        <div style={{ position: 'relative' }}>
                                            <IndianRupee size={14} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} placeholder="e.g. 5,00,000" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Interest Rate (%)</label>
                                        <div style={{ position: 'relative' }}>
                                            <TrendingUp size={14} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.rate} onChange={e => setFormData({ ...formData, rate: e.target.value })} placeholder="e.g. 9.3" required />
                                        </div>
                                    </div>

                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Card Theme (Gradient)</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                                            {[
                                                { id: 'blue', color: '#0B3C6D' },
                                                { id: 'gold', color: '#F4A100' },
                                                { id: 'green', color: '#00A651' },
                                                { id: 'purple', color: '#7c3aed' },
                                                { id: 'red', color: '#ef4444' },
                                                { id: 'orange', color: '#f97316' },
                                                { id: 'pink', color: '#ec4899' },
                                                { id: 'indigo', color: '#4f46e5' },
                                                { id: 'teal', color: '#0d9488' },
                                                { id: 'slate', color: '#1e293b' }
                                            ].map(g => (
                                                <button
                                                    key={g.id} type="button"
                                                    onClick={() => setFormData({ ...formData, gradient: g.id })}
                                                    title={g.id}
                                                    style={{
                                                        height: 36, borderRadius: 8, border: formData.gradient === g.id ? '2px solid black' : '1px solid var(--admin-border)',
                                                        background: g.color,
                                                        color: 'white', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}
                                                >
                                                    {formData.gradient === g.id && <Save size={12} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Display Status</label>
                                        <select className="admin-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="Active">Active</option>
                                            <option value="Coming Soon">Coming Soon</option>
                                            <option value="Disabled">Disabled</option>
                                        </select>
                                    </div>

                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Description</label>
                                        <div style={{ position: 'relative' }}>
                                            <Info size={14} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--admin-text-muted)' }} />
                                            <textarea className="admin-input" style={{ paddingLeft: 38, minHeight: 80, resize: 'none' }} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Short description for the card..." required />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                    <button type="button" className="admin-btn admin-btn-ghost" onClick={closeModal}>Cancel</button>
                                    <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '10px 30px' }}>
                                        <Save size={18} /> {editingOffer ? 'Update Offer' : 'Save Offer'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLoanOffers;
