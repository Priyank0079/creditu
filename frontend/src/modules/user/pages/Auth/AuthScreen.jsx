import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Lock, ShieldCheck, RefreshCw, User, Mail, Phone,
    ArrowLeft, CheckCircle2, Eye, EyeOff, TrendingUp, Users, BadgeCheck
} from 'lucide-react';
import OTPInput from '../../components/Auth/OTPInput';

const VALID_OTP = "1234";

/* ── Reusable input field ── */
const Field = ({ label, icon: Icon, rightSlot, ...rest }) => (
    <div className="group">
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2 ml-1">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#F4A100] transition-colors">
                <Icon size={16} />
            </div>
            <input
                {...rest}
                className="w-full bg-[#F8F9FC] border-2 border-gray-100 group-focus-within:border-[#F4A100] group-focus-within:bg-white rounded-2xl py-[13px] pl-11 pr-11 text-sm font-semibold text-[#0A2C5A] placeholder:text-gray-300 focus:outline-none transition-all"
            />
            {rightSlot && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {rightSlot}
                </div>
            )}
        </div>
    </div>
);

/* ── Primary button ── */
const PrimaryBtn = ({ children, onClick, loading, variant = 'navy' }) => (
    <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="w-full py-[14px] rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
        style={{
            background: variant === 'gold' ? '#F4A100' : '#0A2C5A',
            color: 'white',
            boxShadow: variant === 'gold'
                ? '0 6px 20px rgba(244,161,0,0.25)'
                : '0 6px 20px rgba(10,44,90,0.2)',
        }}
    >
        {loading ? (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
        ) : children}
    </motion.button>
);

/* ── Google button ── */
const GoogleBtn = () => (
    <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        className="w-full py-[13px] rounded-2xl border-2 border-gray-100 bg-white text-[#0A2C5A] font-bold text-sm flex items-center justify-center gap-3 hover:border-[#F4A100] hover:bg-[#FFFBF0] transition-all">
        <svg width="17" height="17" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
    </motion.button>
);

