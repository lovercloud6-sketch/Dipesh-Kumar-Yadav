import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (product: Product) => void;
}

const PRESET_TEMPLATES = [
  {
    label: '✨ Recovery Slide Template',
    name: 'CloudStep™ Pro Arch Recovery Slide',
    category: 'slides',
    tagline: 'Deep contoured anatomical heel cradle for zero-gravity foot comfort',
    description: 'Ultra-cushioned recovery slide with targeted plantar fascia relief and responsive dual-density cushioning.',
    price: 68.0,
    salePrice: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    badge: 'NEW ARRIVAL • 26% OFF',
  },
  {
    label: '✨ Orthotic Slip-On Sneaker',
    name: 'AeroGait™ Breathable Orthotic Slip-On',
    category: 'shoes',
    tagline: 'Engineered stretch-knit mesh with doctor-certified arch bridge support',
    description: 'Featherlight walking sneaker with antimicrobial lining, wide toe box, and energy-returning honeycomb sole.',
    price: 110.0,
    salePrice: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    badge: 'DOCTOR RECOMMENDED',
  },
  {
    label: '✨ Acupressure Gel Insole',
    name: 'SpineAlign™ Tri-Zone Podiatry Insole',
    category: 'insoles',
    tagline: 'Clinical-grade medical polymer with dynamic metatarsal support pads',
    description: 'Trimmable replacement inserts that transform any ordinary shoe into an orthopedic comfort sanctuary.',
    price: 45.0,
    salePrice: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
    badge: 'BESTSELLER',
  },
  {
    label: '✨ Ergonomic Strap Sandal',
    name: 'StrataGrip™ All-Terrain Therapy Sandal',
    category: 'sandals',
    tagline: 'Triple-adjustable neoprene straps with waterproof contoured footbed',
    description: 'Designed for summer hiking and daily errands with non-slip grooved tread and therapeutic arch curvature.',
    price: 85.0,
    salePrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
    badge: 'SUMMER FAVORITE',
  },
];

