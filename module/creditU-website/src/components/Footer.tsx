import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-[#F9FBFF] border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <img src="/images/image.png" alt="creditU" className="h-10 w-auto mb-8" />
            <p className="text-textSecondary font-medium leading-relaxed mb-8">
              Revolutionizing personal finance in India with AI-powered, instant credit solutions. Experience banking like never before.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-black uppercase text-xs tracking-widest mb-8">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Contact', 'Press', 'Careers', 'Privacy Policy', 'Terms'].map(link => (
                <li key={link}>
                  <a href="#" className="text-textSecondary font-bold text-sm hover:text-primary transition-colors flex items-center group">
                    {link}
                    <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-black" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-primary font-black uppercase text-xs tracking-widest mb-8">Products</h4>
            <ul className="space-y-4">
              {['Personal Loan', 'Medical Loan', 'Career Loan', 'Credit Builder', 'Refer & Earn'].map(link => (
                <li key={link}>
                  <a href="#" className="text-textSecondary font-bold text-sm hover:text-primary transition-colors flex items-center group">
                    {link}
                    <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-primary font-black uppercase text-xs tracking-widest mb-8">Support & Connect</h4>
            <p className="text-textSecondary font-bold text-sm mb-6">Need help? Reach out to us at:</p>
            <ul className="space-y-4 text-primary font-black">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <a href="mailto:abc1@email.com" className="hover:text-gold transition-colors">abc1@email.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <a href="mailto:abc2@email.com" className="hover:text-gold transition-colors">abc2@email.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <a href="mailto:abc3@email.com" className="hover:text-gold transition-colors">abc3@email.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-textSecondary text-[13px] font-bold">
            © 2026 creditU Fintech Solutions Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-textSecondary text-[13px] font-bold hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-textSecondary text-[13px] font-bold hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-textSecondary text-[13px] font-bold hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
