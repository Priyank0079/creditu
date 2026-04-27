import React, { useEffect, useRef } from 'react';
import WebsiteNavbar from '../components/WebsiteNavbar';
import WebsiteFooter from '../components/WebsiteFooter';
import { ShieldCheck, Users, Landmark, FileText, CheckCircle2, TrendingUp, Wallet, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const eligibilityRef = useRef(null);
  const regulatoryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.about-hero-animate', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out' 
        }
      );

      // Who We Are Stats Animation
      gsap.fromTo('.stat-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: whoWeAreRef.current,
            start: 'top 75%',
          }
        }
      );

      // Eligibility Cards Animation
      gsap.fromTo('.eligibility-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: eligibilityRef.current,
            start: 'top 80%',
          }
        }
      );

      // Regulatory Section Animation
      gsap.fromTo('.regulatory-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: regulatoryRef.current,
            start: 'top 85%',
          }
        }
      );
    }, [heroRef, whoWeAreRef, eligibilityRef, regulatoryRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <WebsiteNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="about-hero-animate inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full font-bold text-xs mb-6 uppercase tracking-widest border border-gold/20">
              <Users size={14} />
              <span>Our Story</span>
            </div>
            <h1 className="about-hero-animate text-3xl md:text-5xl font-black text-primary mb-6">
              Empowering India with <br /> <span className="text-gold">Accessible Credit</span>
            </h1>
            <p className="about-hero-animate text-lg md:text-xl text-textSecondary font-medium max-w-3xl mx-auto leading-relaxed">
              We're on a mission to bridge the credit gap for millions of Indians through innovative technology and transparent lending.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section ref={whoWeAreRef} className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-gold" size={24} />
                    <span className="text-primary font-black uppercase tracking-widest text-sm">Bangalore Based</span>
                  </div>
                  <h2 className="text-3xl font-black text-primary mb-6">Who we are?</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-textSecondary leading-relaxed">
                      <span className="font-bold text-primary">creditU</span> is a Bangalore-based fintech platform building India's first <span className="text-gold font-bold">micro UPI credit line</span> for daily commuters. We believe every Indian deserves access to fair, transparent credit — without the hassle of a credit card or a bank visit.
                    </p>
                    <p className="text-lg text-textSecondary leading-relaxed">
                      We are a <span className="font-bold text-primary">Lending Service Provider (LSP)</span> working in partnership with RBI-licensed NBFCs to offer customers a pre-approved credit line and Personal Loan. Customers can use this credit line to pay any UPI merchant directly from the creditU app — and repay in simple monthly EMIs.
                    </p>
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-gold">
                      <p className="text-primary font-medium italic text-base md:text-lg">
                        "creditU is registered under the Companies Act 2013 and operates in full compliance with RBI Digital Lending Guidelines 2022."
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-gold/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Certified</p>
                          <p className="text-sm font-bold text-primary leading-none">ISO 9001:2015</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-gold/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center text-gold">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Certified</p>
                          <p className="text-sm font-bold text-primary leading-none">ISO 27001:2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="stat-card p-6 bg-white border border-slate-100 rounded-[24px] text-center transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 group hover:-translate-y-2 hover:shadow-xl relative hover:z-10 shadow-sm hover:border-primary/30">
                    <TrendingUp className="text-primary mx-auto mb-3" size={28} />
                    <h4 className="text-xl font-black text-primary">100%</h4>
                    <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mt-1">Digital</p>
                  </div>
                  <div className="stat-card p-6 bg-white border border-slate-100 rounded-[24px] text-center transition-all duration-300 hover:bg-gradient-to-br hover:from-gold/20 hover:to-primary/10 group hover:-translate-y-2 hover:shadow-xl relative hover:z-10 shadow-sm hover:border-primary/30">
                    <ShieldCheck className="text-gold mx-auto mb-3" size={28} />
                    <h4 className="text-xl font-black text-primary">Secure</h4>
                    <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mt-1">Compliance</p>
                  </div>
                  <div className="stat-card p-6 bg-white border border-slate-100 rounded-[24px] text-center transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 group hover:-translate-y-2 hover:shadow-xl relative hover:z-10 shadow-sm hover:border-primary/30">
                    <Wallet className="text-gold mx-auto mb-3" size={28} />
                    <h4 className="text-xl font-black text-primary">Instant</h4>
                    <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mt-1">Credit Line</p>
                  </div>
                  <div className="stat-card p-6 bg-white border border-slate-100 rounded-[24px] text-center transition-all duration-300 hover:bg-gradient-to-br hover:from-gold/20 hover:to-primary/10 group hover:-translate-y-2 hover:shadow-xl relative hover:z-10 shadow-sm hover:border-primary/30">
                    <Users className="text-primary mx-auto mb-3" size={28} />
                    <h4 className="text-xl font-black text-primary">Fair</h4>
                    <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mt-1">Transparency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Apply */}
        <section ref={eligibilityRef} className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full font-bold text-[10px] mb-4 uppercase tracking-[0.2em]">Requirement</div>
            <h2 className="text-2xl md:text-4xl font-black text-primary mb-16">Who can Apply?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Criteria Cards */}
              <div className="eligibility-card bg-white p-6 rounded-[24px] shadow-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 hover:shadow-xl hover:-translate-y-2 relative hover:z-10 text-left border border-slate-100 hover:border-primary/30">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="text-primary" size={20} />
                </div>
                <h4 className="text-lg font-black text-primary mb-3">Age & Income</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-textSecondary text-sm font-medium">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span>Age: 21 to 55 years</span>
                  </li>
                  <li className="flex items-center gap-2 text-textSecondary text-sm font-medium">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span>Monthly Income: ₹15,000+</span>
                  </li>
                </ul>
              </div>

              <div className="eligibility-card bg-white p-6 rounded-[24px] shadow-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 hover:shadow-xl hover:-translate-y-2 relative hover:z-10 text-left border border-slate-100 hover:border-primary/30">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <TrendingUp className="text-gold" size={20} />
                </div>
                <h4 className="text-lg font-black text-primary mb-3">Credit Health</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-textSecondary text-sm font-medium">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span>Credit Score: 650+</span>
                  </li>
                  <li className="flex items-center gap-2 text-textSecondary text-sm font-medium">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span>Active bank account</span>
                  </li>
                </ul>
              </div>

              <div className="eligibility-card bg-white p-6 rounded-[24px] shadow-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-gold/20 hover:shadow-xl hover:-translate-y-2 relative hover:z-10 text-left border border-slate-100 hover:border-primary/30">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="text-primary" size={20} />
                </div>
                <h4 className="text-lg font-black text-primary mb-3">Requirements</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-textSecondary text-sm font-medium">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span>Valid PAN and Aadhaar</span>
                  </li>
                  <li className="flex items-center gap-2 text-textSecondary text-sm font-medium">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span>Salaried/Self-employed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-textSecondary font-medium text-lg">
                Gig workers and small business owners are also welcome to apply.
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Information */}
        <section ref={regulatoryRef} className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="regulatory-animate max-w-4xl mx-auto bg-primary rounded-[40px] p-10 md:p-16 relative overflow-hidden shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                  <Landmark className="text-gold" size={28} />
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.25em]">Regulatory Information</h3>
                </div>
                <div className="space-y-6 text-white/80 leading-relaxed text-base">
                  <p>
                    <span className="font-bold text-white">creditU Technologies Private Limited</span> is a Lending Service Provider (LSP) registered under the Companies Act 2013. All loans and credit lines offered through the creditU platform are provided by our partner NBFC which is registered with and regulated by the Reserve Bank of India.
                  </p>
                  <div className="p-6 bg-white/10 rounded-[20px] border border-white/10 font-medium italic text-white text-sm leading-relaxed">
                    "creditU does not lend money directly. creditU is a technology and distribution platform only."
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Loan Tenure</span>
                      <span className="text-lg font-black text-white">Up to 12 months</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Compliance</span>
                      <span className="text-lg font-black text-white">RBI Guidelines 2022</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Quality Management</span>
                      <span className="text-lg font-black text-white">ISO 9001:2015</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Information Security</span>
                      <span className="text-lg font-black text-white flex items-center gap-2">
                        ISO 27001:2022
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
};

export default About;
