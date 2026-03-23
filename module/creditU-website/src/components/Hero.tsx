import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const floatingIconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline();
      tl.fromTo(headingRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
        }
      )
      .fromTo(textRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6')
      .fromTo(buttonsRef.current, 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4');

      // Floating cards animation
      gsap.fromTo([card1Ref.current, card2Ref.current], 
        { y: 20 },
        { y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.5 }
      );

      // Subtle float for icon
      gsap.to(floatingIconRef.current, {
        y: -15,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen pt-40 pb-24 overflow-hidden flex items-center">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full font-bold text-sm mb-6 border border-gold/20">
            <Zap size={16} fill="currentColor" />
            <span>Money in 60 Seconds</span>
          </div>
          
          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black text-primary leading-tight mb-4">
            Get Instant Personal Loans in <span className="text-gold">60 Seconds</span>
          </h1>
          
          <p ref={textRef} className="text-lg text-textSecondary max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
            AI-powered credit system. No paperwork. 100% digital. Experience the future of personal finance with creditU.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="btn-premium btn-primary py-3 px-8 text-base group">
              Check Eligibility 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-premium bg-white border-2 border-slate-200 text-primary hover:border-primary py-3 px-8 text-base">
              Get Started
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">RBI Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Secure KYC</span>
            </div>
          </div>
        </div>

        {/* Visuals */}
        <div className="flex-1 relative w-full max-w-xl">
          {/* Main Card */}
          <div className="relative z-20 glass-card p-8 transform scale-100 lg:scale-105">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-textSecondary text-xs font-bold uppercase tracking-widest mb-1">Available Credit</p>
                <h2 className="text-3xl font-black text-primary">₹ 5,00,000</h2>
              </div>
              <div ref={floatingIconRef} className="bg-gold p-3 rounded-2xl shadow-lg">
                <Zap className="text-white" size={24} fill="currentColor" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-textSecondary">Approval Probability</span>
                  <span className="text-primary">98%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full gold-gradient rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-textSecondary font-bold mb-1">Interest</p>
                  <p className="text-lg font-black text-primary">9.3% <span className="text-xs font-normal">p.a</span></p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-textSecondary font-bold mb-1">Tenure</p>
                  <p className="text-lg font-black text-primary">12-48 <span className="text-xs font-normal">mo</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div ref={card1Ref} className="absolute top-[-40px] right-[-20px] z-30 bg-white shadow-premium p-5 rounded-2xl flex items-center gap-4 border border-slate-100">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-primary">Identity Verified</p>
              <p className="text-[10px] text-textSecondary">100% Digital KYC</p>
            </div>
          </div>

          <div ref={card2Ref} className="absolute bottom-[-10px] left-[-30px] z-30 bg-primary shadow-premium p-5 rounded-2xl border border-white/10">
            <p className="text-white/60 text-[10px] font-bold uppercase mb-1">Recent Activity</p>
            <p className="text-white text-sm font-bold">Loan Approved: ₹2L</p>
            <div className="flex gap-1 mt-2">
              <div className="w-4 h-1 bg-gold rounded-full" />
              <div className="w-4 h-1 bg-white/20 rounded-full" />
              <div className="w-4 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* 3D Rupee Icon if available */}
          <img 
            src="/src/assets/rupee_3d_icon.png" 
            alt="Rupee" 
            className="absolute top-[-80px] left-[-40px] w-32 h-auto object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