/* ══════════════════════════════════════════════════════════ */
const AuthScreen = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('signup');
    const [step, setStep] = useState(1);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [showPass, setShowPass] = useState(false);

    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(30);

    const getRegisteredUser = () => JSON.parse(localStorage.getItem('registeredUser') || '{}');

    useEffect(() => {
        let iv;
        if (step === 2 && resendTimer > 0) {
            iv = setInterval(() => setResendTimer(p => p - 1), 1000);
        }
        return () => clearInterval(iv);
    }, [step, resendTimer]);

    const handleAction = () => {
        if (mode === 'signup') {
            if (!fullName || !email || mobile.length !== 10) {
                setError('Please fill all details correctly');
                return;
            }
        } else {
            if (mobile.length !== 10) {
                setError('Please enter a valid 10-digit mobile number');
                return;
            }
            const user = getRegisteredUser();
            if (user.mobile && user.mobile !== mobile) {
                setError('This number is not registered. Please sign up.');
                return;
            }
        }
        setError('');
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(2); }, 1200);
    };

    const handleVerifyOTP = () => {
        const code = otp.join('');
        if (code.length !== 4) { setError('Please enter the 4-digit OTP'); return; }
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (code === VALID_OTP) {
                if (mode === 'signup') localStorage.setItem('registeredUser', JSON.stringify({ fullName, email, mobile }));
                setStep(3);
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setError('Invalid OTP. Try 1 2 3 4 for demo.');
            }
        }, 1500);
    };

    const resetFlow = () => { setStep(1); setError(''); setOtp(['', '', '', '']); };

    /* Sidebar trust stats */
    const stats = [
        { icon: Users, label: '2.4M+ Users', sub: 'Active borrowers' },
        { icon: TrendingUp, label: '₹1,200 Cr+', sub: 'Loans disbursed' },
        { icon: BadgeCheck, label: 'RBI Registered', sub: 'Safe & regulated' },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* ── Mobile gold header band ── */}
            <div className="md:hidden relative bg-[#F4A100] px-6 pt-12 pb-20 overflow-hidden flex-shrink-0">
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/20" />
                <div className="absolute -bottom-8 -left-6 w-24 h-24 rounded-full bg-white/15" />
                {/* Logo — no bg, animated glow */}
                <div className="relative flex items-center justify-center mb-5">
                    <motion.div
                        animate={{ scale: [1, 1.45, 1], opacity: [0.15, 0.35, 0.15] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'absolute', width: 120, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', filter: 'blur(18px)', pointerEvents: 'none' }}
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{ position: 'absolute', width: 112, height: 48, borderRadius: 28, background: 'conic-gradient(from 0deg, transparent 55%, rgba(255,255,255,0.65) 78%, transparent 100%)', filter: 'blur(3px)', pointerEvents: 'none' }}
                    />
                    <motion.div
                        animate={{ scale: [0.94, 1.1, 0.94], opacity: [0.35, 0.65, 0.35] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'absolute', width: 100, height: 40, borderRadius: 24, border: '1.5px solid rgba(255,255,255,0.55)', pointerEvents: 'none' }}
                    />
                    <motion.img
                        src="/images/image.png" alt="Creditu"
                        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                        className="h-8 object-contain relative z-10"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.85)) drop-shadow(0 2px 5px rgba(10,44,90,0.18))' }}
                    />
                </div>
                <h2 className="text-2xl font-black text-white leading-tight">
                    Smart Loans.<br />
                    <span className="text-[#0A2C5A]">Instant Decisions.</span>
                </h2>
                <p className="text-white/80 text-sm font-medium mt-1">Trusted by 2.4M+ users across India</p>
            </div>

            <div className="flex flex-1 flex-col md:flex-row">

                {/* ── Desktop left panel ── */}
                <div className="hidden md:flex md:w-[420px] lg:w-[460px] bg-[#F4A100] flex-col justify-between p-12 overflow-hidden relative flex-shrink-0">
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/15 -mr-24 -mt-24" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#0A2C5A]/15 -ml-20 -mb-20" />
                    <div className="absolute bottom-1/3 right-6 w-20 h-20 rounded-full bg-white/10" />

                    {/* Logo — no bg, animated glow */}
                    <div className="relative flex items-center justify-center" style={{ padding: '4px 0' }}>
                        <motion.div
                            animate={{ scale: [1, 1.45, 1], opacity: [0.15, 0.35, 0.15] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ position: 'absolute', width: 140, height: 58, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', filter: 'blur(22px)', pointerEvents: 'none' }}
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            style={{ position: 'absolute', width: 130, height: 54, borderRadius: 32, background: 'conic-gradient(from 0deg, transparent 55%, rgba(255,255,255,0.68) 78%, transparent 100%)', filter: 'blur(3px)', pointerEvents: 'none' }}
                        />
                        <motion.div
                            animate={{ scale: [0.94, 1.1, 0.94], opacity: [0.3, 0.65, 0.3] }}
                            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ position: 'absolute', width: 118, height: 46, borderRadius: 28, border: '1.5px solid rgba(255,255,255,0.55)', pointerEvents: 'none' }}
                        />
                        <motion.img
                            src="/images/image.png" alt="Creditu"
                            initial={{ opacity: 0, scale: 0.85 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
                            className="h-9 w-auto object-contain relative z-10"
                            style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.85)) drop-shadow(0 2px 6px rgba(10,44,90,0.22))' }}
                        />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white leading-tight mb-4">
                            Smart Loans.<br />
                            <span className="text-[#0A2C5A]">Instant Decisions.</span>
                        </h2>
                        <p className="text-white/80 text-base font-medium leading-relaxed mb-8">
                            Check eligibility in 60 seconds. No paperwork, no branch visit.
                        </p>
                        {stats.map((s, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                                className="flex items-center gap-4 bg-white rounded-2xl px-5 py-3.5 mb-3 shadow-sm">
                                <div className="w-9 h-9 rounded-xl bg-[#F4A100]/15 flex items-center justify-center flex-shrink-0">
                                    <s.icon size={18} className="text-[#0A2C5A]" />
                                </div>
                                <div>
                                    <div className="font-black text-[#0A2C5A] text-sm">{s.label}</div>
                                    <div className="text-xs text-gray-400 font-medium">{s.sub}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                        <ShieldCheck size={13} className="text-white/60" />
                        <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">256-bit SSL • RBI Compliant</span>
                    </div>
                </div>

                {/* ── Right: form panel ── */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 bg-white relative">
                    <div className="hidden md:block absolute top-0 right-0 w-40 h-40 rounded-bl-[80px] bg-[#F4A100]/08 pointer-events-none" />

                    {/* Mobile card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full max-w-[400px]"
                    >
                        {/* Mobile pull-up card */}
                        <div className="md:hidden -mt-12 bg-white rounded-[28px] shadow-xl px-6 pt-7 pb-6 mb-4">
                            <AuthFormContent
                                mode={mode} setMode={setMode} step={step}
                                fullName={fullName} setFullName={setFullName}
                                email={email} setEmail={setEmail}
                                mobile={mobile} setMobile={setMobile}
                                showPass={showPass} setShowPass={setShowPass}
                                otp={otp} setOtp={setOtp}
                                loading={loading} error={error} setError={setError}
                                resendTimer={resendTimer} setResendTimer={setResendTimer}
                                handleAction={handleAction}
                                handleVerifyOTP={handleVerifyOTP}
                                resetFlow={resetFlow}
                            />
                        </div>
                        {/* Desktop inline form */}
                        <div className="hidden md:block">
                            <AuthFormContent
                                mode={mode} setMode={setMode} step={step}
                                fullName={fullName} setFullName={setFullName}
                                email={email} setEmail={setEmail}
                                mobile={mobile} setMobile={setMobile}
                                showPass={showPass} setShowPass={setShowPass}
                                otp={otp} setOtp={setOtp}
                                loading={loading} error={error} setError={setError}
                                resendTimer={resendTimer} setResendTimer={setResendTimer}
                                handleAction={handleAction}
                                handleVerifyOTP={handleVerifyOTP}
                                resetFlow={resetFlow}
                            />
                        </div>
                    </motion.div>

                    <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] flex items-center gap-2 mt-6">
                        <ShieldCheck size={11} className="text-[#00A651]" /> 256-bit SSL Secured
                    </p>
                </div>
            </div>
        </div>
    );
};

/* ── Extracted form content (shared between mobile card & desktop) ── */
const AuthFormContent = ({
    mode, setMode, step,
    fullName, setFullName, email, setEmail, mobile, setMobile,
    showPass, setShowPass,
    otp, setOtp, loading, error, setError,
    resendTimer, setResendTimer,
    handleAction, handleVerifyOTP, resetFlow
}) => {
    if (step === 3) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-[#00A651]/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} className="text-[#00A651]" />
                </div>
                <h3 className="text-2xl font-black text-[#0A2C5A] mb-2">All Done! 🎉</h3>
                <p className="text-sm text-gray-400 font-medium">Redirecting to your dashboard...</p>
            </motion.div>
        );
    }

    if (step === 2) {
        return (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <button onClick={resetFlow}
                    className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider hover:text-[#0A2C5A] transition-colors">
                    <ArrowLeft size={13} /> Back to details
                </button>

                <div>
                    <h2 className="text-[26px] font-black text-[#0A2C5A] leading-tight mb-1">Verify OTP 🔐</h2>
                    <p className="text-sm text-gray-400 font-medium">
                        Code sent to <span className="text-[#F4A100] font-bold">+91 {mobile}</span>
                        <span className="ml-2 text-[10px] text-gray-300">(Hint: 1 2 3 4)</span>
                    </p>
                </div>

                <OTPInput value={otp} onChange={setOtp} error={!!error} />

                {error && (
                    <motion.p animate={{ x: [-4, 4, -4, 4, 0] }} transition={{ duration: 0.3 }}
                        className="text-xs text-red-500 font-semibold text-center">{error}</motion.p>
                )}

                <PrimaryBtn onClick={handleVerifyOTP} loading={loading} variant="navy">
                    Verify & Continue →
                </PrimaryBtn>

                <div className="text-center">
                    <button disabled={resendTimer > 0}
                        className="flex items-center gap-2 text-[#F4A100] font-black text-xs uppercase tracking-widest disabled:opacity-30 mx-auto transition-opacity"
                        onClick={() => setResendTimer(30)}>
                        <RefreshCw size={11} className={resendTimer === 0 ? 'animate-pulse' : ''} />
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                    </button>
                </div>
            </motion.div>
        );
    }

    /* Step 1 — form */
    return (
        <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            {/* Mode toggle pill */}
            <div className="flex items-center bg-[#F8F9FC] rounded-2xl p-1.5 mb-2">
                {['signup', 'login'].map(m => (
                    <button key={m} onClick={() => { setMode(m); setError(''); }}
                        className="flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                        style={{
                            background: mode === m ? '#0A2C5A' : 'transparent',
                            color: mode === m ? 'white' : '#9ca3af',
                        }}>
                        {m === 'signup' ? 'Sign Up' : 'Sign In'}
                    </button>
                ))}
            </div>

            <div>
                <h2 className="text-[26px] font-black text-[#0A2C5A] leading-tight mb-1">
                    {mode === 'signup' ? 'Create Account ✨' : 'Welcome Back 👋'}
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                    {mode === 'signup' ? 'Free. No hidden charges.' : 'Log in to manage your account.'}
                </p>
            </div>

            {mode === 'signup' && (
                <>
                    <Field label="Full Name" icon={User} type="text" placeholder="Aman Srivastava"
                        value={fullName} onChange={e => setFullName(e.target.value)} />
                    <Field label="Email Address" icon={Mail} type="email" placeholder="aman@example.com"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </>
            )}

            {/* Mobile number with +91 prefix */}
            <div className="group">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2 ml-1">Mobile Number</label>
                <div className="relative flex items-center bg-[#F8F9FC] border-2 border-gray-100 group-focus-within:border-[#F4A100] group-focus-within:bg-white rounded-2xl transition-all overflow-hidden">
                    <div className="flex items-center gap-2 pl-4 pr-3 border-r border-gray-200 flex-shrink-0">
                        <span className="text-sm font-black text-[#0A2C5A]">🇮🇳</span>
                        <span className="text-sm font-black text-[#0A2C5A]">+91</span>
                    </div>
                    <input type="tel" placeholder="98765 43210" maxLength={10}
                        value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 bg-transparent py-[13px] px-3 text-sm font-semibold text-[#0A2C5A] placeholder:text-gray-300 focus:outline-none"
                    />
                    <Phone size={15} className="text-gray-300 mr-4" />
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500 font-semibold ml-1">{error}</p>
            )}

            <PrimaryBtn onClick={handleAction} loading={loading} variant={mode === 'signup' ? 'gold' : 'navy'}>
                {mode === 'signup' ? 'Proceed with Registration →' : 'Secure Login →'}
            </PrimaryBtn>

            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-100" />
            </div>

            <GoogleBtn />

            <p className="text-center text-xs text-gray-400 font-medium pt-1">
                {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
                    className="text-[#F4A100] font-black hover:text-[#d48900] transition-colors">
                    {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </motion.div>
    );
};

export default AuthScreen;
