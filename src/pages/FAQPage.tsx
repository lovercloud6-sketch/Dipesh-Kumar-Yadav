import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, ChevronUp, Search, HelpCircle, Mail, Phone, ArrowRight, X } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { setCurrentPage, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqs = [
    {
      id: 'faq-1',
      category: 'sizing',
      question: 'How does Stepora sizing run compared to regular shoe sizes?',
      answer: 'Stepora footwear fits true to standard US sizing with an anatomically wide toe box to prevent toe bunions and cramping. If you are in between sizes or wear half sizes (e.g., US 8.5), we recommend sizing up to a US 9 for slides and clogs. If your size doesn’t fit perfectly, our 30-day free exchange program has you completely covered.'
    },
    {
      id: 'faq-2',
      category: 'medical',
      question: 'Will Stepora help with Plantar Fasciitis and morning heel pain?',
      answer: 'Yes! Over 68% of our customers specifically wear Stepora to manage plantar fasciitis, heel spurs, and flat feet. Our 1.7-inch CloudFlex platform incorporates a deep heel cup that cradles the calcaneus bone while the dynamic arch bridge offloads tension from the plantar aponeurosis ligament, preventing sharp morning heel pain.'
    },
    {
      id: 'faq-3',
      category: 'medical',
      question: 'Can I wear Stepora all day long on concrete or hardwood floors?',
      answer: 'Absolutely. Stepora shoes were specifically engineered for nurses, retail workers, chefs, and anyone on their feet 8+ hours a day. The shock-dispersing sole absorbs high-impact strike vibrations that usually cause lower-back fatigue and knee strain.'
    },
    {
      id: 'faq-4',
      category: 'shipping',
      question: 'How fast is delivery and how much does shipping cost?',
      answer: 'We offer FREE Standard Tracked Delivery on all domestic orders over $60. Orders placed before 2:00 PM EST ship same-day from our fulfillment warehouses. Delivery takes 2 to 4 business days. You will receive real-time SMS and email tracking links the moment your parcel leaves our facility.'
    },
    {
      id: 'faq-5',
      category: 'returns',
      question: 'How does the 30-Day Risk-Free Comfort Guarantee work?',
      answer: 'We encourage you to wear your Stepora shoes both indoors and outdoors for up to 30 days. If your feet, joints, or back do not feel noticeably better, simply contact us for a prepaid return label and a 100% full refund—even if the shoes have been worn outside.'
    },
    {
      id: 'faq-6',
      category: 'sizing',
      question: 'Are Stepora slides and clogs suitable for wide feet?',
      answer: 'Yes! Our footbed is naturally designed with a generous EE-width accommodation and ergonomic toe splay room. The upper strap flexes gently to contour high insteps without pressing uncomfortably into the dorsum of your foot.'
    },
    {
      id: 'faq-7',
      category: 'returns',
      question: 'What if I need a different size or color?',
      answer: 'Size and color exchanges are 100% free within 30 days of purchase. Simply visit our Track Order page or contact our support team at support@stepora.com with your order number, and we will send out your replacement right away.'
    },
    {
      id: 'faq-8',
      category: 'care',
      question: 'How do I clean and wash my Stepora footwear?',
      answer: 'Because our shoes are made from 100% waterproof closed-cell EVA foam, cleaning is effortless. Simply rinse them under cool water with a mild dish soap or hand soap, then air-dry in the shade. Avoid leaving them in direct high heat or inside a boiling hot car for prolonged hours, as excessive heat can cause foam shrinkage.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'sizing', label: 'Sizing & Fit' },
    { id: 'medical', label: 'Pain Relief & Podiatry' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'returns', label: '30-Day Guarantee' },
    { id: 'care', label: 'Care & Cleaning' },
  ];

  const filteredFaqs = faqs.filter(f => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle size={14} />
            <span>Customer Help Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Have questions about sizing, podiatric support, or returns? Find instant answers below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search questions (e.g. plantar fasciitis, wide feet, returns)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-2xl py-3.5 pl-11 pr-10 text-xs sm:text-sm text-stone-900 shadow-2xs focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
          <Search size={18} className="absolute left-4 top-3.5 text-stone-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map(faq => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100/70">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still need help CTA */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-base font-bold text-stone-900">Still have questions?</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Our dedicated foot care support specialists are available Monday to Friday.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shrink-0"
          >
            <Mail size={15} />
            <span>Contact Customer Care</span>
          </button>
        </div>

      </div>
    </div>
  );
};
