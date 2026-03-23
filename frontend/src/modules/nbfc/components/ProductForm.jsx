import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const emptyForm = {
    productName: '',
    loanType: 'Personal',
    minAmount: '',
    maxAmount: '',
    tenureMonths: '',
    processingFee: '',
    baseInterestRate: '',
    interestType: 'Fixed',
    latePaymentPenalty: '',
};

const ProductForm = ({ initialValues, onSubmit, onCancelEdit, isEditing }) => {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        setForm(initialValues || emptyForm);
    }, [initialValues]);

    const effectiveInterest = useMemo(() => {
        const base = Number(form.baseInterestRate || 0);
        const fee = Number(form.processingFee || 0);
        return (base + fee / 12).toFixed(2);
    }, [form.baseInterestRate, form.processingFee]);

    const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

    const submit = (e) => {
        e.preventDefault();
        onSubmit({ ...form, effectiveInterest });
        if (!isEditing) setForm(emptyForm);
    };

    return (
        <form className="nbfc-card nbfc-card-pad" onSubmit={submit}>
            <div className="nbfc-grid-2">
                <div>
                    <label className="nbfc-label">Product Name</label>
                    <input className="nbfc-input" value={form.productName} onChange={(e) => setField('productName', e.target.value)} required />
                </div>
                <div>
                    <label className="nbfc-label">Loan Type</label>
                    <select className="nbfc-select" value={form.loanType} onChange={(e) => setField('loanType', e.target.value)}>
                        <option>Personal</option>
                        <option>Business</option>
                        <option>Gold</option>
                        <option>Vehicle</option>
                    </select>
                </div>
                <div>
                    <label className="nbfc-label">Min Amount</label>
                    <input className="nbfc-input" type="number" value={form.minAmount} onChange={(e) => setField('minAmount', e.target.value)} required />
                </div>
                <div>
                    <label className="nbfc-label">Max Amount</label>
                    <input className="nbfc-input" type="number" value={form.maxAmount} onChange={(e) => setField('maxAmount', e.target.value)} required />
                </div>
                <div>
                    <label className="nbfc-label">Tenure (Months)</label>
                    <input className="nbfc-input" type="number" value={form.tenureMonths} onChange={(e) => setField('tenureMonths', e.target.value)} required />
                </div>
                <div>
                    <label className="nbfc-label">Processing Fee (%)</label>
                    <input className="nbfc-input" type="number" step="0.01" value={form.processingFee} onChange={(e) => setField('processingFee', e.target.value)} required />
                </div>
                <div>
                    <label className="nbfc-label">Base Interest Rate (%)</label>
                    <input className="nbfc-input" type="number" step="0.01" value={form.baseInterestRate} onChange={(e) => setField('baseInterestRate', e.target.value)} required />
                </div>
                <div>
                    <label className="nbfc-label">Interest Type</label>
                    <select className="nbfc-select" value={form.interestType} onChange={(e) => setField('interestType', e.target.value)}>
                        <option>Fixed</option>
                        <option>Reducing</option>
                    </select>
                </div>
                <div>
                    <label className="nbfc-label">Late Payment Penalty (%)</label>
                    <input className="nbfc-input" type="number" step="0.01" value={form.latePaymentPenalty} onChange={(e) => setField('latePaymentPenalty', e.target.value)} required />
                </div>
                <div className="nbfc-card" style={{ padding: 14, background: 'linear-gradient(135deg, #edf5ff 0%, #ffffff 100%)' }}>
                    <p style={{ margin: 0, fontSize: 12, color: '#64748b', fontWeight: 700 }}>Live Preview</p>
                    <p style={{ margin: '6px 0 0', color: '#0a2c5a', fontWeight: 800 }}>Effective Interest: {effectiveInterest}%</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="nbfc-btn nbfc-btn-primary" type="submit">
                    {isEditing ? 'Update Product' : 'Create Product'}
                </motion.button>
                {isEditing ? (
                    <button className="nbfc-btn nbfc-btn-secondary" type="button" onClick={onCancelEdit}>
                        Cancel Edit
                    </button>
                ) : null}
            </div>
        </form>
    );
};

export default ProductForm;
