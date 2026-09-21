import React, { useState } from 'react';
import { useStore, PageRoute } from '../context/StoreContext';
import { 
  Footprints, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  CreditCard,
  Phone,
  Clock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, settings } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-black">
                <Footprints size={18} />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {settings.brandName || 'STEPORA'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Biomechanically designed foot comfort and ergonomic recovery footwear engineered to relieve joint pressure, calm arch strain, and restore effortless daily movement.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-amber-400" />
                <span>{settings.supportPhone}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-400" />
                <span>Mon-Fri 9am-6pm EST</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-stone-900/80 p-6 sm:p-8 rounded-2xl border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                VIP Comfort Club
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Unlock 15% Off Your First Order
              </h3>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                Subscribe for private sale access, podiatrist foot care guides, and exclusive new product releases.
              </p>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                <CheckCircle2 size={16} />
                <span>You're in! Use coupon code <strong>COMFORT15</strong> at checkout for 15% off.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-3.5 py-3 pl-10 text-xs sm:text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-stone-500" />
                </div>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          {/* Shop */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              Shop Stepora
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  All Ergonomic Footwear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Recovery Slides
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  OrthoCloud Clogs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  3D Arch Support Insoles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Targeted Compression Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('track-order')} className="hover:text-white transition-colors text-amber-400 font-semibold flex items-center gap-1">
                  <span>Track Your Order</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  FAQ &amp; Sizing Chart
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('reviews')} className="hover:text-white transition-colors">
                  Verified Reviews (4.9★)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  My Account / Order History
                </button>
              </li>
            </ul>
          </div>

          {/* Our Brand */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              About Stepora
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Brand Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Biomechanical Research
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Medical Advisory Board
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors text-stone-500 hover:text-stone-300">
                  Store Administration
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              Store Policies
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('shipping')} className="hover:text-white transition-colors">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns')} className="hover:text-white transition-colors">
                  Returns &amp; 30-Day Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('warranty')} className="hover:text-white transition-colors">
                  1-Year Craftsmanship Warranty
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (Copyright, Payment Badges, Currency, Social) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          
          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="bg-stone-900 border border-stone-800 text-stone-300 text-[11px] rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="USD ($)">United States (USD $)</option>
              <option value="CAD ($)">Canada (CAD $)</option>
              <option value="EUR (€)">European Union (EUR €)</option>
              <option value="GBP (£)">United Kingdom (GBP £)</option>
              <option value="AUD ($)">Australia (AUD $)</option>
            </select>

            <span className="text-[11px]">
              &copy; {new Date().getFullYear()} {settings.brandName || 'STEPORA'} Footwear Inc. All rights reserved.
            </span>
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">VISA</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">AMEX</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">PAYPAL</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="#instagram" className="text-stone-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#facebook" className="text-stone-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#twitter" className="text-stone-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#youtube" className="text-stone-400 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
