import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ─── Default seed data if localStorage is empty ──── */
const DEFAULT_SLIDES = [
    {
        id: 'default-0',
        img: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80&fit=crop',
        tag: 'Personal Loan',
        headline: 'Achieve Your Dreams',
        sub: 'Up to ₹5,00,000 at 9.3% p.a. — instant approval, zero paperwork.',
        cta: 'Apply Now',
        overlayFrom: 'rgba(11,60,109,0.72)',
        overlayTo: 'rgba(11,60,109,0.10)',
        tagBg: 'rgba(255,204,255,0.22)',
        tagColor: '#FFCCFF',
        order: 0,
        isActive: true,
    },
    {
        id: 'default-1',
        img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80&fit=crop',
        tag: 'Instant Approval',
        headline: 'Money in 60 Seconds',
        sub: 'AI-powered credit check. Funds in your account before you know it.',
        cta: 'Check Eligibility',
        overlayFrom: 'rgba(34,6,64,0.80)',
        overlayTo: 'rgba(34,6,64,0.10)',
        tagBg: 'rgba(255,255,153,0.20)',
        tagColor: '#FFFF99',
        order: 1,
        isActive: true,
    },
    {
        id: 'default-2',
        img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&fit=crop',
        tag: 'Best Rates',
        headline: 'Lowest Interest Rates',
        sub: "Starting from 8.5% p.a. India's most competitive fintech lending.",
        cta: 'See Offers',
        overlayFrom: 'rgba(6,78,59,0.78)',
        overlayTo: 'rgba(6,78,59,0.10)',
        tagBg: 'rgba(255,255,153,0.20)',
        tagColor: '#FFFF99',
        order: 2,
        isActive: true,
    },
];

/* ─── Framer Motion variants ─────────────────────────────────── */
const variants = {
    enter: (dir) => ({
        x: dir > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
    },
    exit: (dir) => ({
        x: dir > 0 ? '-100%' : '100%',
        opacity: 0,
        transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
    }),
};

/* Swipe constants */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const CarouselSkeleton = () => (
    <div style={{ width: '100%', height: 240, background: '#0B3C6D', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', gap: 12 }}>
        <div className="skeleton" style={{ width: 100, height: 18, borderRadius: 100 }} />
        <div className="skeleton" style={{ width: '70%', height: 32, borderRadius: 8 }} />
        <div className="skeleton" style={{ width: '50%', height: 20, borderRadius: 8 }} />
        <div className="skeleton" style={{ width: 140, height: 40, borderRadius: 14, marginTop: 10 }} />
    </div>
);

/* ─── Component ─────────────────────────────────────────────── */
const HeroCarousel = ({ onCtaClick }) => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [dir, setDir] = useState(1);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);

    // Initial load and seed
    useEffect(() => {
        const loadSlides = () => {
            const stored = localStorage.getItem('carouselData');
            let data = [];
            if (!stored) {
                data = DEFAULT_SLIDES;
                localStorage.setItem('carouselData', JSON.stringify(data));
            } else {
                try {
                    data = JSON.parse(stored);
                } catch (e) {
                    data = DEFAULT_SLIDES;
                }
            }

            const activeSlides = data
                .filter(s => s.isActive)
                .sort((a, b) => (a.order || 0) - (b.order || 0));

            setSlides(activeSlides);
            setTimeout(() => setLoading(false), 800); // Small delay for smooth feel
        };

        loadSlides();
        // Listen for local storage changes (if admin updates it in another tab/component)
        window.addEventListener('storage', loadSlides);
        return () => window.removeEventListener('storage', loadSlides);
    }, []);

    const goTo = useCallback((idx, direction) => {
        if (slides.length === 0) return;
        setDir(direction);
        setCurrent(((idx % slides.length) + slides.length) % slides.length);
    }, [slides.length]);

    const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

    useEffect(() => {
        if (paused || loading || slides.length === 0) return;
        timerRef.current = setInterval(next, 4000); // 4s interval
        return () => clearInterval(timerRef.current);
    }, [paused, next, loading, slides.length]);

    if (loading) return <CarouselSkeleton />;
    if (slides.length === 0) return null;

    const slide = slides[current];

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
                position: 'relative',
                width: '100%',
                height: 240,
                overflow: 'hidden',
                borderRadius: 0,
                background: '#0B3C6D',
                touchAction: 'pan-y',
            }}
        >
            {/* ── Slides */}
            <AnimatePresence custom={dir} initial={false}>
                <motion.div
                    key={slide.id}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                            next();
                        } else if (swipe > swipeConfidenceThreshold) {
                            prev();
                        }
                    }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        willChange: 'transform',
                        cursor: 'grab',
                    }}
                    whileTap={{ cursor: 'grabbing' }}
                >
                    {/* Background Image */}
                    <img
                        src={slide.img}
                        alt={slide.tag}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            pointerEvents: 'none',
                        }}
                        loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(90deg, ${slide.overlayFrom || 'rgba(11,60,109,0.72)'} 0%, ${slide.overlayTo || 'rgba(11,60,109,0.10)'} 100%)`,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Slight bottom vignette */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 50%)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* ── Text content */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '0 24px',
                            gap: 8,
                            maxWidth: '75%',
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Tag pill */}
                        <motion.span
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.35 }}
                            style={{
                                display: 'inline-block',
                                alignSelf: 'flex-start',
                                background: slide.tagBg || 'rgba(255,204,255,0.22)',
                                border: `1px solid ${slide.tagColor || '#FFCCFF'}55`,
                                borderRadius: 100,
                                padding: '3px 10px',
                                fontSize: 9,
                                fontWeight: 800,
                                color: slide.tagColor || '#FFCCFF',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                backdropFilter: 'blur(6px)',
                            }}
                        >
                            {slide.tag}
                        </motion.span>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.17, duration: 0.4 }}
                            style={{
                                fontSize: 26,
                                fontWeight: 900,
                                color: 'white',
                                margin: 0,
                                lineHeight: 1.15,
                                letterSpacing: '-0.02em',
                                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                            }}
                        >
                            {slide.headline}
                        </motion.h2>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.24, duration: 0.4 }}
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: 'rgba(255,255,255,0.85)',
                                margin: 0,
                                lineHeight: 1.5,
                            }}
                        >
                            {slide.sub}
                        </motion.p>

                        {/* CTA */}
                        <div style={{ pointerEvents: 'auto' }}>
                            <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.30, duration: 0.4 }}
                                whileHover={{ scale: 1.05, x: 2 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => {
                                    if (slide.redirectUrl) {
                                        window.location.href = slide.redirectUrl;
                                    } else if (onCtaClick) {
                                        onCtaClick();
                                    }
                                }}
                                style={{
                                    alignSelf: 'flex-start',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    marginTop: 6,
                                    padding: '10px 20px',
                                    borderRadius: 14,
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    color: '#1a0530',
                                    letterSpacing: '0.04em',
                                    background: `linear-gradient(135deg, #FFCCFF 0%, #FFFF99 100%)`,
                                    boxShadow: '0 4px 16px rgba(255,100,200,0.30)',
                                }}
                            >
                                {slide.cta || 'Learn More'}
                                <ArrowRight size={14} strokeWidth={2.8} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ── Pagination dots */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 8,
                    zIndex: 10,
                    alignItems: 'center',
                }}
            >
                {slides.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => goTo(i, i > current ? 1 : -1)}
                        animate={{
                            width: i === current ? 24 : 8,
                            opacity: i === current ? 1 : 0.4,
                            background: i === current ? '#FFCCFF' : '#ffffff',
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            height: 8,
                            borderRadius: 100,
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
