'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'

export function B2BHero() {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-sm mb-6">
              <Building2 className="h-4 w-4" />
              {l('B2B Partnership Program', 'B2B Ortaklik Programi')}
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
              Premium Furniture for{' '}
              <span className="text-accent">{l('Visionary Projects', 'Vizyoner Projeler')}</span>
            </h1>
            
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              {l(
                'From luxury hotels to corporate headquarters, we deliver exceptional furniture solutions at scale. Partner with us for competitive pricing, custom designs, and reliable global delivery.',
                'Luks otellerden kurumsal merkezlere kadar, buyuk olcekte ust duzey mobilya cozumleri sunuyoruz. Rekabetci fiyatlar, ozel tasarimlar ve guvenilir global teslimat icin bizimle calisin.'
              )}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#inquiry-form">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-base group"
                >
                  {l('Request a Quote', 'Teklif Al')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8"
                >
                  {l('Browse Catalog', 'Katalogu Incele')}
                </Button>
              </Link>
            </div>

            {/* Quick benefits */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: Building2, text: l('Volume Discounts up to 30%', '%30\'a varan toplu alim indirimi') },
                { icon: Globe, text: l('Global Shipping & Logistics', 'Global kargo ve lojistik') },
                { icon: Shield, text: l('Custom Manufacturing', 'Ozel uretim') },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <item.icon className="h-4 w-4 text-accent" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/category-dining.jpg"
                  alt={l('Premium hotel furniture', 'Premium otel mobilyasi')}
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-background text-foreground p-6 rounded-2xl shadow-xl max-w-xs">
              <p className="font-serif text-2xl font-medium">500+</p>
              <p className="text-sm text-muted-foreground mt-1">
                {l('Commercial projects completed worldwide', 'Dunya capinda tamamlanan ticari proje')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
