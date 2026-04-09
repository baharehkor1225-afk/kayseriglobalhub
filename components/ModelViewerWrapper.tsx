'use client'

import { useEffect, useRef } from 'react'
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
  const viewerRef = useRef<any>(null)

  useEffect(() => {
    let cleanup = () => {}

    import('@google/model-viewer')
      .then(() => {
        if (!viewerRef.current) return

        const element = viewerRef.current
        const handleLoad = () => onLoad()
        const handleError = (event: any) => onError(event)

        element.addEventListener('load', handleLoad)
        element.addEventListener('error', handleError)

        cleanup = () => {
          element.removeEventListener('load', handleLoad)
          element.removeEventListener('error', handleError)
        }
      })
      .catch((err) => {
        onError(err)
      })

    return () => cleanup()
  }, [onLoad, onError])

  const iosSrc = src.endsWith('.glb') ? src.replace(/\.glb$/, '.usdz') : undefined
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <div className="relative w-full h-full">
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        ios-src={iosSrc}
        quick-look-browsers="safari"
        interaction-prompt="auto"
        reveal="auto"
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        shadow-intensity={shadowIntensity}
        exposure={exposure}
        style={{ width: '100%', height: '100%' }}
        className={className}
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

      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => viewerRef.current?.activateAR?.()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-lg transition hover:bg-accent/90"
        >
          <Smartphone className="h-4 w-4" />
          Open AR Camera
        </button>
        {isIOS && iosSrc ? (
          <a
            href={iosSrc}
            rel="ar"
            className="inline-flex items-center gap-2 rounded-full bg-foreground/90 px-4 py-2 text-sm font-medium text-background shadow-lg transition hover:bg-foreground/80"
          >
            Quick Look (iOS)
          </a>
        ) : isIOS ? (
          <div className="rounded-full bg-foreground/90 px-4 py-2 text-sm font-medium text-background shadow-lg">
            iOS AR نیاز به فایل .usdz دارد
          </div>
        ) : null}
      </div>
    </div>
  )
}