import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Zap, TrendingUp, Lock } from 'lucide-react';

const Splash = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary relative overflow-hidden flex flex-col items-center justify-between p-8">
            {/* Premium Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-trust/10 rounded-full -ml-48 -mb-48 blur-[100px]" />

            {/* Top Logo Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-12 flex flex-col items-center"
            >
                <div className="mb-6">
                    <img
                        src="/images/image.png"
                        alt="Creditu Logo"
                        className="h-16 w-auto object-contain mix-blend-multiply"
                    />
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Zap size={14} className="text-gold fill-gold" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Powered by Speed</span>
                </div>
            </motion.div>

            {/* Center Illustration Concept */}
            <div className="relative w-full max-w-md flex items-center justify-center aspect-square">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-64 h-64"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-2xl" />
                    <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-[32px] flex items-center justify-center">
                        <div className="relative bg-white/10 p-8 rounded-full backdrop-blur-sm">
                            <ShieldCheck size={80} className="text-gold opacity-90 drop-shadow-2xl" strokeWidth={1.5} />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-2 -right-2 bg-trust p-2 rounded-xl shadow-lg border-2 border-primary"
                            >
                                <Lock size={16} className="text-white" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-xl">
                        <TrendingUp size={24} className="text-gold" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Text and CTA */}
            <div className="w-full max-w-sm text-center pb-8 relative z-20">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-black text-white mb-4 leading-[1.1]"
                >
                    Easy Loans.<br />
                    <span className="text-gold">Smarter Finance</span>
                </motion.h1>
                <p className="text-white/60 font-medium mb-12 px-4 leading-relaxed">
                    Unlock your financial potential with hassle-free loan solutions tailored for your dreams.
                </p>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/auth')}
                    className="w-full bg-white text-primary py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-2 shadow-2xl shadow-black/20 group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gold/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative z-10">Get Started</span>
                    <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <p className="mt-6 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Trusted by 2M+ Active Users
                </p>
            </div>
        </div>
    );
};

export default Splash;
