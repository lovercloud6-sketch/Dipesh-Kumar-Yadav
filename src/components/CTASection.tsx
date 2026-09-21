import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-stone-900 text-white">
      {/* Background visual with rich dark gradient */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1600&q=80"
          alt="Stepora Comfort Footwear"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-800/90 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 border border-stone-700">
          <Sparkles size={14} />
          <span>Walk On Clouds Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-tight">
          Ready for a More Comfortable Step?
        </h2>

        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Join over 42,000 customers who transformed their daily walking comfort. Experience podiatrist-engineered support backed by our 30-day risk-free guarantee.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('shop')}
            className="w-full sm:w-auto bg-white text-stone-900 hover:bg-stone-100 px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.99]"
          >
            <span>SHOP ALL STYLES</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setCurrentPage('track-order')}
            className="w-full sm:w-auto bg-stone-800/80 hover:bg-stone-800 text-stone-200 border border-stone-700 px-6 py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
          >
            <Truck size={18} className="text-amber-400" />
            <span>Track Existing Order</span>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-stone-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" /> 30-Day Money-Back Guarantee
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Truck size={14} className="text-emerald-400" /> Free Shipping On Orders $60+
          </span>
        </div>
      </div>
    </section>
  );
};
