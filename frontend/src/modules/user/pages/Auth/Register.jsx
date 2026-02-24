import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout.jsx';

const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="group">
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.12em] mb-2 ml-1">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#F4A100] transition-colors duration-200">
                <Icon size={17} />
            </div>
            <input
                {...props}
                className="w-full bg-[#F8F9FC] border-2 border-gray-100 group-focus-within:border-[#F4A100] group-focus-within:bg-white rounded-2xl py-[14px] pl-11 pr-4 text-sm font-semibold text-[#0A2C5A] placeholder:text-gray-300 focus:outline-none transition-all duration-200"
            />
        </div>
    </div>
);

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/kyc');
        }, 1500);
    };

    return (
        <AuthLayout>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

                {/* Heading */}
                <div className="mb-7">
                    <h1 className="text-[26px] font-black text-[#0A2C5A] leading-tight mb-1">
                        Create Account ✨
                    </h1>
                    <p className="text-sm text-gray-400 font-medium">
                        Join 2.4M+ users. Free. No hidden charges.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField label="Full Name" icon={User} type="text" placeholder="Aman Singh" required />
                    <InputField label="Mobile Number" icon={Phone} type="tel" placeholder="+91 98765 43210" required />
                    <InputField label="Email Address" icon={Mail} type="email" placeholder="aman@example.com" required />

                    {/* Password with toggle */}
                    <div className="group">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.12em] mb-2 ml-1">
                            Create Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#F4A100] transition-colors">
                                <Lock size={17} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Min. 8 characters"
                                required
                                className="w-full bg-[#F8F9FC] border-2 border-gray-100 group-focus-within:border-[#F4A100] group-focus-within:bg-white rounded-2xl py-[14px] pl-11 pr-12 text-sm font-semibold text-[#0A2C5A] placeholder:text-gray-300 focus:outline-none transition-all"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-[#0A2C5A] transition-colors">
                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 py-1">
                        <ShieldCheck size={15} className="text-[#00A651] mt-0.5 flex-shrink-0" />
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                            By signing up, you agree to our{' '}
                            <span className="text-[#0A2C5A] font-bold underline underline-offset-2">Terms of Service</span>{' '}
                            and{' '}
                            <span className="text-[#0A2C5A] font-bold underline underline-offset-2">Privacy Policy</span>.
                        </p>
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isLoading}
                        className="w-full py-[15px] rounded-2xl bg-[#F4A100] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-[#d48900] transition-all duration-200 disabled:opacity-70 mt-1"
                    >
                        {isLoading ? (
                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <>Create Free Account <ArrowRight size={17} /></>
                        )}
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Google */}
                    <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                        className="w-full py-[13px] rounded-2xl border-2 border-gray-100 bg-white text-[#0A2C5A] font-bold text-sm flex items-center justify-center gap-3 hover:border-[#F4A100] hover:bg-[#FFFBF0] transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </motion.button>
                </form>

                {/* Log in link */}
                <p className="text-center text-sm text-gray-400 font-medium mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#F4A100] font-black hover:text-[#d48900] transition-colors">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </AuthLayout>
    );
};

export default Register;
