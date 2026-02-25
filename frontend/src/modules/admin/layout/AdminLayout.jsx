import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, ShieldCheck, ArrowRight, RefreshCw, ChevronLeft, Layout } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import '../styles/admin.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('adminAuth') === 'true');
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Auth Form State
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const ADMIN_PHONE = "9340425755";
    const ADMIN_OTP = "1234";

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (phone !== ADMIN_PHONE) {
            setError('Unauthorized Admin Number');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1000);
    };

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        setError('');
        const code = otp.join('');
        if (code !== ADMIN_OTP) {
            setError('Invalid Admin OTP');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
        }, 1200);
    };

    const handleOTPChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0A2C5A 0%, #061A3A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Blobs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    style={{ position: 'absolute', top: '-10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(244,161,0,0.15)', filter: 'blur(80px)' }}
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,166,81,0.15)', filter: 'blur(80px)' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        width: '100%',
                        maxWidth: 420,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 32,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '40px 30px',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        zIndex: 10
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 20, background: '#F4A100',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px', boxShadow: '0 8px 16px rgba(244,161,0,0.3)'
                        }}>
                            <ShieldCheck size={32} color="white" />
                        </div>
                        <h2 style={{ color: 'white', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Admin Access 🛡️</h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Unauthorized access is strictly prohibited.</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form
                                key="phone"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handlePhoneSubmit}
                            >
                                <div style={{ marginBottom: 24 }}>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10, marginLeft: 4 }}>Phone Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 6, borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: 10 }}>
                                            <span style={{ fontSize: 14 }}>🇮🇳</span>
                                            <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>+91</span>
                                        </div>
                                        <input
                                            autoFocus
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="Enter Admin Number"
                                            style={{
                                                width: '100%',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: `2px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: 16,
                                                padding: '16px 16px 16px 90px',
                                                color: 'white',
                                                fontSize: 16,
                                                fontWeight: 700,
                                                outline: 'none',
                                                transition: 'all 0.2s'
                                            }}
                                        />
                                    </div>
                                    {error && <p style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, marginTop: 8, marginLeft: 4 }}>{error}</p>}
                                </div>
                                <button
                                    disabled={loading || phone.length !== 10}
                                    style={{
                                        width: '100%',
                                        background: '#F4A100',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 16,
                                        padding: '16px',
                                        fontSize: 14,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        opacity: phone.length === 10 ? 1 : 0.5,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {loading ? <RefreshCw className="animate-spin" size={18} /> : <>Next <ArrowRight size={18} /></>}
                                </button>
                                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600, marginTop: 20 }}>Hint: Use 9340425755</p>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleOTPSubmit}
                            >
                                <button onClick={() => setStep(1)} type="button" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, cursor: 'pointer' }}>
                                    <ChevronLeft size={14} /> Back
                                </button>
                                <div style={{ marginBottom: 30 }}>
                                    <label style={{ display: 'block', color: 'white', fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Verify OTP 🔒</label>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 24 }}>Enter the 4-digit code sent to your device.</p>

                                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`otp-${idx}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOTPChange(idx, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                                style={{
                                                    width: 60,
                                                    height: 70,
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: `2px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                                    borderRadius: 16,
                                                    textAlign: 'center',
                                                    fontSize: 24,
                                                    fontWeight: 900,
                                                    color: '#F4A100',
                                                    outline: 'none',
                                                    transition: 'all 0.2s'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    {error && <p style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, marginTop: 12, textAlign: 'center' }}>{error}</p>}
                                </div>
                                <button
                                    disabled={loading || otp.join('').length !== 4}
                                    style={{
                                        width: '100%',
                                        background: '#00A651',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 16,
                                        padding: '16px',
                                        fontSize: 14,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        opacity: otp.join('').length === 4 ? 1 : 0.5,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {loading ? <RefreshCw className="animate-spin" size={18} /> : <>Verify Access</>}
                                </button>
                                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600, marginTop: 20 }}>Hint: Use 1 2 3 4</p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <main
                className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}
                style={{ transition: 'margin-left 0.28s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <AdminTopbar
                    onMenuToggle={() => {
                        if (window.innerWidth < 768) {
                            setMobileOpen(prev => !prev);
                        } else {
                            setCollapsed(prev => !prev);
                        }
                    }}
                />
                <div className="admin-content admin-scrollbar">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
