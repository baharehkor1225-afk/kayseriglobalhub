'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { addItem } = useCart()

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-serif text-2xl font-medium mb-8">You May Also Like</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-colors"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Quick Add */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  className="w-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background gap-2"
                  onClick={() => addItem(product)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Quick Add
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-medium text-sm hover:text-accent transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
