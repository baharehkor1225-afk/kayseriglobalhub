'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Smartphone, Loader2 } from 'lucide-react'
import { mergeGlbModels } from '@/lib/merge-glb-models'

interface ModelViewerWrapperProps {
  src: string
  sources?: string[]
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
  sources,
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
  const [iosSrc, setIosSrc] = useState<string | undefined>(undefined)
  const [resolvedSrc, setResolvedSrc] = useState<string>(src)
  const [generatedBlobUrl, setGeneratedBlobUrl] = useState<string | undefined>(undefined)

  const normalizedSources = useMemo(
    () => (Array.isArray(sources)
      ? sources.filter((source): source is string => typeof source === 'string' && source.trim().length > 0)
      : []),
    [sources]
  )
  const sourcesSignature = normalizedSources.join('|')

  useEffect(() => {
    let cancelled = false

    const createMergedSource = async () => {
      if (normalizedSources.length <= 1) {
        setResolvedSrc(normalizedSources[0] || src)
        return
      }

      try {
        const mergedUrl = await mergeGlbModels(normalizedSources)
        if (cancelled) {
          URL.revokeObjectURL(mergedUrl)
          return
        }

        setGeneratedBlobUrl((previousUrl) => {
          if (previousUrl) URL.revokeObjectURL(previousUrl)
          return mergedUrl
        })
        setResolvedSrc(mergedUrl)
      } catch (error) {
        console.error('Failed to merge 3D models for AR:', error)
        onError(error)
        setResolvedSrc(normalizedSources[0] || src)
      }
    }

    createMergedSource()

    return () => {
      cancelled = true
    }
  }, [onError, src, sourcesSignature])

  useEffect(() => {
    return () => {
      if (generatedBlobUrl) {
        URL.revokeObjectURL(generatedBlobUrl)
      }
    }
  }, [generatedBlobUrl])

  useEffect(() => {
    let cleanup = () => { }

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

  useEffect(() => {
    const tryLoadUsd = async () => {
      // Don't attempt USDZ lookup for blob URLs or non-glb sources
      if (!resolvedSrc || resolvedSrc.startsWith('blob:') || !resolvedSrc.toLowerCase().endsWith('.glb')) {
        setIosSrc(undefined)
        return
      }

      const usdzUrl = resolvedSrc.replace(/\.glb$/i, '.usdz')

      try {
        const response = await fetch(usdzUrl, { method: 'HEAD' })
        if (response.ok) {
          setIosSrc(usdzUrl)
        } else {
          setIosSrc(undefined)
        }
      } catch (error) {
        console.debug('USDZ file not available, using GLB for iOS AR:', error)
        setIosSrc(undefined)
      }
    }

    tryLoadUsd()
  }, [resolvedSrc])

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

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {/* @ts-ignore */}
      <model-viewer
        ref={viewerRef}
        src={resolvedSrc}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        ios-src={iosSrc ?? undefined}
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        shadow-intensity={shadowIntensity}
        exposure={exposure}
        interaction-prompt="auto"
        reveal="auto"
        touch-action="pan-y"
        loading="lazy"
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
        {/* @ts-ignore */}
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