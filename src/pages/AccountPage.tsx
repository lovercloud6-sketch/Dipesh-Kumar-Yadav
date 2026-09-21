import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User as UserIcon, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  LogIn, 
  ShoppingBag, 
  Truck, 
  CheckCircle2,
  Trash2,
  ArrowRight
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    orders, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToCart, 
    setCurrentPage 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses'>('orders');

  // Login form state if logged out
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    setCurrentUser({
      id: 'usr-custom',
      email: loginEmail,
      name: loginName.trim() || loginEmail.split('@')[0],
      role: 'customer',
      savedAddresses: [],
      wishlistProductIds: [],
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Filter user orders or show demo orders
  const userOrders = currentUser 
    ? orders.filter(o => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
    : orders.slice(0, 2);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Customer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {currentUser ? `Welcome back, ${currentUser.name}` : 'Customer Account & Wishlist'}
            </h1>
          </div>

          {currentUser ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          ) : null}
        </div>

        {/* If logged out: Simple friendly sign-in form */}
        {!currentUser && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs max-w-md mx-auto mb-10">
            <h2 className="text-base font-bold text-stone-900 mb-1">Sign In to Your Account</h2>
            <p className="text-xs text-stone-500 mb-5">
              Access your previous orders, saved addresses, and favorite foot comfort items.
            </p>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jessica Miller"
                  value={loginName}
                  onChange={e => setLoginName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jessica@example.com"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold text-xs py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogIn size={15} />
                <span>Access Account</span>
              </button>
            </form>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'orders' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Package size={15} />
            <span>Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'wishlist' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Heart size={15} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'addresses' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <MapPin size={15} />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <Package size={36} className="mx-auto text-stone-300 mb-2" />
                <h3 className="text-sm font-bold text-stone-900">No orders found</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">You haven’t placed any footwear orders yet.</p>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-full"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              userOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-stone-900 block">{order.orderNumber}</span>
                      <span className="text-[11px] text-stone-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => setCurrentPage('track-order', order.orderNumber)}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Truck size={13} />
                        <span>Track Parcel</span>
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-stone-50">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover border border-stone-200" />
                          <div>
                            <span className="font-semibold text-stone-900 block">{item.productName}</span>
                            <span className="text-stone-500 text-[11px]">{item.color} • {item.size} • Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-stone-900">${(item.salePrice * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                    <span className="text-stone-500">Total Paid</span>
                    <span className="font-extrabold text-stone-900 text-sm">${(order.totalAmount ?? order.total ?? 0).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <Heart size={36} className="mx-auto text-stone-300 mb-2" />
                <h3 className="text-sm font-bold text-stone-900">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">Click the heart icon on any product to save it here for later.</p>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-full"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden mb-3 relative">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-rose-500 hover:bg-white"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                      <p className="text-xs font-extrabold text-stone-900 mt-1">${p.salePrice.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.sizes[0], p.colors[0]?.name || 'Standard', 1, p.colors[0]?.hex)}
                      className="mt-3 w-full bg-stone-900 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="font-bold text-stone-900 text-sm">Default Shipping Address</span>
                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">Primary</span>
              </div>
              <p className="font-semibold text-stone-900">{currentUser?.name || 'Jessica Miller'}</p>
              <p className="text-stone-600">742 Evergreen Logistics Blvd, Apt 4B</p>
              <p className="text-stone-600">Irvine, CA 92618</p>
              <p className="text-stone-600">United States</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
