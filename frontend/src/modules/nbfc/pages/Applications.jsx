import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoanTable from '../components/LoanTable';

const mockApplications = [
    { id: 101, applicantName: 'Neeraj Arora', loanType: 'Personal', amount: 'Rs 2,20,000', cibilScore: 734, status: 'Pending' },
    { id: 102, applicantName: 'Pooja Iyer', loanType: 'Business', amount: 'Rs 9,40,000', cibilScore: 781, status: 'Approved' },
    { id: 103, applicantName: 'Tariq Khan', loanType: 'Vehicle', amount: 'Rs 6,10,000', cibilScore: 695, status: 'Pending' },
    { id: 104, applicantName: 'Lavanya Das', loanType: 'Gold', amount: 'Rs 1,50,000', cibilScore: 726, status: 'Rejected' },
    { id: 105, applicantName: 'Aman Pratap', loanType: 'Personal', amount: 'Rs 4,40,000', cibilScore: 758, status: 'Pending' },
];

const filters = ['All', 'Pending', 'Approved', 'Rejected'];

const Applications = () => {
    const [rows, setRows] = useState(mockApplications);
    const [activeFilter, setActiveFilter] = useState('All');
    const [pendingAction, setPendingAction] = useState(null);
    const [highlightId, setHighlightId] = useState(null);

    const filteredRows = useMemo(
        () => (activeFilter === 'All' ? rows : rows.filter((r) => r.status === activeFilter)),
        [rows, activeFilter]
    );

    const confirmAction = () => {
        if (!pendingAction) return;
        setRows((prev) => prev.map((row) => (row.id === pendingAction.row.id ? { ...row, status: pendingAction.nextStatus } : row)));
        setHighlightId(pendingAction.row.id);
        setPendingAction(null);
        setTimeout(() => setHighlightId(null), 1100);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <section className="nbfc-card nbfc-card-pad">
                <p style={{ margin: 0, color: '#0a2c5a', fontWeight: 800 }}>Loan Applications</p>
                <p style={{ margin: '4px 0 12px', color: '#64748b', fontSize: 12 }}>Filter and act on pending applications</p>
                <div className="nbfc-filter-row" style={{ marginBottom: 12 }}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`nbfc-btn ${activeFilter === filter ? 'nbfc-btn-primary' : 'nbfc-btn-secondary'}`}
                            style={{ width: 'auto', padding: '8px 12px' }}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <LoanTable
                    type="applications"
                    rows={filteredRows}
                    highlightId={highlightId}
                    onApprove={(row) => setPendingAction({ row, nextStatus: 'Approved' })}
                    onReject={(row) => setPendingAction({ row, nextStatus: 'Rejected' })}
                />
            </section>

            <AnimatePresence>
                {pendingAction ? (
                    <motion.div className="nbfc-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="nbfc-modal" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}>
                            <h3 style={{ marginTop: 0, color: '#0a2c5a' }}>
                                Confirm {pendingAction.nextStatus}
                            </h3>
                            <p style={{ color: '#475569', fontSize: 13 }}>
                                Update <strong>{pendingAction.row.applicantName}</strong> status to <strong>{pendingAction.nextStatus}</strong>?
                            </p>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                                <button className="nbfc-btn nbfc-btn-primary" onClick={confirmAction}>
                                    Confirm
                                </button>
                                <button className="nbfc-btn nbfc-btn-secondary" onClick={() => setPendingAction(null)}>
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
};

export default Applications;