const PRESET_COLORS = [
  { name: 'Obsidian Black', hex: '#1F2937' },
  { name: 'Oatmeal Bone', hex: '#E6DFD5' },
  { name: 'Cloud Gray', hex: '#9CA3AF' },
  { name: 'Sage Green', hex: '#8FA382' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Terracotta Rust', hex: '#C25E40' },
];

const ALL_SIZES = [
  'US 6 (EU 37)',
  'US 7 (EU 38)',
  'US 8 (EU 39)',
  'US 9 (EU 40)',
  'US 10 (EU 41)',
  'US 11 (EU 42)',
  'US 12 (EU 43)',
];

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addProduct } = useStore();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('slides');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(69.0);
  const [salePrice, setSalePrice] = useState<number>(49.99);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80');
  const [badge, setBadge] = useState('NEW ARRIVAL');
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [bestSeller, setBestSeller] = useState(false);
  const [selectedColors, setSelectedColors] = useState<typeof PRESET_COLORS>([
    PRESET_COLORS[0],
    PRESET_COLORS[1],
  ]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([
    'US 7 (EU 38)',
    'US 8 (EU 39)',
    'US 9 (EU 40)',
    'US 10 (EU 41)',
    'US 11 (EU 42)',
  ]);
  const [feature1, setFeature1] = useState('Proprietary CloudFlex™ biomechanical memory foam');
  const [feature2, setFeature2] = useState('Ergonomic arch bridge supporting plantar tension');
  const [feature3, setFeature3] = useState('100% waterproof, odor-resistant, & machine-washable');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleApplyTemplate = (tmpl: typeof PRESET_TEMPLATES[0]) => {
    setName(tmpl.name);
    setCategory(tmpl.category);
    setTagline(tmpl.tagline);
    setDescription(tmpl.description);
    setPrice(tmpl.price);
    setSalePrice(tmpl.salePrice);
    setImageUrl(tmpl.imageUrl);
    setBadge(tmpl.badge);
  };

  const toggleColor = (color: typeof PRESET_COLORS[0]) => {
    if (selectedColors.some(c => c.name === color.name)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter(c => c.name !== color.name));
      }
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter(s => s !== size));
      }
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Product name is required');
      return;
    }

    if (salePrice <= 0 || price <= 0) {
      setErrorMsg('Prices must be greater than zero');
      return;
    }

    setIsSubmitting(true);

    try {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Math.floor(100 + Math.random() * 900);

      const discountPercent = price > salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

      const variants = selectedColors.flatMap(color =>
        selectedSizes.map(size => ({
          id: `v-${slug.slice(0, 8)}-${color.name.slice(0, 3).toLowerCase()}-${size.replace(/[^0-9]/g, '')}`,
          name: `${color.name} / ${size}`,
          color: color.name,
          colorHex: color.hex,
          size,
          sku: `STP-${slug.slice(0, 4).toUpperCase()}-${size.replace(/[^0-9]/g, '')}`,
          price,
          salePrice,
          inventory: 35,
        }))
      );

      const newProductData = {
        name: name.trim(),
        slug,
        tagline: tagline.trim() || 'Engineered for all-day comfort and arch relief',
        description: description.trim() || 'Medical-grade ergonomic footwear designed for restorative foot comfort.',
        fullDescription: description.trim() || 'Crafted with premium materials for maximum foot wellness.',
        price: Number(price),
        salePrice: Number(salePrice),
        discountPercent,
        category,
        rating: 4.9,
        reviewCount: 14,
        featured,
        bestSeller,
        isNewArrival: true,
        badge: badge.trim() || (discountPercent > 0 ? `${discountPercent}% OFF` : 'NEW'),
        images: [
          imageUrl.trim() || 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
        ],
        sizes: selectedSizes,
        colors: selectedColors.map((c, idx) => ({ ...c, imageIndex: idx % 2 })),
        variants,
        features: [feature1, feature2, feature3].filter(Boolean),
        benefits: [
          'Immediate arch cushioning and plantar relaxation',
          'Shock-absorbing foundation protects knees and spine',
          'Breathable, lightweight construction for all-day wear',
        ],
        specifications: [
          { label: 'Arch Profile', value: 'High / Medium Biomechanical' },
          { label: 'Footbed Material', value: 'Proprietary CloudFlex™ EVA' },
          { label: 'Outsole', value: 'Anti-Slip Deep Grooved Rubber' },
        ],
        stockQuantity: 120,
        inStock,
      };

      const created = await addProduct(newProductData);
      if (onSuccess) onSuccess(created);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Plus size={18} className="text-amber-800" />
              Add New Product to Store
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Fill in product details or pick a quick template to instantly launch a new SKU
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-medium border border-rose-200">
              {errorMsg}
            </div>
          )}

          {/* Quick Fill Templates */}
          <div>
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-2">
              <Sparkles size={14} className="text-amber-600" />
              Quick Fill Demo Templates
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="text-left p-2.5 rounded-xl border border-stone-200 hover:border-amber-800 hover:bg-amber-50/50 transition text-xs group"
                >
                  <span className="font-bold text-stone-800 group-hover:text-amber-900 block truncate">
                    {tmpl.label}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate mt-0.5">
                    ${tmpl.salePrice} • {tmpl.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CloudStep™ Elite Slide"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden"
              >
                <option value="slides">Recovery Slides</option>
                <option value="shoes">Orthotic Shoes / Sneakers</option>
                <option value="sandals">Therapy Sandals</option>
                <option value="insoles">Orthotic Insoles</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Tagline (Headline feature)
            </label>
            <input
              type="text"
              placeholder="e.g. Deep heel cup & anatomical arch support"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden"
            />
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                MSRP Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Sale Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={salePrice}
                onChange={e => setSalePrice(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden font-bold text-emerald-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                placeholder="e.g. BESTSELLER"
                value={badge}
                onChange={e => setBadge(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden"
              />
            </div>
          </div>

          {/* Image URL with Preview */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Image URL
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden"
              />
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0 flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={16} className="text-stone-400" />
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              placeholder="Provide a clear description of the product ergonomics and fit..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:border-stone-900 outline-hidden resize-none"
            />
          </div>

          {/* Color Choices */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Available Colors (click to toggle)
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(color => {
                const isSelected = selectedColors.some(c => c.name === color.name);
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/50 inline-block"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                    {isSelected && <Check size={12} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Choices */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SIZES.map(size => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-semibold transition ${
                      isSelected
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features bullet points */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Key Features
            </label>
            <input
              type="text"
              value={feature1}
              onChange={e => setFeature1(e.target.value)}
              placeholder="Feature 1"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-900"
            />
            <input
              type="text"
              value={feature2}
              onChange={e => setFeature2(e.target.value)}
              placeholder="Feature 2"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-900"
            />
            <input
              type="text"
              value={feature3}
              onChange={e => setFeature3(e.target.value)}
              placeholder="Feature 3"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-900"
            />
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-6 text-xs text-stone-700 font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={e => setInStock(e.target.checked)}
                className="w-4 h-4 rounded text-stone-900 focus:ring-0"
              />
              In Stock & Ready to Ship
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-stone-900 focus:ring-0"
              />
              Feature on Homepage
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={e => setBestSeller(e.target.checked)}
                className="w-4 h-4 rounded text-stone-900 focus:ring-0"
              />
              Mark as Bestseller
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-2"
            >
              {isSubmitting ? (
                <>Saving Product...</>
              ) : (
                <>
                  <Plus size={14} /> Add Product to Store
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
