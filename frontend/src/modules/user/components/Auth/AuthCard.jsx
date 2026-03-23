import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthCard = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] shadow-premium relative overflow-hidden"
        >
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
                {children}
            </AnimatePresence>
        </motion.div>
    );
};

export default AuthCard;
