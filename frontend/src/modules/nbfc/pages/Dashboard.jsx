import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SummaryCards from '../components/SummaryCards';
import LoanTable from '../components/LoanTable';

const chartData = [16, 22, 18, 29, 25, 36, 31, 42];

const recentApplications = [
    { id: 1, applicantName: 'Rahul Mehta', loanType: 'Personal', amount: 'Rs 2,50,000', cibilScore: 742, status: 'Pending' },
    { id: 2, applicantName: 'Sneha Nair', loanType: 'Business', amount: 'Rs 8,00,000', cibilScore: 771, status: 'Approved' },
    { id: 3, applicantName: 'Karan Bedi', loanType: 'Vehicle', amount: 'Rs 5,20,000', cibilScore: 689, status: 'Pending' },
    { id: 4, applicantName: 'Anita Shah', loanType: 'Gold', amount: 'Rs 1,10,000', cibilScore: 728, status: 'Rejected' },
    { id: 5, applicantName: 'Ritesh Sinha', loanType: 'Personal', amount: 'Rs 3,40,000', cibilScore: 754, status: 'Approved' },
];

const Dashboard = () => {
    const stats = useMemo(
        () => [
            { label: 'Total Applications', value: '1,286' },
            { label: 'Approved Loans', value: '924' },
            { label: 'Rejected Loans', value: '187' },
            { label: 'Active Products', value: '12' },
        ],
        []
    );

    const maxValue = Math.max(...chartData);
    const path = chartData
        .map((v, i) => {
            const x = (i / (chartData.length - 1)) * 100;
            const y = 100 - (v / maxValue) * 100;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <SummaryCards stats={stats} />

            <div className="nbfc-grid-2" style={{ marginTop: 14 }}>
                <section className="nbfc-card nbfc-card-pad">
                    <p style={{ margin: 0, color: '#0a2c5a', fontWeight: 800 }}>Application Trend</p>
                    <p style={{ margin: '4px 0 14px', color: '#64748b', fontSize: 12 }}>Last 8 periods</p>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: 180 }}>
                        <defs>
                            <linearGradient id="nbfcLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0a2c5a" />
                                <stop offset="100%" stopColor="#1d70c5" />
                            </linearGradient>
                        </defs>
                        <polyline fill="none" stroke="url(#nbfcLine)" strokeWidth="2.5" points={path} />
                    </svg>
                </section>

                <section className="nbfc-card nbfc-card-pad">
                    <p style={{ margin: 0, color: '#0a2c5a', fontWeight: 800 }}>Approval Health</p>
                    <p style={{ margin: '4px 0 10px', color: '#64748b', fontSize: 12 }}>Current distribution</p>
                    <div style={{ display: 'grid', gap: 10 }}>
                        <div style={{ background: '#ecfdf3', borderRadius: 12, padding: 12, color: '#047857', fontWeight: 700 }}>Approved: 71.8%</div>
                        <div style={{ background: '#fff7ed', borderRadius: 12, padding: 12, color: '#c2410c', fontWeight: 700 }}>Pending: 13.6%</div>
                        <div style={{ background: '#fef2f2', borderRadius: 12, padding: 12, color: '#b91c1c', fontWeight: 700 }}>Rejected: 14.6%</div>
                    </div>
                </section>
            </div>

            <section className="nbfc-card nbfc-card-pad" style={{ marginTop: 14 }}>
                <p style={{ margin: 0, color: '#0a2c5a', fontWeight: 800 }}>Recent Applications</p>
                <p style={{ margin: '4px 0 12px', color: '#64748b', fontSize: 12 }}>Latest 5 records</p>
                <LoanTable rows={recentApplications} type="recent" />
            </section>
        </motion.div>
    );
};

export default Dashboard;
