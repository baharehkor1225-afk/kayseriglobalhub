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
  const containerRef = useRef<HTMLDivElement>(null)

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

  const handleARClick = () => {
    if (viewerRef.current) {
      // Trigger the AR experience
      const arButton = viewerRef.current.shadowRoot?.querySelector('[slot="ar-button"]')
      if (arButton) {
        arButton.click()
      } else {
        // Fallback: try to access the AR functionality directly
        viewerRef.current.activateAR?.()
      }
    }
  }

  // Don't convert to USDZ - just use the GLB file for both platforms
  const iosSrc = src

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        ar={true}
        ar-modes="webxr scene-viewer quick-look"
        ios-src={iosSrc}
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        shadow-intensity={shadowIntensity}
        exposure={exposure}
        interaction-prompt="none"
        reveal="auto"
        touch-action="pan-y"
        style={{ width: '100%', height: '100%' }}
        className={className}
      >
        {/* AR Button */}
        <button
          slot="ar-button"
          className="active:scale-95 transition-transform"
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'var(--accent, #ff6b35)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Smartphone style={{ width: '18px', height: '18px' }} />
          View in your space
        </button>

        {/* Loading poster */}
        <div slot="poster" style={{
          width: '100%',
          height: '100%',
          background: 'var(--secondary, #f5f5f5)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <Loader2 style={{
              width: '32px',
              height: '32px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 8px',
              color: 'var(--accent, #ff6b35)',
            }} />
            <p style={{
              fontSize: '14px',
              color: 'var(--muted-foreground, #666)',
              margin: 0,
            }}>
              Preparing 3D model...
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div slot="progress-bar" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--secondary, #f5f5f5)',
        }}>
          <div style={{
            height: '100%',
            background: 'var(--accent, #ff6b35)',
            transition: 'width 0.3s ease',
          }}></div>
        </div>
      </model-viewer>

      {/* CSS for spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}