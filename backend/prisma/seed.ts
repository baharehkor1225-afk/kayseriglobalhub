import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        slug: 'ankara-modern-sofa',
        name: 'Ankara Modern Sofa',
        description: 'A masterpiece of Turkish craftsmanship, the Ankara Modern Sofa combines timeless elegance with contemporary comfort.',
        price: 2499.0,
        bulkPrice: 1999.0,
        minBulkQuantity: 10,
        imageUrl: '/images/products/sofa-modern.jpg',
        images: ['/images/products/sofa-modern.jpg'],
        model3d: '/models/sofa-modern.glb',
        category: 'living-room',
        roomType: 'Living Room',
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
        slug: 'istanbul-dining-set',
        name: 'Istanbul Dining Set',
        description: 'The Istanbul Dining Set features a stunning solid walnut table with six matching chairs. Perfect for both intimate dinners and grand gatherings.',
        price: 3299.0,
        bulkPrice: 2799.0,
        minBulkQuantity: 5,
        imageUrl: '/images/products/dining-table.jpg',
        images: ['/images/products/dining-table.jpg'],
        model3d: '/models/dining-set.glb',
        category: 'dining',
        roomType: 'Dining',
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
    ],
  })

  console.log('Seed data inserted successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.()
  })
