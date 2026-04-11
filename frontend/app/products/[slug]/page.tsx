import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { roomSets, products } from '@/lib/data'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductInfo } from '@/components/products/product-info'
import { ProductTabs } from '@/components/products/product-tabs'
import { RelatedProducts } from '@/components/products/related-products'
import { RoomSets } from '@/components/products/room-sets'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)

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
  const product = products.find(p => p.slug === slug)

  if (!product) {
    notFound()
  }

  const productRoomSets = roomSets.filter((set) =>
    set.products.includes(product.id)
  )

  const relatedProducts = products.filter(
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
