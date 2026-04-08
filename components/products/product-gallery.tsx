'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, View, RotateCcw, Smartphone, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/data'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [is3DMode, setIs3DMode] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
      </nav>

      {/* Main Image / 3D Viewer */}
      <div className="relative aspect-square bg-secondary rounded-3xl overflow-hidden">
        {!is3DMode ? (
          <>
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className={cn(
                'object-contain p-8 transition-transform duration-300',
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              )}
              onClick={() => setIsZoomed(!isZoomed)}
              priority
            />
            
            {/* Zoom hint */}
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full flex items-center gap-2 text-sm text-muted-foreground">
                <ZoomIn className="h-4 w-4" />
                Click to zoom
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 3D Model Placeholder */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <RotateCcw className="h-10 w-10 text-accent animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <p className="text-lg font-medium mb-2">3D Model Preview</p>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive 3D view coming soon
              </p>
              <code className="text-xs bg-muted px-3 py-2 rounded-lg block">
                Replace with GLB: {product.model3d}
              </code>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 bg-foreground text-background text-sm font-medium rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {/* 3D/AR Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">
          <Button
            variant={is3DMode ? 'default' : 'secondary'}
            onClick={() => setIs3DMode(!is3DMode)}
            className="gap-2"
          >
            <View className="h-4 w-4" />
            {is3DMode ? 'View Photos' : 'View in 3D'}
          </Button>
          <Button
            variant="secondary"
            className="gap-2"
            disabled
          >
            <Smartphone className="h-4 w-4" />
            AR View
          </Button>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {product.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveImage(index)
                setIs3DMode(false)
              }}
              className={cn(
                'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                activeImage === index
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-border hover:border-muted-foreground'
              )}
            >
              <Image
                src={image}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
          {/* 3D Thumbnail */}
          <button
            onClick={() => setIs3DMode(true)}
            className={cn(
              'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-muted flex items-center justify-center',
              is3DMode
                ? 'border-accent ring-2 ring-accent/20'
                : 'border-border hover:border-muted-foreground'
            )}
          >
            <View className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  )
}
