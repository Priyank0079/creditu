import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SuccessAnimation = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-trust/20 p-4 rounded-full"
            >
                <CheckCircle2 size={80} className="text-trust" strokeWidth={1.5} />
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-white text-xl font-bold"
            >
                Verified Successfully
            </motion.p>
        </div>
    );
};

export default SuccessAnimation;
