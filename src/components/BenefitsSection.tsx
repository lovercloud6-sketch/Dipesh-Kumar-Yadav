import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ArrowRight, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { setCurrentPage } = useStore();

  const benefits = [
    {
      id: 'relief',
      badge: 'Targeted Therapy',
      title: 'Immediate Relief For Plantar Fasciitis & Morning Heel Stabs',
      description: 'The first few steps out of bed should not feel like walking on broken glass. Our ergonomic heel offloading cavity suspends the inflamed plantar ligament, eliminating morning tension and soothing calcaneal spurs immediately.',
      points: [
        'Anatomically contoured arch cradle reduces ligament stretch by 38%',
        'Zero break-in period required—instant plush cushioning upon first wear',
        'Reduces secondary discomfort in ankles, lower back, and knee cartilage'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Stepora comfortable ergonomic arch footwear',
      imageLeft: false,
    },
    {
      id: 'lightweight',
      badge: 'Featherlight Engineering',
      title: 'Ultralight 4.8oz Weight That Never Drags You Down',
      description: 'Heavy, clunky orthotics cause muscle fatigue over long hours. We micro-engineered our closed-cell foam with millions of microscopic air pockets to create a shoe that floats on water yet supports over 350 lbs without bottoming out.',
      points: [
        '4.8 ounces per shoe—substantially lighter than conventional sneakers',
        'Antimicrobial, odor-resistant, and 100% waterproof',
        'Effortless slip-on, slip-off design for easy daily wear'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Lightweight everyday recovery footwear',
      imageLeft: true,
    },
    {
      id: 'indoor-outdoor',
      badge: 'Versatile Wear',
      title: 'Built For Hard Tile, Wood Floors, and Outdoor Errands',
      description: 'Hardwood and tile floors lack natural shock absorption, making indoor barefoot walking the leading cause of arch breakdown. Stepora protects your feet at home and seamlessly transitions to garden walks, grocery runs, and travel.',
      points: [
        'Non-marking rubber tread protects delicate hardwood from scuffs',
        'Quick-dry surface makes it ideal for bathroom tiles and poolside',
        'Easy to wash with mild soap and water—dries in under 10 minutes'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Indoor and outdoor foot comfort',
      imageLeft: false,
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-block mb-3">
            Real Everyday Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            Support for Everyday Movement
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Whether you are on your feet for 12 hours at work, recovering from a workout, or spending time at home, our biomechanical footbed delivers restorative all-day ease.
          </p>
        </div>

        {/* Alternating Layouts */}
        <div className="space-y-16 sm:space-y-24">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  benefit.imageLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xl aspect-[4/3] group">
                  <img
                    src={benefit.imageUrl}
                    alt={benefit.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-900 shadow-xs">
                    STEPORA Lab Tested
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div
                className={`lg:col-span-6 space-y-5 ${
                  benefit.imageLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <Sparkles size={14} className="text-amber-600" />
                  <span>{benefit.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
                  {benefit.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {benefit.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  {benefit.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setCurrentPage('shop')}
                    className="inline-flex items-center gap-2 text-stone-900 font-bold text-sm hover:text-amber-700 transition-colors group"
                  >
                    <span>Shop Supportive Footwear</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
