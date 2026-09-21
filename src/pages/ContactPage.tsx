import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, Clock, MapPin, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, setCurrentPage } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [subject, setSubject] = useState('Order & Shipping Status');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `TCK-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
    }, 800);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-2">
            We Are Here To Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            Contact Stepora Support
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Have a question regarding your fit, order dispatch, or 30-day comfort trial? Our domestic care team responds in under 4 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Contact Information Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-6">
              <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
                Customer Care Desk
              </h2>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-stone-400 text-xs font-semibold block">Email Support</span>
                  <a href={`mailto:${settings.supportEmail}`} className="font-bold text-stone-900 hover:text-amber-800 transition-colors">
                    {settings.supportEmail}
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Average reply time: 2-4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-stone-400 text-xs font-semibold block">Toll-Free Phone</span>
                  <span className="font-bold text-stone-900">
                    {settings.supportPhone}
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Monday through Friday, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-stone-400 text-xs font-semibold block">Operating Hours</span>
                  <span className="font-bold text-stone-900">Mon - Fri: 9:00 AM - 6:00 PM EST</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Saturday: 10:00 AM - 3:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-stone-400 text-xs font-semibold block">Fulfillment Center &amp; Lab</span>
                  <span className="font-bold text-stone-900">Stepora Footwear Corp.</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">742 Evergreen Logistics Blvd, Suite 300, Irvine, CA 92618</p>
                </div>
              </div>
            </div>

            {/* Quick Link Card */}
            <div className="bg-stone-900 text-white p-6 rounded-3xl space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <HelpCircle size={16} className="text-amber-400" />
                <span>Looking for immediate answers?</span>
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Check our sizing guide, shipping delivery questions, or 30-day trial refund steps.
              </p>
              <button
                onClick={() => setCurrentPage('faq')}
                className="text-xs font-bold text-amber-400 hover:underline inline-block pt-1"
              >
                Visit FAQ Center &rarr;
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs">
            {submittedTicket ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Message Received!</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                  Your inquiry has been routed to our orthopedic footwear specialists. Your support ticket ID is:
                </p>
                <div className="inline-block bg-stone-100 text-stone-900 font-mono font-bold text-sm px-4 py-2 rounded-xl border border-stone-200">
                  {submittedTicket}
                </div>
                <p className="text-[11px] text-stone-400 pt-2">
                  A confirmation email has been sent to {email}.
                </p>
                <button
                  onClick={() => {
                    setSubmittedTicket(null);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-4 inline-block text-xs font-bold text-stone-900 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
                  Send Us A Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Miller"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jessica@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Order Reference # (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. STP-84920"
                      value={orderNum}
                      onChange={e => setOrderNum(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Topic / Subject *</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    >
                      <option value="Order & Shipping Status">Order &amp; Shipping Status</option>
                      <option value="Size Exchange Request">Size / Color Exchange Request</option>
                      <option value="30-Day Guarantee Return">30-Day Guarantee Return</option>
                      <option value="Product & Sizing Advice">Product &amp; Sizing Advice</option>
                      <option value="Wholesale & Corporate Inquiries">Wholesale &amp; Healthcare Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe how we can assist you with your foot comfort..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Sending Ticket...' : 'SEND INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
