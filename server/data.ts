import { Product, ProductReview, Order, Coupon, StoreSettings, User } from '../src/types';

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: 'STEPORA',
  announcementBarText: '🎉 Spring Sale: Free Express Shipping on Orders $60+ • 30-Day Risk-Free Comfort Guarantee',
  announcementBarEnabled: true,
  heroHeadline: 'Comfort Designed for Every Step',
  heroSubheadline: 'Medical-grade ergonomic foot support engineered to relieve joint pressure, align posture, and make walking feel effortless.',
  heroCtaText: 'SHOP BEST SELLERS',
  heroImageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1400&q=85',
  freeShippingThreshold: 60.00,
  supportEmail: 'support@stepora-footwear.com',
  supportPhone: '+1 (800) 843-7837',
  guaranteeDays: 30,
  currencySymbol: '$',
  currencyCode: 'USD',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-cloudstep-slide',
    slug: 'cloudstep-recovery-slide',
    name: 'CloudStep™ Ergonomic Recovery Slide',
    tagline: 'Deep heel cup & anatomical arch support for instant plantar relief',
    description: 'Ultra-plush dual-density EVA foam slide designed to absorb 45% more heel impact than standard footwear. Perfect for post-workout recovery, all-day home wear, or errands.',
    fullDescription: 'Crafted with our proprietary CloudFlex™ compound, the CloudStep™ Recovery Slide cradles the foot with a 1.7-inch cushioned platform. Featuring an ergonomic 15° forward toe-rocker and contoured biomechanical heel cup, it relieves pressure off tired arches, reduces plantar fascia tension, and restores natural gait alignment.',
    price: 75.00,
    salePrice: 54.99,
    discountPercent: 27,
    category: 'slides',
    rating: 4.9,
    reviewCount: 2840,
    featured: true,
    bestSeller: true,
    badge: 'BESTSELLER • 27% OFF',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['US 5 (EU 36)', 'US 6 (EU 37)', 'US 7 (EU 38)', 'US 8 (EU 39)', 'US 9 (EU 40)', 'US 10 (EU 41)', 'US 11 (EU 42)', 'US 12 (EU 43)', 'US 13 (EU 44)'],
    colors: [
      { name: 'Oatmeal Bone', hex: '#E6DFD5', imageIndex: 0 },
      { name: 'Obsidian Black', hex: '#1F2937', imageIndex: 1 },
      { name: 'Cloud Gray', hex: '#9CA3AF', imageIndex: 2 },
      { name: 'Sage Green', hex: '#8FA382', imageIndex: 3 }
    ],
    variants: [
      { id: 'v-cs-oat-8', name: 'Oatmeal Bone / US 8 (EU 39)', color: 'Oatmeal Bone', colorHex: '#E6DFD5', size: 'US 8 (EU 39)', sku: 'STP-CS-OAT-08', price: 75.00, salePrice: 54.99, inventory: 42 },
      { id: 'v-cs-oat-9', name: 'Oatmeal Bone / US 9 (EU 40)', color: 'Oatmeal Bone', colorHex: '#E6DFD5', size: 'US 9 (EU 40)', sku: 'STP-CS-OAT-09', price: 75.00, salePrice: 54.99, inventory: 28 },
      { id: 'v-cs-blk-8', name: 'Obsidian Black / US 8 (EU 39)', color: 'Obsidian Black', colorHex: '#1F2937', size: 'US 8 (EU 39)', sku: 'STP-CS-BLK-08', price: 75.00, salePrice: 54.99, inventory: 35 },
      { id: 'v-cs-blk-9', name: 'Obsidian Black / US 9 (EU 40)', color: 'Obsidian Black', colorHex: '#1F2937', size: 'US 9 (EU 40)', sku: 'STP-CS-BLK-09', price: 75.00, salePrice: 54.99, inventory: 19 },
      { id: 'v-cs-gry-8', name: 'Cloud Gray / US 8 (EU 39)', color: 'Cloud Gray', colorHex: '#9CA3AF', size: 'US 8 (EU 39)', sku: 'STP-CS-GRY-08', price: 75.00, salePrice: 54.99, inventory: 15 },
      { id: 'v-cs-sge-8', name: 'Sage Green / US 8 (EU 39)', color: 'Sage Green', colorHex: '#8FA382', size: 'US 8 (EU 39)', sku: 'STP-CS-SGE-08', price: 75.00, salePrice: 54.99, inventory: 22 }
    ],
    features: [
      'CloudFlex™ closed-cell memory foam formulation',
      'Deep ergonomic heel cup prevents sideways rolling',
      '32mm active arch bridge for plantar fascia relaxation',
      '100% waterproof, odor-resistant, & machine washable'
    ],
    benefits: [
      'Reduces impact stress on knees, hips, and lower back',
      'Eliminates morning heel stiffness caused by plantar fasciitis',
      'Promotes circulation with textured acupressure footbed',
      'Anti-slip wave grip keeps you secure on wet tile and hardwood'
    ],
    specifications: [
      { label: 'Platform Height', value: '1.7 inches (43 mm)' },
      { label: 'Weight per Shoe', value: '4.8 oz (Ultralight)' },
      { label: 'Material', value: 'Non-toxic, BPA-Free Medical EVA' },
      { label: 'Arch Support Rating', value: 'High / Adaptive Firmness' },
      { label: 'Care Instructions', value: 'Wash with lukewarm water and mild soap' }
    ],
    stockQuantity: 161,
    inStock: true,
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'prod-orthocloud-clog',
    slug: 'orthocloud-all-day-clog',
    name: 'Stepora OrthoCloud™ All-Day Clog',
    tagline: 'Supportive closed-toe clog with breathable side vents & convertible strap',
    description: 'Designed for professionals on their feet all day—nurses, teachers, chefs, and daily commuters who demand maximum arch support with closed-toe protection.',
    fullDescription: 'The OrthoCloud™ All-Day Clog features our patented Tri-Zone Podiatric Footbed. With an adjustable pivot heel strap, shock-absorbing midsole, and oil/water resistant tread, it delivers unmatched stability and anti-fatigue comfort from morning shifts to evening downtime.',
    price: 89.00,
    salePrice: 68.00,
    discountPercent: 24,
    category: 'clogs',
    rating: 4.8,
    reviewCount: 1420,
    featured: true,
    bestSeller: true,
    badge: 'DOCTOR RECOMMENDED',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['US 6 (EU 37)', 'US 7 (EU 38)', 'US 8 (EU 39)', 'US 9 (EU 40)', 'US 10 (EU 41)', 'US 11 (EU 42)', 'US 12 (EU 43)'],
    colors: [
      { name: 'Obsidian Black', hex: '#111827', imageIndex: 0 },
      { name: 'Opal White', hex: '#F3F4F6', imageIndex: 1 },
      { name: 'Navy Dusk', hex: '#1E3A8A', imageIndex: 2 }
    ],
    variants: [
      { id: 'v-oc-blk-8', name: 'Obsidian Black / US 8 (EU 39)', color: 'Obsidian Black', colorHex: '#111827', size: 'US 8 (EU 39)', sku: 'STP-OC-BLK-08', price: 89.00, salePrice: 68.00, inventory: 34 },
      { id: 'v-oc-wht-8', name: 'Opal White / US 8 (EU 39)', color: 'Opal White', colorHex: '#F3F4F6', size: 'US 8 (EU 39)', sku: 'STP-OC-WHT-08', price: 89.00, salePrice: 68.00, inventory: 20 },
      { id: 'v-oc-nvy-9', name: 'Navy Dusk / US 9 (EU 40)', color: 'Navy Dusk', colorHex: '#1E3A8A', size: 'US 9 (EU 40)', sku: 'STP-OC-NVY-09', price: 89.00, salePrice: 68.00, inventory: 16 }
    ],
    features: [
      'Tri-Zone Podiatric Footbed with targeted heel cradle',
      'Convertible pivoting heel-lock strap for secure fit',
      'Breathable directional airflow channels',
      'Slip-resistant rubber composite outsole'
    ],
    benefits: [
      'Prevents plantar strain during 12+ hour standing shifts',
      'Wide toe box allows toes to splay naturally without pinching',
      'Wipes clean in seconds with disinfectant or damp cloth'
    ],
    specifications: [
      { label: 'Platform Height', value: '1.5 inches (38 mm)' },
      { label: 'Weight per Shoe', value: '6.1 oz' },
      { label: 'Sole Material', value: 'High-Traction Thermo-Rubber Compound' },
      { label: 'Insole Type', value: 'Contoured Orthotic Cushion' }
    ],
    stockQuantity: 110,
    inStock: true,
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'prod-archflex-insole',
    slug: 'archflex-3d-insole',
    name: 'ArchFlex™ 3D Biomechanical Insole',
    tagline: 'Transform any sneaker, work boot, or dress shoe into an orthopedic haven',
    description: 'Custom-feel orthotic insert featuring a semi-rigid medical TPU arch cradle, Poron XRD shock pads, and antimicrobial moisture-wicking top cloth.',
    fullDescription: 'Engineered in collaboration with leading biomechanists, the ArchFlex™ 3D Insole provides anatomical stability that offloads up to 60 lbs of pressure per square inch from the heel and ball of your foot. Easily trimmable to fit any footwear.',
    price: 45.00,
    salePrice: 34.00,
    discountPercent: 24,
    category: 'insoles',
    rating: 4.9,
    reviewCount: 3190,
    featured: true,
    bestSeller: true,
    badge: 'OVER 3,000+ 5-STAR REVIEWS',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Men 6-8 / Women 7-9', 'Men 8.5-10.5 / Women 9.5-11.5', 'Men 11-13 / Women 12-14'],
    colors: [
      { name: 'Cobalt Blue & Carbon', hex: '#2563EB', imageIndex: 0 },
      { name: 'Graphite Stealth', hex: '#374151', imageIndex: 1 }
    ],
    variants: [
      { id: 'v-af-med-01', name: 'Cobalt Blue / Men 8.5-10.5', color: 'Cobalt Blue & Carbon', colorHex: '#2563EB', size: 'Men 8.5-10.5 / Women 9.5-11.5', sku: 'STP-AF-MED-01', price: 45.00, salePrice: 34.00, inventory: 85 },
      { id: 'v-af-sml-01', name: 'Cobalt Blue / Men 6-8', color: 'Cobalt Blue & Carbon', colorHex: '#2563EB', size: 'Men 6-8 / Women 7-9', sku: 'STP-AF-SML-01', price: 45.00, salePrice: 34.00, inventory: 60 },
      { id: 'v-af-lrg-01', name: 'Cobalt Blue / Men 11-13', color: 'Cobalt Blue & Carbon', colorHex: '#2563EB', size: 'Men 11-13 / Women 12-14', sku: 'STP-AF-LRG-01', price: 45.00, salePrice: 34.00, inventory: 48 }
    ],
    features: [
      'Semi-rigid medical TPU cradle holds arch in neutral position',
      'Poron XRD rebound pads dissipate high-impact landings',
      'Silver-ion infused fabric prevents bacteria and odor buildup',
      'Full trimmable toe boundary fits any shoes'
    ],
    benefits: [
      'Relieves plantar fasciitis, flat feet, and shin splints',
      'Stabilizes ankles and aligns knees to reduce joint wear',
      'Extends shoe life by preventing uneven insole wear'
    ],
    specifications: [
      { label: 'Arch Height', value: '35mm Anatomical Peak' },
      { label: 'Thickness at Toe', value: '4.5mm (Universal Fit)' },
      { label: 'Weight', value: '1.9 oz per pair' },
      { label: 'Fit', value: 'Trimmable along marked guide lines' }
    ],
    stockQuantity: 193,
    inStock: true,
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'prod-aerogrip-mule',
    slug: 'aerogrip-indoor-outdoor-mule',
    name: 'Stepora AeroGrip™ Recovery Mule',
    tagline: 'Slip-on luxury with weather-resistant ripstop & lugged traction',
    description: 'Transition effortlessly from your living room sofa to city streets. Packed with cozy fleece insulation, structural arch support, and rugged rubber grip.',
    fullDescription: 'The AeroGrip™ Recovery Mule is designed for those who refuse to sacrifice comfort when leaving the house. The ripstop upper features water-repellent DWR coating, while the interior is lined with thermal micro-fleece surrounding our signature biomechanical arch bed.',
    price: 82.00,
    salePrice: 62.00,
    discountPercent: 24,
    category: 'slippers',
    rating: 4.8,
    reviewCount: 610,
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    badge: 'NEW ARRIVAL',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['US 7 (EU 38)', 'US 8 (EU 39)', 'US 9 (EU 40)', 'US 10 (EU 41)', 'US 11 (EU 42)', 'US 12 (EU 43)'],
    colors: [
      { name: 'Cedar Tan', hex: '#B45309', imageIndex: 0 },
      { name: 'Olive Forest', hex: '#3F6212', imageIndex: 1 }
    ],
    variants: [
      { id: 'v-ag-tan-8', name: 'Cedar Tan / US 8 (EU 39)', color: 'Cedar Tan', colorHex: '#B45309', size: 'US 8 (EU 39)', sku: 'STP-AG-TAN-08', price: 82.00, salePrice: 62.00, inventory: 24 },
      { id: 'v-ag-olv-9', name: 'Olive Forest / US 9 (EU 40)', color: 'Olive Forest', colorHex: '#3F6212', size: 'US 9 (EU 40)', sku: 'STP-AG-OLV-09', price: 82.00, salePrice: 62.00, inventory: 18 }
    ],
    features: [
      'Water-repellent DWR ripstop exterior protects from drizzle',
      'Warm temperature-regulating microfiber fleece lining',
      'Lugged non-marking rubber outsole for outdoor terrain',
      'Collapsible neoprene heel for slip-on convenience'
    ],
    benefits: [
      'All-weather foot comfort without damp socks',
      'Full arch support prevents the foot fatigue common with flat slippers',
      'Effortless on/off entry without bending down'
    ],
    specifications: [
      { label: 'Outsole', value: 'Dual-Lugged Sticky Rubber' },
      { label: 'Upper', value: 'Recycled Diamond Ripstop Nylon' },
      { label: 'Lining', value: 'Thermal Anti-Pill Micro-Fleece' }
    ],
    stockQuantity: 42,
    inStock: true,
    createdAt: '2026-02-18T00:00:00Z'
  },
  {
    id: 'prod-thermowool-slipper',
    slug: 'thermowool-orthopedic-slipper',
    name: 'ThermoWool™ Orthopedic House Slipper',
    tagline: 'Natural breathable wool warmth paired with podiatrist-grade arch bed',
    description: 'Say goodbye to flimsy house slippers that cause heel pain. ThermoWool™ combines boiled wool breathability with structured arch support and a durable rubber indoor sole.',
    fullDescription: 'Our ThermoWool™ slipper regulates foot temperature naturally, wicking away moisture in summer while insulating against freezing floors in winter. Built-in contoured orthotic midsoles keep your ankles and spine in perfect postural alignment throughout your workday at home.',
    price: 78.00,
    salePrice: 58.00,
    discountPercent: 25,
    category: 'slippers',
    rating: 4.9,
    reviewCount: 980,
    featured: false,
    bestSeller: true,
    badge: 'PREMIUM WOOL',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['US 6 (EU 37)', 'US 7 (EU 38)', 'US 8 (EU 39)', 'US 9 (EU 40)', 'US 10 (EU 41)', 'US 11 (EU 42)'],
    colors: [
      { name: 'Heather Charcoal', hex: '#374151', imageIndex: 0 },
      { name: 'Sand Beige', hex: '#D6C7B2', imageIndex: 1 }
    ],
    variants: [
      { id: 'v-tw-chr-8', name: 'Heather Charcoal / US 8 (EU 39)', color: 'Heather Charcoal', colorHex: '#374151', size: 'US 8 (EU 39)', sku: 'STP-TW-CHR-08', price: 78.00, salePrice: 58.00, inventory: 30 },
      { id: 'v-tw-snd-8', name: 'Sand Beige / US 8 (EU 39)', color: 'Sand Beige', colorHex: '#D6C7B2', size: 'US 8 (EU 39)', sku: 'STP-TW-SND-08', price: 78.00, salePrice: 58.00, inventory: 25 }
    ],
    features: [
      '100% natural boiled wool upper for thermal breathability',
      'Anatomical cork-infused EVA supportive footbed',
      'Reinforced toe bumper protects from furniture bumps',
      'Quiet-step non-slip rubber outsole for hardwood protection'
    ],
    benefits: [
      'Never sweaty or clammy—wool breathes naturally',
      'Cradles painful arches and calms sore heels',
      'Prevents cold floor joint aches'
    ],
    specifications: [
      { label: 'Upper Material', value: '100% Natural Boiled Wool' },
      { label: 'Insole', value: 'Contoured Wool-Lined Orthotic Core' },
      { label: 'Outsole', value: 'Non-Marking Natural Rubber' }
    ],
    stockQuantity: 55,
    inStock: true,
    createdAt: '2026-01-10T00:00:00Z'
  },
  {
    id: 'prod-reliefband-sleeve',
    slug: 'reliefband-plantar-compression-sleeve',
    name: 'ReliefBand™ Targeted Plantar Compression Sleeves',
    tagline: '7-zone medical grade compression for instant arch and heel support',
    description: 'Doctor-designed foot sleeves that stimulate oxygen flow, reduce morning heel stabbing pain, and stabilize the Achilles tendon. Wear comfortably under socks or while sleeping.',
    fullDescription: 'Constructed with seamless 4D compression knit technology, the ReliefBand™ exerts targeted 20-30 mmHg pressure right along the plantar fascia ligament. Perfect for runners, athletes, nurses, and anyone suffering from acute plantar heel spur agony.',
    price: 36.00,
    salePrice: 26.00,
    discountPercent: 28,
    category: 'therapy',
    rating: 4.8,
    reviewCount: 890,
    featured: false,
    bestSeller: false,
    badge: 'THERAPY GEAR (PAIR)',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Small (Women 4-6.5)', 'Medium (Women 7-9.5 / Men 6-8.5)', 'Large (Women 10-13 / Men 9-12)', 'X-Large (Men 12.5+)'],
    colors: [
      { name: 'Mineral Black', hex: '#18181B', imageIndex: 0 },
      { name: 'Nude Skin', hex: '#E2C2A4', imageIndex: 1 }
    ],
    variants: [
      { id: 'v-rb-med-blk', name: 'Mineral Black / Medium', color: 'Mineral Black', colorHex: '#18181B', size: 'Medium (Women 7-9.5 / Men 6-8.5)', sku: 'STP-RB-MED-BLK', price: 36.00, salePrice: 26.00, inventory: 60 },
      { id: 'v-rb-lrg-blk', name: 'Mineral Black / Large', color: 'Mineral Black', colorHex: '#18181B', size: 'Large (Women 10-13 / Men 9-12)', sku: 'STP-RB-LRG-BLK', price: 36.00, salePrice: 26.00, inventory: 50 }
    ],
    features: [
      '7-zone graduated medical compression (20-30 mmHg)',
      'Breathable, moisture-wicking copper-infused fabric',
      'Slim ergonomic profile easily fits inside any shoes or slippers',
      'Includes 1 pair (2 sleeves)'
    ],
    benefits: [
      'Rapidly alleviates morning first-step stabbing pain',
      'Reduces swelling, edema, and fluid buildup in ankles',
      'Accelerates healing of micro-tears in the plantar ligament'
    ],
    specifications: [
      { label: 'Compression Level', value: 'Medical Class II (20-30 mmHg)' },
      { label: 'Quantity', value: '1 Pair (Left + Right)' },
      { label: 'Material', value: '80% Nylon, 20% Elastane with Copper Weave' }
    ],
    stockQuantity: 110,
    inStock: true,
    createdAt: '2026-02-10T00:00:00Z'
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-01',
    productId: 'prod-cloudstep-slide',
    productName: 'CloudStep™ Ergonomic Recovery Slide',
    author: 'Eleanor Vance, RN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Life-changing for 12-hour nursing shifts!',
    content: 'I have severe plantar fasciitis from working 12-hour hospital shifts on hard linoleum. The moment I slip into these after getting home, my heel throbbing stops within 15 minutes. The arch support is substantial without feeling like a hard rock. Ordered a second pair for my mom!',
    date: '2026-03-02',
    verifiedPurchase: true,
    helpfulCount: 142,
    status: 'approved'
  },
  {
    id: 'rev-02',
    productId: 'prod-cloudstep-slide',
    productName: 'CloudStep™ Ergonomic Recovery Slide',
    author: 'Marcus Sterling',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Actual podiatrist-approved comfort',
    content: 'My podiatrist recommended I stop walking barefoot on our hardwood floors. Most "cushioned" slides are completely flat and make arch pain worse. Stepora got the biomechanics right: the deep heel cup locks your foot in and prevents overpronation. 10/10.',
    date: '2026-02-24',
    verifiedPurchase: true,
    helpfulCount: 98,
    status: 'approved'
  },
  {
    id: 'rev-03',
    productId: 'prod-orthocloud-clog',
    productName: 'Stepora OrthoCloud™ All-Day Clog',
    author: 'Dr. David Chen, DPM',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'I recommend these to my own orthopedic patients',
    content: 'As a foot & ankle specialist, I scrutinize footwear claims closely. The OrthoCloud clog provides genuine calcaneal stabilization and offloads the plantar fascia insertion point. The toe box is wide enough to prevent bunion compression. Outstanding product design.',
    date: '2026-02-18',
    verifiedPurchase: true,
    helpfulCount: 215,
    status: 'approved'
  },
  {
    id: 'rev-04',
    productId: 'prod-archflex-insole',
    productName: 'ArchFlex™ 3D Biomechanical Insole',
    author: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'Saved my favourite walking sneakers',
    content: 'I had almost given up on my running shoes because they gave me lower back pain after 2 miles. I popped these ArchFlex insoles in and walked 6 miles yesterday with zero ache. Trimming them along the line was super straightforward.',
    date: '2026-02-10',
    verifiedPurchase: true,
    helpfulCount: 77,
    status: 'approved'
  },
  {
    id: 'rev-05',
    productId: 'prod-aerogrip-mule',
    productName: 'Stepora AeroGrip™ Recovery Mule',
    author: 'Hannah Davies',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    title: 'So warm, supportive, and stylish!',
    content: 'Love that I can take the dog out on wet dewy grass without soggy feet, and still keep that heavenly cloud-like arch support. The cedar tan color looks amazing with casual loungewear.',
    date: '2026-01-29',
    verifiedPurchase: true,
    helpfulCount: 34,
    status: 'approved'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-84920',
    orderNumber: 'STP-84920',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.vance@example.com',
    customerPhone: '+1 (555) 392-1049',
    items: [
      {
        id: 'ci-1',
        productId: 'prod-cloudstep-slide',
        productName: 'CloudStep™ Ergonomic Recovery Slide',
        slug: 'cloudstep-recovery-slide',
        price: 75.00,
        salePrice: 54.99,
        color: 'Oatmeal Bone',
        colorHex: '#E6DFD5',
        size: 'US 8 (EU 39)',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80'
      }
    ],
    subtotal: 54.99,
    discountAmount: 8.25,
    couponCodeApplied: 'COMFORT15',
    shippingMethod: 'Express Insured Delivery (2-3 Days)',
    shippingFee: 0.00,
    taxAmount: 3.74,
    totalAmount: 50.48,
    status: 'shipped',
    shippingAddress: {
      firstName: 'Eleanor',
      lastName: 'Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (555) 392-1049',
      addressLine1: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States'
    },
    carrier: 'FedEx Express',
    trackingNumber: 'FX-9400111899223849102',
    estimatedDeliveryDate: '2026-09-24',
    milestones: [
      { status: 'pending', label: 'Order Placed', description: 'Order confirmed and payment verified', timestamp: '2026-09-18 10:14 AM', completed: true },
      { status: 'processing', label: 'Quality Inspected & Packed', description: 'Hand-checked for sizing accuracy and boxed with protective tissue', timestamp: '2026-09-19 02:30 PM', completed: true },
      { status: 'shipped', label: 'In Transit with FedEx', description: 'Departed logistics hub in Ontario, CA', timestamp: '2026-09-20 08:45 AM', completed: true },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Package is on delivery vehicle scheduled for your address', timestamp: 'Pending', completed: false },
      { status: 'delivered', label: 'Delivered', description: 'Package safely left at front door', timestamp: 'Pending', completed: false }
    ],
    paymentMethod: 'Credit Card (Visa ending in 4242)',
    paymentStatus: 'paid',
    createdAt: '2026-09-18T10:14:00Z'
  },
  {
    id: 'ord-61944',
    orderNumber: 'STP-61944',
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus.s@example.com',
    customerPhone: '+1 (555) 234-5678',
    items: [
      {
        id: 'ci-2',
        productId: 'prod-orthocloud-clog',
        productName: 'Stepora OrthoCloud™ All-Day Clog',
        slug: 'orthocloud-all-day-clog',
        price: 89.00,
        salePrice: 68.00,
        color: 'Obsidian Black',
        colorHex: '#111827',
        size: 'US 10 (EU 41)',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80'
      }
    ],
    subtotal: 68.00,
    discountAmount: 0,
    shippingMethod: 'Standard Ground',
    shippingFee: 0.00,
    taxAmount: 5.44,
    totalAmount: 73.44,
    status: 'delivered',
    shippingAddress: {
      firstName: 'Marcus',
      lastName: 'Sterling',
      email: 'marcus.s@example.com',
      phone: '+1 (555) 234-5678',
      addressLine1: '128 Ocean Avenue',
      city: 'Santa Monica',
      state: 'CA',
      postalCode: '90401',
      country: 'United States'
    },
    carrier: 'USPS Priority',
    trackingNumber: 'USPS-9205590164917311394012',
    estimatedDeliveryDate: '2026-09-15',
    milestones: [
      { status: 'pending', label: 'Order Placed', description: 'Order confirmed', timestamp: '2026-09-11 11:20 AM', completed: true },
      { status: 'processing', label: 'Packaged', description: 'Warehouse fulfillment complete', timestamp: '2026-09-12 09:15 AM', completed: true },
      { status: 'shipped', label: 'Shipped', description: 'Carrier received package', timestamp: '2026-09-13 01:00 PM', completed: true },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'On mail carrier route', timestamp: '2026-09-15 08:30 AM', completed: true },
      { status: 'delivered', label: 'Delivered', description: 'Delivered in mailbox/porch', timestamp: '2026-09-15 02:14 PM', completed: true }
    ],
    paymentMethod: 'Apple Pay',
    paymentStatus: 'paid',
    createdAt: '2026-09-11T11:20:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'COMFORT15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 0,
    description: '15% Off Any Order - Welcome Offer',
    isActive: true
  },
  {
    id: 'c-2',
    code: 'SAVE10',
    discountType: 'fixed',
    discountValue: 10,
    minOrderAmount: 50,
    description: '$10 Off on orders over $50',
    isActive: true
  },
  {
    id: 'c-3',
    code: 'STEPORA20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 75,
    description: '20% VIP Orthopedic Comfort Savings on $75+',
    isActive: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Stepora Store Administrator',
    email: 'admin@stepora.com',
    role: 'admin',
    savedAddresses: [],
    wishlistProductIds: [],
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-cust-1',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    role: 'customer',
    savedAddresses: [
      {
        firstName: 'Sarah',
        lastName: 'Miller',
        email: 'sarah.miller@example.com',
        phone: '+1 (555) 438-9021',
        addressLine1: '350 5th Avenue, Suite 1200',
        city: 'New York',
        state: 'NY',
        postalCode: '10118',
        country: 'United States'
      }
    ],
    wishlistProductIds: ['prod-cloudstep-slide', 'prod-archflex-insole'],
    createdAt: '2026-02-01T00:00:00Z'
  }
];
