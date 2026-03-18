import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, BadgeCheck, Zap } from 'lucide-react';

const CTA = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-animate', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-white">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-primary rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden shadow-premium">
          {/* Decorative Gold Blobs */}
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-gold/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

          <div className="max-w-3xl mx-auto">
            <h2 className="cta-animate text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Get Your Credit Line in <span className="text-gold">Minutes</span>
            </h2>
            <p className="cta-animate text-white/70 text-base md:text-lg font-medium mb-10">
              Join thousands of Indians who are already using creditU to power their dreams. 100% digital, 100% transparent.
            </p>

            <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="btn-premium btn-gold py-3 px-8 text-base w-full sm:w-auto shadow-[0_10px_30px_rgba(244,180,0,0.3)] hover:scale-105 transition-transform">
                Apply Now <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="btn-premium bg-white/10 text-white border border-white/20 py-3 px-8 text-base w-full sm:w-auto hover:bg-white/20 transition-all">
                Check Eligibility
              </button>
            </div>

            <div className="cta-animate mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              <div className="flex items-center gap-2">
                <BadgeCheck size={20} className="text-gold" />
                <span className="text-white text-xs font-black uppercase tracking-widest">Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-gold" />
                <span className="text-white text-xs font-black uppercase tracking-widest">Instant Disbursal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xs font-black uppercase tracking-widest">★ ★ ★ ★ ★</span>
                <span className="text-white text-xs font-black uppercase tracking-widest">4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
