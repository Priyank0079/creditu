import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Lock,
    ShieldCheck,
    RefreshCw,
    User,
    Mail,
    Phone,
    ChevronRight,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import AuthCard from '../../components/Auth/AuthCard';
import MobileInput from '../../components/Auth/MobileInput';
import OTPInput from '../../components/Auth/OTPInput';
import ButtonPrimary from '../../components/Auth/ButtonPrimary';
import Loader from '../../components/Auth/Loader';
import ErrorMessage from '../../components/Auth/ErrorMessage';
import SuccessAnimation from '../../components/Auth/SuccessAnimation';

const VALID_OTP = "1234";

const AuthScreen = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('signup'); // 'signup' or 'login'
    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success

    // Form States
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    // Auth States
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(30);

    // Persistence Simulation
    const getRegisteredUser = () => JSON.parse(localStorage.getItem('registeredUser') || '{}');

    useEffect(() => {
        let interval;
        if (step === 2 && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, resendTimer]);

    const handleAction = () => {
        if (mode === 'signup') {
            if (!fullName || !email || mobile.length !== 10) {
                setError("Please fill all details correctly");
                return;
            }
        } else {
            if (mobile.length !== 10) {
                setError("Please enter a valid 10-digit mobile number");
                return;
            }

            // Check if this number is "registered"
            const user = getRegisteredUser();
            if (user.mobile && user.mobile !== mobile) {
                setError("This mobile number is not registered. Please sign up.");
                return;
            }
        }

        setError("");
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setStep(2); // Move to OTP
        }, 1200);
    };

    const handleVerifyOTP = () => {
        const otpString = otp.join("");
        if (otpString.length !== 4) {
            setError("Please enter the 4-digit OTP");
            return;
        }

        setError("");
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (otpString === VALID_OTP) {
                // If signup, save the user
                if (mode === 'signup') {
                    localStorage.setItem('registeredUser', JSON.stringify({ fullName, email, mobile }));
                }

                setStep(3);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setError("Invalid Verification Code");
            }
        }, 1500);
    };

    const resetFlow = () => {
        setStep(1);
        setError("");
        setOtp(["", "", "", ""]);
    };

    return (
        <div className="min-h-screen bg-[#061e38] bg-gradient-to-br from-[#0B3C6D] via-[#061e38] to-black relative overflow-hidden flex flex-col items-center justify-center p-6">
            {/* Premium Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-trust/10 rounded-full blur-[100px]" />

            {/* Top Logo Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 flex flex-col items-center text-center"
            >
                <div className="relative mb-6 group">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-[-15px] bg-white blur-2xl rounded-full"
                    />
                    <div className="bg-white px-5 py-2.5 rounded-2xl shadow-xl shadow-black/10 relative z-10 border border-white/20">
                        <img
                            src="/images/image.png"
                            alt="Creditu Logo"
                            className="h-8 w-auto object-contain"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                    <ShieldCheck size={14} className="text-trust" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Secure Portal</span>
                </div>
            </motion.div>

            {/* Main Auth Card */}
            <AuthCard>
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step-form"
                            initial={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-white tracking-tight">
                                    {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                                </h2>
                                <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mt-2">
                                    {mode === 'signup' ? 'Join the future of finance' : 'Login to your dashboard'}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {mode === 'signup' && (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder="Aman Srivastava"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-gold/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder="aman@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-gold/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">Mobile Number</label>
                                    <MobileInput
                                        value={mobile}
                                        onChange={setMobile}
                                        error={error && step === 1}
                                    />
                                </div>
                            </div>

                            {error && <ErrorMessage message={error} />}

                            <div className="pt-4 space-y-6">
                                {loading ? <Loader /> : (
                                    <ButtonPrimary onClick={handleAction}>
                                        {mode === 'signup' ? 'Proceed with Registration' : 'Secure Login'}
                                    </ButtonPrimary>
                                )}

                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-white/40 text-xs font-medium">
                                        {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                                    </p>
                                    <button
                                        onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(""); }}
                                        className="text-gold text-xs font-black uppercase tracking-widest hover:underline"
                                    >
                                        {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : step === 2 ? (
                        <motion.div
                            key="step-otp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                        >
                            <button
                                onClick={resetFlow}
                                className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                            >
                                <ArrowLeft size={14} /> Back to details
                            </button>

                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-black text-white tracking-tight">Verify Identity</h2>
                                <p className="text-white/40 text-xs font-medium">
                                    Code sent to <span className="text-gold font-bold">+91 {mobile}</span>
                                </p>
                            </div>

                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                error={error && step === 2}
                            />

                            {error && (
                                <motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.4 }}>
                                    <ErrorMessage message={error} />
                                </motion.div>
                            )}

                            <div className="flex justify-center flex-col items-center gap-4">
                                <button
                                    disabled={resendTimer > 0}
                                    className="flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-[.2em] disabled:opacity-30 transition-opacity"
                                    onClick={() => setResendTimer(30)}
                                >
                                    <RefreshCw size={12} className={resendTimer === 0 ? "animate-pulse" : ""} />
                                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP Now"}
                                </button>

                                <div className="w-full pt-4">
                                    {loading ? <Loader /> : (
                                        <ButtonPrimary onClick={handleVerifyOTP}>
                                            Verify & Proceed
                                        </ButtonPrimary>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <SuccessAnimation />
                    )}
                </AnimatePresence>
            </AuthCard>

            {/* Footer Trust Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center space-y-6"
            >
                <div className="flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-1 opacity-40">
                        <Lock size={16} className="text-white" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Encrypted</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10" />
                    <div className="flex flex-col items-center gap-1 opacity-40">
                        <ShieldCheck size={16} className="text-white" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">RBI SSL</span>
                    </div>
                </div>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                    Trusted by 2.4M+ Verified Users
                </p>
            </motion.div>
        </div>
    );
};

export default AuthScreen;
