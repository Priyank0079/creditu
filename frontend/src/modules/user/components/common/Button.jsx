import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', isLoading = false, disabled, ...props }) => {
    const variants = {
        primary: "bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary-dark",
        secondary: "bg-white text-primary border-2 border-primary hover:bg-primary/5",
        gold: "bg-gold text-white shadow-xl shadow-gold/20 hover:bg-gold-dark",
        outline: "border-2 border-border text-textPrimary hover:bg-gray-50",
        ghost: "text-textSecondary hover:bg-gray-100",
    };

    return (
        <motion.button
            whileTap={!isLoading && !disabled ? { scale: 0.96 } : {}}
            whileHover={!isLoading && !disabled ? { y: -1 } : {}}
            disabled={isLoading || disabled}
            className={`px-6 py-4 rounded-[20px] font-black transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 relative overflow-hidden ${variants[variant]} ${className}`}
            {...props}
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 className="animate-spin" size={18} />
                        <span>Processing...</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default Button;
