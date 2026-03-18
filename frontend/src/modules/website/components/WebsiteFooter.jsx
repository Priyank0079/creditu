import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, Phone, MapPin } from 'lucide-react';

const WebsiteFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <img src="/image.png" alt="creditU" className="h-10 w-auto" />
            <p className="text-textSecondary font-medium leading-relaxed">
              We're on a mission to democratize credit in India. Simple, fast, and fair financial solutions for everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Features', 'Loan Products', 'How it Works', 'Security'].map(item => (
                <li key={item}>
                  <a href="#" className="text-textSecondary font-semibold hover:text-gold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex flex-shrink-0 items-center justify-center text-gold">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <p className="text-primary font-bold">support@creditu.in</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex flex-shrink-0 items-center justify-center text-gold">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                  <p className="text-primary font-bold">+91 1800-CREDIT-U</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">Newsletter</h4>
            <p className="text-textSecondary font-medium mb-6">Stay updated with our latest offers and financial tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full py-4 pl-6 pr-14 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-gold transition-colors font-medium"
              />
              <button className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-textSecondary text-sm font-medium">
            © 2026 creditU Fintech Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebsiteFooter;
