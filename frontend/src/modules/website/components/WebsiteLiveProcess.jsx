import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { id: 1, label: 'Scanning databases', status: 'completed' },
  { id: 2, label: 'Retrieving credit history', status: 'completed' },
  { id: 3, label: 'Verifying identity', status: 'loading' },
  { id: 4, label: 'Calculating risk', status: 'pending' },
];

const WebsiteLiveProcess = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the whole section
      gsap.fromTo(cardRef.current, 
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Animate the progress bar width continuously
      gsap.fromTo(progressBarRef.current, 
        { width: '45%' },
        { 
          width: '75%', 
          duration: 3, 
          repeat: -1, 
          yoyo: true, 
          ease: 'power1.inOut' 
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-primary overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 lg:max-w-xl">
          <h2 className="text-12 text-gold font-bold uppercase tracking-[0.2em] mb-4">Real-time Processing</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
            Experience the <span className="text-gold">Power of AI</span> in action
          </h3>
          <p className="text-white/70 text-lg font-medium mb-10 leading-relaxed">
            Our proprietary core engine evaluates over 2,000 data points in micro-seconds to ensure you get the absolute best credit offer tailored to your profile.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 flex items-center justify-center overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 12}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-white font-bold text-sm tracking-wide">
              Joined by <span className="text-gold">10,000+</span> users today
            </p>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg">
          <div ref={cardRef} className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="text-center mb-8">
              <h4 className="text-xl font-black text-primary mb-1">Checking Eligibility...</h4>
              <p className="text-textSecondary font-bold text-xs uppercase tracking-widest">Processing Application</p>
            </div>

            <div className="space-y-6 mb-12">
              {processes.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-gold/20">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-500 text-white' : 
                      item.status === 'loading' ? 'bg-gold/20 text-gold' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {item.status === 'completed' && <Check size={16} strokeWidth={4} />}
                      {item.status === 'loading' && <Loader2 size={16} strokeWidth={3} className="animate-spin" />}
                      {item.status === 'pending' && <div className="w-2 h-2 bg-slate-400 rounded-full" />}
                    </div>
                    <span className={`font-bold ${
                      item.status === 'pending' ? 'text-slate-400' : 'text-primary'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.status === 'completed' && (
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Done</span>
                  )}
                  {item.status === 'loading' && (
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest animate-pulse">Wait</span>
                  )}
                </div>
              ))}
            </div>

            <div className="relative pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black text-textSecondary uppercase tracking-widest">Total Progress</span>
                <span className="text-xs font-black text-primary uppercase tracking-widest font-mono">75%</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                <div 
                  ref={progressBarRef}
                  className="h-full gold-gradient rounded-full shadow-[0_0_10px_rgba(244,180,0,0.4)]" 
                />
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteLiveProcess;
