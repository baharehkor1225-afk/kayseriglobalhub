// Dummy data for products - will be replaced by API calls
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  roomType: string;
  description: string;
  price: number;
  bulkPrice?: number;
  minBulkQuantity?: number;
  images: string[];
  model3d?: string; // legacy single model
  model3ds?: string[]; // multiple 3D models
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  type: 'b2b' | 'b2c';
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Elegant sofas, armchairs, and coffee tables for your living space',
    image: '/images/category-living.jpg',
    productCount: 45,
  },
  {
    id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Premium beds, nightstands, and wardrobes for restful nights',
    image: '/images/category-bedroom.jpg',
    productCount: 38,
  },
  {
    id: '3',
    name: 'Dining',
    slug: 'dining',
    description: 'Sophisticated dining tables and chairs for memorable meals',
    image: '/images/category-dining.jpg',
    productCount: 32,
  },
  {
    id: '4',
    name: 'Office',
    slug: 'office',
    description: 'Professional desks and ergonomic chairs for productive workspaces',
    image: '/images/category-office.jpg',
    productCount: 28,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Ankara Modern Sofa',
    slug: 'ankara-modern-sofa',
    category: 'living-room',
    roomType: 'Living Room',
    description: 'A masterpiece of Turkish craftsmanship, the Ankara Modern Sofa combines timeless elegance with contemporary comfort. Upholstered in premium velvet fabric with hand-carved walnut legs.',
    price: 2499,
    bulkPrice: 1999,
    minBulkQuantity: 10,
    images: ['/images/products/sofa-modern.jpg'],
    model3d: '/models/sofa-modern.glb', // Placeholder for 3D model
    features: [
      'Premium velvet upholstery',
      'Hand-carved walnut legs',
      'High-density foam cushions',
      'Removable cushion covers',
      '10-year warranty',
    ],
    dimensions: { width: 220, height: 85, depth: 95 },
    materials: ['Velvet', 'Walnut Wood', 'High-Density Foam'],
    colors: ['Cream', 'Charcoal', 'Forest Green', 'Navy Blue'],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Istanbul Dining Set',
    slug: 'istanbul-dining-set',
    category: 'dining',
    roomType: 'Dining',
    description: 'The Istanbul Dining Set features a stunning solid walnut table with six matching chairs. Perfect for both intimate dinners and grand gatherings.',
    price: 3299,
    bulkPrice: 2799,
    minBulkQuantity: 5,
    images: ['/images/products/dining-table.jpg'],
    model3d: '/models/dining-set.glb',
    features: [
      'Solid walnut construction',
      'Seats up to 8 people',
      'Extendable design',
      'Hand-finished details',
      'Matching chairs included',
    ],
    dimensions: { width: 200, height: 76, depth: 100 },
    materials: ['Solid Walnut', 'Premium Fabric'],
    colors: ['Natural Walnut', 'Dark Walnut'],
    inStock: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Cappadocia King Bed',
    slug: 'cappadocia-king-bed',
    category: 'bedroom',
    roomType: 'Bedroom',
    description: 'Inspired by the serene landscapes of Cappadocia, this king-size bed features a luxuriously padded headboard and solid oak frame for the ultimate sleep experience.',
    price: 2899,
    bulkPrice: 2399,
    minBulkQuantity: 8,
    images: ['/images/products/bed-frame.jpg'],
    model3d: '/models/bed-frame.glb',
    features: [
      'Premium upholstered headboard',
      'Solid oak frame',
      'Under-bed storage',
      'Noise-free slat system',
      'Easy assembly',
    ],
    dimensions: { width: 195, height: 120, depth: 215 },
    materials: ['Oak Wood', 'Premium Linen', 'Steel Slats'],
    colors: ['Cream', 'Light Gray', 'Blush Pink'],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Ephesus Executive Desk',
    slug: 'ephesus-executive-desk',
    category: 'office',
    roomType: 'Office',
    description: 'The Ephesus Executive Desk brings sophistication to any workspace. Crafted from premium walnut with integrated cable management and ample storage.',
    price: 1899,
    bulkPrice: 1499,
    minBulkQuantity: 15,
    images: ['/images/products/office-desk.jpg'],
    model3d: '/models/office-desk.glb',
    features: [
      'Premium walnut veneer',
      'Integrated cable management',
      'Soft-close drawers',
      'Adjustable feet',
      'Spacious work surface',
    ],
    dimensions: { width: 180, height: 75, depth: 80 },
    materials: ['Walnut Veneer', 'Steel', 'Premium Hardware'],
    colors: ['Natural Walnut', 'Dark Espresso'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Izmir Accent Chair',
    slug: 'izmir-accent-chair',
    category: 'living-room',
    roomType: 'Living Room',
    description: 'The Izmir Accent Chair is a statement piece that combines mid-century modern aesthetics with Turkish craftsmanship. Perfect for adding character to any room.',
    price: 899,
    bulkPrice: 699,
    minBulkQuantity: 20,
    images: ['/images/products/armchair.jpg'],
    model3d: '/models/armchair.glb',
    features: [
      'Boucle fabric upholstery',
      'Solid beech wood frame',
      'Ergonomic design',
      'Lightweight yet sturdy',
      'Easy spot cleaning',
    ],
    dimensions: { width: 75, height: 80, depth: 70 },
    materials: ['Boucle Fabric', 'Beech Wood'],
    colors: ['Cream', 'Terracotta', 'Sage Green', 'Mustard'],
    inStock: true,
    isNew: true,
  },
  {
    id: '6',
    name: 'Antalya Coffee Table',
    slug: 'antalya-coffee-table',
    category: 'living-room',
    roomType: 'Living Room',
    description: 'The Antalya Coffee Table features a stunning marble top paired with sleek metal legs. A perfect centerpiece for modern living spaces.',
    price: 799,
    bulkPrice: 599,
    minBulkQuantity: 25,
    images: ['/images/products/coffee-table.jpg'],
    model3d: '/models/coffee-table.glb',
    features: [
      'Genuine marble top',
      'Powder-coated steel legs',
      'Scratch-resistant surface',
      'Easy to clean',
      'Timeless design',
    ],
    dimensions: { width: 120, height: 45, depth: 60 },
    materials: ['Marble', 'Powder-Coated Steel'],
    colors: ['White Marble/Black', 'White Marble/Gold', 'Green Marble/Black'],
    inStock: true,
  },
  {
    id: '7',
    name: 'Bursa Bedroom Set',
    slug: 'bursa-bedroom-set',
    category: 'bedroom',
    roomType: 'Bedroom',
    description: 'Complete your bedroom with the Bursa Set, including a queen bed, two nightstands, and a dresser. Crafted in warm oak with modern lines.',
    price: 4599,
    bulkPrice: 3799,
    minBulkQuantity: 5,
    images: ['/images/products/bed-frame.jpg'],
    model3d: '/models/bedroom-set.glb',
    features: [
      'Complete 4-piece set',
      'Solid oak construction',
      'Soft-close mechanisms',
      'Matching finish throughout',
      'Premium quality hardware',
    ],
    dimensions: { width: 160, height: 110, depth: 210 },
    materials: ['Solid Oak', 'Premium Hardware'],
    colors: ['Natural Oak', 'Smoked Oak'],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: '8',
    name: 'Konya Ergonomic Chair',
    slug: 'konya-ergonomic-chair',
    category: 'office',
    roomType: 'Office',
    description: 'The Konya Ergonomic Chair provides exceptional comfort for long work hours. Features adjustable lumbar support and breathable mesh back.',
    price: 699,
    bulkPrice: 549,
    minBulkQuantity: 30,
    images: ['/images/products/armchair.jpg'],
    model3d: '/models/office-chair.glb',
    features: [
      'Adjustable lumbar support',
      'Breathable mesh back',
      '4D armrests',
      'Height adjustable',
      'Smooth-rolling casters',
    ],
    dimensions: { width: 68, height: 115, depth: 68 },
    materials: ['Mesh', 'Aluminum', 'Premium Foam'],
    colors: ['Black', 'Gray', 'White'],
    inStock: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    company: 'Grand Hyatt Hotels',
    role: 'Procurement Director',
    content: 'KGH furnished our entire 200-room hotel renovation. The quality exceeded our expectations, and the B2B team made the process seamless from design to delivery.',
    rating: 5,
    type: 'b2b',
  },
  {
    id: '2',
    name: 'James Chen',
    company: 'Urban Living Developments',
    role: 'Interior Design Lead',
    content: 'We have been partnering with Kayseri Global Hub for three years. Their furniture adds genuine value to our residential projects, and clients always notice the quality.',
    rating: 5,
    type: 'b2b',
  },
  {
    id: '3',
    name: 'Emily Thompson',
    company: '',
    role: 'Homeowner',
    content: 'The Ankara Sofa transformed my living room. The craftsmanship is impeccable, and it is even more beautiful in person than in the photos. Worth every penny!',
    rating: 5,
    type: 'b2c',
  },
  {
    id: '4',
    name: 'Michael Roberts',
    company: 'Boutique Hotel Group',
    role: 'Operations Manager',
    content: 'Outstanding quality and exceptional service. KGH delivered 50 custom dining sets on time and within budget. Our guests consistently compliment the furniture.',
    rating: 5,
    type: 'b2b',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    company: '',
    role: 'Interior Design Enthusiast',
    content: 'I have purchased multiple pieces from KGH. The 3D preview feature helped me visualize perfectly. Customer service was helpful throughout.',
    rating: 5,
    type: 'b2c',
  },
];

