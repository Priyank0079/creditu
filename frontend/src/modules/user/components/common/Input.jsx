import React from 'react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-primary transition-colors">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`w-full px-5 py-4 rounded-[20px] border-2 bg-white text-primary font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-gray-300 ${Icon ? 'pl-12' : ''
                        } ${error ? 'border-red-500' : 'border-border group-hover:border-gray-300'
                        }`}
                    {...props}
                />
            </div>
            {error && <span className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error}</span>}
        </div>
    );
};

export default Input;
