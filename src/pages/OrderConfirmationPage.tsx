import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Truck, ArrowRight, Package, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderNumber: string;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderNumber }) => {
  const { orders, setCurrentPage } = useStore();

  const order = orders.find(o => o.orderNumber === orderNumber) || orders[0];

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
            Payment Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-5 leading-relaxed">
            We have received your order and our fulfillment lab is already preparing your biomechanical footwear for dispatch.
          </p>

          <div className="inline-block bg-stone-100 px-4 py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-800 mb-6">
            Order Reference: <strong className="text-stone-950 font-extrabold text-sm ml-1">{order?.orderNumber || orderNumber}</strong>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage('track-order', order?.orderNumber || orderNumber)}
              className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Truck size={16} />
              <span>Track Shipping Milestones</span>
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-6 py-3.5 rounded-xl transition-all"
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-semibold text-stone-500">{order.items.length} items</span>
            </h2>

            {/* Items list */}
            <div className="divide-y divide-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 truncate">{item.productName}</p>
                      <p className="text-stone-500 text-[11px]">{item.color} • {item.size} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-stone-900 shrink-0">
                    ${(item.salePrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {(order.discountAmount || order.discount || 0) > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Savings</span>
                  <span>-${(order.discountAmount || order.discount || 0).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Paid</span>
                <span>${(order.totalAmount ?? order.total ?? 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery address & info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs text-stone-600">
              <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <MapPin size={14} className="text-stone-500" /> Shipping Destination
                </span>
                <p className="text-stone-700 font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.addressLine1 || (order.shippingAddress as any).address1} {order.shippingAddress.addressLine2 || (order.shippingAddress as any).address2 || ''}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode || (order.shippingAddress as any).zip}</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Mail size={14} className="text-stone-500" /> Notifications Sent To
                </span>
                <p className="text-stone-700 font-medium">{order.customerEmail}</p>
                <p className="text-[11px] text-stone-500 pt-1">
                  Estimated arrival: <strong>{order.estimatedDelivery}</strong>
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
