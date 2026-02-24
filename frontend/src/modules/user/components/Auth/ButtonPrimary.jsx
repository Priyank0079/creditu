import React from 'react';
import { motion } from 'framer-motion';

const ButtonPrimary = ({ children, onClick, disabled, type = "button", className = "" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`w-full bg-gold text-primary-dark py-4 rounded-2xl font-bold text-lg shadow-premium hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default ButtonPrimary;
