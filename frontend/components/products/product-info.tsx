'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Heart, Share2, Check, Truck, Shield, RotateCcw, Building2, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="mt-8 lg:mt-0 space-y-6">
      {/* Category */}
      <div>
        <span className="text-sm uppercase tracking-widest text-accent">
          {product.roomType}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground text-balance">
        {product.name}
      </h1>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Pricing */}
      <div className="flex flex-wrap items-baseline gap-4 pb-6 border-b border-border">
        <span className="font-serif text-3xl text-foreground">
          ${product.price.toLocaleString()}
        </span>
        {product.bulkPrice && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            <Building2 className="h-4 w-4 text-accent" />
            <span className="text-sm">
              B2B: <span className="font-medium">${product.bulkPrice.toLocaleString()}</span>
              <span className="text-muted-foreground"> ({product.minBulkQuantity}+ units)</span>
            </span>
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Color: <span className="text-muted-foreground">{selectedColor}</span></span>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                'px-4 py-2 border rounded-lg text-sm transition-all',
                selectedColor === color
                  ? 'border-accent bg-accent/10 text-foreground'
                  : 'border-border hover:border-muted-foreground text-muted-foreground'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <span className="text-sm font-medium mb-3 block">Quantity</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-muted transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-muted transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.inStock ? (
              <span className="flex items-center gap-1 text-green-600">
                <Check className="h-4 w-4" />
                In Stock
              </span>
            ) : (
              'Out of Stock'
            )}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          size="lg"
          className="flex-1 h-14 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingBag className="h-5 w-5" />
          Add to Cart - ${(product.price * quantity).toLocaleString()}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={cn(
            'h-14 w-14 shrink-0',
            isWishlisted && 'bg-red-50 border-red-200 text-red-500'
          )}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
        </Button>
        <Button size="lg" variant="outline" className="h-14 w-14 shrink-0">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* B2B CTA */}
      <Link href="/b2b" className="block">
        <div className="p-4 bg-secondary rounded-xl border border-border hover:border-accent/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Building2 className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Need Bulk Quantities?</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Get up to 30% off on orders of {product.minBulkQuantity || 10}+ units. 
                Perfect for hotels, offices, and commercial projects.
              </p>
              <span className="text-xs text-accent font-medium mt-2 inline-block">
                Request B2B Quote &rarr;
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        {[
          { icon: Truck, label: 'Free Shipping', desc: 'On orders $500+' },
          { icon: Shield, label: '10 Year Warranty', desc: 'Quality guaranteed' },
          { icon: RotateCcw, label: '30 Day Returns', desc: 'Hassle-free' },
        ].map((badge) => (
          <div key={badge.label} className="text-center">
            <badge.icon className="h-5 w-5 mx-auto mb-2 text-accent" />
            <p className="text-xs font-medium">{badge.label}</p>
            <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
