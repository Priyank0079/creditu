import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, CreditCard, Scan, Camera, Building2, Search, ShieldAlert, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 1, title: 'Mobile OTP Verification', icon: <Smartphone />, desc: 'Instant verification with secure OTP system.' },
  { id: 2, title: 'PAN Verification', icon: <CreditCard />, desc: 'Automated document OCR for instant PAN check.' },
  { id: 3, title: 'Aadhaar Verification', icon: <BadgeCheck />, desc: 'Secure Paperless e-KYC integration.' },
  { id: 4, title: 'Selfie + Face Match', icon: <Camera />, desc: 'Biometric face matching with liveness detection.' },
  { id: 5, title: 'Bank Verification', icon: <Building2 />, desc: 'Instant penny drop and bank statement verification.' },
  { id: 6, title: 'Income & CIBIL Check', icon: <Search />, desc: 'Real-time retrieval of credit history and income.' },
  { id: 7, title: 'AML Security Check', icon: <ShieldAlert />, desc: 'Anti-money laundering and risk assessment screening.' },
  { id: 8, title: 'Loan Approval', icon: <Scan />, desc: 'Final digital signature and instant funds disbursal.' },
];

const WebsiteKYCFlow = () => {
  const sectionRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const progressRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress bar animation
      gsap.fromTo(progressRef.current, 
        { height: '0%' },
        { 
          height: '100%', 
          ease: 'none',
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 40%',
            end: 'bottom 40%',
            scrub: 0.5,
          }
        }
      );

      // Steps activation animation
      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        
        const circle = step.querySelector('.step-circle');
        const content = step.querySelector('.step-content');

        gsap.fromTo([circle, content],
          { opacity: 0.3, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: step,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Active state glow for circle
        gsap.to(circle, {
          boxShadow: '0 0 20px rgba(244, 180, 0, 0.6)',
          borderColor: '#F4B400',
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-12 text-gold font-bold uppercase tracking-[0.2em] mb-4">Journey Mapping</h2>
          <h3 className="text-3xl md:text-4xl font-black text-primary mb-4">
            Our 100% Digital <span className="text-gold">KYC Journey</span>
          </h3>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto font-medium">
            A seamless experience from start to finish. We've automated the complex bits so you can focus on your goals.
          </p>
        </div>

        <div ref={stepsContainerRef} className="relative max-w-5xl mx-auto">
          {/* Vertical Progress Bar */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 hidden md:block" />
          <div 
            ref={progressRef} 
            className="absolute left-1/2 top-0 w-1 gold-gradient -translate-x-1/2 hidden md:block origin-top shadow-[0_0_15px_rgba(244,180,0,0.5)] z-10" 
          />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const icon = React.cloneElement(step.icon, { size: 24 });
              return (
                <div 
                  key={step.id} 
                  ref={(el) => { if (el) stepRefs.current[index] = el; }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 w-full text-center ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  } step-content`}>
                    <p className="text-gold font-black text-xs mb-1 uppercase tracking-widest">Step 0{step.id} / 08</p>
                    <h4 className="text-xl font-black text-primary mb-2">{step.title}</h4>
                    <p className="text-textSecondary font-medium leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0 inline-block">
                      {step.desc}
                    </p>
                  </div>

                  {/* Circle */}
                  <div className="relative z-20 flex-shrink-0">
                    <div className="step-circle w-12 h-12 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center text-primary transition-all duration-300 shadow-sm">
                      {React.cloneElement(step.icon, { size: 20 })}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteKYCFlow;
