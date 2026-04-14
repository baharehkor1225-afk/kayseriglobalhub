"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const prisma_1 = require("./prisma");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const OrderBody = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    items: zod_1.z.array(zod_1.z.any()),
    total: zod_1.z.number(),
});
const ContactBody = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    subject: zod_1.z.string(),
    message: zod_1.z.string(),
    orderNumber: zod_1.z.string().optional(),
});
const InquiryBody = zod_1.z.object({
    companyName: zod_1.z.string(),
    contactName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    country: zod_1.z.string(),
    projectType: zod_1.z.string(),
    productInterest: zod_1.z.array(zod_1.z.string()),
    quantity: zod_1.z.string(),
    message: zod_1.z.string(),
    fileName: zod_1.z.string().optional(),
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/products', async (req, res) => {
    const { category, filter, sort, minPrice, maxPrice } = req.query;
    const where = {};
    if (category)
        where.category = category;
    if (filter === 'new')
        where.isNew = true;
    if (filter === 'bestseller')
        where.isBestSeller = true;
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice)
            where.price.gte = Number(minPrice);
        if (maxPrice)
            where.price.lte = Number(maxPrice);
    }
    const orderBy = [];
    if (sort === 'price-low')
        orderBy.push({ price: 'asc' });
    else if (sort === 'price-high')
        orderBy.push({ price: 'desc' });
    else if (sort === 'name')
        orderBy.push({ name: 'asc' });
    else
        orderBy.push({ createdAt: 'desc' });
    const products = await prisma_1.prisma.product.findMany({
        where,
        orderBy,
    });
    res.json(products);
});
app.get('/api/products/slug/:slug', async (req, res) => {
    const product = await prisma_1.prisma.product.findUnique({
        where: { slug: req.params.slug },
    });
    if (!product)
        return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});
app.get('/api/categories', async (_req, res) => {
    const groups = await prisma_1.prisma.product.groupBy({
        by: ['category', 'roomType'],
        _count: { id: true },
    });
    const categories = await Promise.all(groups.map(async (group) => {
        const product = await prisma_1.prisma.product.findFirst({
            where: { category: group.category },
        });
        return {
            id: group.category ?? group.roomType ?? 'unknown',
            name: group.roomType ?? group.category ?? 'Category',
            slug: group.category ?? group.roomType ?? 'unknown',
            description: `Premium ${group.roomType ?? group.category} furnishings and solutions.`,
            image: product?.images?.[0] ?? product?.imageUrl ?? '/images/category-living.jpg',
            productCount: group._count.id,
        };
    }));
    res.json(categories);
});
app.post('/api/contact', async (req, res) => {
    const parsed = ContactBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format() });
    }
    await prisma_1.prisma.contactMessage.create({ data: parsed.data });
    res.json({ success: true });
});
app.post('/api/inquiries', async (req, res) => {
    const parsed = InquiryBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format() });
    }
    await prisma_1.prisma.inquiry.create({ data: parsed.data });
    res.json({ success: true });
});
app.get('/api/products/:id', async (req, res) => {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id: req.params.id },
    });
    if (!product)
        return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});
app.get('/api/users/:id', async (req, res) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: req.params.id },
        include: { orders: true },
    });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
app.get('/api/orders', async (req, res) => {
    const userId = req.query.userId;
    const filter = userId ? { where: { userId } } : undefined;
    const orders = filter
        ? await prisma_1.prisma.order.findMany(filter)
        : await prisma_1.prisma.order.findMany();
    res.json(orders);
});
app.post('/api/orders', async (req, res) => {
    const parsed = OrderBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format() });
    }
    const order = await prisma_1.prisma.order.create({
        data: {
            userId: parsed.data.userId,
            items: parsed.data.items,
            total: parsed.data.total,
            status: 'pending',
        },
    });
    res.status(201).json(order);
});
app.put('/api/users/:id', async (req, res) => {
    const updates = req.body;
    const user = await prisma_1.prisma.user.update({
        where: { id: req.params.id },
        data: updates,
    });
    res.json(user);
});
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
});
const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
});
