import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const MobileInput = ({ value, onChange, error }) => {
    return (
        <div className="space-y-4">
            <label className="text-white/60 text-sm font-medium ml-1">Enter Mobile Number</label>
            <div className="relative group">
                <div className={`absolute inset-y-0 left-5 flex items-center transition-colors ${error ? 'text-red-400' : 'text-white/40 group-focus-within:text-gold'}`}>
                    <Phone size={20} />
                </div>
                <input
                    autoFocus
                    type="tel"
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        onChange(val);
                    }}
                    placeholder="Enter your mobile number"
                    className={`w-full bg-white/5 border-2 ${error ? 'border-red-500/50' : 'border-white/10 focus:border-gold/50'} rounded-2xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-white/20 outline-none transition-all focus:bg-white/10`}
                />
            </div>
        </div>
    );
};

export default MobileInput;
