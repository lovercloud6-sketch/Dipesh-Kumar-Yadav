import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Lock, Award, HeartHandshake } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: '30-Day Comfort Guarantee',
      description: 'Wear them inside and outside for 30 full days. If your feet don’t feel noticeably better, return them for a 100% refund—even if worn.'
    },
    {
      icon: RotateCcw,
      title: 'Hassle-Free Size Exchanges',
      description: 'Got the wrong size? We provide instant pre-paid return labels and expedited replacements so you get your ideal fit without delay.'
    },
    {
      icon: Truck,
      title: 'Free Express Shipping $60+',
      description: 'All orders over $60 qualify for free tracked shipping. Orders placed before 2 PM EST ship same-day from our domestic distribution centers.'
    },
    {
      icon: Lock,
      title: '256-Bit Secure Checkout',
      description: 'Bank-level encrypted transactions. We never store raw card numbers and support Apple Pay, Google Pay, and major debit/credit cards.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake size={14} />
            <span>The Stepora Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Try Stepora Completely Risk-Free
          </h2>
          <p className="text-sm text-stone-400">
            We stand behind every pair of recovery shoes and insoles we craft. Your satisfaction and physical comfort come first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/60 flex flex-col justify-between hover:bg-stone-800 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
