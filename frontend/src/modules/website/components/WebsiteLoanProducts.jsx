import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    title: 'Personal Loan',
    limit: '₹ 5,00,000',
    interest: 'lowest interest',
    status: 'ACTIVE',
    active: true,
    bg: 'premium-gradient',
    textColor: 'text-white',
  },
  {
    title: 'Credit Line',
    limit: '₹ 2,00,000',
    interest: 'lowest interest',
    status: 'ACTIVE',
    active: true,
    bg: 'premium-gradient',
    textColor: 'text-white',
  },
  {
    title: 'Medical Loan',
    limit: '₹ 10,00,000',
    interest: 'lowest interest',
    status: 'COMING SOON',
    active: false,
    bg: 'bg-white',
    textColor: 'text-primary',
  },
  {
    title: 'Career Loan',
    limit: '₹ 3,00,000',
    interest: 'lowest interest',
    status: 'COMING SOON',
    active: false,
    bg: 'bg-white',
    textColor: 'text-primary',
  },
];

const WebsiteLoanProducts = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Lift effect on hover
      cardsRef.current.forEach((card) => {
        if (!card) return;
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -15, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="loans" ref={sectionRef} className="py-20 bg-[#F7F9FC] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-12 text-gold font-bold uppercase tracking-[0.2em] mb-4">Loan Products</h2>
            <h3 className="text-3xl md:text-4xl font-black text-primary">
              Choose the <span className="text-gold">Right Credit</span> for your needs
            </h3>
          </div>
          <p className="text-textSecondary font-medium lg:max-w-md lg:mb-2">
            Tailored financial solutions designed to match your life goals with flexible repayment options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className={`relative rounded-[24px] p-8 overflow-hidden shadow-premium transition-all duration-300 ${
                product.active ? product.bg : 'bg-white border border-slate-100 opacity-80'
              }`}
            >
              {/* Badge */}
              <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-10 ${
                product.active ? 'bg-gold text-primary' : 'bg-slate-100 text-slate-500'
              }`}>
                {product.status}
              </div>

              {/* Lock Icon for coming soon */}
              {!product.active && (
                <div className="absolute top-10 right-10 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                  <Lock size={20} />
                </div>
              )}

              {/* Active Icon */}
              {product.active && (
                <div className="absolute top-10 right-10 w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                  <ArrowUpRight size={24} />
                </div>
              )}

              <h4 className={`text-2xl font-black mb-8 ${product.textColor}`}>{product.title}</h4>

              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className={`${product.active ? 'text-white/60' : 'text-textSecondary'} text-xs font-bold uppercase tracking-wider`}>
                    Max Limit
                  </span>
                  <span className={`${product.textColor} text-lg font-black`}>{product.limit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${product.active ? 'text-white/60' : 'text-textSecondary'} text-xs font-bold uppercase tracking-wider`}>
                    Interest rate
                  </span>
                  <span className={`${product.textColor} text-lg font-black`}>{product.interest}</span>
                </div>
              </div>

              <button
                onClick={() => product.active && navigate('/download')}
                className={`w-full mt-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                product.active
                  ? 'bg-gold text-primary hover:bg-gold-dark'
                  : 'bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}>
                {product.active ? 'Apply for loan' : 'Join Waitlist'}
              </button>

              {/* Decorative Circle */}
              <div className={`absolute bottom-[-40px] right-[-40px] w-32 h-32 rounded-full blur-3xl ${
                product.active ? 'bg-gold/20' : 'bg-slate-200/50'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteLoanProducts;
