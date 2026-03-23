import React from 'react';
import { motion } from 'framer-motion';

const View = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="nbfc-card nbfc-card-pad"
        >
            <h2 className="text-xl font-bold text-[#0a2c5a] mb-4">View Analytics</h2>
            <p className="text-gray-500 mb-6">Explore detailed performance metrics and operational data for your NBFC branch.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { label: 'Total Volume', value: '4.2Cr', sub: '+12% from last month' },
                    { label: 'Success Rate', value: '94.2%', sub: 'Avg processing speed: 4h' },
                    { label: 'Active Users', value: '1,286', sub: 'New users today: +24' },
                ].map((stat, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#f8fbff] border border-[#e7eef8]">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-[#0a2c5a]">{stat.value}</p>
                        <p className="text-[11px] text-[#00A651] font-bold mt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default View;
