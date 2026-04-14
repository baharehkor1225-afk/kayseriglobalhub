import express from 'express'
import cors from 'cors'
import { z } from 'zod'
import { prisma } from './prisma'

const app = express()
app.use(cors())
app.use(express.json())

const OrderBody = z.object({
    userId: z.string().uuid(),
    items: z.array(z.any()),
    total: z.number(),
})

const ContactBody = z.object({
    name: z.string(),
    email: z.string().email(),
    subject: z.string(),
    message: z.string(),
    orderNumber: z.string().optional(),
})

const InquiryBody = z.object({
    companyName: z.string(),
    contactName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    country: z.string(),
    projectType: z.string(),
    productInterest: z.array(z.string()),
    quantity: z.string(),
    message: z.string(),
    fileName: z.string().optional(),
})

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
})

app.get('/api/products', async (req, res) => {
    const { category, filter, sort, minPrice, maxPrice } = req.query

    const where: any = {}
    if (category) where.category = category
    if (filter === 'new') where.isNew = true
    if (filter === 'bestseller') where.isBestSeller = true
    if (minPrice || maxPrice) {
        where.price = {}
        if (minPrice) where.price.gte = Number(minPrice)
        if (maxPrice) where.price.lte = Number(maxPrice)
    }

    const orderBy: any = []
    if (sort === 'price-low') orderBy.push({ price: 'asc' })
    else if (sort === 'price-high') orderBy.push({ price: 'desc' })
    else if (sort === 'name') orderBy.push({ name: 'asc' })
    else orderBy.push({ createdAt: 'desc' })

    const products = await prisma.product.findMany({
        where,
        orderBy,
    })
    res.json(products)
})

app.get('/api/products/slug/:slug', async (req, res) => {
    const product = await prisma.product.findUnique({
        where: { slug: req.params.slug },
    })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
})

app.get('/api/categories', async (_req, res) => {
    const groups = await prisma.product.groupBy({
        by: ['category', 'roomType'],
        _count: { id: true },
    })

    const categories = await Promise.all(
        groups.map(async (group: { category: string | null; roomType: string | null; _count: { id: number } }) => {
            const product = await prisma.product.findFirst({
                where: { category: group.category },
            })
            return {
                id: group.category ?? group.roomType ?? 'unknown',
                name: group.roomType ?? group.category ?? 'Category',
                slug: group.category ?? group.roomType ?? 'unknown',
                description: `Premium ${group.roomType ?? group.category} furnishings and solutions.`,
                image: (product?.images as string[] | undefined)?.[0] ?? product?.imageUrl ?? '/images/category-living.jpg',
                productCount: group._count.id,
            }
        })
    )

    res.json(categories)
})

app.post('/api/contact', async (req, res) => {
    const parsed = ContactBody.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format() })
    }

    await prisma.contactMessage.create({ data: parsed.data })
    res.json({ success: true })
})

app.post('/api/inquiries', async (req, res) => {
    const parsed = InquiryBody.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format() })
    }

    await prisma.inquiry.create({ data: parsed.data })
    res.json({ success: true })
})

app.get('/api/products/:id', async (req, res) => {
    const product = await prisma.product.findUnique({
        where: { id: req.params.id },
    })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
})

app.get('/api/users/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id },
        include: { orders: true },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
})

app.get('/api/orders', async (req, res) => {
    const userId = req.query.userId as string | undefined
    const filter = userId ? { where: { userId } } : undefined
    const orders = filter
        ? await prisma.order.findMany(filter)
        : await prisma.order.findMany()
    res.json(orders)
})

app.post('/api/orders', async (req, res) => {
    const parsed = OrderBody.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format() })
    }

    const order = await prisma.order.create({
        data: {
            userId: parsed.data.userId,
            items: parsed.data.items,
            total: parsed.data.total,
            status: 'pending',
        },
    })

    res.status(201).json(order)
})

app.put('/api/users/:id', async (req, res) => {
    const updates = req.body
    const user = await prisma.user.update({
        where: { id: req.params.id },
        data: updates,
    })
    res.json(user)
})

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
})

const port = Number(process.env.PORT || 4000)
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`)
})
