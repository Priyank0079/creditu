import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const docOptions = ['PAN', 'Aadhaar', 'Bank Statement', 'Salary Slip', 'Address Proof'];

const EligibilityRules = ({ onSave }) => {
    const [rules, setRules] = useState({
        minimumSalary: '',
        minimumCibil: '',
        ageMin: '',
        ageMax: '',
        employmentType: 'Salaried',
        requiredDocuments: ['PAN', 'Aadhaar'],
    });

    const summary = useMemo(
        () =>
            `Salary >= ${rules.minimumSalary || '-'} | CIBIL >= ${rules.minimumCibil || '-'} | Age ${rules.ageMin || '-'}-${
                rules.ageMax || '-'
            } | ${rules.employmentType} | Docs: ${rules.requiredDocuments.join(', ') || '-'}`,
        [rules]
    );

    const setField = (key, value) => setRules((prev) => ({ ...prev, [key]: value }));

    const toggleDoc = (doc) => {
        setRules((prev) => {
            const exists = prev.requiredDocuments.includes(doc);
            return {
                ...prev,
                requiredDocuments: exists
                    ? prev.requiredDocuments.filter((d) => d !== doc)
                    : [...prev.requiredDocuments, doc],
            };
        });
    };

    return (
        <section className="nbfc-card nbfc-card-pad">
            <h3 style={{ margin: 0, color: '#0a2c5a' }}>Eligibility Rules</h3>
            <div className="nbfc-grid-2" style={{ marginTop: 12 }}>
                <div>
                    <label className="nbfc-label">Minimum Salary</label>
                    <input className="nbfc-input" type="number" value={rules.minimumSalary} onChange={(e) => setField('minimumSalary', e.target.value)} />
                </div>
                <div>
                    <label className="nbfc-label">Minimum CIBIL Score</label>
                    <input className="nbfc-input" type="number" value={rules.minimumCibil} onChange={(e) => setField('minimumCibil', e.target.value)} />
                </div>
                <div>
                    <label className="nbfc-label">Age Min</label>
                    <input className="nbfc-input" type="number" value={rules.ageMin} onChange={(e) => setField('ageMin', e.target.value)} />
                </div>
                <div>
                    <label className="nbfc-label">Age Max</label>
                    <input className="nbfc-input" type="number" value={rules.ageMax} onChange={(e) => setField('ageMax', e.target.value)} />
                </div>
                <div>
                    <label className="nbfc-label">Employment Type</label>
                    <select className="nbfc-select" value={rules.employmentType} onChange={(e) => setField('employmentType', e.target.value)}>
                        <option>Salaried</option>
                        <option>Self Employed</option>
                        <option>Freelancer</option>
                    </select>
                </div>
                <div>
                    <label className="nbfc-label">Required Documents</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 8 }}>
                        {docOptions.map((doc) => (
                            <label key={doc} style={{ fontSize: 12, color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <input type="checkbox" checked={rules.requiredDocuments.includes(doc)} onChange={() => toggleDoc(doc)} />
                                {doc}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div layout className="nbfc-card" style={{ marginTop: 14, padding: 12, background: '#f8fbff' }}>
                <p style={{ margin: 0, color: '#64748b', fontSize: 12, fontWeight: 700 }}>Rule Summary Preview</p>
                <p style={{ margin: '6px 0 0', color: '#0a2c5a', fontSize: 13, fontWeight: 700 }}>{summary}</p>
            </motion.div>

            <div style={{ marginTop: 12 }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="nbfc-btn nbfc-btn-primary" type="button" onClick={() => onSave(rules)}>
                    Save Rules
                </motion.button>
            </div>
        </section>
    );
};

export default EligibilityRules;
