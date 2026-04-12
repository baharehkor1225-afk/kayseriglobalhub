'use client'

import { useLanguage } from '@/components/language-provider'

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50+', label: 'Countries Served' },
  { value: '30%', label: 'Volume Discount' },
  { value: '38', label: 'Years Experience' },
]

export function B2BStats() {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)

  return (
    <section className="bg-secondary border-y border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label === 'Projects Completed' && l('Projects Completed', 'Tamamlanan Projeler')}
                {stat.label === 'Countries Served' && l('Countries Served', 'Hizmet Verilen Ulke')}
                {stat.label === 'Volume Discount' && l('Volume Discount', 'Toplu Alim Indirimi')}
                {stat.label === 'Years Experience' && l('Years Experience', 'Yillik Deneyim')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
