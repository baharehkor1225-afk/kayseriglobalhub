import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { ProductsGrid } from '@/components/products/products-grid'
import { ProductsHeader } from '@/components/products/products-header'
import { ProductsFilters } from '@/components/products/products-filters'
import { products as staticProducts } from '@/lib/data'
import type { Product } from '@/lib/data'

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .order('createdAt', { ascending: false })
    if (error || !data || data.length === 0) return staticProducts
    return data.map((p: any) => ({
      ...p,
      price: Number(p.price),
      bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
      images: Array.isArray(p.images) ? p.images : [],
      features: Array.isArray(p.features) ? p.features : [],
      materials: Array.isArray(p.materials) ? p.materials : [],
      colors: Array.isArray(p.colors) ? p.colors : [],
      dimensions: p.dimensions ?? { width: 0, height: 0, depth: 0 },
      roomType: p.roomType ?? '',
      description: p.description ?? '',
    }))
  } catch {
    return staticProducts
  }
}

export const metadata: Metadata = {
  title: 'Shop Premium Furniture',
  description: 'Browse our collection of premium Turkish furniture. Sofas, beds, dining tables, office furniture and more. Quality craftsmanship delivered worldwide.',
  openGraph: {
    title: 'Shop Premium Furniture | Kayseri Global Hub',
    description: 'Browse our collection of premium Turkish furniture for homes and businesses.',
    images: ['/images/og-products.jpg'],
  },
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    filter?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const allProducts = await getProducts()

  // Filter products based on search params
  let filteredProducts = [...allProducts]

  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category === params.category)
  }

  if (params.filter === 'new') {
    filteredProducts = filteredProducts.filter(p => p.isNew)
  } else if (params.filter === 'bestseller') {
    filteredProducts = filteredProducts.filter(p => p.isBestSeller)
  }

  if (params.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(params.minPrice))
  }

  if (params.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(params.maxPrice))
  }

  // Sort
  if (params.sort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (params.sort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (params.sort === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    // featured default
    filteredProducts.sort((a, b) => {
      if (a.isBestSeller && !b.isBestSeller) return -1
      if (!a.isBestSeller && b.isBestSeller) return 1
      return 0
    })
  }

  return (
    <div className="min-h-screen pt-20">
      <ProductsHeader />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className="hidden lg:block">
            <ProductsFilters
              initialCategory={params.category}
              initialMinPrice={params.minPrice}
              initialMaxPrice={params.maxPrice}
            />
          </aside>
          <div className="lg:col-span-3">
            <ProductsGrid
              products={filteredProducts}
              category={params.category}
              filter={params.filter}
              sort={params.sort}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
