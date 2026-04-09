'use client'

import { useEffect } from 'react'
import { Smartphone, Loader2 } from 'lucide-react'

interface ModelViewerWrapperProps {
  src: string
  alt: string
  autoRotate: boolean
  cameraControls: boolean
  shadowIntensity: number
  exposure: number
  onLoad: () => void
  onError: (event: any) => void
  className: string
}

export default function ModelViewerWrapper({
  src,
  alt,
  autoRotate,
  cameraControls,
  shadowIntensity,
  exposure,
  onLoad,
  onError,
  className,
}: ModelViewerWrapperProps) {
  useEffect(() => {
    // Import model-viewer script dynamically
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
    script.type = 'module'
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src*="model-viewer"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <model-viewer
      src={src}
      alt={alt}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls={cameraControls}
      auto-rotate={autoRotate}
      shadow-intensity={shadowIntensity}
      exposure={exposure}
      style={{ width: '100%', height: '100%' }}
      class={className}
      onLoad={onLoad}
      onError={onError}
    >
      {/* AR Button */}
      <button
        slot="ar-button"
        className="absolute bottom-4 right-4 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg"
      >
        <Smartphone className="h-4 w-4" />
        View in your space
      </button>

      {/* Loading poster */}
      <div slot="poster" className="w-full h-full bg-secondary rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-accent" />
          <p className="text-sm text-muted-foreground">Preparing 3D model...</p>
        </div>
      </div>

      {/* Progress bar */}
      <div slot="progress-bar" className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
        <div className="h-full bg-accent transition-all duration-300"></div>
      </div>
    </model-viewer>
  )
}