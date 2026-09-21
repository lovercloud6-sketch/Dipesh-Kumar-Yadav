import React from 'react';
import { useStore } from '../context/StoreContext';
import { Footprints, ShieldCheck, Heart, Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Our Origin &amp; Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Restoring the Joy of Walking, One Step at a Time
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Stepora was founded on a simple medical realization: modern indoor floors of concrete, hardwood, and tile are unforgivingly rigid—subjecting our 26 foot bones and 33 joints to repetitive micro-trauma with every single step.
          </p>
        </div>

        {/* Story & Visual split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              The Problem We Solved
            </span>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Traditional Slippers Soften The Blow, But Fail To Support
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Standard memory foam slippers collapse within weeks, leaving your arch unsupported and allowing your heel to roll inward. Rigid plastic medical orthotics, on the other hand, are painful and unwearable at home.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We spent three years collaborating with podiatric surgeons and material engineers to formulate <strong>CloudFlex™</strong>: an ultra-dense closed-cell polymeric matrix that offers therapeutic arch rebound while remaining cushiony and cloud-like.
            </p>
            <div className="pt-2 space-y-2 text-xs font-semibold text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Zero break-in discomfort or rigid pinching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>45% reduction in morning plantar fascia strain</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>100% waterproof, washable, and odor-resistant</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80"
                alt="Biomechanical Foot Lab Research"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Brand Pillars */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-stone-900">Our Core Principles</h3>
            <p className="text-xs text-stone-500 mt-1">Every Stepora product is governed by three non-negotiables</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Footprints size={24} />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">Anatomical Alignment</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We position the foot in its natural neutral alignment, restoring healthy kinetic chain mechanics from footbed to knees, hips, and lumbar spine.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">Never Bottoms Out</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Conventional foam pancakes after a few months. Our dual-density closed-cell EVA maintains 96% of its structural cushion height after 1,000,000 compression cycles.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">30-Day Risk-Free Trial</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                True foot comfort requires walking in your real environment. We let you test Stepora for 30 full days—indoors and out. If your feet don’t love them, returns are 100% free.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Experience The Difference Today</h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
            Discover why over 42,000 customers have made Stepora their go-to daily recovery shoe.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 bg-white text-stone-900 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            <span>Shop The Footwear Collection</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
