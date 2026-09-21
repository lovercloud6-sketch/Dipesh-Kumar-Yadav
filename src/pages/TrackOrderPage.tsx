import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Package, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  Footprints
} from 'lucide-react';
import { Order } from '../types';

interface TrackOrderPageProps {
  initialOrderNumber?: string;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ initialOrderNumber }) => {
  const { trackOrder, orders, setCurrentPage } = useStore();

  const [orderQuery, setOrderQuery] = useState(initialOrderNumber || 'STP-84920');
  const [emailQuery, setEmailQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const executeTrack = async (num: string, email?: string) => {
    if (!num.trim()) return;
    setIsSearching(true);
    setErrorMsg('');
    const result = await trackOrder(num.trim(), email?.trim());
    setIsSearching(false);
    if (result) {
      setTrackedOrder(result);
    } else {
      setTrackedOrder(null);
      setErrorMsg('Order not found. Please check your order reference number (e.g. STP-84920).');
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      executeTrack(initialOrderNumber);
    } else {
      // Auto-load demo order
      executeTrack('STP-84920');
    }
  }, [initialOrderNumber]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTrack(orderQuery, emailQuery);
  };

  const sampleOrders = orders.slice(0, 3);

  // Helper to map order status to step progress
  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 1;
      case 'shipped': return 3;
      case 'delivered': return 5;
      default: return 2;
    }
  };

  const currentStep = trackedOrder ? getStatusStep(trackedOrder.status) : 1;

  const steps = [
    { number: 1, title: 'Order Confirmed', desc: 'Payment verified & order queued' },
    { number: 2, title: 'Biomechanical QA', desc: 'Precision inspection & packaging' },
    { number: 3, title: 'Carrier Transit', desc: 'En route with priority logistics' },
    { number: 4, title: 'Out for Delivery', desc: 'On courier vehicle for final delivery' },
    { number: 5, title: 'Delivered', desc: 'Delivered to recipient address' },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Truck size={14} />
            <span>Live Carrier Integration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Track Your Stepora Order
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Enter your order reference code to view real-time fulfillment and shipping milestones.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STP-84920"
                  value={orderQuery}
                  onChange={e => setOrderQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-medium uppercase"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email or Tracking Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. jessica@example.com or 9400..."
                  value={emailQuery}
                  onChange={e => setEmailQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Try quick demo:</span>
                {sampleOrders.map(so => (
                  <button
                    key={so.id}
                    type="button"
                    onClick={() => {
                      setOrderQuery(so.orderNumber);
                      executeTrack(so.orderNumber);
                    }}
                    className="text-stone-900 font-bold bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {so.orderNumber}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Search size={14} />
                <span>{isSearching ? 'Locating Package...' : 'Track Package'}</span>
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details & Milestones */}
        {trackedOrder && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Status Overview Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Shipment Tracking
                  </span>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                      {trackedOrder.orderNumber}
                    </h2>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      trackedOrder.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : trackedOrder.status === 'shipped'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-stone-100 text-stone-800'
                    }`}>
                      {trackedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-stone-500 block">Estimated Arrival</span>
                  <span className="text-base font-extrabold text-stone-900">
                    {trackedOrder.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Carrier & Tracking details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 font-semibold block">Shipping Carrier</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{trackedOrder.carrier || 'FedEx Priority'}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block">Tracking Number</span>
                  <span className="font-mono font-bold text-stone-900 text-sm mt-0.5 block">{trackedOrder.trackingNumber || 'Pending'}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block">Delivery Destination</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.state}</span>
                </div>
              </div>

              {/* Visual 5-Step Milestone Progress Bar */}
              <div className="pt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-6">
                  Shipping Progress
                </h3>

                <div className="relative">
                  {/* Background bar */}
                  <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-stone-200 -z-0" />
                  <div
                    className="hidden sm:block absolute top-4 left-6 h-1 bg-stone-900 -z-0 transition-all duration-500"
                    style={{ width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2">
                    {steps.map(step => {
                      const isCompleted = step.number <= currentStep;
                      const isCurrent = step.number === currentStep;

                      return (
                        <div key={step.number} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-all ${
                            isCompleted
                              ? 'bg-stone-900 text-white ring-4 ring-stone-100'
                              : 'bg-stone-200 text-stone-500'
                          }`}>
                            {isCompleted ? <CheckCircle2 size={16} /> : step.number}
                          </div>
                          <div>
                            <span className={`text-xs block ${isCurrent ? 'font-black text-stone-900' : isCompleted ? 'font-bold text-stone-800' : 'text-stone-400'}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] text-stone-500 hidden sm:block mt-0.5">
                              {step.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Shipment Items Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
              <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100">
                Package Contents ({trackedOrder.items.length} items)
              </h3>
              <div className="divide-y divide-stone-100 pt-1">
                {trackedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                      <div>
                        <p className="font-bold text-stone-900">{item.productName}</p>
                        <p className="text-stone-500 text-[11px]">{item.color} • {item.size} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentPage('product', item.slug)}
                      className="text-stone-700 hover:text-stone-900 font-semibold underline"
                    >
                      View Product
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Box */}
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-amber-800 shrink-0" />
                <span>Need to adjust your delivery address or exchange size?</span>
              </div>
              <button
                onClick={() => setCurrentPage('contact')}
                className="font-bold text-stone-900 hover:underline shrink-0 ml-2"
              >
                Contact Support
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
