import React from 'react';
import { motion } from 'framer-motion';

const SummaryCards = ({ stats }) => {
    return (
        <div className="nbfc-grid-4">
            {stats.map((item) => (
                <motion.article
                    key={item.label}
                    className="nbfc-card nbfc-card-pad"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                >
                    <p style={{ margin: 0, color: '#64748b', fontSize: 12, fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: '8px 0 0', color: '#0a2c5a', fontSize: 30, fontWeight: 800 }}>{item.value}</p>
                </motion.article>
            ))}
        </div>
    );
};

export default SummaryCards;
