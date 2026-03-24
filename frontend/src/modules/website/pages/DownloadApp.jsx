import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Star, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WebsiteNavbar from '../components/WebsiteNavbar';
import WebsiteFooter from '../components/WebsiteFooter';

const DownloadApp = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <WebsiteNavbar />
      
      <main className="flex-1 flex items-start pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        {/* Background Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">


          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Main Content */}
            <div ref={contentRef} className="w-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full font-bold text-xs mb-8 uppercase tracking-widest border border-gold/20">
                <Star size={14} fill="currentColor" />
                <span>Top Rated Fintech App</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight mb-6">
                Experience <span className="text-gold">creditU</span> <br className="hidden md:block" /> on your mobile device
              </h1>
              
              <p className="text-base md:text-lg text-textSecondary font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                Get instant loans, track your credit score, and manage your finances with our secure mobile application. The complete credit experience, now in your pocket.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button className="bg-primary text-white py-3 px-8 rounded-xl flex items-center gap-3 transition-all hover:scale-105 hover:bg-slate-800 shadow-xl w-full sm:w-auto">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.75.8.01 2.05-.8 3.58-.64 1.28.13 2.27.67 2.87 1.54-2.58 1.51-2.14 5.09.52 6.18-.53 1.34-1.25 2.68-2.05 3.14zM12.03 7.25c-.08-2.13 1.76-3.95 3.73-4.04.28 2.37-2.1 4.31-3.73 4.04z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase font-black opacity-60 leading-none mb-1 text-white/70">Download on the</p>
                    <p className="text-lg font-black leading-none text-white">App Store</p>
                  </div>
                </button>

                <button className="bg-primary text-white py-3 px-8 rounded-xl flex items-center gap-3 transition-all hover:scale-105 hover:bg-slate-800 shadow-xl w-full sm:w-auto">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M5.5 3.6c-.3.3-.5.8-.5 1.3v14.2c0 .5.2 1 .5 1.3l.1.1L13 13.1v-.2L5.6 3.5l-.1.1zM17.5 17.6l-3.2-3.2v-.8l3.2-3.2.1.1 3.8 2.1c1.1.6 1.1 1.6 0 2.2l-3.8 2.1-.1.7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase font-black opacity-60 leading-none mb-1 text-white/70">Get it on</p>
                    <p className="text-lg font-black leading-none text-white">Google Play</p>
                  </div>
                </button>
              </div>

              <div className="flex items-center flex-wrap justify-center gap-10 pt-10 border-t border-slate-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-green-500" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-primary/70">Fully Secure</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Zap size={20} className="text-gold" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-primary/70">Instant Approval</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
};

export default DownloadApp;
