import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import rupeeIcon from '../../../assets/rupee_3d_icon.png';

const WebsiteHero = () => {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const floatingIconRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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
        { y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut', stagger: 0.5 }
      );

      // Icon rotation
      gsap.to(floatingIconRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen pt-40 pb-24 overflow-hidden flex items-center">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full font-bold text-sm mb-8 border border-gold/20">
            <Zap size={16} fill="currentColor" />
            <span>Money in 60 Seconds</span>
          </div>
          
          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black text-primary leading-tight mb-4">
            Get Instant Personal Loans in <span className="text-gold">60 Seconds</span>
          </h1>
          
          <p ref={textRef} className="text-lg text-textSecondary max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
            Smart credit system. No paperwork. 100% digital. Experience the future of personal finance with creditU.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => navigate('/download')}
              className="btn-premium btn-primary-website py-3 px-8 text-base group"
            >
              Check Eligibility 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/download')}
              className="btn-premium bg-white border-2 border-slate-200 text-primary hover:border-primary py-3 px-8 text-base"
            >
              Get Started
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/image.png" alt="Trusted Partner" className="h-6" />
            <div className="w-px h-6 bg-slate-200" />
            <p className="text-xs font-black uppercase tracking-widest text-primary">RBI Registered NBFC Partners</p>
          </div>
        </div>

        {/* Right Content - Visuals */}
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

            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-textSecondary text-xs font-bold uppercase tracking-widest">Process Status</span>
                <span className="text-green-500 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live Verified
                </span>
              </div>
              
              <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute h-full gold-gradient rounded-full" 
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>KYC Done</span>
                <span>Offer Generated</span>
                <span>Final Review</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div ref={card1Ref} className="absolute -top-10 -right-10 z-30 bg-white p-4 rounded-2xl shadow-premium border border-slate-50 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Security</p>
              <p className="text-sm font-bold text-primary">256-bit Encrypted</p>
            </div>
          </div>

          <div ref={card2Ref} className="absolute -bottom-10 -left-10 z-30 bg-white p-4 rounded-2xl shadow-premium border border-slate-50 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Disbursal</p>
              <p className="text-sm font-bold text-primary">Instant Transfer</p>
            </div>
          </div>

          {/* 3D Rupee Icon */}
          <div className="absolute -top-20 -left-20 w-40 h-40 opacity-20 lg:opacity-100 pointer-events-none select-none">
            <img src={rupeeIcon} alt="Rupee" className="w-full h-full object-contain animate-bounce" style={{ animationDuration: '4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteHero;
