declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        'ios-src'?: string
        poster?: string
        alt?: string
        'camera-controls'?: boolean
        'auto-rotate'?: boolean
        'ar'?: boolean
        'ar-modes'?: string
        'shadow-intensity'?: string | number
        'environment-image'?: string
        exposure?: string | number
        'shadow-softness'?: string | number
        ref?: React.RefObject<any>
      }
    }
  }
}