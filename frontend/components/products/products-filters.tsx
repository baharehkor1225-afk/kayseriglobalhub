'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

interface ProductsFiltersProps {
  initialCategory?: string
  initialMinPrice?: string
  initialMaxPrice?: string
}

const priceRanges = [
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1,000', min: 500, max: 1000 },
  { label: '$1,000 - $2,000', min: 1000, max: 2000 },
  { label: '$2,000 - $5,000', min: 2000, max: 5000 },
  { label: 'Over $5,000', min: 5000, max: null },
]

const roomTypes = ['Living Room', 'Bedroom', 'Dining', 'Office']

export function ProductsFilters({
  initialCategory,
  initialMinPrice,
  initialMaxPrice,
}: ProductsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    room: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const activeCategory = searchParams.get('category') || initialCategory
  const activeRoom = searchParams.get('room')
  const activeMinPrice = searchParams.get('minPrice') || initialMinPrice
  const activeMaxPrice = searchParams.get('maxPrice') || initialMaxPrice

  return (
    <div className="sticky top-24 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium mb-4"
        >
          Category
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              expandedSections.category ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            <button
              onClick={() => updateFilter('category', null)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                !activeCategory
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateFilter('category', category.slug)}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors',
                  activeCategory === category.slug
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <span>{category.name}</span>
                <span className="text-xs">({category.productCount})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium mb-4"
        >
          Price Range
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              expandedSections.price ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => {
              const isActive =
                activeMinPrice === range.min.toString() &&
                (range.max === null
                  ? !activeMaxPrice
                  : activeMaxPrice === range.max.toString())
              return (
                <button
                  key={range.label}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set('minPrice', range.min.toString())
                    if (range.max) {
                      params.set('maxPrice', range.max.toString())
                    } else {
                      params.delete('maxPrice')
                    }
                    router.push(`/products?${params.toString()}`)
                  }}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {range.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Room Type Filter */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection('room')}
          className="flex items-center justify-between w-full text-left font-medium mb-4"
        >
          Room Type
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              expandedSections.room ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.room && (
          <div className="space-y-2">
            {roomTypes.map((room) => (
              <button
                key={room}
                onClick={() =>
                  updateFilter('room', activeRoom === room ? null : room)
                }
                className={cn(
                  'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  activeRoom === room
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {room}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
