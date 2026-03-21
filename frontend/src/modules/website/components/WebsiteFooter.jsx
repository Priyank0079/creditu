import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebsiteFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <img src="/image.png" alt="creditU" className="h-10 w-auto" />
            <p className="text-textSecondary font-medium leading-relaxed max-w-sm">
              We're on a mission to democratize credit in India. Simple, fast, and fair financial solutions for everyone.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61579571376717" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/creditu.in?igsh=MTF3M205ZjdtYThv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">Contact Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex flex-shrink-0 items-center justify-center text-gold">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Corporate</p>
                    <p className="text-primary font-bold">info@creditu.in</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex flex-shrink-0 items-center justify-center text-gold">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Customer Care</p>
                    <p className="text-primary font-bold">care@creditu.in</p>
                  </div>
                </li>
              </ul>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex flex-shrink-0 items-center justify-center text-gold">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Grievance</p>
                    <p className="text-primary font-bold">grievance@creditu.in</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex flex-shrink-0 items-center justify-center text-gold">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Grievance Officer</p>
                    <p className="text-primary font-bold text-sm">Selvin</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-textSecondary text-sm font-medium">
            © 2026 creditU Technologies Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/legal/privacy" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/legal/terms" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Terms and Condition</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebsiteFooter;
