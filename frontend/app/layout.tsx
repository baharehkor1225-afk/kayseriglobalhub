import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartProvider } from '@/lib/cart-context'
import { LanguageProvider } from '@/components/language-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://kayseriglobalhub.com'),
  title: {
    default: 'Kayseri Global Hub | Premium Turkish Furniture',
    template: '%s | Kayseri Global Hub',
  },
  description: 'Discover premium Turkish furniture for homes and businesses. Expert craftsmanship meets modern design. B2B partnerships and B2C retail available worldwide.',
  keywords: ['Turkish furniture', 'premium furniture', 'B2B furniture', 'hotel furniture', 'office furniture', 'home decor', 'luxury furniture'],
  authors: [{ name: 'Kayseri Global Hub' }],
  creator: 'Kayseri Global Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kayseriglobalhub.com',
    siteName: 'Kayseri Global Hub',
    title: 'Kayseri Global Hub | Premium Turkish Furniture',
    description: 'Discover premium Turkish furniture for homes and businesses. Expert craftsmanship meets modern design.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kayseri Global Hub - Premium Turkish Furniture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayseri Global Hub | Premium Turkish Furniture',
    description: 'Discover premium Turkish furniture for homes and businesses.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#5C4A3D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
