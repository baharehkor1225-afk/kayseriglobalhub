import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const products = [
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
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product,
        })
    }

    const seededUser = await prisma.user.upsert({
        where: { email: 'demo@kayseriglobalhub.com' },
        update: {
            name: 'Demo Buyer',
            phone: '+90 555 000 1122',
            address: 'Kayseri, Turkiye',
        },
        create: {
            email: 'demo@kayseriglobalhub.com',
            name: 'Demo Buyer',
            phone: '+90 555 000 1122',
            address: 'Kayseri, Turkiye',
        },
    })

    await prisma.order.upsert({
        where: { id: '11111111-1111-1111-1111-111111111111' },
        update: {
            userId: seededUser.id,
            items: [
                { slug: 'ankara-modern-sofa', quantity: 2, price: 2499.0 },
                { slug: 'istanbul-dining-set', quantity: 1, price: 3299.0 },
            ],
            total: 8297.0,
            status: 'pending',
        },
        create: {
            id: '11111111-1111-1111-1111-111111111111',
            userId: seededUser.id,
            items: [
                { slug: 'ankara-modern-sofa', quantity: 2, price: 2499.0 },
                { slug: 'istanbul-dining-set', quantity: 1, price: 3299.0 },
            ],
            total: 8297.0,
            status: 'pending',
        },
    })

    await prisma.contactMessage.upsert({
        where: { id: '22222222-2222-2222-2222-222222222222' },
        update: {
            name: 'Demo Buyer',
            email: 'demo@kayseriglobalhub.com',
            subject: 'Bulk Request',
            message: 'Please share wholesale pricing and lead times.',
            orderNumber: 'ORDER-1001',
        },
        create: {
            id: '22222222-2222-2222-2222-222222222222',
            name: 'Demo Buyer',
            email: 'demo@kayseriglobalhub.com',
            subject: 'Bulk Request',
            message: 'Please share wholesale pricing and lead times.',
            orderNumber: 'ORDER-1001',
        },
    })

    await prisma.inquiry.upsert({
        where: { id: '33333333-3333-3333-3333-333333333333' },
        update: {
            companyName: 'Anatolia Interiors',
            contactName: 'Murat Yilmaz',
            email: 'procurement@anatolia-interiors.com',
            phone: '+90 312 555 4455',
            country: 'Turkiye',
            projectType: 'Hotel Furnishing',
            productInterest: ['living-room', 'dining'],
            quantity: '120 units',
            message: 'Looking for premium furniture for a 5-star hotel project.',
            fileName: 'hotel-project-rfq.pdf',
        },
        create: {
            id: '33333333-3333-3333-3333-333333333333',
            companyName: 'Anatolia Interiors',
            contactName: 'Murat Yilmaz',
            email: 'procurement@anatolia-interiors.com',
            phone: '+90 312 555 4455',
            country: 'Turkiye',
            projectType: 'Hotel Furnishing',
            productInterest: ['living-room', 'dining'],
            quantity: '120 units',
            message: 'Looking for premium furniture for a 5-star hotel project.',
            fileName: 'hotel-project-rfq.pdf',
        },
    })

    console.log('Seed data inserted successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
