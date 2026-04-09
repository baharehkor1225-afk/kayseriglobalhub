import { useState, useEffect } from 'react'

export function useARSupport() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // Check for AR support
    const checkARSupport = async () => {
      try {
        // Check if WebXR is available (Android)
        const xrSupport = navigator.xr ? await navigator.xr.isSessionSupported('immersive-ar') : false
        
        // Check if Scene Viewer is available (Android)
        const isAndroid = /Android/i.test(navigator.userAgent)
        
        // Check if iOS and has AR support
        const isIOS = /iOS|iPhone|iPad/i.test(navigator.userAgent)
        const hasIOSAR = isIOS && 'ontouchstart' in window
        
        const arSupported = xrSupport || isAndroid || hasIOSAR
        setIsSupported(arSupported)
      } catch (error) {
        console.error('Error checking AR support:', error)
        setIsSupported(false)
      }
    }

    // Check if mobile
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }

    checkARSupport()
    checkMobile()
  }, [])

  return { isSupported, isMobile }
}
