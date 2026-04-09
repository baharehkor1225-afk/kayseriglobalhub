'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Smartphone, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Dynamically import model-viewer to avoid SSR issues
const ModelViewer = dynamic(() => import('./ModelViewerWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-lg">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-accent" />
        <p className="text-sm text-muted-foreground">Loading 3D viewer...</p>
      </div>
    </div>
  ),
})

interface ARViewerProps {
  src: string
  alt?: string
  className?: string
  autoRotate?: boolean
  cameraControls?: boolean
  shadowIntensity?: number
  exposure?: number
  style?: React.CSSProperties
}

export function ARViewer({
  src,
  alt = '3D Model',
  className,
  autoRotate = true,
  cameraControls = true,
  shadowIntensity = 1,
  exposure = 1,
  style,
}: ARViewerProps) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if WebGL is supported (basic check for 3D rendering)
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setIsSupported(!!gl)
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = (event: any) => {
    setError('Failed to load 3D model')
    setIsLoading(false)
    console.error('Model viewer error:', event)
  }

  if (isSupported === false) {
    return (
      <div className={cn('w-full h-full flex items-center justify-center bg-secondary rounded-lg', className)}>
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-medium mb-2">3D Viewer Not Supported</h3>
          <p className="text-sm text-muted-foreground">
            Your browser doesn&apos;t support 3D rendering. Please try a modern browser like Chrome, Firefox, or Safari.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative w-full h-full', className)} style={style}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-secondary rounded-lg">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-accent" />
            <p className="text-sm text-muted-foreground">Loading 3D viewer...</p>
          </div>
        </div>
      }>
        <ModelViewer
          src={src}
          alt={alt}
          autoRotate={autoRotate}
          cameraControls={cameraControls}
          shadowIntensity={shadowIntensity}
          exposure={exposure}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full rounded-lg"
        />
      </Suspense>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-accent" />
            <p className="text-sm text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h3 className="font-medium mb-2">Failed to Load Model</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}