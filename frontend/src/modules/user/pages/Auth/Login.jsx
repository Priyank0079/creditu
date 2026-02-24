import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout.jsx';
import Button from '../../components/common/Button.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
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
                    <h1 className="text-3xl font-black text-primary mb-2">Welcome Back</h1>
                    <p className="text-textSecondary font-medium">Log in to manage your loan accounts.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Email Field */}
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

                        {/* Password Field */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest leading-none mb-2 block ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textSecondary group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-primary placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-soft"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-textSecondary hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-5 h-5 border-2 border-border rounded-md flex items-center justify-center group-hover:border-primary transition-colors bg-white">
                                <input type="checkbox" className="hidden peer" />
                                <div className="w-2.5 h-2.5 bg-primary rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xs font-bold text-textSecondary">Remember me</span>
                        </label>
                        <Link to="/forgot-password" title="Coming Soon" className="text-xs font-bold text-gold hover:text-gold-dark transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-5 rounded-2xl shadow-premium"
                        isLoading={isLoading}
                    >
                        <span className="flex items-center justify-center gap-2">
                            Log In <ArrowRight size={18} />
                        </span>
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm font-medium text-textSecondary">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-black hover:underline underline-offset-4">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </AuthLayout>
    );
};

export default Login;
