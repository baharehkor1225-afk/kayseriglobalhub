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

        const userAgent = navigator.userAgent
        const isAndroid = /Android/i.test(userAgent)
        const isIOS = /iPad|iPhone|iPod/i.test(userAgent)
        const isSafari = /Safari/i.test(userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/i.test(userAgent)
        const hasIOSAR = isIOS && isSafari

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
