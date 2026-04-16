import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { roomSets, products as staticProducts } from '@/lib/data'
import type { Product } from '@/lib/data'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductInfo } from '@/components/products/product-info'
import { ProductTabs } from '@/components/products/product-tabs'
import { RelatedProducts } from '@/components/products/related-products'
import { RoomSets } from '@/components/products/room-sets'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.from('Product').select('*').eq('slug', slug).single()
    if (!data) return staticProducts.find(p => p.slug === slug) ?? null
    return {
      ...data,
      price: Number(data.price),
      bulkPrice: data.bulkPrice ? Number(data.bulkPrice) : undefined,
      images: Array.isArray(data.images) ? data.images : [],
      model3ds: Array.isArray(data.model3ds) ? data.model3ds : data.model3ds ? [data.model3ds] : [],
      features: Array.isArray(data.features) ? data.features : [],
      materials: Array.isArray(data.materials) ? data.materials : [],
      colors: Array.isArray(data.colors) ? data.colors : [],
      dimensions: data.dimensions ?? { width: 0, height: 0, depth: 0 },
      roomType: data.roomType ?? '',
      description: data.description ?? '',
    }
  } catch {
    return staticProducts.find(p => p.slug === slug) ?? null
  }
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.from('Product').select('*')
    if (!data || data.length === 0) return staticProducts
    return data.map((p: any) => ({
      ...p,
      price: Number(p.price),
      bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
      images: Array.isArray(p.images) ? p.images : [],
      model3ds: Array.isArray(p.model3ds) ? p.model3ds : p.model3ds ? [p.model3ds] : [],
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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Kayseri Global Hub`,
      description: product.description,
      images: product.images,
      type: 'website',
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'USD',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const allProducts = await getAllProducts()

  const productRoomSets = roomSets.filter((set) =>
    set.products.includes(product.id)
  )

  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Kayseri Global Hub',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>

          <ProductTabs product={product} />

          {productRoomSets.length > 0 && (
            <RoomSets sets={productRoomSets} currentProductId={product.id} />
          )}

          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </div>
      </div>
    </>
  )
}
