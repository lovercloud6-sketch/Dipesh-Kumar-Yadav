import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Footprints, Award } from 'lucide-react';
import { Rating } from './Rating';

export const Hero: React.FC = () => {
  const { settings, setCurrentPage } = useStore();

  const handleShopNow = () => {
    setCurrentPage('shop');
  };

  const scrollToTech = () => {
    const el = document.getElementById('technology-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/90 via-stone-50 to-white py-12 sm:py-20 lg:py-24 border-b border-stone-200/60">
      {/* Decorative ambient blurred glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Social Proof Pill */}
            <div className="inline-flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-stone-200/90 shadow-2xs">
              <Rating rating={4.9} size={13} showScore={false} />
              <span className="text-xs font-bold text-stone-900">4.9 / 5.0</span>
              <span className="text-stone-300">|</span>
              <span className="text-xs font-medium text-stone-600">42,000+ Pain-Free Walkers</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
                {settings.heroHeadline || 'Comfort Designed for Every Step'}
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {settings.heroSubheadline || 'Medical-grade ergonomic foot support engineered to relieve plantar tension, align joint posture, and make walking feel effortless.'}
              </p>
            </div>

            {/* Value Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs sm:text-sm font-semibold text-stone-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Zero Break-In Period</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Deep Ergonomic Heel Cup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Podiatrist Approved</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleShopNow}
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-50 px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <span>{settings.heroCtaText || 'SHOP BEST SELLERS'}</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={scrollToTech}
                className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-6 py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xs transition-all"
              >
                <Footprints size={18} className="text-amber-700" />
                <span>Explore The Technology</span>
              </button>
            </div>

            {/* Mini Trust Bar */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-center lg:text-left">
              <div>
                <span className="block text-lg font-black text-stone-900">30-Day</span>
                <span className="text-[11px] text-stone-500 font-medium">Risk-Free Comfort Trial</span>
              </div>
              <div>
                <span className="block text-lg font-black text-stone-900">45% Less</span>
                <span className="text-[11px] text-stone-500 font-medium">Heel Impact Pressure</span>
              </div>
              <div>
                <span className="block text-lg font-black text-stone-900">100%</span>
                <span className="text-[11px] text-stone-500 font-medium">Easy Sizing Exchanges</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Card Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <img
                  src={settings.heroImageUrl || 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85'}
                  alt="Stepora CloudStep Recovery Slide"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Ambient gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                {/* Floating Product Highlight Banner */}
                <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800">
                        Top Seller of the Week
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900">
                      CloudStep™ Recovery Slide
                    </h4>
                    <p className="text-xs text-stone-500 font-medium">
                      Plush 1.7" Orthotic Platform
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-stone-900 block leading-tight">
                      $54.99
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      $75.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Award Badge */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-200/90 flex items-center gap-3 animate-in fade-in zoom-in duration-500">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award size={22} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                    Voted #1 Footwear
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                    Plantar Relief 2026
                  </span>
                </div>
              </div>

              {/* Floating Doctor Endorsement Badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 bg-stone-900 text-stone-50 p-3 sm:p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-emerald-400" />
                <span className="text-xs font-bold tracking-tight">
                  Orthopedic Certified
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
