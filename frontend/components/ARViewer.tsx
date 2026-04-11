'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Smartphone, Loader2, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useARSupport } from '@/hooks/use-ar-support'

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
  const { isSupported: arSupported, isMobile } = useARSupport()

  useEffect(() => {
    // Check if WebGL is supported (basic check for 3D rendering)
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setIsSupported(!!gl)

    // Check if the model file exists
    if (src) {
      fetch(src, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            setError('3D model file not found. Please contact support.')
            setIsLoading(false)
          }
        })
        .catch(() => {
          setError('3D model file not found. Please contact support.')
          setIsLoading(false)
        })
    }
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = (event: any) => {
    setError('Failed to load 3D model. Check that the .glb file exists and is accessible.')
    setIsLoading(false)
    console.error('Model viewer error:', event)
  }

  if (!src) {
    return (
      <div className={cn('w-full h-full flex items-center justify-center bg-secondary rounded-lg', className)}>
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-medium mb-2">3D Model Not Available</h3>
          <p className="text-sm text-muted-foreground">
            This product does not have a 3D model configured yet.
          </p>
        </div>
      </div>
    )
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

      {/* AR Support Info */}
      {isMobile === false && (
        <div className="absolute top-4 left-4 flex items-start gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>AR available on mobile devices. Open this page on your phone to use AR.</span>
        </div>
      )}

      {/* AR Support Warning */}
      {isMobile === true && arSupported === false && (
        <div className="absolute bottom-4 left-4 flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>
            AR is not available on this device/browser. On iPhone, Quick Look requires Safari and a matching .usdz file for the model.
          </span>
        </div>
      )}

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