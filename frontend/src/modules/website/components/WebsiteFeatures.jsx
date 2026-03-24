import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ShieldCheck, Smartphone, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Zap size={32} className="text-gold" />,
    title: 'Instant Approval',
    description: 'Get your loan approved within seconds using our advanced matching engine.',
    bg: 'bg-gold/5',
  },
  {
    icon: <ShieldCheck size={32} className="text-blue-600" />,
    title: '100% Secure KYC',
    description: 'Military-grade encryption for all your documents and personal data.',
    bg: 'bg-blue-50',
  },
  {
    icon: <Smartphone size={32} className="text-purple-600" />,
    title: 'Fully Digital Process',
    description: 'From application to disbursal, everything happens on your smartphone.',
    bg: 'bg-purple-50',
  },
  {
    icon: <LineChart size={32} className="text-green-600" />,
    title: 'Smart Credit Engine',
    description: 'Our system analyzes thousands of data points to give you the best interest rates.',
    bg: 'bg-green-50',
  },
];

const WebsiteFeatures = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal cards on scroll
      gsap.fromTo(cardsRef.current, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Hover animations for each card
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const cardInner = card.querySelector('.card-inner');
        const iconContainer = card.querySelector('.icon-container');

        card.addEventListener('mouseenter', () => {
          gsap.to(cardInner, {
            y: -10,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(iconContainer, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(cardInner, {
            y: 0,
            scale: 1,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(iconContainer, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-12 text-gold font-bold uppercase tracking-[0.2em] mb-4">Why creditU</h2>
          <h3 className="text-3xl md:text-4xl font-black text-primary mb-4">
            Banking built for the Modern Generation
          </h3>
          <p className="text-lg text-textSecondary font-medium">
            We've removed the hurdles of traditional lending. Fast, secure, and entirely on your terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="cursor-default"
            >
              <div className="card-inner h-full glass-card border border-slate-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 hover:shadow-xl relative hover:z-10 hover:border-primary/30">
                <div className={`icon-container w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  {React.cloneElement(feature.icon, { size: 28 })}
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{feature.title}</h4>
                <p className="text-textSecondary text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteFeatures;
