'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Eye, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

interface ProductsGridProps {
  category?: string
  filter?: string
  sort?: string
}

export function ProductsGrid({ category, filter, sort }: ProductsGridProps) {
  const { addItem } = useCart()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState(sort || 'featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (category) {
      result = result.filter((p) => p.category === category)
    }

    // Filter by special tags
    if (filter === 'new') {
      result = result.filter((p) => p.isNew)
    } else if (filter === 'bestseller') {
      result = result.filter((p) => p.isBestSeller)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1
          if (!a.isBestSeller && b.isBestSeller) return 1
          return 0
        })
    }

    return result
  }, [category, filter, sortBy])

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            className="lg:hidden gap-2"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>

          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <Link href="/products">
            <Button variant="outline" className="mt-4">
              Clear Filters
            </Button>
          </Link>
        </div>
      ) : (
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
          )}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={cn(
                'group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-colors',
                viewMode === 'list' ? 'flex' : ''
              )}
            >
              {/* Image */}
              <div
                className={cn(
                  'relative overflow-hidden bg-muted',
                  viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48 flex-shrink-0'
                )}
              >
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
                  {product.isBestSeller && (
                    <span className="px-2 py-1 bg-foreground text-background text-xs font-medium rounded-full">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div
                  className={cn(
                    'absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100',
                    viewMode === 'list' ? 'hidden' : ''
                  )}
                >
                  <Link href={`/products/${product.slug}`}>
                    <Button
                      size="icon"
                      className="bg-background text-foreground hover:bg-background/90 rounded-full h-11 w-11"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-11 w-11"
                    onClick={() => addItem(product)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className={cn('p-5', viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : '')}>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {product.roomType}
                  </span>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-1 font-medium text-foreground hover:text-accent transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  {viewMode === 'list' && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>

                <div className={cn('flex items-center justify-between', viewMode === 'list' ? 'mt-4' : 'mt-3')}>
                  <div>
                    <span className="font-serif text-lg text-foreground">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.bulkPrice && (
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        B2B from ${product.bulkPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {viewMode === 'list' && (
                    <div className="flex gap-2">
                      <Link href={`/products/${product.slug}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => addItem(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
