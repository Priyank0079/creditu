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
    { icon: <EyeOff size={28} />, title: 'Fraud Detection', desc: 'Advanced monitoring systems to detect suspicious activities.' },
    { icon: <FileKey size={28} />, title: 'AML Screening', desc: 'Secure anti-money laundering checks on every application.' },
  ];

  return (
    <section id="security" ref={sectionRef} className="py-24 bg-primary-light overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-50" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-bold text-sm mb-6 border border-green-100">
            <ShieldCheck size={16} />
            <span>Military Grade Protection</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-primary mb-6">Your Security is <span className="text-gold">Non-Negotiable</span></h3>
          <p className="text-textSecondary text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            We employ the latest security technologies to ensure that your data and privacy are protected at all times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              ref={el => { if (el) cardsRef.current[i] = el; }}
              className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-2 hover:border-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 transition-all duration-300 group relative hover:z-10"
            >
              <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-primary mb-8 shadow-soft group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{f.title}</h4>
              <p className="text-textSecondary text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteSecurity;
