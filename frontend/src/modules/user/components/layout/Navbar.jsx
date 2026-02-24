import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Settings,
    LogOut,
    ChevronRight,
    LayoutDashboard,
    ShieldCheck,
    MessageSquare,
    Search,
    ChevronDown,
    Zap,
    Crown
} from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Set scrolled state for background changes
            setScrolled(currentScrollY > 20);

            // Visibility logic: Hide if scrolling down, Show if scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${scrolled
                ? 'h-20 bg-white/90 backdrop-blur-3xl border-b border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)]'
                : 'h-24 bg-transparent'
            }`}>
            <div className="max-w-screen-2xl mx-auto h-full px-8 flex items-center justify-between">

                {/* Brand Logo - Minimalist approach */}
                <div className="flex items-center gap-12">
                    <Link to="/dashboard" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img
                                src="/images/image.png"
                                alt="Creditu"
                                className="h-9 w-auto object-contain relative transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </Link>

                    {/* Navigation - Ultra clean */}
                    <div className="hidden xl:flex items-center gap-2">
                        {['Dashboard', 'Loan Offers', 'Investments', 'Support'].map((item) => (
                            <button key={item} className="px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-primary/40 hover:text-primary transition-all relative group">
                                {item}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-4 transition-all duration-300" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Integrated Controls Section */}
                <div className="flex items-center gap-6">

                    {/* Minimalist Search */}
                    <div className="hidden md:flex items-center bg-gray-50/80 border border-gray-100 rounded-[20px] px-4 py-2 hover:bg-white hover:border-gray-200 transition-all focus-within:ring-4 ring-primary/5 group">
                        <Search size={16} className="text-gray-300 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Find features..."
                            className="bg-transparent border-none outline-none text-xs font-bold text-primary placeholder:text-gray-300 px-3 w-32 focus:w-48 transition-all"
                        />
                        <div className="flex gap-1">
                            <kbd className="h-5 px-1.5 rounded border border-gray-200 bg-white text-[9px] font-black text-gray-300 flex items-center">CTRL</kbd>
                            <kbd className="h-5 px-1.5 rounded border border-gray-200 bg-white text-[9px] font-black text-gray-300 flex items-center">K</kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <button className="p-2.5 rounded-xl text-primary/30 hover:text-primary hover:bg-white hover:shadow-sm transition-all relative">
                            <Bell size={18} strokeWidth={2.5} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full ring-2 ring-white" />
                        </button>
                        <button className="hidden sm:block p-2.5 rounded-xl text-primary/30 hover:text-primary hover:bg-white hover:shadow-sm transition-all">
                            <MessageSquare size={18} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* NEW PROFESSIONAL PROFILE TRIGGER - No Background version */}
                    <div className="relative" ref={menuRef}>
                        <motion.button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-4 group"
                        >
                            <div className="relative p-0.5 rounded-2xl transition-all duration-500 group-hover:ring-8 ring-primary/5">
                                <div className="w-11 h-11 rounded-[18px] border-2 border-gray-100 overflow-hidden shadow-sm group-hover:border-primary transition-colors">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman"
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-lg shadow-md border border-gray-100 flex items-center justify-center text-gold scale-0 group-hover:scale-100 transition-transform">
                                    <Crown size={10} fill="currentColor" />
                                </div>
                            </div>

                            <div className="hidden md:flex flex-col items-start text-left leading-none pr-2">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-xs font-black text-primary tracking-tight">Aman Srivastava</span>
                                    <ChevronDown size={14} className={`text-gray-300 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-trust animate-pulse" />
                                    <span className="text-[10px] font-bold text-trust uppercase tracking-widest opacity-80">Elite Account</span>
                                </div>
                            </div>
                        </motion.button>

                        {/* HIGH-END DROPDOWN MENU */}
                        <AnimatePresence>
                            {showProfileMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                    className="absolute right-0 mt-6 w-80 bg-white rounded-[36px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-[200]"
                                >
                                    {/* Minimalist Profile Header */}
                                    <div className="p-8 pb-6 text-center border-b border-gray-50 bg-gradient-to-b from-gray-50/50 to-white">
                                        <div className="w-20 h-20 rounded-[28px] border-4 border-white shadow-xl mx-auto mb-4 overflow-hidden ring-1 ring-gray-100">
                                            <img
                                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman"
                                                alt="Aman"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-xl font-black text-primary tracking-tight">Aman Srivastava</h4>
                                        <p className="text-xs text-textSecondary/50 font-bold uppercase tracking-widest mt-1">ID: #CRU- Elite - 2026</p>
                                    </div>

                                    {/* Action Grid */}
                                    <div className="p-4 grid grid-cols-1 gap-2">
                                        {[
                                            { icon: LayoutDashboard, label: 'Control Center', sub: 'Main Dashboard', color: 'text-blue-500', bg: 'bg-blue-50' },
                                            { icon: ShieldCheck, label: 'KYC Status', sub: 'Verified Account', color: 'text-trust', bg: 'bg-trust/10' },
                                            { icon: Settings, label: 'Preferences', sub: 'Account Settings', color: 'text-gray-400', bg: 'bg-gray-50' }
                                        ].map((item, idx) => (
                                            <button
                                                key={idx}
                                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-[24px] transition-all group/item"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-11 h-11 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center group-hover/item:scale-95 transition-transform`}>
                                                        <item.icon size={20} strokeWidth={2.5} />
                                                    </div>
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-sm font-bold text-primary leading-none mb-1">{item.label}</span>
                                                        <span className="text-[10px] font-bold text-textSecondary/30 uppercase tracking-wider">{item.sub}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight size={14} className="text-gray-200 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Logout Area */}
                                    <div className="p-4 pt-2 border-t border-gray-50 bg-gray-50/30">
                                        <button
                                            onClick={() => navigate('/')}
                                            className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-500 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                                        >
                                            <LogOut size={16} strokeWidth={3} />
                                            Secure Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
