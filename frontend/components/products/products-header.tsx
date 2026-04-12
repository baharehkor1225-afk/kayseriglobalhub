'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function ProductsHeader() {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)

  return (
    <div className="bg-secondary border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            {l('Home', 'Ana Sayfa')}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{l('Products', 'Urunler')}</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
          {l('Our Collection', 'Koleksiyonumuz')}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {l(
            'Discover premium Turkish furniture crafted with generations of expertise. Each piece combines traditional craftsmanship with modern design.',
            'Nesiller boyu uzmanlikla uretilmis premium Turk mobilyalarini kesfedin. Her parca geleneksel ustalik ile modern tasarimi birlestirir.'
          )}
        </p>
      </div>
    </div>
  )
}
