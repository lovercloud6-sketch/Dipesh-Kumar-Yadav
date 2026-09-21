import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock, FileText } from 'lucide-react';

interface PolicyPageProps {
  initialPolicy?: 'shipping' | 'returns' | 'warranty' | 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialPolicy = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'warranty' | 'privacy' | 'terms'>(initialPolicy);

  const tabs = [
    { id: 'shipping' as const, label: 'Shipping Policy', icon: Truck },
    { id: 'returns' as const, label: '30-Day Returns & Trial', icon: RotateCcw },
    { id: 'warranty' as const, label: '1-Year Warranty', icon: ShieldCheck },
    { id: 'privacy' as const, label: 'Privacy Policy', icon: Lock },
    { id: 'terms' as const, label: 'Terms of Service', icon: FileText },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Stepora Store Policies
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Transparent, customer-first terms backing every step of your journey with us.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xs prose prose-stone max-w-none text-xs sm:text-sm text-stone-600 leading-relaxed space-y-6">
          
          {activeTab === 'shipping' && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-4">Domestic &amp; International Shipping Policy</h2>
              <p>
                At Stepora, we know that when your feet are hurting, every day of waiting counts. That is why all orders received Monday through Friday before 2:00 PM EST are packaged and dispatched the very same business day.
              </p>

              <h3 className="text-base font-bold text-stone-900 mt-6 mb-2">Shipping Rates &amp; Delivery Estimates</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Standard Tracked Delivery (3-5 Business Days):</strong> FREE for all domestic orders over $60. For orders under $60, a flat rate of $5.99 is charged.</li>
                <li><strong>Express Air Priority (1-2 Business Days):</strong> $9.99 flat rate. Handled via expedited courier routing.</li>
                <li><strong>International Delivery:</strong> $14.99 flat shipping with tracking to Canada, UK, Australia, and the EU (6-10 business days).</li>
              </ul>

              <h3 className="text-base font-bold text-stone-900 mt-6 mb-2">Live Shipment Tracking</h3>
              <p>
                As soon as your parcel is scanned by our carrier (USPS or FedEx), an automated notification containing your tracking code and live tracking page link will be sent to your email and mobile phone.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-4">30-Day Risk-Free Comfort Walking Guarantee</h2>
              <p>
                We believe you cannot judge biomechanical footwear by trying them on for 30 seconds on a carpeted showroom floor. Your feet need time to adapt to proper anatomical arch support and offloading.
              </p>

              <h3 className="text-base font-bold text-stone-900 mt-6 mb-2">How It Works</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Wear Them Everywhere:</strong> Wear your Stepora footwear at home, running errands, or on your daily walks for 30 full days.</li>
                <li><strong>100% Free Size Exchanges:</strong> If the fit isn’t ideal, we provide immediate size swaps with zero shipping fees.</li>
                <li><strong>Full Refund Promise:</strong> If you are not completely pain-free and satisfied, return them for a 100% refund—even if visibly worn.</li>
              </ul>

              <h3 className="text-base font-bold text-stone-900 mt-6 mb-2">Starting a Return</h3>
              <p>
                Email our customer care team at <strong>support@stepora.com</strong> with your order number. We will generate an instant prepaid shipping label for you. Once dropped off at any post office, your refund is credited within 48 hours.
              </p>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-4">1-Year Craftsmanship &amp; Material Warranty</h2>
              <p>
                Stepora footwear is engineered using high-density closed-cell EVA designed to withstand millions of compression cycles without flattening out.
              </p>
              <h3 className="text-base font-bold text-stone-900 mt-6 mb-2">What Is Covered</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Structural splitting or tearing of the upper foot straps under normal walking usage.</li>
                <li>Premature sole delamination or outsole rubber separation.</li>
                <li>Insole arch breakdown exceeding 15% within the first 12 months.</li>
              </ul>
              <h3 className="text-base font-bold text-stone-900 mt-6 mb-2">Warranty Claim Process</h3>
              <p>
                Simply send a photo of the defect alongside your proof of purchase to warranty@stepora.com. Approved claims receive a brand-new replacement pair shipped free of charge.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-4">Customer Privacy Policy</h2>
              <p>
                Your privacy is paramount. Stepora operates on strict data integrity standards:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We <strong>NEVER</strong> sell, rent, or trade your personal data, email, or order history to third-party data brokers.</li>
                <li>All payment transactions are processed directly via encrypted PCI-compliant payment gateways. We never store raw credit card numbers on our servers.</li>
                <li>You may request complete erasure of your account details at any time by contacting privacy@stepora.com.</li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-4">Terms of Service</h2>
              <p>
                By browsing Stepora.com and placing an order, you agree to our standard terms of use:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>All medical and biomechanical claims are based on anatomical footbed testing. Stepora footwear is designed for everyday comfort and support and does not replace surgical or medical consultations for acute trauma.</li>
                <li>Product availability and pricing promotions are subject to change based on seasonal inventory runs.</li>
                <li>All content, trademarks, product names (CloudFlex, Stepora), and photography are proprietary to Stepora Footwear Inc.</li>
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
