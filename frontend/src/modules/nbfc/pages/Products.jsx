import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductForm from '../components/ProductForm';
import EligibilityRules from '../components/EligibilityRules';

const initialProducts = [
    {
        id: 1,
        productName: 'Prime Personal Loan',
        loanType: 'Personal',
        effectiveInterest: '13.20',
        tenureMonths: '36',
        status: 'Active',
        baseInterestRate: '12.8',
        processingFee: '4.8',
        minAmount: '50000',
        maxAmount: '500000',
        interestType: 'Reducing',
        latePaymentPenalty: '2.0',
    },
    {
        id: 2,
        productName: 'SME Growth Loan',
        loanType: 'Business',
        effectiveInterest: '14.10',
        tenureMonths: '48',
        status: 'Inactive',
        baseInterestRate: '13.7',
        processingFee: '4.8',
        minAmount: '200000',
        maxAmount: '2500000',
        interestType: 'Fixed',
        latePaymentPenalty: '2.5',
    },
];

const Products = () => {
    const [products, setProducts] = useState(initialProducts);
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [savedRules, setSavedRules] = useState(null);

    const editingProduct = useMemo(() => products.find((p) => p.id === editingId), [products, editingId]);

    const handleSaveProduct = (payload) => {
        if (editingId) {
            setProducts((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? { ...item, ...payload, status: item.status }
                        : item
                )
            );
            setEditingId(null);
            return;
        }
        setProducts((prev) => [{ id: Date.now(), ...payload, status: 'Active' }, ...prev]);
    };

    const confirmDelete = () => {
        setProducts((prev) => prev.filter((p) => p.id !== deletingId));
        setDeletingId(null);
    };

    const toggleStatus = (id) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p))
        );
    };

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="nbfc-grid-2">
                <ProductForm
                    initialValues={editingProduct}
                    onSubmit={handleSaveProduct}
                    isEditing={Boolean(editingId)}
                    onCancelEdit={() => setEditingId(null)}
                />
                <EligibilityRules onSave={(rules) => setSavedRules(rules)} />
            </div>

            {savedRules ? (
                <section className="nbfc-card nbfc-card-pad" style={{ marginTop: 14 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#64748b' }}>Saved Rule Snapshot</p>
                    <p style={{ margin: '6px 0 0', fontWeight: 700, color: '#0a2c5a', fontSize: 13 }}>
                        Salary {savedRules.minimumSalary || '-'} | CIBIL {savedRules.minimumCibil || '-'} | {savedRules.employmentType}
                    </p>
                </section>
            ) : null}

            <section className="nbfc-card nbfc-card-pad" style={{ marginTop: 14 }}>
                <p style={{ margin: 0, color: '#0a2c5a', fontWeight: 800 }}>Configured Products</p>
                <p style={{ margin: '4px 0 12px', color: '#64748b', fontSize: 12 }}>Manage product lifecycle and pricing controls</p>
                <div className="nbfc-table-wrap">
                    <table className="nbfc-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Loan Type</th>
                                <th>Interest Rate</th>
                                <th>Tenure</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <motion.tr key={item.id} layout whileHover={{ backgroundColor: '#f8fbff' }}>
                                    <td>{item.productName}</td>
                                    <td>{item.loanType}</td>
                                    <td>{item.effectiveInterest}%</td>
                                    <td>{item.tenureMonths} months</td>
                                    <td>
                                        <motion.button
                                            type="button"
                                            className="nbfc-switch"
                                            style={{ background: item.status === 'Active' ? '#16a34a' : '#94a3b8' }}
                                            onClick={() => toggleStatus(item.id)}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <motion.span
                                                className="nbfc-switch-dot"
                                                animate={{ x: item.status === 'Active' ? 20 : 0 }}
                                                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                                            />
                                        </motion.button>
                                    </td>
                                    <td>
                                        <button className="nbfc-btn nbfc-btn-secondary" style={{ width: 'auto', padding: '8px 10px' }} onClick={() => setEditingId(item.id)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button className="nbfc-btn nbfc-btn-danger" style={{ width: 'auto', padding: '8px 10px' }} onClick={() => setDeletingId(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <AnimatePresence>
                {deletingId ? (
                    <motion.div className="nbfc-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="nbfc-modal" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
                            <h3 style={{ marginTop: 0, color: '#0a2c5a' }}>Delete Product?</h3>
                            <p style={{ color: '#475569', fontSize: 13 }}>This action removes the product from the local mock list.</p>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                                <button className="nbfc-btn nbfc-btn-danger" onClick={confirmDelete}>Confirm Delete</button>
                                <button className="nbfc-btn nbfc-btn-secondary" onClick={() => setDeletingId(null)}>Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
};

export default Products;
