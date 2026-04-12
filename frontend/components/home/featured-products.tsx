'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/components/language-provider'
import { getRoomTypeLabel } from '@/lib/i18n'

export function FeaturedProducts() {
  const { addItem } = useCart()
  const { language, t } = useLanguage()
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4)

  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm uppercase tracking-widest text-accent">
              {t('home.featured.badge')}
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
              {t('home.featured.title')}
            </h2>
          </div>
          <Link href="/products">
            <Button variant="outline" className="group">
              {t('home.featured.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-background rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {t('home.featured.new')}
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 bg-foreground text-background text-xs font-medium rounded-full">
                      {t('home.featured.bestSeller')}
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <Link href={`/products/${product.slug}`}>
                    <Button
                      size="icon"
                      className="bg-background text-foreground hover:bg-background/90 rounded-full h-12 w-12"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-12 w-12"
                    onClick={() => addItem(product)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {getRoomTypeLabel(language, product.roomType)}
                </span>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="mt-1 font-medium text-foreground hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-serif text-lg text-foreground">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.bulkPrice && (
                    <span className="text-sm text-muted-foreground">
                      {t('home.featured.b2b')}: ${product.bulkPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
