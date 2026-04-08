'use client'

import { useState } from 'react'
import Image from 'next/image'
import { View, RotateCcw, Smartphone, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const previewProducts = [
  {
    id: '1',
    name: 'Ankara Modern Sofa',
    image: '/images/products/sofa-modern.jpg',
    model3d: '/models/sofa-modern.glb', // Placeholder - replace with actual GLB
  },
  {
    id: '2',
    name: 'Istanbul Dining Set',
    image: '/images/products/dining-table.jpg',
    model3d: '/models/dining-set.glb',
  },
  {
    id: '3',
    name: 'Izmir Accent Chair',
    image: '/images/products/armchair.jpg',
    model3d: '/models/armchair.glb',
  },
]

export function ARPreviewSection() {
  const [activeProduct, setActiveProduct] = useState(previewProducts[0])
  const [is3DMode, setIs3DMode] = useState(false)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-sm uppercase tracking-widest text-accent">
              Immersive Experience
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground text-balance">
              Visualize Before You Buy
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Experience our furniture in stunning 3D detail. Rotate, zoom, and explore 
              every angle before making your decision. Coming soon: AR mode to place 
              furniture directly in your space using your smartphone.
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { icon: View, title: '360° View', desc: 'Explore every angle' },
                { icon: RotateCcw, title: 'Interactive', desc: 'Rotate and zoom freely' },
                { icon: Smartphone, title: 'AR Ready', desc: 'Place in your room' },
                { icon: Maximize2, title: 'True Scale', desc: 'Realistic dimensions' },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Selector */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-3">Select a product to preview:</p>
              <div className="flex gap-3">
                {previewProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setActiveProduct(product)
                      setIs3DMode(false)
                    }}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                      activeProduct.id === product.id
                        ? 'border-accent ring-2 ring-accent/20'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Preview Area */}
          <div className="relative">
            <div className="relative aspect-square bg-secondary rounded-3xl overflow-hidden">
              {/* Image Preview (placeholder for 3D) */}
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className={cn(
                  'object-contain p-8 transition-all duration-500',
                  is3DMode ? 'scale-110' : ''
                )}
              />

              {/* 3D Placeholder Overlay */}
              {is3DMode && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 backdrop-blur-sm">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                      <View className="h-8 w-8 text-accent animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      3D Model Loading...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Replace with your GLB file at:
                    </p>
                    <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                      {activeProduct.model3d}
                    </code>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Button
                  variant={is3DMode ? 'default' : 'secondary'}
                  onClick={() => setIs3DMode(!is3DMode)}
                  className="gap-2"
                >
                  <View className="h-4 w-4" />
                  {is3DMode ? 'Exit 3D' : 'View in 3D'}
                </Button>
                <Button
                  variant="secondary"
                  className="gap-2"
                  disabled
                >
                  <Smartphone className="h-4 w-4" />
                  AR Mode (Coming Soon)
                </Button>
              </div>
            </div>

            {/* Product Name */}
            <div className="mt-4 text-center">
              <h3 className="font-medium text-lg">{activeProduct.name}</h3>
              <p className="text-sm text-muted-foreground">
                Click &quot;View in 3D&quot; for interactive preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
