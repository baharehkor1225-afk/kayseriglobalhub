import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const defaultProducts = [
  {
    slug: 'ankara-modern-sofa',
    name: 'Ankara Modern Sofa',
    description: 'A masterpiece of Turkish craftsmanship, the Ankara Modern Sofa combines timeless elegance with contemporary comfort. Upholstered in premium velvet fabric with hand-carved walnut legs.',
    price: 2499,
    bulkPrice: 1999,
    minBulkQuantity: 10,
    imageUrl: '/images/products/sofa-modern.jpg',
    images: ['/images/products/sofa-modern.jpg'],
    model3d: '/models/sofa-modern.glb',
    category: 'living-room',
    roomType: 'Living Room',
    features: ['Premium velvet upholstery', 'Hand-carved walnut legs', 'High-density foam cushions', 'Removable cushion covers', '10-year warranty'],
    dimensions: { width: 220, height: 85, depth: 95 },
    materials: ['Velvet', 'Walnut Wood', 'High-Density Foam'],
    colors: ['Cream', 'Charcoal', 'Forest Green', 'Navy Blue'],
    inStock: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    slug: 'istanbul-dining-set',
    name: 'Istanbul Dining Set',
    description: 'The Istanbul Dining Set features a stunning solid walnut table with six matching chairs. Perfect for both intimate dinners and grand gatherings.',
    price: 3299,
    bulkPrice: 2799,
    minBulkQuantity: 5,
    imageUrl: '/images/products/dining-table.jpg',
    images: ['/images/products/dining-table.jpg'],
    model3d: '/models/dining-set.glb',
    category: 'dining',
    roomType: 'Dining',
    features: ['Solid walnut construction', 'Seats up to 8 people', 'Extendable design', 'Hand-finished details', 'Matching chairs included'],
    dimensions: { width: 200, height: 76, depth: 100 },
    materials: ['Solid Walnut', 'Premium Fabric'],
    colors: ['Natural Walnut', 'Dark Walnut'],
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    slug: 'cappadocia-king-bed',
    name: 'Cappadocia King Bed',
    description: 'Inspired by the serene landscapes of Cappadocia, this king-size bed features a luxuriously padded headboard and solid oak frame for the ultimate sleep experience.',
    price: 2899,
    bulkPrice: 2399,
    minBulkQuantity: 8,
    imageUrl: '/images/products/bed-frame.jpg',
    images: ['/images/products/bed-frame.jpg'],
    model3d: '/models/bed-frame.glb',
    category: 'bedroom',
    roomType: 'Bedroom',
    features: ['Premium upholstered headboard', 'Solid oak frame', 'Under-bed storage', 'Noise-free slat system', 'Easy assembly'],
    dimensions: { width: 195, height: 120, depth: 215 },
    materials: ['Oak Wood', 'Premium Linen', 'Steel Slats'],
    colors: ['Cream', 'Light Gray', 'Blush Pink'],
    inStock: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    slug: 'ephesus-executive-desk',
    name: 'Ephesus Executive Desk',
    description: 'The Ephesus Executive Desk brings sophistication to any workspace. Crafted from premium walnut with integrated cable management and ample storage.',
    price: 1899,
    bulkPrice: 1499,
    minBulkQuantity: 15,
    imageUrl: '/images/products/office-desk.jpg',
    images: ['/images/products/office-desk.jpg'],
    model3d: '/models/office-desk.glb',
    category: 'office',
    roomType: 'Office',
    features: ['Premium walnut veneer', 'Integrated cable management', 'Soft-close drawers', 'Adjustable feet', 'Spacious work surface'],
    dimensions: { width: 180, height: 75, depth: 80 },
    materials: ['Walnut Veneer', 'Steel', 'Premium Hardware'],
    colors: ['Natural Walnut', 'Dark Espresso'],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    slug: 'izmir-accent-chair',
    name: 'Izmir Accent Chair',
    description: 'The Izmir Accent Chair is a statement piece that combines mid-century modern aesthetics with Turkish craftsmanship. Perfect for adding character to any room.',
    price: 899,
    bulkPrice: 699,
    minBulkQuantity: 20,
    imageUrl: '/images/products/armchair.jpg',
    images: ['/images/products/armchair.jpg'],
    model3d: '/models/armchair.glb',
    category: 'living-room',
    roomType: 'Living Room',
    features: ['Boucle fabric upholstery', 'Solid beech wood frame', 'Ergonomic design', 'Lightweight yet sturdy', 'Easy spot cleaning'],
    dimensions: { width: 75, height: 80, depth: 70 },
    materials: ['Boucle Fabric', 'Beech Wood'],
    colors: ['Cream', 'Terracotta', 'Sage Green', 'Mustard'],
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    slug: 'antalya-coffee-table',
    name: 'Antalya Coffee Table',
    description: 'The Antalya Coffee Table features a stunning marble top paired with sleek metal legs. A perfect centerpiece for modern living spaces.',
    price: 799,
    bulkPrice: 599,
    minBulkQuantity: 25,
    imageUrl: '/images/products/coffee-table.jpg',
    images: ['/images/products/coffee-table.jpg'],
    model3d: '/models/coffee-table.glb',
    category: 'living-room',
    roomType: 'Living Room',
    features: ['Genuine marble top', 'Powder-coated steel legs', 'Scratch-resistant surface', 'Easy to clean', 'Timeless design'],
    dimensions: { width: 120, height: 45, depth: 60 },
    materials: ['Marble', 'Powder-Coated Steel'],
    colors: ['White Marble/Black', 'White Marble/Gold', 'Green Marble/Black'],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    slug: 'bursa-bedroom-set',
    name: 'Bursa Bedroom Set',
    description: 'Complete your bedroom with the Bursa Set, including a queen bed, two nightstands, and a dresser. Crafted in warm oak with modern lines.',
    price: 4599,
    bulkPrice: 3799,
    minBulkQuantity: 5,
    imageUrl: '/images/products/bed-frame.jpg',
    images: ['/images/products/bed-frame.jpg'],
    model3d: '/models/bedroom-set.glb',
    category: 'bedroom',
    roomType: 'Bedroom',
    features: ['Complete 4-piece set', 'Solid oak construction', 'Soft-close mechanisms', 'Matching finish throughout', 'Premium quality hardware'],
    dimensions: { width: 160, height: 110, depth: 210 },
    materials: ['Solid Oak', 'Premium Hardware'],
    colors: ['Natural Oak', 'Smoked Oak'],
    inStock: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    slug: 'konya-ergonomic-chair',
    name: 'Konya Ergonomic Chair',
    description: 'The Konya Ergonomic Chair provides exceptional comfort for long work hours. Features adjustable lumbar support and breathable mesh back.',
    price: 699,
    bulkPrice: 549,
    minBulkQuantity: 30,
    imageUrl: '/images/products/armchair.jpg',
    images: ['/images/products/armchair.jpg'],
    model3d: '/models/office-chair.glb',
    category: 'office',
    roomType: 'Office',
    features: ['Adjustable lumbar support', 'Breathable mesh back', '4D armrests', 'Height adjustable', 'Smooth-rolling casters'],
    dimensions: { width: 68, height: 115, depth: 68 },
    materials: ['Mesh', 'Aluminum', 'Premium Foam'],
    colors: ['Black', 'Gray', 'White'],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
]

export async function POST() {
  const supabase = adminClient()

  const results = { inserted: 0, updated: 0, errors: [] as string[] }

  for (const product of defaultProducts) {
    const { error } = await supabase
      .from('Product')
      .upsert({ id: randomUUID(), ...product }, { onConflict: 'slug' })

    if (error) {
      results.errors.push(`${product.slug}: ${error.message}`)
    } else {
      results.inserted++
    }
  }

  return NextResponse.json(results)
}
