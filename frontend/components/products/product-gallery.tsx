'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, View, Smartphone, ZoomIn, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ARViewer } from '@/components/ARViewer'
import type { Product } from '@/lib/data'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [is3DMode, setIs3DMode] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [active3DIndex, setActive3DIndex] = useState(0)

  // Support model3ds as array/string and legacy model3d.
  const rawModels = (product as any).model3ds
  const models: string[] = Array.isArray(rawModels)
    ? rawModels.filter((m): m is string => typeof m === 'string' && m.trim().length > 0)
    : typeof rawModels === 'string' && rawModels.trim().length > 0
    ? rawModels.split(/\n|,/).map(m => m.trim()).filter(Boolean)
    : product.model3d
    ? [product.model3d]
    : []

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
        <span className="text-foreground truncate max-w-37.5">{product.name}</span>
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
          <div className="w-full h-full flex flex-col">
            <ARViewer
              src={models[active3DIndex] || '/models/placeholder.glb'}
              alt={`${product.name} - Model ${active3DIndex + 1}`}
              className="w-full flex-1"
              autoRotate={true}
              cameraControls={true}
              shadowIntensity={1}
              exposure={1}
            />
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
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
          <Button
            variant={is3DMode ? 'default' : 'secondary'}
            onClick={() => setIs3DMode(!is3DMode)}
            className="gap-2 w-full"
          >
            <View className="h-4 w-4" />
            {is3DMode ? 'View Photos' : 'View in 3D'}
          </Button>
          {is3DMode && (
            <div className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-center">
              📱 On mobile: Click "{Smartphone.name}" button to view in AR using your camera
            </div>
          )}
        </div>
      </div>

      {/* 3D Model Selector */}
      {is3DMode && models.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {models.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive3DIndex(idx)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                active3DIndex === idx
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-foreground hover:bg-accent/20'
              )}
            >
              <Box className="inline h-3 w-3 mr-1" />
              Model {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {(product.images.length > 1 || models.length > 0) && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveImage(index)
                setIs3DMode(false)
              }}
              className={cn(
                'relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all',
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
            onClick={() => {
              setIs3DMode(true)
              setActive3DIndex(0)
            }}
            className={cn(
              'relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-muted flex items-center justify-center',
              is3DMode
                ? 'border-accent ring-2 ring-accent/20'
                : 'border-border hover:border-muted-foreground'
            )}
            disabled={models.length === 0}
          >
            <View className="h-6 w-6 text-muted-foreground" />
            {models.length > 1 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full text-xs flex items-center justify-center font-bold">
                {models.length}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
