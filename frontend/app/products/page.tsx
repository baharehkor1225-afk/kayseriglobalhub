import type { Metadata } from 'next'
import { ProductsGrid } from '@/components/products/products-grid'
import { ProductsHeader } from '@/components/products/products-header'
import { ProductsFilters } from '@/components/products/products-filters'
import { fetchProducts } from '@/lib/api'

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
  const products = await fetchProducts({
    category: params.category,
    filter: params.filter,
    sort: params.sort,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  })

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
              products={products}
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
