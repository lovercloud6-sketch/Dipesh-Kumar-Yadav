import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Star, 
  Settings as SettingsIcon, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Product, Order, Review } from '../types';
import { AddProductModal } from '../components/AddProductModal';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    reviews, 
    settings, 
    saveSettings, 
    updateProduct, 
    deleteProduct,
    updateOrderStatus, 
    moderateReview,
    fetchInitialData,
    setCurrentPage
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'reviews' | 'settings'>('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Settings form state
  const [announcementText, setAnnouncementText] = useState(settings.announcementBarText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementBarEnabled);
  const [heroHeadline, setHeroHeadline] = useState(settings.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(settings.heroSubheadline);
  const [heroImageUrl, setHeroImageUrl] = useState(settings.heroImageUrl);
  const [brandName, setBrandName] = useState(settings.brandName);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Selected order for tracking update
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('processing');
  const [newTracking, setNewTracking] = useState('');

  // Selected product edit
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editSalePrice, setEditSalePrice] = useState<number>(0);
  const [editInStock, setEditInStock] = useState<boolean>(true);

  // Calculations for overview metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount ?? o.total ?? 0), 0);
  const totalOrdersCount = orders.length;
  const pendingShipment = orders.filter(o => o.status === 'processing').length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings({
      announcementBarText: announcementText,
      announcementBarEnabled: announcementEnabled,
      heroHeadline,
      heroSubheadline,
      heroImageUrl,
      brandName,
      supportEmail,
      supportPhone,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleSaveOrderUpdate = async (orderId: string) => {
    await updateOrderStatus(orderId, newStatus, newTracking || undefined);
    setEditingOrderId(null);
  };

  const handleSaveProductUpdate = async (product: Product) => {
    await updateProduct({
      ...product,
      price: editPrice,
      salePrice: editSalePrice,
      inStock: editInStock,
      discountPercent: Math.round(((editPrice - editSalePrice) / editPrice) * 100)
    });
    setEditingProductId(null);
  };

  return (
    <div className="bg-stone-100/70 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-stone-950 uppercase tracking-wider">
                Store Operations
              </span>
              <span className="text-xs text-stone-500 font-semibold">Real-Time Sync</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Admin &amp; Fulfillment Center
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchInitialData()}
              className="bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl border border-stone-200 shadow-2xs transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Metrics', icon: BarChart3 },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'settings', label: 'Store Settings', icon: SettingsIcon },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
                  <DollarSign size={18} className="text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-stone-900">
                  ${totalRevenue.toFixed(2)}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <ArrowUpRight size={12} /> +24% vs last week
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag size={18} className="text-stone-700" />
                </div>
                <div className="text-2xl font-black text-stone-900">
                  {totalOrdersCount}
                </div>
                <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
                  {pendingShipment} awaiting packing
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Catalog</span>
                  <Package size={18} className="text-stone-700" />
                </div>
                <div className="text-2xl font-black text-stone-900">
                  {products.length} SKUs
                </div>
                <span className="text-[11px] text-stone-500 font-semibold mt-1 block">
                  100% In Stock
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Satisfaction</span>
                  <Star size={18} className="text-amber-500 fill-amber-400" />
                </div>
                <div className="text-2xl font-black text-stone-900">
                  {avgRating} / 5.0
                </div>
                <span className="text-[11px] text-stone-500 font-semibold mt-1 block">
                  {reviews.length} total customer reviews
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <h3 className="text-base font-bold text-stone-900">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-amber-800 hover:underline"
                >
                  Manage All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-stone-400 font-bold uppercase border-b border-stone-100">
                    <tr>
                      <th className="py-2.5">Order</th>
                      <th className="py-2.5">Customer</th>
                      <th className="py-2.5">Items</th>
                      <th className="py-2.5">Total</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-stone-50">
                        <td className="py-3 font-mono font-bold text-stone-900">{o.orderNumber}</td>
                        <td className="py-3 font-medium">{o.customerName}</td>
                        <td className="py-3">{o.items.length} items</td>
                        <td className="py-3 font-bold">${(o.totalAmount ?? o.total ?? 0).toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            o.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3 text-stone-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
              Orders Management &amp; Tracking Dispatch
            </h3>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-stone-900 text-sm mr-3">{order.orderNumber}</span>
                      <span className="text-xs text-stone-500">{order.customerName} ({order.customerEmail})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status}
                      </span>
                      <span className="font-extrabold text-stone-900 text-sm">${(order.totalAmount ?? order.total ?? 0).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200">
                    {order.items.map((it, idx) => (
                      <span key={idx} className="mr-3 inline-block">
                        • {it.productName} ({it.size}, {it.color}) x{it.quantity}
                      </span>
                    ))}
                  </div>

                  {/* Tracking / Status edit mode */}
                  {editingOrderId === order.id ? (
                    <div className="pt-2 flex flex-wrap items-center gap-3 bg-stone-100 p-3 rounded-xl">
                      <select
                        value={newStatus}
                        onChange={e => setNewStatus(e.target.value as any)}
                        className="bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-semibold"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Carrier Tracking Number (e.g. 9400123...)"
                        value={newTracking}
                        onChange={e => setNewTracking(e.target.value)}
                        className="bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 flex-1 max-w-xs"
                      />

                      <button
                        onClick={() => handleSaveOrderUpdate(order.id)}
                        className="bg-stone-900 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrderId(null)}
                        className="text-xs text-stone-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                      <div>
                        <span>Tracking: </span>
                        <strong className="font-mono text-stone-800">{order.trackingNumber || 'Not assigned yet'}</strong>
                        {order.carrier && <span className="ml-1">({order.carrier})</span>}
                      </div>

                      <button
                        onClick={() => {
                          setEditingOrderId(order.id);
                          setNewStatus(order.status);
                          setNewTracking(order.trackingNumber || '');
                        }}
                        className="text-amber-800 hover:underline font-bold"
                      >
                        Update Status / Tracking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Products Management */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Products Catalog ({products.length} active SKUs)
                </h3>
                <p className="text-xs text-stone-500">
                  Manage prices, inventory stock, launch new items, or delete outdated SKUs
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
              >
                <Plus size={15} />
                <span>+ Add New Product</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {products.map(p => (
                <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={p.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-stone-900 text-sm truncate">{p.name}</h4>
                        {p.badge && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 tracking-wider">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-stone-500 text-xs">{p.category} • {p.colors.length} colors • {p.sizes.length} sizes</p>
                      <span className="text-[11px] text-emerald-700 font-semibold">{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                  </div>

                  {editingProductId === p.id ? (
                    <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200">
                      <div>
                        <label className="text-[10px] text-stone-400 block">MSRP</label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(Number(e.target.value))}
                          className="w-20 bg-white border border-stone-200 rounded px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-400 block">Sale Price</label>
                        <input
                          type="number"
                          value={editSalePrice}
                          onChange={e => setEditSalePrice(Number(e.target.value))}
                          className="w-20 bg-white border border-stone-200 rounded px-2 py-1 text-xs"
                        />
                      </div>
                      <button
                        onClick={() => handleSaveProductUpdate(p)}
                        className="bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg mt-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProductId(null)}
                        className="text-xs text-stone-500 hover:underline mt-3 ml-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="text-right mr-2">
                        <span className="font-extrabold text-stone-900 text-sm block">${p.salePrice.toFixed(2)}</span>
                        <span className="text-xs text-stone-400 line-through">${p.price.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => setCurrentPage('product', p.slug)}
                        title="View in store"
                        className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                      >
                        <ExternalLink size={15} />
                      </button>

                      <button
                        onClick={() => {
                          setEditingProductId(p.id);
                          setEditPrice(p.price);
                          setEditSalePrice(p.salePrice);
                          setEditInStock(p.inStock);
                        }}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-2 rounded-xl transition"
                      >
                        Edit Price
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        title="Delete product"
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
              Customer Reviews Moderation Queue ({reviews.length} reviews)
            </h3>

            <div className="divide-y divide-stone-100">
              {reviews.map(rev => (
                <div key={rev.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900 text-xs mr-2">{rev.author}</span>
                      <span className="text-amber-500 font-bold text-xs">{'★'.repeat(rev.rating)}</span>
                      <span className="text-stone-400 text-xs ml-2">for {rev.productName}</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {rev.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-stone-900">"{rev.title}"</p>
                  <p className="text-xs text-stone-600">{rev.content}</p>

                  <div className="flex items-center gap-2 pt-1">
                    {rev.status !== 'approved' && (
                      <button
                        onClick={() => moderateReview(rev.id, 'approve')}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 size={13} />
                        <span>Approve Review</span>
                      </button>
                    )}
                    {rev.status !== 'rejected' && (
                      <button
                        onClick={() => moderateReview(rev.id, 'reject')}
                        className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 ml-3"
                      >
                        <XCircle size={13} />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Store Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs">
            <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100 mb-6">
              Store Configuration &amp; Merchandising
            </h3>

            {settingsSaved && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Store settings saved successfully and deployed live!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Announcement Bar */}
              <div className="space-y-3 pb-6 border-b border-stone-100">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Top Announcement Bar
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="ann-enabled"
                    checked={announcementEnabled}
                    onChange={e => setAnnouncementEnabled(e.target.checked)}
                    className="accent-stone-900 rounded"
                  />
                  <label htmlFor="ann-enabled" className="text-xs font-semibold text-stone-700">
                    Enable Top Promo Announcement Banner
                  </label>
                </div>
                <div>
                  <label className="block text-xs text-stone-500 mb-1">Announcement Text</label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={e => setAnnouncementText(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-3 pb-6 border-b border-stone-100">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Hero Headline &amp; Visual
                </h4>
                <div>
                  <label className="block text-xs text-stone-500 mb-1">Hero Main Headline</label>
                  <input
                    type="text"
                    value={heroHeadline}
                    onChange={e => setHeroHeadline(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 mb-1">Hero Subheadline</label>
                  <textarea
                    rows={2}
                    value={heroSubheadline}
                    onChange={e => setHeroSubheadline(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={heroImageUrl}
                    onChange={e => setHeroImageUrl(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Brand & Support Contact */}
              <div className="space-y-3 pb-6 border-b border-stone-100">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Brand &amp; Support Contact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={e => setBrandName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={e => setSupportEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">Support Phone</label>
                    <input
                      type="text"
                      value={supportPhone}
                      onChange={e => setSupportPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-colors"
              >
                <Save size={16} />
                <span>SAVE CONFIGURATION</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Modal for adding a new product */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={() => setActiveTab('products')}
      />
    </div>
  );
};
