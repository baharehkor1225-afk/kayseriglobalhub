"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.product.createMany({
        data: [
            {
                name: 'Ankara Modern Sofa',
                description: 'A comfortable modern sofa in Cappadocia style.',
                price: 1299.99,
                imageUrl: '/images/products/sofa.jpg',
                category: 'sofa',
            },
            {
                name: 'Istanbul Dining Set',
                description: 'A luxurious dining set with modern Turkish design.',
                price: 899.99,
                imageUrl: '/images/products/dining-set.jpg',
                category: 'dining',
            },
        ],
    });
    console.log('Seed data inserted successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
