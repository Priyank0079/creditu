import React, { useState, useEffect, useRef } from 'react';
import { Home, Search, CircleUser, MapPin, Plus, X, Camera, Instagram, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const BottomNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navRef = useRef(null);

    // Scroll logic to hide/show navigation
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { id: 'home', icon: Home, label: 'HOME' },
        { id: 'search', icon: Search, label: 'SEARCH' },
        { id: 'contact', icon: CircleUser, label: 'CONTACT' },
        { id: 'location', icon: MapPin, label: 'LOCATION' },
    ];

    const handleItemClick = (e, id) => {
        const icon = e.currentTarget.querySelector('.nav-icon');
        const label = e.currentTarget.querySelector('.nav-label');

        // GSAP Pop Animation
        gsap.timeline()
            .to(icon, { y: -12, scale: 1.2, color: '#F4B400', duration: 0.3, ease: "back.out(2)" })
            .to(icon, { y: 0, scale: 1, color: 'rgba(255,255,255,0.5)', duration: 0.5, ease: "elastic.out(1, 0.3)" });

        gsap.fromTo(label, { opacity: 0.3 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed bottom-6 left-0 right-0 z-[100] transition-transform duration-700 flex flex-col items-center pointer-events-none ${isVisible ? 'translate-y-0' : 'translate-y-40'}`}>

            {/* Expanded Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.5 }}
                        className="mb-6 bg-[#081b2d] px-8 py-4 rounded-3xl flex gap-10 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto"
                    >
                        <motion.button whileHover={{ y: -5, scale: 1.2 }} className="text-white/60 hover:text-gold transition-colors">
                            <Camera size={22} />
                        </motion.button>
                        <motion.button whileHover={{ y: -5, scale: 1.2 }} className="text-white/60 hover:text-gold transition-colors">
                            <Instagram size={22} />
                        </motion.button>
                        <motion.button whileHover={{ y: -5, scale: 1.2 }} className="text-white/60 hover:text-gold transition-colors">
                            <Youtube size={22} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Navigation Bar */}
            <div className="relative w-[92%] max-w-sm pointer-events-auto">
                {/* SVG Cutout Background */}
                <div className="absolute inset-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <svg width="100%" height="70" viewBox="0 0 350 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 20C0 8.95431 8.95431 0 20 0H135.5C141.5 0 144.5 4 148 10C154 19.5 163.5 28 175 28C186.5 28 196 19.5 202 10C205.5 4 208.5 0 214.5 0H330C341.046 0 350 8.95431 350 20V50C350 61.0457 341.046 70 330 70H20C8.95431 70 0 61.0457 0 50V20Z"
                            fill="#081b2d"
                        />
                    </svg>
                </div>

                {/* Navigation Items */}
                <div className="relative flex justify-between items-center px-8 h-[70px]">
                    <div className="flex gap-8">
                        {navItems.slice(0, 2).map((item) => (
                            <button
                                key={item.id}
                                onClick={(e) => handleItemClick(e, item.id)}
                                className="flex flex-col items-center justify-center gap-1 group w-12"
                            >
                                <div className="nav-icon text-white/50 group-hover:text-gold transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <span className="nav-label text-[8px] font-bold tracking-[0.15em] text-white/30 group-hover:text-white/80 transition-colors uppercase">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Central Plus Button */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[-25px]">
                        <motion.button
                            onClick={toggleMenu}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-0' : 'bg-[#0B3C6D] text-white border-4 border-[#081b2d]'}`}
                        >
                            {isOpen ? <X size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
                        </motion.button>
                    </div>

                    <div className="flex gap-6">
                        {navItems.slice(2, 4).map((item) => (
                            <button
                                key={item.id}
                                onClick={(e) => handleItemClick(e, item.id)}
                                className="flex flex-col items-center justify-center gap-1 group"
                            >
                                <div className="nav-icon text-white/50 group-hover:text-white transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <span className="text-[9px] font-bold tracking-widest text-white/30 group-hover:text-white/70 transition-colors uppercase">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomNav;
