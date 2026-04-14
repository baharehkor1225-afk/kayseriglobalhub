import type { Product, Category } from './data'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'

async function request<T>(path: string, options: RequestInit = {}) {
    const res = await fetch(`${backendUrl}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed: ${res.status}`)
    }

    return res.json() as Promise<T>
}

export type ProductQuery = {
    category?: string
    filter?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
}

export async function fetchProducts(params: ProductQuery = {}) {
    const query = new URLSearchParams()
    if (params.category) query.set('category', params.category)
    if (params.filter) query.set('filter', params.filter)
    if (params.sort) query.set('sort', params.sort)
    if (params.minPrice) query.set('minPrice', params.minPrice)
    if (params.maxPrice) query.set('maxPrice', params.maxPrice)

    return request<Product[]>(`/api/products?${query.toString()}`)
}

export async function fetchProductBySlug(slug: string) {
    return request<Product>(`/api/products/slug/${encodeURIComponent(slug)}`)
}

export async function fetchCategories() {
    return request<Category[]>('/api/categories')
}

export async function submitContactForm(data: {
    name: string
    email: string
    subject: string
    message: string
    orderNumber?: string
}) {
    return request<{ success: boolean }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export async function submitB2BInquiry(data: {
    companyName: string
    contactName: string
    email: string
    phone?: string
    country: string
    projectType: string
    productInterest: string[]
    quantity: string
    message: string
    fileName?: string
}) {
    return request<{ success: boolean }>('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}
