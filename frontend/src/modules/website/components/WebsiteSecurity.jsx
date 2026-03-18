import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Lock, EyeOff, FileKey } from 'lucide-react';

const WebsiteSecurity = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <Lock size={28} />, title: 'RBI Compliant', desc: 'Operating under strict RBI regulations for your peace of mind.' },
    { icon: <ShieldCheck size={28} />, title: '256-bit SSL', desc: 'Bank-grade encryption protecting all your data transfers.' },
    { icon: <EyeOff size={28} />, title: 'Fraud Detection', desc: 'AI-driven monitoring systems to detect suspicious activities.' },
    { icon: <FileKey size={28} />, title: 'AML Screening', desc: 'Secure anti-money laundering checks on every application.' },
  ];

  return (
    <section id="security" ref={sectionRef} className="py-20 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full font-bold text-sm mb-6 border border-green-500/20">
            <ShieldCheck size={16} />
            <span>Military Grade Protection</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Your Security is <span className="text-gold">Non-Negotiable</span></h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            We employ the latest security technologies to ensure that your data and privacy are protected at all times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              ref={el => { if (el) cardsRef.current[i] = el; }}
              className="p-8 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(244,180,0,0.3)] group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{f.title}</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteSecurity;
