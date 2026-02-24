import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout.jsx';
import Button from '../../components/common/Button.jsx';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration
        setTimeout(() => {
            setIsLoading(false);
            navigate('/kyc');
        }, 1500);
    };

    return (
        <AuthLayout>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
            >
                <div>
                    <h1 className="text-3xl font-black text-primary mb-2">Get Started</h1>
                    <p className="text-textSecondary font-medium">Create an account to check your loan eligibility.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest leading-none mb-2 block ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textSecondary group-focus-within:text-primary transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Aman Singh"
                                    required
                                    className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-primary placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-soft"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest leading-none mb-2 block ml-1">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textSecondary group-focus-within:text-primary transition-colors">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    required
                                    className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-primary placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-soft"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest leading-none mb-2 block ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textSecondary group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="aman@example.com"
                                    required
                                    className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-primary placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-soft"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest leading-none mb-2 block ml-1">
                                Create Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textSecondary group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-primary placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-soft"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="pt-1">
                            <ShieldCheck size={16} className="text-trust" />
                        </div>
                        <p className="text-[11px] text-textSecondary font-medium leading-relaxed">
                            By creating an account, you agree to our <span className="text-primary font-bold decoration-gold/30 underline underline-offset-2">Terms of Service</span> and <span className="text-primary font-bold decoration-gold/30 underline underline-offset-2">Privacy Policy</span>.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-5 rounded-2xl shadow-premium"
                        isLoading={isLoading}
                    >
                        <span className="flex items-center justify-center gap-2">
                            Create Free Account <ArrowRight size={18} />
                        </span>
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm font-medium text-textSecondary">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </AuthLayout>
    );
};

export default Register;