export const partners = [
  { id: '1', name: 'Marriott International', logo: '/images/partners/marriott.svg' },
  { id: '2', name: 'Hilton Hotels', logo: '/images/partners/hilton.svg' },
  { id: '3', name: 'Four Seasons', logo: '/images/partners/four-seasons.svg' },
  { id: '4', name: 'Accor Hotels', logo: '/images/partners/accor.svg' },
  { id: '5', name: 'Ritz Carlton', logo: '/images/partners/ritz.svg' },
  { id: '6', name: 'WeWork', logo: '/images/partners/wework.svg' },
];

export const roomSets = [
  {
    id: '1',
    name: 'Complete Living Room Set',
    slug: 'complete-living-room',
    products: ['1', '5', '6'],
    totalPrice: 4197,
    setPrice: 3599,
    image: '/images/category-living.jpg',
  },
  {
    id: '2',
    name: 'Executive Office Suite',
    slug: 'executive-office-suite',
    products: ['4', '8'],
    totalPrice: 2598,
    setPrice: 2199,
    image: '/images/category-office.jpg',
  },
  {
    id: '3',
    name: 'Master Bedroom Collection',
    slug: 'master-bedroom-collection',
    products: ['3', '7'],
    totalPrice: 7498,
    setPrice: 6299,
    image: '/images/category-bedroom.jpg',
  },
];

// API placeholder functions - to be connected to backend
export async function fetchProducts(): Promise<Product[]> {
  // TODO: Replace with actual API call to /api/products
  return products;
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  // TODO: Replace with actual API call to /api/products/[slug]
  return products.find(p => p.slug === slug);
}

export async function fetchCategories(): Promise<Category[]> {
  // TODO: Replace with actual API call to /api/categories
  return categories;
}

export async function submitB2BInquiry(data: {
  companyName: string;
  country: string;
  projectType: string;
  productInterest: string;
  quantity: string;
  email: string;
  message: string;
  file?: File;
}): Promise<{ success: boolean }> {
  // TODO: Replace with actual API call to /api/inquiries
  console.log('B2B Inquiry submitted:', data);
  return { success: true };
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean }> {
  // TODO: Replace with actual API call to /api/contact
  console.log('Contact form submitted:', data);
  return { success: true };
}
