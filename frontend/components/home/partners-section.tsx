'use client'

import { partners } from '@/lib/data'
import { useLanguage } from '@/components/language-provider'

export function PartnersSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            {t('home.partners.title')}
          </span>
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center px-6 py-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {/* Placeholder for actual logos */}
              <div className="h-8 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {partner.name.charAt(0)}
                </div>
                <span className="font-medium text-muted-foreground text-sm whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {t('home.partners.subtitle')}
        </p>
      </div>
    </section>
  )
}
