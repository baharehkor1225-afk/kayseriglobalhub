'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products, type Product } from '@/lib/data'

interface RoomSet {
  id: string
  name: string
  slug: string
  products: string[]
  totalPrice: number
  setPrice: number
  image: string
}

interface RoomSetsProps {
  sets: RoomSet[]
  currentProductId: string
}

export function RoomSets({ sets, currentProductId }: RoomSetsProps) {
  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Package className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-medium">Complete the Look</h2>
          <p className="text-sm text-muted-foreground">
            Save more with our curated room sets
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sets.map((set) => {
          const setProducts = set.products
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean) as Product[]
          const savings = set.totalPrice - set.setPrice
          const savingsPercent = Math.round((savings / set.totalPrice) * 100)

          return (
            <div
              key={set.id}
              className="bg-secondary rounded-2xl overflow-hidden border border-border"
            >
              <div className="relative aspect-video">
                <Image
                  src={set.image}
                  alt={set.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                    Save {savingsPercent}%
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg">{set.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Includes {setProducts.length} pieces
                </p>

                {/* Products in set */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {setProducts.map((product) => (
                    <span
                      key={product.id}
                      className={`px-3 py-1 text-xs rounded-full ${
                        product.id === currentProductId
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-background border border-border'
                      }`}
                    >
                      {product.name}
                    </span>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3 mt-6">
                  <span className="font-serif text-2xl">
                    ${set.setPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${set.totalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Save ${savings.toLocaleString()}
                  </span>
                </div>

                <Link href={`/products?set=${set.slug}`}>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    View Set Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
