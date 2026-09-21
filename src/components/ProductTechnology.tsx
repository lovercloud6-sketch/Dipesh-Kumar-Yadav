import React from 'react';
import { Layers, Shield, Activity, Compass, Footprints, Sparkles, Feather } from 'lucide-react';

export const ProductTechnology: React.FC = () => {
  const technologies = [
    {
      id: 'cloudflex',
      icon: Feather,
      title: 'CloudFlex™ Impact Cushioning',
      subtitle: 'Absorbs 45% more strike force',
      description: 'Proprietary high-rebound closed-cell EVA compound dynamically adapts to your step weight, dissipating shock before it travels upward to your ankles, knees, and lower spine.',
      metric: '45% Shock Reduction'
    },
    {
      id: 'arch-cradle',
      icon: Activity,
      title: 'Adaptive Dynamic Arch Bridge',
      subtitle: '32mm Anatomical Support Contour',
      description: 'Unlike rigid plastic orthotics that pinch, our ergonomic arch bridge flexes with your natural foot movement while keeping the plantar fascia ligament relaxed in neutral alignment.',
      metric: 'Neutral Gait Alignment'
    },
    {
      id: 'heel-cup',
      icon: Layers,
      title: 'Biomechanical Deep Heel Cup',
      subtitle: 'Prevents Inward Overpronation',
      description: 'A deeply contoured 1.2-inch heel cradle centers the calcaneal fat pad directly underneath your heel bone, preventing rolling, wobble, and ankle strain on hard flat surfaces.',
      metric: 'Maximum Stability'
    },
    {
      id: 'aerogrip',
      icon: Compass,
      title: 'Aero-Grip Non-Slip Wave Tread',
      subtitle: 'All-Surface Wet & Dry Traction',
      description: 'Precision siped rubber wave tread channels away water and moisture, giving you slip-resistant footing across slick bathroom tiles, hardwood floors, and patio pavers.',
      metric: 'Anti-Slip Safety'
    }
  ];

  return (
    <section id="technology-section" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Biomechanical Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            Foot Technology Designed For All-Day Relief
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Every contour in a pair of Stepora shoes is calculated to alleviate gravity’s toll on your feet, knees, and hips—transforming hard floors into cloud-like terrain.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-amber-100 text-stone-800 group-hover:text-amber-800 flex items-center justify-center mb-5 transition-colors">
                    <Icon size={24} />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    {tech.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-stone-900 mb-2.5 leading-snug">
                    {tech.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-stone-800">
                    {tech.metric}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
