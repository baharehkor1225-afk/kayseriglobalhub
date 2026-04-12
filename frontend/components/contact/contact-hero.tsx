'use client'

import { useLanguage } from '@/components/language-provider'

export function ContactHero() {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)

  return (
    <section className="bg-secondary py-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-widest text-accent">{l('Contact Us', 'Iletisim')}</span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-medium text-foreground">
            {l("Let's Start a Conversation", 'Hadi Konusalim')}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {l(
              "Have questions about our products, need design advice, or want to discuss a B2B partnership? We're here to help.",
              'Urunlerimiz hakkinda sorulariniz mi var, tasarim destegi mi istiyorsunuz, yoksa B2B ortakligini mi gorusmek istiyorsunuz? Yardim etmek icin buradayiz.'
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
