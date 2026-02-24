import React from 'react';
import { ShieldCheck, Info, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/images/image.png"
                alt="Creditu Logo"
                className="h-8 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <p className="text-textSecondary text-sm max-w-sm leading-relaxed">
              We provide smart financial solutions to help you achieve your dreams. Secure, fast, and transparent loan processes designed for the modern user.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-textSecondary">
              <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">How it Works</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-textSecondary">
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Security</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-trust bg-trust/5 px-4 py-2 rounded-full border border-trust/10">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider">PCI-DSS Compliant Secure Banking</span>
          </div>

          <p className="text-[10px] text-textSecondary font-bold uppercase tracking-widest">
            © 2026 Creditu Finance. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-gray-50 text-textSecondary hover:bg-primary/5 hover:text-primary transition-all">
              <MessageCircle size={18} />
            </button>
            <button className="p-2 rounded-lg bg-gray-50 text-textSecondary hover:bg-primary/5 hover:text-primary transition-all">
              <Info size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
