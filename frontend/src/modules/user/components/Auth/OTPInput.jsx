import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OTPInput = ({ value, onChange, error }) => {
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        // Find the first empty input to focus
        const firstEmptyIndex = value.findIndex(v => v === "");
        if (firstEmptyIndex !== -1 && firstEmptyIndex < inputRefs.length) {
            inputRefs[firstEmptyIndex].current?.focus();
        }
    }, []);

    const handleChange = (index, val) => {
        const newVal = [...value];
        const digit = val.slice(-1); // Only keep the last character

        if (digit && !/^\d$/.test(digit)) return;

        newVal[index] = digit;
        onChange(newVal);

        // Move to next input if we entered a digit
        if (digit && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <div className="flex justify-between gap-4 py-4">
            {value.map((digit, index) => (
                <motion.input
                    key={index}
                    ref={inputRefs[index]}
                    whileFocus={{ scale: 1.05 }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-16 bg-white/5 border-2 ${error ? 'border-red-500/50' : digit ? 'border-trust/50' : 'border-white/10 focus:border-gold/50'} rounded-2xl text-center text-2xl font-bold text-white outline-none transition-all focus:bg-white/10`}
                />
            ))}
        </div>
    );
};

export default OTPInput;
