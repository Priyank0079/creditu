import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const statusClassMap = {
    Pending: 'nbfc-badge nbfc-badge-pending',
    Approved: 'nbfc-badge nbfc-badge-approved',
    Rejected: 'nbfc-badge nbfc-badge-rejected',
};

const LoanTable = ({ rows, type = 'recent', onApprove, onReject, highlightId }) => {
    return (
        <div className="nbfc-table-wrap">
            <table className="nbfc-table">
                <thead>
                    <tr>
                        <th>Applicant Name</th>
                        <th>Loan Type</th>
                        <th>Amount</th>
                        <th>CIBIL Score</th>
                        <th>Status</th>
                        {type === 'applications' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence initial={false}>
                        {rows.map((row) => (
                            <motion.tr
                                key={row.id}
                                layout
                                initial={{ opacity: 0, y: 8 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    backgroundColor: highlightId === row.id ? 'rgba(22, 163, 74, 0.10)' : 'rgba(255,255,255,1)',
                                }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.24 }}
                                style={{ transition: 'background-color 500ms ease' }}
                            >
                                <td>{row.applicantName}</td>
                                <td>{row.loanType}</td>
                                <td>{row.amount}</td>
                                <td>{row.cibilScore}</td>
                                <td>
                                    <span className={statusClassMap[row.status] || 'nbfc-badge'}>{row.status}</span>
                                </td>
                                {type === 'applications' && (
                                    <td>
                                        {row.status === 'Pending' ? (
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <motion.button
                                                    type="button"
                                                    className="nbfc-btn nbfc-btn-primary"
                                                    style={{ padding: '8px 10px', fontSize: 12, background: '#16a34a' }}
                                                    whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(22,163,74,0.14)' }}
                                                    onClick={() => onApprove(row)}
                                                >
                                                    Approve
                                                </motion.button>
                                                <motion.button
                                                    type="button"
                                                    className="nbfc-btn nbfc-btn-danger"
                                                    style={{ padding: '8px 10px', fontSize: 12 }}
                                                    whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(220,38,38,0.14)' }}
                                                    onClick={() => onReject(row)}
                                                >
                                                    Reject
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>No actions</span>
                                        )}
                                    </td>
                                )}
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
};

export default LoanTable;
